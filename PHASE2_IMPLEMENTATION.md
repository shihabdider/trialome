# Phase 2: Batch Processing & Cache Management

## Overview

Extended the single-image extraction from Phase 1 to handle all 45 NSCLC images efficiently with:
- Idempotent batch processing (skip already-extracted images)
- Extraction index tracking all images and their status
- Progress resumption from failures
- Force-reprocess capability for re-extraction

## Implementation

### Core Changes to `gemini_dag_extractor.py`

#### 1. Extraction Index Management

Added three new functions for tracking extraction progress:

```python
def get_extraction_index() -> Dict[str, Any]:
    """Load or create index of extracted images."""
    # Returns structure with version, created timestamp, image tracking, statistics

def save_extraction_index(index: Dict[str, Any]):
    """Persist extraction index to disk."""
    # Saves to: data/decision_trees/new/nsclc/extraction_index.json

def extract_all_images(force_reprocess: bool = False):
    """
    Batch process all NSCLC images with idempotency.
    
    - Skips already-processed images (unless force_reprocess=True)
    - Maintains running index of progress
    - Tracks success/failure per image
    - Accumulates statistics
    """
```

#### 2. Extraction Index Structure

Each run creates/updates `extraction_index.json`:

```json
{
  "version": "1.0",
  "created": "2025-12-15T10:30:00",
  "images": {
    "nscl_page-0038.jpg": {
      "status": "success",
      "nodes": 18,
      "confidence": 0.96,
      "processed_at": "2025-12-15T10:35:00",
      "output_file": "/full/path/to/nscl_page-0038.dag.json"
    },
    "nscl_page-0050.jpg": {
      "status": "failed",
      "error": "API rate limit exceeded",
      "failed_at": "2025-12-15T10:36:00"
    }
  },
  "statistics": {
    "total": 45,
    "processed": 42,
    "failed": 3
  }
}
```

#### 3. Idempotent Processing Logic

```
For each image:
  IF image in index AND status="success" AND NOT force_reprocess:
    SKIP (print "⊘ SKIP")
  ELSE:
    EXTRACT (print "⇢ Processing")
    IF success:
      Update index with nodes, confidence, timestamp
      Increment processed count
    ELSE:
      Record error in index
      Increment failed count
```

#### 4. Enhanced CLI

New command-line options for `extract-all`:

```bash
# Normal batch processing (idempotent)
python gemini_dag_extractor.py extract-all

# Reprocess all images (ignore existing cache)
python gemini_dag_extractor.py extract-all --force

# Retry only previously failed images
python gemini_dag_extractor.py extract-all --retry-failed
```

### New Files

#### 1. `batch_extract.sh`

Shell wrapper for batch processing with environment configuration:

```bash
#!/bin/bash
# Sources gemini_config.env if available
# Passes all arguments to Python script
./batch_extract.sh --force
```

### Files Modified

#### 1. `gemini_dag_extractor.py`

- Added: `get_extraction_index()` - Load/create tracking index
- Added: `save_extraction_index()` - Persist index to disk
- Modified: `extract_all_images()` - New logic with idempotency and tracking
- Modified: `__main__` CLI - Added --force and --retry-failed flags

## Usage

### Basic Batch Extraction

First run (processes all images):
```bash
python gemini_dag_extractor.py extract-all
# Output: extraction_index.json created with 45 entries
```

Second run (skips already processed):
```bash
python gemini_dag_extractor.py extract-all
# Output: Skips all 45 images, no new API calls
```

### Force Reprocess

Reprocess all images even if already done:
```bash
python gemini_dag_extractor.py extract-all --force
# Output: Re-extracts all images, updates confidence scores
```

### Retry Failed Images

Resume failed extractions:
```bash
python gemini_dag_extractor.py extract-all --retry-failed
# Output: Only processes images with status="failed"
```

### Using Batch Script

```bash
./batch_extract.sh              # Normal extraction
./batch_extract.sh --force      # Force reprocess
./batch_extract.sh --retry-failed  # Retry failures
```

## Key Features

### Idempotency

- **First run**: 45 images processed, index created
- **Second run**: All 45 skipped, no API calls, instant completion
- **Cache hit**: Marked with "⊘ SKIP" in logs

### Progress Tracking

Index tracks:
- `total`: Total images in directory (45)
- `processed`: Successfully extracted
- `failed`: Failed extractions (API errors, timeouts, etc.)

Enables resume capability after failures.

### Low Confidence Warnings

Extractions with confidence < 0.80 trigger warning:
```
⚠ Low confidence: 0.78 (consider manual review)
```

Allows manual review of problematic extractions.

### Statistics Output

Batch summary after completion:
```
========================================================================
Results Summary
========================================================================
Newly processed: 5
Previously processed (skipped): 40
Failed: 0
Total: 45

Index saved to: .../extraction_index.json
```

## Test Coverage

Phase 2 test suite validates:

1. ✓ **Extraction Index** - Creation and persistence
2. ✓ **Index Statistics** - Structure and data types
3. ✓ **Entry Structure** - Success/failure entry formats
4. ✓ **Batch Script** - Exists and is executable
5. ✓ **CLI Documentation** - All flags documented

Run tests:
```bash
python3 gemini_dag_extractor_test_phase2.py
```

## Cost Optimization

### File Upload Caching

Combined with Phase 1's Files API caching:
- **First run**: Upload all 45 images (~$0.30-0.45 total)
- **Subsequent runs**: Reuse cached URIs (0 upload cost)
- **Re-extraction**: Uses cache + new API calls (~$0.15-0.30)

### Batch Processing Benefits

| Scenario | API Calls | Tokens | Cost |
|---|---|---|---|
| Process all 45 new | 45 | ~90,000 | ~$0.20 |
| Reprocess all | 45 | ~90,000 | ~$0.20 |
| Resume 1 failed | 1 | ~2,000 | ~0.005 |
| Re-run (no changes) | 0 | 0 | $0 |

## Verification Checklist

- [x] Index created and persisted to extraction_index.json
- [x] Idempotent processing skips already-extracted images
- [x] Force flag reprocesses all images
- [x] Retry flag targets only failed images
- [x] Statistics accurately track total/processed/failed
- [x] Low confidence warnings trigger at <0.80
- [x] batch_extract.sh script exists and is executable
- [x] CLI help shows all available options
- [x] All Phase 2 tests pass (5/5)

## Next Steps

Phase 3 will implement DAG → TREES format conversion to generate `data.js` for frontend rendering.

## Performance Notes

- **Batch processing time**: ~1-2 minutes for 45 images (2-3s per image)
- **Re-run time**: <1 second (all skipped)
- **Force reprocess**: ~1-2 minutes again
- **Disk usage**: ~2-5 MB for 45 .dag.json files
- **Index size**: ~50 KB

---

**Status**: Phase 2 Complete ✓
**Test Coverage**: 5/5 tests passing
**Next Phase**: DAG → TREES Conversion (Phase 3)
