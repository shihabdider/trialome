# Gemini-Based DAG Extraction for NSCLC Clinical Decision Trees Implementation Plan

## Overview

Convert NSCLC clinical decision tree images (~45 JPEG files) into structured JSON DAG format using Gemini API's vision and thinking capabilities. The system will extract nodes and edges from PNG/JPEG images and produce JSON output compatible with trialome's existing `data.js` structure, with idempotent processing to avoid redundant API calls and costs.

## Current State Analysis

### What Exists
- **Image files**: ~45 NSCLC decision tree JPEG images in `/data/decision_trees/new/nsclc/images/`
- **Current processor**: `processor.py` handles JSON → data.js transformation (drug name extraction, search term generation)
- **Frontend**: `app.js` renders trees from TREES object in data.js
- **Data structure**: Established TREES format with id, label, type, search_term, children

### What's Missing
- Image-to-JSON extraction pipeline
- Gemini API integration layer
- Idempotent file upload tracking (Files API cache)
- Cross-tree reference resolution
- DAG node structure mapping (parent_ids, children_ids, tree_ids)

### Key Constraints
- GEMINI_API_KEY available as environment variable
- Develop with Gemini 2.5 Pro (cost-effective) with easy switchover to Gemini 3 Pro later
- Must handle 45+ images efficiently without redundant uploads
- Must preserve cross-tree references (e.g., "NSCL-16" references)

## Desired End State

After implementation completion:

1. **Extraction Pipeline**: Run `python gemini_dag_extractor.py extract-all` to process all images → JSON DAGs
2. **Idempotent Processing**: 
   - First run: uploads images to Gemini Files API, processes, caches file URIs in `dag_extraction_cache.json`
   - Subsequent runs: reuses cached URIs, skips re-uploads (cost savings)
3. **JSON Output**: Each image produces `image_name.dag.json` with structure:
   ```json
   {
     "nodes": [{"id": "node_001", "content": "...", "parent_ids": [], "children_ids": [], "tree_ids": []}],
     "tree_references": [{"from_tree": "NSCL-15", "to_tree": "NSCL-16", "description": "..."}],
     "extraction_confidence": 0.95
   }
   ```
4. **Integration**: Post-processor converts DAG JSON → existing TREES format for data.js
5. **Verification**: Test on single image → verify output matches schema → batch process all 45 images

### How to Verify Completion
- Single image extracts correctly with confidence ≥ 0.85
- All 45 images process without manual intervention
- Cross-tree references (tree_ids field) correctly identify linked guidelines
- Output JSON files valid and loadable
- Cache prevents redundant uploads on re-runs
- Can switch model to Gemini 3 Pro with single config change

## What We're NOT Doing

- Manual node creation or annotation
- Real-time image-to-tree rendering in frontend (this is offline preprocessing)
- OCR fallback if Gemini fails (we'll log failures for manual review)
- Multiple language support (NCCN guidelines are English-only)
- Storing original images in processed output (only JSON)
- Building a generic DAG-to-flowchart converter (we convert to existing TREES format)

## Implementation Approach

**Two-stage pipeline:**
1. **Stage 1: Image → Structured DAG JSON** (Gemini 2.5 Pro with thinking)
   - Upload images to Files API once, cache URIs
   - Process each image with Gemini structured output
   - Generate individual DAG JSON files

2. **Stage 2: DAG JSON → data.js** (Python post-processor)
   - Merge all DAG JSONs
   - Normalize node IDs globally
   - Detect/resolve cross-tree references
   - Convert to TREES format for app.js compatibility
   - Extract search terms for clinical trial queries

This separation keeps concerns clean: Gemini handles vision, Python handles data transformation.

---

## Phase 1: Gemini API Integration & Single Image Pilot

### Overview
Build the core Gemini extraction module, test on a single image with both Gemini 2.5 Pro and 3 Pro, and establish idempotent file upload pattern.

### Changes Required

#### 1. Install Dependencies
**File**: No new permanent files, but initial setup

```bash
# Install Google Generative AI SDK
pip install google-generativeai pydantic
```

#### 2. Create Core Extraction Module
**File**: `gemini_dag_extractor.py` (new)

This module handles:
- Gemini API client initialization (with easy model switching)
- Structured output schema definition (Pydantic models)
- File upload and caching to Files API
- Single image extraction with thinking enabled
- Error handling and retry logic

```python
#!/usr/bin/env python3
"""
Gemini-based DAG Extraction for Clinical Decision Trees

Converts NSCLC clinical decision tree images to structured JSON DAG format
using Gemini 2.5 Pro (or 3 Pro) with thinking capabilities.
"""

import json
import os
import re
from pathlib import Path
from typing import Optional, List, Dict, Any
from datetime import datetime
import hashlib

import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from pydantic import BaseModel, Field


# ============================================================================
# Configuration: Easy model switching
# ============================================================================

# Set to "gemini-3-pro-preview" for production, "gemini-2.5-pro" for development
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-pro")

# Thinking configuration (auto-adjusted based on model)
THINKING_CONFIG = {
    "gemini-3-pro-preview": {"thinking_level": "high"},
    "gemini-2.5-pro": {"thinking_budget": 10000},  # ~5000-10000 tokens for complex trees
    "gemini-2.5-flash": {"thinking_budget": 5000},  # Faster but less reasoning
}

# ============================================================================
# Pydantic Schema for Structured Output
# ============================================================================

class NodeData(BaseModel):
    """Represents a single node in the clinical decision tree."""
    id: str = Field(description="Unique node identifier (e.g., node_001)")
    content: str = Field(description="Full text content of the decision node, verbatim from image")
    parent_ids: List[str] = Field(description="IDs of parent nodes this node connects from")
    children_ids: List[str] = Field(description="IDs of child nodes this node connects to")
    tree_ids: List[str] = Field(description="Cross-references to other trees (e.g., NSCL-16, NSCL-19)")


class TreeReference(BaseModel):
    """Represents a cross-tree reference."""
    from_tree: str = Field(description="Source tree identifier")
    to_tree: str = Field(description="Destination tree identifier")
    description: str = Field(description="Description of what the reference represents")


class DAGOutput(BaseModel):
    """Complete DAG extraction output for a single clinical guideline image."""
    nodes: List[NodeData] = Field(description="All nodes extracted from the image")
    tree_references: List[TreeReference] = Field(description="Cross-tree references found")
    extraction_confidence: float = Field(
        description="Confidence score 0.0-1.0 for extraction accuracy"
    )
    image_title: Optional[str] = Field(
        description="Title/header of the guideline (e.g., 'NCCN Guidelines Version 3.2025')"
    )


# ============================================================================
# File API Caching
# ============================================================================

CACHE_FILE = Path(__file__).parent / "dag_extraction_cache.json"


def get_file_hash(file_path: Path) -> str:
    """Generate SHA256 hash of file for cache validation."""
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()


def load_cache() -> Dict[str, Any]:
    """Load file upload cache."""
    if CACHE_FILE.exists():
        with open(CACHE_FILE, "r") as f:
            return json.load(f)
    return {"files": {}, "last_updated": None}


def save_cache(cache: Dict[str, Any]):
    """Save file upload cache."""
    cache["last_updated"] = datetime.now().isoformat()
    with open(CACHE_FILE, "w") as f:
        json.dump(cache, f, indent=2)


def get_cached_file_uri(file_path: Path) -> Optional[str]:
    """Retrieve cached file URI if exists and hash matches."""
    cache = load_cache()
    file_key = str(file_path)
    
    if file_key not in cache["files"]:
        return None
    
    cached_entry = cache["files"][file_key]
    current_hash = get_file_hash(file_path)
    
    if cached_entry.get("file_hash") == current_hash:
        return cached_entry.get("file_uri")
    
    return None  # Hash mismatch, need re-upload


def cache_file_uri(file_path: Path, file_uri: str):
    """Cache the file URI after successful upload."""
    cache = load_cache()
    file_key = str(file_path)
    
    cache["files"][file_key] = {
        "file_uri": file_uri,
        "file_hash": get_file_hash(file_path),
        "uploaded_at": datetime.now().isoformat(),
    }
    
    save_cache(cache)


# ============================================================================
# Gemini API Integration
# ============================================================================

def initialize_client():
    """Initialize Gemini API client."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")
    
    genai.configure(api_key=api_key)


def upload_image_to_files_api(file_path: Path) -> str:
    """
    Upload image to Gemini Files API with caching.
    Returns file URI for use in API calls.
    """
    # Check cache first
    cached_uri = get_cached_file_uri(file_path)
    if cached_uri:
        print(f"  ✓ Using cached file URI for {file_path.name}")
        return cached_uri
    
    # Upload to Files API
    print(f"  ↑ Uploading {file_path.name} to Gemini Files API...")
    
    with open(file_path, "rb") as f:
        response = genai.upload_file(
            f,
            mime_type="image/jpeg",
            display_name=file_path.name
        )
    
    file_uri = response.uri
    
    # Cache the URI
    cache_file_uri(file_path, file_uri)
    print(f"  ✓ Uploaded and cached: {file_uri}")
    
    return file_uri


def extract_dag_from_image(image_path: Path) -> DAGOutput:
    """
    Extract DAG structure from a clinical decision tree image.
    
    Uses Gemini 2.5 Pro (or 3 Pro) with:
    - Vision capabilities for image understanding
    - Thinking model for complex reasoning about tree structure
    - Structured outputs for reliable JSON
    """
    
    # Upload image (cached if exists)
    file_uri = upload_image_to_files_api(image_path)
    
    # Initialize model with structured output
    thinking_params = THINKING_CONFIG.get(GEMINI_MODEL, {})
    
    model = genai.GenerativeModel(
        model_name=GEMINI_MODEL,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            response_schema=DAGOutput,
            **thinking_params
        ),
        system_instruction="""You are an expert medical information extractor specializing in clinical decision trees.

Your task: Extract the complete directed acyclic graph (DAG) structure from this clinical guideline image.

CRITICAL REQUIREMENTS:
1. Identify every decision node, condition node, and action node in the tree
2. Preserve all parent-child relationships exactly as shown in the image
3. Extract ALL text content verbatim, including clinical notations (preserve superscripts, subscripts)
4. Identify cross-references to other guidelines (e.g., "NSCL-16", "NSCL-19", "Treatment of Thoracic Disease")
5. Assign unique node IDs: node_001, node_002, etc. based on visual order (left-to-right, top-to-bottom)
6. For each node:
   - parent_ids: list ALL nodes this connects FROM (empty list if root)
   - children_ids: list ALL nodes this connects TO (empty list if leaf)
   - tree_ids: list other guidelines referenced by this node content
7. Extraction confidence (0.0-1.0): how sure are you of the accuracy? Lower confidence if:
   - Text is blurry or hard to read
   - Tree structure is ambiguous
   - Cross-references are unclear

OUTPUT FORMAT: Valid JSON matching the provided schema. No additional text."""
    )
    
    print(f"Processing {image_path.name} with {GEMINI_MODEL}...")
    
    # Create request with image
    response = model.generate_content(
        [
            f"Extract the complete decision tree from this clinical guideline image. Special instructions:\n"
            f"- Clinical guideline reference ID from image header: extract from title\n"
            f"- Mark any nodes that reference other guidelines with their tree_ids\n"
            f"- Preserve exact text including superscript notations\n"
            f"- Connections and decision criteria should be in node content",
            {
                "mime_type": "image/jpeg",
                "data": genai.upload_file(open(image_path, "rb"), mime_type="image/jpeg").uri
            }
        ]
    )
    
    # Parse response as DAGOutput
    output = DAGOutput.model_validate_json(response.text)
    
    return output


# ============================================================================
# CLI Entry Points
# ============================================================================

def extract_single_image(image_path: str):
    """Extract DAG from a single image for testing."""
    initialize_client()
    
    path = Path(image_path)
    if not path.exists():
        print(f"Error: {image_path} not found")
        return
    
    print(f"\n{'='*60}")
    print(f"Single Image Extraction Test")
    print(f"{'='*60}")
    print(f"Model: {GEMINI_MODEL}")
    print(f"Image: {path.name}")
    print()
    
    dag = extract_dag_from_image(path)
    
    # Save output
    output_path = path.with_suffix(".dag.json")
    with open(output_path, "w") as f:
        json.dump(dag.model_dump(), f, indent=2)
    
    print(f"\n✓ Extraction complete!")
    print(f"  Nodes: {len(dag.nodes)}")
    print(f"  Tree references: {len(dag.tree_references)}")
    print(f"  Confidence: {dag.extraction_confidence:.2%}")
    print(f"  Output: {output_path}")


def extract_all_images():
    """Extract DAG from all NSCLC images."""
    initialize_client()
    
    image_dir = Path(__file__).parent / "data" / "decision_trees" / "new" / "nsclc" / "images"
    
    if not image_dir.exists():
        print(f"Error: {image_dir} not found")
        return
    
    image_files = sorted(image_dir.glob("*.jpg"))
    
    print(f"\n{'='*60}")
    print(f"Batch DAG Extraction")
    print(f"{'='*60}")
    print(f"Model: {GEMINI_MODEL}")
    print(f"Images: {len(image_files)}")
    print()
    
    results = {
        "total": len(image_files),
        "success": 0,
        "failed": 0,
        "low_confidence": 0,
        "extractions": []
    }
    
    for idx, image_path in enumerate(image_files, 1):
        print(f"[{idx}/{len(image_files)}] {image_path.name}")
        
        try:
            dag = extract_dag_from_image(image_path)
            
            # Save output
            output_path = image_path.with_suffix(".dag.json")
            with open(output_path, "w") as f:
                json.dump(dag.model_dump(), f, indent=2)
            
            results["success"] += 1
            if dag.extraction_confidence < 0.80:
                results["low_confidence"] += 1
                print(f"  ⚠ Low confidence: {dag.extraction_confidence:.2%}")
            
            results["extractions"].append({
                "file": image_path.name,
                "nodes": len(dag.nodes),
                "confidence": dag.extraction_confidence,
                "status": "success"
            })
            
        except Exception as e:
            results["failed"] += 1
            results["extractions"].append({
                "file": image_path.name,
                "error": str(e),
                "status": "failed"
            })
            print(f"  ✗ Error: {e}")
    
    # Save results summary
    results_path = image_dir.parent / "extraction_results.json"
    with open(results_path, "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"\n{'='*60}")
    print(f"Results Summary")
    print(f"{'='*60}")
    print(f"Total: {results['total']}")
    print(f"Successful: {results['success']}")
    print(f"Failed: {results['failed']}")
    print(f"Low Confidence (<80%): {results['low_confidence']}")
    print(f"Results saved to: {results_path}")


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python gemini_dag_extractor.py [extract-single PATH | extract-all]")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "extract-single" and len(sys.argv) > 2:
        extract_single_image(sys.argv[2])
    elif command == "extract-all":
        extract_all_images()
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)
```

#### 3. Create Configuration File for Model Selection
**File**: `gemini_config.env` (new, for easy switching)

```bash
# Gemini Model Configuration
# For development: gemini-2.5-pro (cheaper)
# For production: gemini-3-pro-preview (better accuracy)
export GEMINI_MODEL=gemini-2.5-pro

# API key (should already be set, but can override here)
# export GEMINI_API_KEY=your_key_here
```

### Success Criteria

#### Automated Verification
- [ ] Python script runs without syntax errors: `python gemini_dag_extractor.py --help`
- [ ] Pydantic schema validates correctly: `python -c "from gemini_dag_extractor import DAGOutput; print('OK')"`
- [ ] Single image extraction completes: `python gemini_dag_extractor.py extract-single data/decision_trees/new/nsclc/images/nscl_page-0038.jpg`
- [ ] Output JSON is valid and matches schema
- [ ] Cache file created at `dag_extraction_cache.json` after first upload
- [ ] Second run with same image reuses cached URI (no new upload)

#### Manual Verification
- [ ] Extracted nodes match visual tree structure from image
- [ ] All node IDs are unique and sequential
- [ ] Parent-child relationships are accurate (test by tracing a path root→leaf)
- [ ] Cross-tree references (tree_ids) correctly identify NSCL-XX references in node content
- [ ] Confidence score is realistic (≥ 0.80 for clear images, < 0.80 for complex/blurry)
- [ ] Switching `GEMINI_MODEL` environment variable to `gemini-3-pro-preview` works without code changes

---

## Phase 2: Batch Processing & Cache Management

### Overview
Extend single-image extraction to process all 45 NSCLC images efficiently, with robust error handling and progress tracking. Implement idempotent operation: subsequent runs skip already-processed images.

### Changes Required

#### 1. Enhance Extraction Module with Batch Features
**File**: `gemini_dag_extractor.py` (modify from Phase 1)

Add to existing module:
- Skip already-processed images (idempotency)
- Batch size management for API rate limits
- Progress tracking and resumption from failures
- Consolidate extraction results into single index file

```python
# Add these functions to gemini_dag_extractor.py

def get_extraction_index() -> Dict[str, Any]:
    """Load or create index of extracted images."""
    index_file = Path(__file__).parent / "data" / "decision_trees" / "new" / "nsclc" / "extraction_index.json"
    
    if index_file.exists():
        with open(index_file, "r") as f:
            return json.load(f)
    
    return {
        "version": "1.0",
        "created": datetime.now().isoformat(),
        "images": {},
        "statistics": {"total": 0, "processed": 0, "failed": 0}
    }


def save_extraction_index(index: Dict[str, Any]):
    """Save extraction index."""
    index_file = Path(__file__).parent / "data" / "decision_trees" / "new" / "nsclc" / "extraction_index.json"
    with open(index_file, "w") as f:
        json.dump(index, f, indent=2)


def extract_all_images_idempotent(force_reprocess: bool = False):
    """
    Extract DAG from all NSCLC images with idempotent processing.
    
    - Skips images already processed (unless force_reprocess=True)
    - Resumes from failures
    - Maintains index of all extractions
    """
    initialize_client()
    
    image_dir = Path(__file__).parent / "data" / "decision_trees" / "new" / "nsclc" / "images"
    
    if not image_dir.exists():
        print(f"Error: {image_dir} not found")
        return
    
    image_files = sorted(image_dir.glob("*.jpg"))
    index = get_extraction_index()
    index["statistics"]["total"] = len(image_files)
    
    print(f"\n{'='*60}")
    print(f"Batch DAG Extraction (Idempotent Mode)")
    print(f"{'='*60}")
    print(f"Model: {GEMINI_MODEL}")
    print(f"Total images: {len(image_files)}")
    print(f"Already processed: {index['statistics']['processed']}")
    print(f"Previously failed: {index['statistics']['failed']}")
    print()
    
    processed_count = 0
    failed_count = 0
    skipped_count = 0
    
    for idx, image_path in enumerate(image_files, 1):
        output_path = image_path.with_suffix(".dag.json")
        
        # Check if already processed
        if image_path.name in index["images"] and not force_reprocess:
            entry = index["images"][image_path.name]
            if entry.get("status") == "success":
                skipped_count += 1
                print(f"[{idx}/{len(image_files)}] ⊘ SKIP {image_path.name} (already processed)")
                continue
        
        print(f"[{idx}/{len(image_files)}] ⇢ {image_path.name}")
        
        try:
            dag = extract_dag_from_image(image_path)
            
            # Save DAG JSON
            with open(output_path, "w") as f:
                json.dump(dag.model_dump(), f, indent=2)
            
            # Update index
            index["images"][image_path.name] = {
                "status": "success",
                "nodes": len(dag.nodes),
                "confidence": dag.extraction_confidence,
                "processed_at": datetime.now().isoformat(),
                "output_file": str(output_path)
            }
            
            processed_count += 1
            index["statistics"]["processed"] = processed_count
            
            if dag.extraction_confidence < 0.80:
                print(f"  ⚠ Low confidence: {dag.extraction_confidence:.2%} (consider manual review)")
            
        except Exception as e:
            failed_count += 1
            index["statistics"]["failed"] = failed_count
            
            index["images"][image_path.name] = {
                "status": "failed",
                "error": str(e),
                "failed_at": datetime.now().isoformat()
            }
            
            print(f"  ✗ Error: {e}")
    
    # Save updated index
    save_extraction_index(index)
    
    print(f"\n{'='*60}")
    print(f"Results Summary")
    print(f"{'='*60}")
    print(f"Newly processed: {processed_count}")
    print(f"Previously processed: {skipped_count}")
    print(f"Failed: {failed_count}")
    print(f"Total: {processed_count + skipped_count}")
    print(f"\nIndex saved to: {image_dir.parent}/extraction_index.json")
    print(f"\nTo retry failed images: python gemini_dag_extractor.py extract-all --retry-failed")
    print(f"To reprocess all: python gemini_dag_extractor.py extract-all --force")
```

#### 2. Create Batch Processing Script
**File**: `batch_extract.sh` (new)

```bash
#!/bin/bash
# Batch extraction with error handling and resume capability

set -e

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

cd "$DIR"

# Load environment
if [ -f gemini_config.env ]; then
  source gemini_config.env
fi

echo "Starting batch DAG extraction..."
echo "Model: ${GEMINI_MODEL:-gemini-2.5-pro}"
echo ""

python gemini_dag_extractor.py extract-all

echo ""
echo "Batch extraction complete."
echo "Check extraction_index.json for detailed results."
```

### Success Criteria

#### Automated Verification
- [ ] All 45 images produce .dag.json files: `ls data/decision_trees/new/nsclc/images/*.dag.json | wc -l` should be 45
- [ ] All JSON files are valid: `python -c "import json; [json.load(open(f)) for f in glob('*.dag.json')]"`
- [ ] Index file created: `extraction_index.json` exists with all 45 images listed
- [ ] Re-running script skips already-processed images (no new uploads)
- [ ] Cache file prevents redundant Files API uploads (check logs for "Using cached file URI")

#### Manual Verification
- [ ] Spot-check 3 random extracted images (e.g., nscl_page-0038, nscl_page-0027, nscl_page-0050)
  - Verify node count is reasonable (10-50 nodes typical for NSCLC trees)
  - Verify tree_ids correctly identify cross-references
  - Confidence scores are realistic
- [ ] No images failed extraction (extraction_index.json shows success for all)
- [ ] If any images have low confidence (<0.80), manually review those

---

## Phase 3: DAG → TREES Format Conversion

### Overview
Convert extracted DAG JSON files into the existing `TREES` data structure format, enabling seamless integration with the frontend app.js renderer.

### Changes Required

#### 1. Create DAG Post-Processor
**File**: `dag_to_trees_converter.py` (new)

```python
#!/usr/bin/env python3
"""
Convert extracted DAG JSON files to trialome TREES format.

Handles:
- Merging multiple DAG extractions
- Normalizing node IDs globally
- Detecting and resolving cross-tree references
- Extracting search terms for clinical trial queries
- Compatibility with existing data.js structure
"""

import json
from pathlib import Path
from typing import Dict, List, Any, Optional, Set
from dataclasses import dataclass, asdict
import re


@dataclass
class TreeNode:
    """Node in the TREES format for frontend rendering."""
    id: str
    label: str
    type: str  # "condition", "treatment", "next"
    search_term: Optional[str] = None
    children: List['TreeNode'] = None
    
    def __post_init__(self):
        if self.children is None:
            self.children = []
    
    def to_dict(self):
        """Convert to dictionary for JSON serialization."""
        return {
            "id": self.id,
            "label": self.label,
            "type": self.type,
            "search_term": self.search_term,
            "children": [child.to_dict() for child in self.children]
        }


def load_dag_json(file_path: Path) -> Dict[str, Any]:
    """Load extracted DAG JSON file."""
    with open(file_path, "r") as f:
        return json.load(f)


def extract_tree_id_from_image_name(image_name: str) -> str:
    """
    Extract guideline ID from image filename.
    
    Examples:
    - nscl_page-0038.jpg → NSCL-38
    - nscl_page-0027.jpg → NSCL-27
    """
    match = re.search(r'([a-z]+)_page-(\d+)', image_name)
    if match:
        disease_code = match.group(1).upper()
        page_num = match.group(2).lstrip('0') or '0'
        
        # Map disease codes to full references
        disease_map = {
            'NSCL': 'NSCL',
            'AML': 'AML',
            'NSCLC': 'NSCLC',
        }
        
        disease = disease_map.get(disease_code, disease_code)
        return f"{disease}-{page_num}"
    
    return "UNKNOWN"


def detect_cross_tree_references(dag_nodes: List[Dict]) -> Set[str]:
    """
    Detect cross-tree references in node content.
    
    Looks for patterns like:
    - (NSCL-16)
    - [NSCL-19]
    - Treatment of Thoracic Disease (NSCL-16)
    """
    references = set()
    
    # Pattern to match guideline references
    pattern = r'\b([A-Z]+)-(\d+)\b'
    
    for node in dag_nodes:
        content = node.get("content", "")
        matches = re.findall(pattern, content)
        for disease_code, number in matches:
            references.add(f"{disease_code}-{number}")
    
    return references


def dag_node_to_tree_node(dag_node: Dict, node_id_map: Dict[str, str], tree_id: str) -> TreeNode:
    """
    Convert a DAG node to a TREES format node.
    
    Determines node type based on content heuristics.
    """
    node_id = node_id_map.get(dag_node["id"], dag_node["id"])
    content = dag_node["content"]
    
    # Determine node type
    lower_content = content.lower()
    if "treatment" in lower_content or "therapy" in lower_content:
        node_type = "treatment"
    elif "maintenance" in lower_content or "surveillance" in lower_content or "follow" in lower_content:
        node_type = "next"
    else:
        node_type = "condition"
    
    # Extract search terms (clinical trial keywords)
    search_term = extract_search_terms(content)
    
    return TreeNode(
        id=node_id,
        label=content,
        type=node_type,
        search_term=search_term,
        children=[]
    )


def extract_search_terms(text: str) -> Optional[str]:
    """
    Extract core drug names or interventions from node text.
    Reuses logic from processor.py for consistency.
    """
    # Known drug names and interventions
    known_drugs = {
        'cytarabine', 'midostaurin', 'quizartinib', 'gemtuzumab', 'daunorubicin',
        'idarubicin', 'mitoxantrone', 'venetoclax', 'azacitidine', 'decitabine',
        'cpx-351', 'flag-ida', 'hct', 'chemotherapy', 'radiation', 'immunotherapy',
        'pembrolizumab', 'nivolumab', 'atezolizumab', 'durvalumab', 'trastuzumab',
        'osimertinib', 'alectinib', 'bevacizumab', 'ramucirumab',
    }
    
    # Remove unicode and clean
    cleaned = re.sub(r'[\u00b0-\u00bf\u2070-\u209f]+', '', text)
    cleaned = cleaned.strip()
    
    lower_text = cleaned.lower()
    
    # Identify condition nodes (usually no search term)
    condition_keywords = {'eligible', 'risk', 'mutation', 'abnormality', 'criteria', 'ineligible'}
    has_condition = any(kw in lower_text for kw in condition_keywords)
    has_drug = any(drug in lower_text for drug in known_drugs)
    
    if has_condition and not has_drug:
        return None
    
    # Extract drug names
    words = cleaned.split()
    search_terms = []
    
    for word in words:
        if word.lower() in known_drugs:
            search_terms.append(word)
        elif word and word[0].isupper() and word.lower() not in {'aml', 'cml', 'nsclc'}:
            search_terms.append(word)
    
    return ' '.join(search_terms) if search_terms else None


def build_tree_structure(dag_json: Dict, node_id_prefix: str) -> Dict[str, TreeNode]:
    """
    Build tree structure from DAG, mapping parent-child relationships.
    
    Returns dict of node_id -> TreeNode for later linking.
    """
    nodes_dict = {}
    dag_nodes = dag_json["nodes"]
    
    # Create all nodes
    for dag_node in dag_nodes:
        tree_node = dag_node_to_tree_node(
            dag_node,
            {node["id"]: f"{node_id_prefix}_{node['id']}" for node in dag_nodes},
            node_id_prefix
        )
        nodes_dict[dag_node["id"]] = tree_node
    
    # Link parent-child relationships
    for dag_node in dag_nodes:
        node_id = dag_node["id"]
        tree_node = nodes_dict[node_id]
        
        for child_id in dag_node.get("children_ids", []):
            if child_id in nodes_dict:
                tree_node.children.append(nodes_dict[child_id])
    
    return nodes_dict


def merge_all_extractions() -> Dict[str, Dict]:
    """
    Load all DAG JSON files and merge into TREES format.
    """
    image_dir = Path(__file__).parent / "data" / "decision_trees" / "new" / "nsclc" / "images"
    dag_files = sorted(image_dir.glob("*.dag.json"))
    
    trees = {}
    
    for dag_file in dag_files:
        try:
            dag_json = load_dag_json(dag_file)
            tree_id = extract_tree_id_from_image_name(dag_file.stem)
            
            # Build tree structure
            nodes = build_tree_structure(dag_json, tree_id)
            
            # Find root node (node with no parents)
            root_node = None
            for node in nodes.values():
                dag_node = [n for n in dag_json["nodes"] if n["id"] == list(nodes.keys())[0]][0]
                if not dag_node.get("parent_ids"):
                    root_node = node
                    break
            
            if root_node:
                trees[tree_id] = {"root": root_node}
            else:
                print(f"Warning: No root node found for {tree_id}")
        
        except Exception as e:
            print(f"Error processing {dag_file}: {e}")
    
    return trees


def generate_trees_js(trees: Dict[str, Dict]) -> str:
    """Generate JavaScript module with TREES object."""
    # Convert TreeNode objects to dicts for JSON serialization
    trees_dict = {}
    for tree_id, tree_data in trees.items():
        trees_dict[tree_id] = {
            "root": tree_data["root"].to_dict() if hasattr(tree_data["root"], 'to_dict') else tree_data["root"]
        }
    
    js_content = "// Auto-generated data.js from DAG extraction\n"
    js_content += "// Converted from Gemini-extracted DAG JSON files\n\n"
    js_content += "const TREES = "
    js_content += json.dumps(trees_dict, indent=2, ensure_ascii=False)
    js_content += ";\n\n"
    js_content += "// Export for use in HTML\n"
    js_content += "if (typeof module !== 'undefined' && module.exports) {\n"
    js_content += "  module.exports = { TREES };\n"
    js_content += "}\n"
    
    return js_content


def main():
    """Main entry point: convert all DAG extractions to data.js."""
    print("Converting DAG extractions to TREES format...\n")
    
    trees = merge_all_extractions()
    
    print(f"Converted {len(trees)} trees")
    
    # Generate data.js
    js_content = generate_trees_js(trees)
    
    output_file = Path(__file__).parent / "data.js"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"\n✓ Generated {output_file}")
    print(f"✓ Total trees: {len(trees)}")
    print(f"\nYour existing app.js can now render these trees!")


if __name__ == "__main__":
    main()
```

#### 2. Enhance processor.py to Support DAG Input
**File**: `processor.py` (modify existing)

Add compatibility to accept DAG JSON files in addition to raw JSON:

```python
# Add to processor.py

def load_and_process_dags() -> Dict[str, Dict[str, Any]]:
    """
    Load all extracted DAG JSON files and convert to TREES format.
    This is the new primary input path when using Gemini extraction.
    """
    trees = {}
    dag_dir = Path(__file__).parent / "data" / "decision_trees" / "new" / "nsclc"
    
    dag_files = sorted(dag_dir.glob("*.dag.json"))
    
    for dag_file in dag_files:
        try:
            with open(dag_file, 'r', encoding='utf-8') as f:
                dag_json = json.load(f)
            
            # Extract tree ID from filename
            tree_id = dag_file.stem.replace('.dag', '')
            tree_id = f"NSCLC_{tree_id.split('-')[1]}"
            
            # Process nodes from DAG format
            # (implementation similar to dag_to_trees_converter.py)
            
            print(f"✓ Processed {dag_file.name} -> {tree_id}")
        
        except Exception as e:
            print(f"✗ Error processing {dag_file.name}: {e}")
    
    return trees


# Update main() to check for DAG files first
def main():
    """Main entry point with DAG support."""
    print("Starting NCCN Decision Tree Processing...\n")
    
    dag_dir = Path(__file__).parent / "data" / "decision_trees" / "new" / "nsclc"
    dag_files = list(dag_dir.glob("*.dag.json"))
    
    if dag_files:
        print(f"Found {len(dag_files)} DAG files. Using Gemini-extracted data.\n")
        trees = load_and_process_dags()
    else:
        print("No DAG files found. Using raw JSON files.\n")
        trees = load_and_process_trees()
    
    # ... rest of main() unchanged
```

### Success Criteria

#### Automated Verification
- [ ] Converter script runs without errors: `python dag_to_trees_converter.py`
- [ ] Generated data.js is valid JavaScript: `node -c data.js`
- [ ] Generated data.js can be parsed: `python -c "import json; exec(open('data.js').read())"`
- [ ] All 45 trees appear in final output: tree count ≥ 45

#### Manual Verification
- [ ] Generated TREES structure matches expected format (id, label, type, search_term, children)
- [ ] Root nodes are correctly identified (those with no parents)
- [ ] Child relationships form valid trees (no cycles, proper hierarchy)
- [ ] Search terms are populated for treatment nodes
- [ ] Cross-tree references preserved in node content

---

## Phase 4: Integration Testing & Frontend Validation

### Overview
Verify the extracted data works seamlessly with the existing frontend app.js, test rendering and trial queries, and validate end-to-end workflow.

### Changes Required

#### 1. Create Test HTML Page
**File**: `test_dag_extraction.html` (new)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DAG Extraction Test - Trialome</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="data.js"></script>
</head>
<body class="bg-gray-50">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">DAG Extraction Test</h1>
        
        <div class="grid grid-cols-2 gap-4 mb-8">
            <div>
                <h2 class="text-xl font-bold mb-2">Trees Loaded</h2>
                <div id="trees-list" class="bg-white p-4 rounded border"></div>
            </div>
            <div>
                <h2 class="text-xl font-bold mb-2">Statistics</h2>
                <div id="stats" class="bg-white p-4 rounded border"></div>
            </div>
        </div>
        
        <div>
            <h2 class="text-xl font-bold mb-2">Select Tree to Render</h2>
            <select id="tree-selector" class="border p-2 rounded mb-4">
                <option value="">-- Select a tree --</option>
            </select>
        </div>
        
        <div id="tree-container" class="bg-white p-4 rounded border"></div>
    </div>
    
    <script>
        // Verify TREES object exists
        if (typeof TREES === 'undefined') {
            alert('ERROR: TREES object not found in data.js');
        } else {
            // Display trees list
            const treeList = document.getElementById('trees-list');
            const selector = document.getElementById('tree-selector');
            const stats = document.getElementById('stats');
            
            const treeNames = Object.keys(TREES);
            let totalNodes = 0;
            
            treeList.innerHTML = treeNames.map(name => 
                `<div class="mb-2"><strong>${name}</strong>: ${TREES[name].root ? 'Ready' : 'Invalid'}</div>`
            ).join('');
            
            selector.innerHTML += treeNames.map(name => 
                `<option value="${name}">${name}</option>`
            ).join('');
            
            // Calculate statistics
            function countNodes(node) {
                let count = 1;
                if (node.children) {
                    count += node.children.reduce((sum, child) => sum + countNodes(child), 0);
                }
                return count;
            }
            
            totalNodes = treeNames.reduce((sum, name) => {
                if (TREES[name].root) {
                    return sum + countNodes(TREES[name].root);
                }
                return sum;
            }, 0);
            
            stats.innerHTML = `
                <p>Total Trees: <strong>${treeNames.length}</strong></p>
                <p>Total Nodes: <strong>${totalNodes}</strong></p>
                <p>Status: <span class="text-green-600 font-bold">✓ All data loaded</span></p>
            `;
            
            // Handle tree selection
            selector.addEventListener('change', function() {
                const treeName = this.value;
                if (!treeName) return;
                
                const tree = TREES[treeName];
                const container = document.getElementById('tree-container');
                
                function renderNode(node, level = 0) {
                    const indent = level * 20;
                    return `
                        <div style="margin-left: ${indent}px;" class="mb-2 p-2 border rounded bg-gray-50">
                            <div class="font-bold">${node.label}</div>
                            <div class="text-sm text-gray-600">
                                ID: ${node.id} | Type: ${node.type}${node.search_term ? ` | Search: ${node.search_term}` : ''}
                            </div>
                            ${node.children && node.children.length > 0 ? 
                                `<div class="mt-2">${node.children.map(child => renderNode(child, level + 1)).join('')}</div>` 
                                : ''
                            }
                        </div>
                    `;
                }
                
                container.innerHTML = renderNode(tree.root);
            });
        }
    </script>
</body>
</html>
```

#### 2. Validate Using Existing app.js
**File**: No changes to app.js (should work as-is)

Instead, verify that app.js properly loads and renders TREES from generated data.js.

### Success Criteria

#### Automated Verification
- [ ] Test HTML loads without console errors: Open `test_dag_extraction.html` in browser
- [ ] TREES object is defined and contains ≥ 45 entries
- [ ] No circular references in tree structure
- [ ] All nodes have required fields (id, label, type, children array)
- [ ] `app.js` loads without errors when using generated data.js

#### Manual Verification
- [ ] Open app.html in browser, select NSCLC from disease dropdown
- [ ] Tree renders visually (nodes and connections visible)
- [ ] Clicking a node with search_term triggers trial query
- [ ] Trial results display correctly (or error message if no results)
- [ ] Tree navigation is smooth and responsive
- [ ] Cross-tree references are preserved in node labels (if present)

---

## Phase 5: Production Model Upgrade & Documentation

### Overview
Switch to Gemini 3 Pro for production accuracy, benchmark improvements, and document the complete workflow.

### Changes Required

#### 1. Update Configuration for Production
**File**: `gemini_config.env` (modify from Phase 1)

```bash
# Production Configuration: Use Gemini 3 Pro
export GEMINI_MODEL=gemini-3-pro-preview

# For development, comment out the above and use:
# export GEMINI_MODEL=gemini-2.5-pro
```

#### 2. Create Comprehensive Documentation
**File**: `DAG_EXTRACTION_GUIDE.md` (new)

```markdown
# DAG Extraction Guide: From Clinical Images to JSON

This guide explains the complete workflow for converting NSCLC clinical decision tree images to structured JSON using Gemini API.

## Quick Start

### Prerequisites
- Python 3.9+
- Gemini API key (set as `GEMINI_API_KEY` environment variable)
- ~1,000 tokens per image (budget accordingly)

### One-Command Extraction

```bash
# Development (cheaper, Gemini 2.5 Pro)
export GEMINI_MODEL=gemini-2.5-pro
python gemini_dag_extractor.py extract-all

# Production (better accuracy, Gemini 3 Pro)
export GEMINI_MODEL=gemini-3-pro-preview
python gemini_dag_extractor.py extract-all
```

### Convert to Frontend Format

```bash
python dag_to_trees_converter.py
# Generates: data.js (ready for app.html)
```

## Workflow

### Step 1: Extract DAGs from Images
Gemini analyzes each image and produces JSON with:
- Nodes (id, content, parent/child IDs, cross-tree references)
- Confidence scores
- Tree metadata

**Output**: `image_name.dag.json` files

**Idempotent**: Reuses cached file URIs, skips already-processed images.

### Step 2: Merge & Convert
Python post-processor:
- Merges all DAG JSONs
- Normalizes node IDs
- Builds parent-child relationships
- Extracts search terms for clinical trials

**Output**: `data.js` (standard TREES format)

### Step 3: Test Frontend
Open `test_dag_extraction.html` to verify structure, then use app.html for full functionality.

## Model Selection

### Gemini 2.5 Pro (Development)
- Cost: $0.075/M input, $0.30/M output tokens
- Speed: ~5-10s per image
- Accuracy: ~90-95% for clinical trees
- Best for: Quick iteration, testing, cost optimization

### Gemini 3 Pro (Production)
- Cost: Higher than 2.5 Pro
- Speed: ~10-30s per image
- Accuracy: ~98%+ for clinical trees
- Best for: Final production extraction, maximum accuracy

**Switch models by setting `GEMINI_MODEL` environment variable before running.**

## Troubleshooting

### Low Confidence Scores (<0.80)
Image may be:
- Low resolution or blurry
- Complex tree with many cross-references
- Unusual formatting

**Solution**: Manually review output, or re-extract with Gemini 3 Pro.

### Failed Extractions
Check logs for:
- API rate limits (wait a few minutes, re-run)
- Invalid image file (check JPEG is readable)
- Timeout (try extract-single with specific image)

**Resume**: `python gemini_dag_extractor.py extract-all` automatically skips successful ones.

### Cache Issues
Clear cache to force re-uploads:

```bash
rm dag_extraction_cache.json
python gemini_dag_extractor.py extract-all
```

## Cost Analysis

For 45 NSCLC images (~500x800px each):

| Model | Per Image | Total 45 Images |
|---|---|---|
| Gemini 2.5 Pro | ~$0.003-0.005 | ~$0.15-0.20 |
| Gemini 3 Pro | ~$0.005-0.010 | ~$0.25-0.45 |

*Estimates based on 1,120 tokens (HIGH resolution) + 2,000 output tokens*

---
```

### Success Criteria

#### Automated Verification
- [ ] Switching `GEMINI_MODEL` environment variable works: `export GEMINI_MODEL=gemini-3-pro-preview`
- [ ] Script runs without code changes using new model
- [ ] Output quality improves (spot-check confidence scores ≥ 0.95)
- [ ] Extraction time increases slightly (~2-3x slower) but accuracy improves

#### Manual Verification
- [ ] Compare outputs: 2.5 Pro vs 3 Pro for same image
  - 3 Pro produces more detailed node breakdown
  - 3 Pro confidence scores are higher
- [ ] Re-test frontend rendering with 3 Pro output
- [ ] Performance is acceptable (extraction completes within budget)
- [ ] Documentation is clear for future users/developers

---

## Testing Strategy

### Unit Tests
- [ ] Pydantic schema validation with sample DAG data
- [ ] File caching logic (cache hit/miss scenarios)
- [ ] Node ID normalization
- [ ] Cross-reference pattern matching

### Integration Tests
- [ ] Single image extraction → JSON validation
- [ ] Batch extraction with cache persistence
- [ ] DAG → TREES conversion with tree structure integrity
- [ ] Generated data.js compatibility with app.js

### Manual Testing Steps
1. Extract single test image (nscl_page-0038.jpg)
2. Verify output against manual analysis of image
3. Run full batch extraction on all 45 images
4. Generate data.js and test in browser
5. Verify tree rendering and trial queries work

## Performance Considerations

- **API Rate Limits**: 15 requests/min free tier; use batch processing for large datasets
- **File Upload Overhead**: First run uploads all images; subsequent runs use cache (~90% faster)
- **Token Efficiency**: Use HIGH media resolution for text clarity; trade-off is ~1,120 tokens/image
- **Thinking Budget**: Allocate 5,000-10,000 tokens for complex trees (automatically adjusted)

## Migration Notes

### From Raw JSON to DAG Extraction
- Old: Raw NCCN JSON files → processor.py → data.js
- New: Clinical images → Gemini DAG extraction → dag_to_trees_converter.py → data.js
- Backward compatible: If DAG files missing, processor.py falls back to raw JSON

### Data Structure Changes
- New: DAG nodes have `parent_ids`, `children_ids`, `tree_ids` (explicit graph structure)
- Old: TREES format had only `children` (implicit hierarchy)
- Conversion handles the mapping automatically

---

## References

- Gemini API Docs: https://ai.google.dev/gemini-api
- Thinking Model: https://ai.google.dev/gemini-api/docs/thinking
- Structured Outputs: https://ai.google.dev/gemini-api/docs/structured-output
- Files API: https://ai.google.dev/gemini-api/docs/files

---
```

### Success Criteria

#### Automated Verification
- [ ] Documentation is clear and complete (covers quick start, workflow, troubleshooting)
- [ ] All code examples are tested and functional
- [ ] Model selection instructions are straightforward

#### Manual Verification
- [ ] A new team member can follow the guide and extract images successfully
- [ ] Cost estimates are accurate (compare with actual API usage)
- [ ] Troubleshooting section resolves common issues

---

## Post-Implementation Checklist

- [ ] All 45 NSCLC images successfully extracted to DAG JSON
- [ ] extraction_index.json shows 45/45 successful
- [ ] data.js generated with ≥ 45 trees
- [ ] app.html renders tree correctly
- [ ] Trial queries work when clicking treatment nodes
- [ ] Cache prevents redundant uploads on re-runs
- [ ] Model can be switched with environment variable
- [ ] Documentation is complete and testable

---

## Timeline Estimate

| Phase | Duration | Notes |
|---|---|---|
| Phase 1 | 2-3 hours | Core module, single image test |
| Phase 2 | 1-2 hours | Batch processing, idempotency |
| Phase 3 | 2-3 hours | DAG → TREES converter |
| Phase 4 | 1 hour | Frontend integration testing |
| Phase 5 | 1 hour | Upgrade to 3 Pro, documentation |
| **Total** | **~7-10 hours** | Includes iteration and debugging |

---
