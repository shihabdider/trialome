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

# Set to "gemini-2-pro" for production, "gemini-2.5-pro" for development
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-pro")

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
    footnote_labels: List[str] = Field(description="Footnote labels associated with this node (e.g., ['a', 'b', '1'])")


class Footnote(BaseModel):
    """Represents a footnote in the image."""
    label: str = Field(description="Footnote label (e.g., 'a', 'b', '1', 'I')")
    content: str = Field(description="Full text content of the footnote, verbatim from image")


class TreeReference(BaseModel):
    """Represents a cross-tree reference."""
    from_tree: str = Field(description="Source tree identifier")
    to_tree: str = Field(description="Destination tree identifier")
    description: str = Field(description="Description of what the reference represents")


class DAGOutput(BaseModel):
    """Complete DAG extraction output for a single clinical guideline image."""
    nodes: List[NodeData] = Field(description="All nodes extracted from the image")
    tree_references: List[TreeReference] = Field(description="Cross-tree references found")
    footnotes: List[Footnote] = Field(description="All footnotes found in the image")
    extraction_confidence: float = Field(
        description="Confidence score 0.0-1.0 for extraction accuracy"
    )
    image_title: Optional[str] = Field(
        description="Title/header of the guideline (e.g., 'NCCN Guidelines Version 3.2025')"
    )
    tree_id: Optional[str] = Field(
        description="Tree identifier that appears in lower right of image (e.g., 'DIAG-1', 'NSCLC-10')"
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


def upload_image_to_files_api(image_path: Path) -> str:
    """
    Upload image to Gemini Files API with caching.
    
    Returns the file URI for use in generation requests.
    """
    # Check cache first
    cached_uri = get_cached_file_uri(image_path)
    if cached_uri:
        print(f"  [CACHE HIT] Using cached URI for {image_path.name}")
        return cached_uri
    
    print(f"  [UPLOADING] {image_path.name} to Gemini Files API...")
    
    # Determine MIME type
    suffix = image_path.suffix.lower()
    mime_types = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
    }
    mime_type = mime_types.get(suffix, "image/jpeg")
    
    # Upload file
    response = genai.upload_file(
        path=str(image_path),
        mime_type=mime_type,
    )
    
    file_uri = response.uri
    print(f"  [UPLOADED] File URI: {file_uri}")
    
    # Cache the URI
    cache_file_uri(image_path, file_uri)
    
    return file_uri


def extract_dag_from_image(image_path: Path) -> DAGOutput:
    """
    Extract structured DAG from clinical decision tree image.
    
    Uses Gemini with structured output.
    """
    print(f"\nExtracting DAG from: {image_path.name}")
    
    # Prepare the extraction prompt
    extraction_prompt = """You are an expert at analyzing clinical decision tree images from NCCN guidelines.

Your task is to extract the complete decision tree from this image as a structured DAG (Directed Acyclic Graph).

EXTRACTION GUIDELINES:
1. **Nodes**: Each decision point, condition, treatment, or action is a node
2. **Parent-Child Relationships**: Trace edges (arrows, lines) to determine hierarchy
3. **Node IDs**: Assign sequential IDs (node_001, node_002, etc.) in top-to-bottom, left-to-right order
4. **Cross-Tree References**: Look for mentions of other guidelines (e.g., "See NSCL-16", "Refer to AML-7")
5. **Footnotes**: Extract all footnotes from the image (bottom of page, superscript references, etc.)
   - Identify footnote labels (letters like 'a', 'b', 'c' or numbers like '1', '2', 'I', 'II', etc.)
   - Map each footnote label to its full content
   - For each node, list any footnote labels that appear as superscripts or references within that node
6. **Tree ID**: Look for the tree identifier in the lower right corner of the image (e.g., "DIAG-1", "NSCLC-10")
7. **Confidence**: Rate your extraction confidence 0.0-1.0 based on image clarity and complexity

Return ONLY valid JSON matching this exact schema:
{
  "nodes": [
    {
      "id": "node_001",
      "content": "Exact text from image",
      "parent_ids": [],
      "children_ids": ["node_002"],
      "tree_ids": ["NSCL-16"] if cross-references exist,
      "footnote_labels": ["a", "b"] if footnotes are referenced
    }
  ],
  "tree_references": [
    {
      "from_tree": "Current guideline ID if visible",
      "to_tree": "Referenced guideline ID",
      "description": "What the reference means"
    }
  ],
  "footnotes": [
    {
      "label": "a",
      "content": "Full text of footnote from image"
    }
  ],
  "extraction_confidence": 0.95,
  "image_title": "Title if visible at top of image",
  "tree_id": "NSCLC-10"
}"""
    
    # Create request with structured JSON output
    model = genai.GenerativeModel(
        model_name=GEMINI_MODEL,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
        ),
        safety_settings={
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
        },
    )
    
    # Read image and send request
    with open(str(image_path), "rb") as f:
        image_data = f.read()
    
    response = model.generate_content([
        extraction_prompt,
        {
            "mime_type": "image/jpeg",
            "data": image_data,
        }
    ])
    
    # Parse response (should be pure JSON with response_mime_type="application/json")
    try:
        output_dict = json.loads(response.text)
        
        # Ensure required fields have defaults
        if "tree_references" not in output_dict:
            output_dict["tree_references"] = []
        if "footnotes" not in output_dict:
            output_dict["footnotes"] = []
        if "image_title" not in output_dict:
            output_dict["image_title"] = None
        if "tree_id" not in output_dict:
            output_dict["tree_id"] = None
        
        # Ensure each node has required fields
        for node in output_dict.get("nodes", []):
            if "parent_ids" not in node:
                node["parent_ids"] = []
            if "children_ids" not in node:
                node["children_ids"] = []
            if "tree_ids" not in node:
                node["tree_ids"] = []
            if "footnote_labels" not in node:
                node["footnote_labels"] = []
        
        dag_output = DAGOutput(**output_dict)
        print(f"  [SUCCESS] Extracted {len(dag_output.nodes)} nodes with confidence {dag_output.extraction_confidence}")
        return dag_output
    except json.JSONDecodeError as e:
        print(f"  [ERROR] Failed to parse JSON response: {e}")
        print(f"  Response text: {response.text[:200]}")
        raise
    except Exception as e:
        print(f"  [ERROR] Failed to parse DAG output: {e}")
        raise


def save_dag_output(image_path: Path, dag_output: DAGOutput, output_dir: Optional[Path] = None):
    """Save DAG output to JSON file."""
    if output_dir is None:
        output_dir = image_path.parent
    
    output_file = output_dir / f"{image_path.stem}.dag.json"
    
    with open(output_file, "w") as f:
        json.dump(dag_output.model_dump(), f, indent=2)
    
    print(f"  [SAVED] {output_file.name}")
    return output_file


# ============================================================================
# CLI Commands
# ============================================================================

def extract_single_image(image_path: Path):
    """Extract DAG from a single image."""
    initialize_client()
    
    if not image_path.exists():
        raise FileNotFoundError(f"Image not found: {image_path}")
    
    dag_output = extract_dag_from_image(image_path)
    save_dag_output(image_path, dag_output)
    
    return dag_output


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


def extract_all_images(force_reprocess: bool = False, output_dir: Optional[Path] = None):
    """
    Extract DAG from all images in the NSCLC directory with idempotent processing.
    
    - Skips images already processed (unless force_reprocess=True)
    - Resumes from failures
    - Maintains index of all extractions
    """
    initialize_client()
    
    image_dir = Path(__file__).parent / "data" / "decision_trees" / "new" / "nsclc" / "images"
    
    if output_dir is None:
        output_dir = Path(__file__).parent / "data" / "decision_trees" / "new" / "nsclc" / "json"
    
    # Create output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)
    
    if not image_dir.exists():
        raise FileNotFoundError(f"Image directory not found: {image_dir}")
    
    image_files = sorted(image_dir.glob("*.jpg"))
    index = get_extraction_index()
    index["statistics"]["total"] = len(image_files)
    
    print(f"\n{'='*70}", flush=True)
    print(f"Batch DAG Extraction (Idempotent Mode)", flush=True)
    print(f"{'='*70}", flush=True)
    print(f"Model: {GEMINI_MODEL}", flush=True)
    print(f"Total images: {len(image_files)}", flush=True)
    print(f"Already processed: {index['statistics'].get('processed', 0)}", flush=True)
    print(f"Previously failed: {index['statistics'].get('failed', 0)}", flush=True)
    print(f"Output directory: {output_dir}", flush=True)
    print(flush=True)
    
    processed_count = 0
    failed_count = 0
    skipped_count = 0
    
    for idx, image_file in enumerate(image_files, 1):
        output_path = image_file.with_suffix(".dag.json")
        
        # Check if already processed
        if image_file.name in index["images"] and not force_reprocess:
            entry = index["images"][image_file.name]
            if entry.get("status") == "success":
                skipped_count += 1
                print(f"[{idx}/{len(image_files)}] ⊘ SKIP {image_file.name} (already processed)", flush=True)
                continue
        
        print(f"[{idx}/{len(image_files)}] ⇢ {image_file.name}", flush=True)
        
        try:
            dag_output = extract_dag_from_image(image_file)
            save_dag_output(image_file, dag_output, output_dir)
            
            # Update index
            index["images"][image_file.name] = {
                "status": "success",
                "nodes": len(dag_output.nodes),
                "confidence": dag_output.extraction_confidence,
                "processed_at": datetime.now().isoformat(),
                "output_file": str(output_path)
            }
            
            processed_count += 1
            index["statistics"]["processed"] = processed_count + skipped_count
            
            if dag_output.extraction_confidence < 0.80:
                print(f"  ⚠ Low confidence: {dag_output.extraction_confidence:.2%} (consider manual review)")
            
        except Exception as e:
            failed_count += 1
            index["statistics"]["failed"] = failed_count
            
            index["images"][image_file.name] = {
                "status": "failed",
                "error": str(e),
                "failed_at": datetime.now().isoformat()
            }
            
            print(f"  ✗ Error: {e}")
    
    # Save updated index
    save_extraction_index(index)
    
    print(f"\n{'='*70}")
    print(f"Results Summary")
    print(f"{'='*70}")
    print(f"Newly processed: {processed_count}")
    print(f"Previously processed (skipped): {skipped_count}")
    print(f"Failed: {failed_count}")
    print(f"Total: {processed_count + skipped_count}")
    print(f"\nIndex saved to: {image_dir.parent}/extraction_index.json")
    if failed_count > 0:
        print(f"\nTo retry failed images: python gemini_dag_extractor.py extract-all --retry-failed")
    print(f"To reprocess all: python gemini_dag_extractor.py extract-all --force")
    
    return index


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python gemini_dag_extractor.py <command> [options]")
        print("\nCommands:")
        print("  extract-single <image_path>  Extract DAG from a single image")
        print("  extract-all [options]        Extract DAG from all NSCLC images")
        print("\nOptions for extract-all:")
        print("  --force                      Reprocess all images (ignore cache)")
        print("  --retry-failed               Retry only previously failed images")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "extract-single":
        if len(sys.argv) < 3:
            print("Usage: python gemini_dag_extractor.py extract-single <image_path>")
            sys.exit(1)
        image_path = Path(sys.argv[2])
        extract_single_image(image_path)
    
    elif command == "extract-all":
        force_reprocess = "--force" in sys.argv
        retry_failed = "--retry-failed" in sys.argv
        
        if force_reprocess and retry_failed:
            print("Error: Cannot use --force and --retry-failed together")
            sys.exit(1)
        
        if retry_failed:
            # Retry only failed images by temporarily enabling reprocess for failed ones
            index = get_extraction_index()
            failed_images = [name for name, entry in index["images"].items() if entry.get("status") == "failed"]
            if not failed_images:
                print("No previously failed images to retry")
            else:
                print(f"Retrying {len(failed_images)} failed images...")
        
        extract_all_images(force_reprocess=force_reprocess)
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)
