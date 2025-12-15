#!/usr/bin/env python3
"""
Comprehensive Test Suite for Gemini DAG Extraction

Tests all phases:
- Phase 1: Single image extraction, Pydantic schemas, file caching
- Phase 2: Batch processing, index persistence, idempotent extraction
"""

import json
import sys
import os
from pathlib import Path
import subprocess

# Import the extractor module
try:
    from gemini_dag_extractor import (
        DAGOutput,
        NodeData,
        TreeReference,
        extract_single_image,
        load_cache,
        get_cached_file_uri,
        get_extraction_index,
        save_extraction_index,
    )
    print("✓ All imports successful")
except ImportError as e:
    print(f"✗ Import failed: {e}")
    sys.exit(1)


# ============================================================================
# PHASE 1: Single Image Extraction & Schemas
# ============================================================================

def test_pydantic_schemas():
    """Test that Pydantic schemas compile without errors."""
    print("\n[PHASE 1] Pydantic schemas...")
    try:
        # Create sample node
        node = NodeData(
            id="node_001",
            content="Test node content",
            parent_ids=[],
            children_ids=["node_002"],
            tree_ids=["NSCL-16"],
        )
        
        # Create sample tree reference
        ref = TreeReference(
            from_tree="NSCL-15",
            to_tree="NSCL-16",
            description="Treatment escalation pathway",
        )
        
        # Create sample DAG output
        dag = DAGOutput(
            nodes=[node],
            tree_references=[ref],
            extraction_confidence=0.95,
            image_title="NCCN Guidelines",
        )
        
        print(f"✓ Pydantic schemas compile successfully")
        print(f"  - NodeData: OK")
        print(f"  - TreeReference: OK")
        print(f"  - DAGOutput: OK")
        
        return True
    except Exception as e:
        print(f"✗ Pydantic schema error: {e}")
        return False


def test_schema_validation():
    """Test that schema validation enforces required fields."""
    print("\n[PHASE 1] Schema validation...")
    try:
        # This should fail - missing required fields
        try:
            bad_node = NodeData(
                id="node_001",
                content="",
                parent_ids=[],
                # Missing children_ids
                tree_ids=[],
            )
            print(f"✗ Schema validation failed - should have caught missing field")
            return False
        except Exception:
            print(f"✓ Schema correctly validates required fields")
        
        # This should succeed - valid data
        good_node = NodeData(
            id="node_001",
            content="Valid content",
            parent_ids=[],
            children_ids=[],
            tree_ids=[],
        )
        print(f"✓ Valid data passes validation")
        
        return True
    except Exception as e:
        print(f"✗ Schema validation error: {e}")
        return False


def find_test_image():
    """Find a test image to extract."""
    image_dir = Path(__file__).parent / "data" / "decision_trees" / "new" / "nsclc" / "images"
    
    if not image_dir.exists():
        print(f"✗ Image directory not found: {image_dir}")
        return None
    
    images = sorted(image_dir.glob("*.jpg"))
    if not images:
        print(f"✗ No JPEG images found in {image_dir}")
        return None
    
    # Use first image as test
    test_image = images[0]
    print(f"✓ Found test image: {test_image.name}")
    return test_image


def test_single_image_extraction(image_path: Path):
    """Test extraction on a single image."""
    print(f"\n[PHASE 1] Single image extraction...")
    
    try:
        print(f"  Testing with: {image_path.name}")
        
        # Extract
        dag_output = extract_single_image(image_path)
        
        # Verify output structure
        print(f"\n[PHASE 1] Output schema validation...")
        
        if not dag_output.nodes:
            print(f"✗ No nodes extracted")
            return False
        
        print(f"✓ Extracted {len(dag_output.nodes)} nodes")
        
        # Check confidence
        if not (0.0 <= dag_output.extraction_confidence <= 1.0):
            print(f"✗ Invalid confidence score: {dag_output.extraction_confidence}")
            return False
        
        print(f"✓ Confidence score valid: {dag_output.extraction_confidence}")
        
        # Check node structure
        for i, node in enumerate(dag_output.nodes[:3]):  # Check first 3 nodes
            if not node.id:
                print(f"✗ Node {i} missing ID")
                return False
            if not node.content:
                print(f"✗ Node {i} missing content")
                return False
            print(f"✓ Node {i} ({node.id}): {node.content[:50]}...")
        
        # Check if DAG JSON file was created
        dag_file = image_path.parent / f"{image_path.stem}.dag.json"
        if not dag_file.exists():
            print(f"✗ DAG JSON file not created: {dag_file.name}")
            return False
        
        print(f"✓ DAG JSON file created: {dag_file.name}")
        
        # Verify JSON is valid
        with open(dag_file, "r") as f:
            saved_data = json.load(f)
        
        print(f"✓ Saved JSON is valid and loadable")
        
        return True
    
    except Exception as e:
        print(f"✗ Extraction failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_caching(image_path: Path):
    """Test that file caching works across runs."""
    print(f"\n[PHASE 1] File caching...")
    
    try:
        # First extraction should upload
        print(f"  Run 1: First extraction (should upload)...")
        cache_before = load_cache()
        dag_output_1 = extract_single_image(image_path)
        cache_after = load_cache()
        
        # Check if file was cached
        cached_uri_1 = get_cached_file_uri(image_path)
        if not cached_uri_1:
            print(f"✗ File URI not cached after first extraction")
            return False
        
        print(f"✓ File URI cached: {cached_uri_1[:50]}...")
        
        # Second extraction should use cache
        print(f"  Run 2: Second extraction (should use cache)...")
        dag_output_2 = extract_single_image(image_path)
        cached_uri_2 = get_cached_file_uri(image_path)
        
        if cached_uri_1 != cached_uri_2:
            print(f"✗ Cached URI changed between runs")
            return False
        
        print(f"✓ Cache reused successfully (same URI)")
        
        # Both extractions should produce similar node structure
        if len(dag_output_1.nodes) != len(dag_output_2.nodes):
            print(f"✗ Node count differs: {len(dag_output_1.nodes)} vs {len(dag_output_2.nodes)}")
            return False
        
        print(f"✓ Extraction results consistent (node count: {len(dag_output_1.nodes)})")
        print(f"  Confidence: {dag_output_1.extraction_confidence} → {dag_output_2.extraction_confidence}")
        
        return True
    
    except Exception as e:
        print(f"✗ Caching test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


# ============================================================================
# PHASE 2: Batch Processing & Index Management
# ============================================================================

def test_extraction_index():
    """Test extraction index creation and persistence."""
    print("\n[PHASE 2] Extraction index...")
    try:
        # Create fresh index
        index = get_extraction_index()
        
        if "version" not in index or "images" not in index or "statistics" not in index:
            print("✗ Index missing required fields")
            return False
        
        if index["version"] != "1.0":
            print(f"✗ Unexpected version: {index['version']}")
            return False
        
        print("✓ Index structure valid")
        
        # Add a sample entry
        index["images"]["test_image.jpg"] = {
            "status": "success",
            "nodes": 15,
            "confidence": 0.95,
        }
        save_extraction_index(index)
        
        # Reload and verify
        reloaded = get_extraction_index()
        if "test_image.jpg" not in reloaded["images"]:
            print("✗ Index persistence failed")
            return False
        
        print("✓ Index persistence works")
        
        # Clean up
        reloaded["images"].pop("test_image.jpg")
        save_extraction_index(reloaded)
        
        return True
    
    except Exception as e:
        print(f"✗ Index test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_index_statistics():
    """Test that statistics structure is correct."""
    print(f"\n[PHASE 2] Index statistics...")
    try:
        index = get_extraction_index()
        
        if "statistics" not in index:
            print("✗ Statistics missing from index")
            return False
        
        stats = index["statistics"]
        required_fields = ["total", "processed", "failed"]
        
        for field in required_fields:
            if field not in stats:
                print(f"✗ Statistics missing field: {field}")
                return False
        
        print(f"✓ Statistics structure valid")
        
        # Verify they're numbers
        for field in required_fields:
            if not isinstance(stats[field], int):
                print(f"✗ Statistics field '{field}' is not an integer")
                return False
        
        print(f"✓ Statistics types correct (all integers)")
        return True
    
    except Exception as e:
        print(f"✗ Statistics test failed: {e}")
        return False


def test_entry_structure():
    """Test that index entries have correct structure."""
    print(f"\n[PHASE 2] Index entry structure...")
    try:
        index = get_extraction_index()
        
        # Add test entry (success case)
        success_entry = {
            "status": "success",
            "nodes": 20,
            "confidence": 0.92,
            "processed_at": "2025-12-15T10:30:00",
            "output_file": "/path/to/file.dag.json"
        }
        
        index["images"]["success_example.jpg"] = success_entry
        
        # Add test entry (failed case)
        failed_entry = {
            "status": "failed",
            "error": "API rate limit exceeded",
            "failed_at": "2025-12-15T10:31:00"
        }
        
        index["images"]["failed_example.jpg"] = failed_entry
        
        save_extraction_index(index)
        
        # Reload and verify
        reloaded = get_extraction_index()
        
        success_reloaded = reloaded["images"]["success_example.jpg"]
        if success_reloaded.get("status") != "success" or success_reloaded.get("nodes") != 20:
            print("✗ Success entry structure not preserved")
            return False
        
        failed_reloaded = reloaded["images"]["failed_example.jpg"]
        if failed_reloaded.get("status") != "failed" or "error" not in failed_reloaded:
            print("✗ Failed entry structure not preserved")
            return False
        
        print("✓ Both success and failed entry structures preserved")
        
        # Clean up
        reloaded["images"].pop("success_example.jpg")
        reloaded["images"].pop("failed_example.jpg")
        save_extraction_index(reloaded)
        
        return True
    
    except Exception as e:
        print(f"✗ Entry structure test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_batch_script_exists():
    """Test batch_extract.sh script exists and is executable."""
    print(f"\n[PHASE 2] Batch extraction script...")
    try:
        script_path = Path(__file__).parent / "batch_extract.sh"
        if not script_path.exists():
            print("✗ batch_extract.sh not found")
            return False
        
        print("✓ batch_extract.sh exists")
        
        if not os.access(script_path, os.X_OK):
            print("✗ batch_extract.sh is not executable")
            return False
        
        print("✓ batch_extract.sh is executable")
        
        # Check content
        with open(script_path, "r") as f:
            content = f.read()
        
        if "python gemini_dag_extractor.py extract-all" not in content:
            print("✗ Script doesn't call extract-all")
            return False
        
        print("✓ Script content looks correct")
        return True
    
    except Exception as e:
        print(f"✗ Script test failed: {e}")
        return False


def test_cli_help():
    """Test CLI help messages and flags."""
    print(f"\n[PHASE 2] CLI documentation...")
    try:
        script_path = Path(__file__).parent / "gemini_dag_extractor.py"
        if not script_path.exists():
            print("✗ gemini_dag_extractor.py not found")
            return False
        
        with open(script_path, "r") as f:
            content = f.read()
        
        required_strings = [
            "--force",
            "--retry-failed",
            "extract-all",
            "extract-single"
        ]
        
        for s in required_strings:
            if s not in content:
                print(f"✗ Missing CLI option in code: {s}")
                return False
        
        print("✓ All CLI options documented in code")
        return True
    
    except Exception as e:
        print(f"✗ CLI test failed: {e}")
        return False


# ============================================================================
# Main Test Runner
# ============================================================================

def main():
    """Run all tests."""
    print("=" * 70)
    print("GEMINI DAG EXTRACTOR - COMPREHENSIVE TEST SUITE")
    print("=" * 70)
    
    results = []
    
    # Phase 1: Single Image Extraction & Schemas
    print("\n" + "=" * 70)
    print("PHASE 1: Single Image Extraction & Schemas")
    print("=" * 70)
    
    results.append(("Pydantic Schemas", test_pydantic_schemas()))
    results.append(("Schema Validation", test_schema_validation()))
    
    # Find test image
    test_image = find_test_image()
    if not test_image:
        print("\n✗ Cannot proceed without test image")
        print("\nFailed tests:")
        for name, passed in results:
            status = "✓ PASS" if passed else "✗ FAIL"
            print(f"  {status}: {name}")
        return False
    
    results.append(("Single Image Extraction", test_single_image_extraction(test_image)))
    results.append(("File Caching", test_caching(test_image)))
    
    # Phase 2: Batch Processing & Index Management
    print("\n" + "=" * 70)
    print("PHASE 2: Batch Processing & Index Management")
    print("=" * 70)
    
    results.append(("Extraction Index", test_extraction_index()))
    results.append(("Index Statistics", test_index_statistics()))
    results.append(("Entry Structure", test_entry_structure()))
    results.append(("Batch Extraction Script", test_batch_script_exists()))
    results.append(("CLI Documentation", test_cli_help()))
    
    # Summary
    print("\n" + "=" * 70)
    print("TEST SUMMARY")
    print("=" * 70)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✓ PASS" if result else "✗ FAIL"
        print(f"  {status}: {name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n✓ All tests passed (Phases 1 & 2)!")
        return True
    else:
        print(f"\n✗ {total - passed} test(s) failed")
        return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
