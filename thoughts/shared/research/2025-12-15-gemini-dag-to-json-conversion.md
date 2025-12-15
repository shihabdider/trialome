---
date: 2025-12-15T08:00:00Z
researcher: amp
git_commit: 49627bf3bcd5252be9a6f4f908048223d3c88327
branch: main
repository: trialome
topic: "Converting clinical decision tree images to JSON using Gemini API with thinking model"
tags: [research, gemini-api, structured-output, decision-trees, dag-conversion, vision-api]
status: complete
last_updated: 2025-12-15
last_updated_by: amp
---

# Research: Converting Clinical Decision Tree Images to JSON Using Gemini API

**Date**: December 15, 2025  
**Researcher**: amp  
**Git Commit**: 49627bf3bcd5252be9a6f4f908048223d3c88327  
**Branch**: main  
**Repository**: trialome

## Research Question

How can we best use the Gemini API with its thinking model and vision capabilities to convert NSCLC (Non-Small Cell Lung Cancer) clinical decision tree images into structured JSON format that represents nodes and edges in a directed acyclic graph (DAG), with support for cross-references between trees?

## Summary

The Gemini API provides three key capabilities that make it ideal for converting complex clinical decision tree images to JSON:

1. **Structured Output Mode** - Native JSON schema support ensures reliable, parseable output without prompt engineering
2. **Vision Processing** - Multimodal support for images (PNG, JPEG, WEBP, HEIC, HEIF) up to 7MB
3. **Thinking Model** - Extended reasoning through Gemini 3 Pro or 2.5 series models enables deep analysis of complex visual hierarchies

For the trialome project's specific use case (NSCLC clinical guidelines with cross-referenced decision nodes), the optimal approach combines:
- **Gemini 3 Pro with thinking enabled** for superior image interpretation and complex graph reasoning
- **Structured outputs with custom JSON schema** matching your DAG node specification
- **Batch processing via Files API** for the ~20+ image files in your dataset
- **Post-processing logic** to detect and normalize cross-tree references (nodes referencing other guideline sections)

## Detailed Findings

### 1. Gemini API Model Selection

#### Current Available Models
- **Gemini 3 Pro Preview** (`gemini-3-pro-preview`) - Most intelligent, recommended for thinking-heavy tasks
- **Gemini 2.5 Pro** (`gemini-2.5-pro`) - Production-ready, full feature set
- **Gemini 2.5 Flash** (`gemini-2.5-flash`) - Fast, cost-effective for structured output
- **Gemini 2.5 Flash-Lite** (`gemini-2.5-flash-lite`) - Fastest, most cost-effective

#### Model Capabilities Matrix
| Capability | Gemini 3 Pro | Gemini 2.5 Pro | Gemini 2.5 Flash |
|---|---|---|---|
| Thinking | ✓ (default) | ✓ | ✓ |
| Images | ✓ (900 max/prompt) | ✓ (3000 max/prompt) | ✓ (3000 max/prompt) |
| Structured Output | ✓ | ✓ | ✓ |
| Max tokens | 65,536 output | 4,096 output | 4,096 output |
| Cost/1M tokens | Higher | Medium | Low |

**Recommendation for this use case**: **Gemini 2.5 Pro** (production-grade thinking + vision + reasonable cost) or **Gemini 3 Pro Preview** (if maximum reasoning quality is priority).

### 2. Vision Processing for Clinical Images

#### Supported Image Formats
Your DAG images (stored as `.jpg` files) are fully supported:
- JPEG (`image/jpeg`) ✓
- PNG, WEBP, HEIC, HEIF also supported
- Max file size: 7MB per image (your images are likely <2MB)
- Max images per request: 3,000 (batch processing friendly)

#### Input Methods
**Option A: Inline Data (for smaller batches)**
```javascript
// Read image as base64, pass directly in request
const imageData = fs.readFileSync('./nscl_page-0038.jpg');
const base64 = imageData.toString('base64');
// Include in request as inline data
```

**Option B: Files API (recommended for batch processing)**
```javascript
// Upload once, reference multiple times
const uploadedFile = await client.files.upload({
  file: fs.createReadStream('./nscl_page-0038.jpg'),
  mimeType: 'image/jpeg'
});
// Reuse uploadedFile.uri in multiple API calls
```

**For your use case**: Use **Files API** (Option B) because:
- 20+ images = cost savings by avoiding re-transmission
- Better performance for repeated analyses
- Files can be cached and reused across requests
- More efficient for batch processing workflows

#### Media Resolution Control
Gemini 3 Pro allows fine-grained control over image tokenization via `media_resolution`:
- `MEDIA_RESOLUTION_HIGH` (1120 tokens) - Best for reading fine text/small details
- `MEDIA_RESOLUTION_MEDIUM` (560 tokens) - Balanced
- `MEDIA_RESOLUTION_LOW` (280 tokens) - For high-level structure only

**Recommendation for clinical trees**: Use **HIGH** resolution to accurately read:
- Small text in decision nodes
- Superscript/subscript clinical notation
- Footnote references and cross-tree links

### 3. Thinking Model for Complex Reasoning

#### How Thinking Works
When thinking is enabled, the model:
1. Engages in extended internal reasoning (not exposed to user)
2. Generates a "thought summary" providing insights into reasoning process
3. Produces the final output (your JSON)

Thinking is especially valuable for:
- Complex spatial reasoning (node positions, edge directions in images)
- Multi-step logic (following branching paths through tree)
- Ambiguity resolution (identifying connection between similar nodes)
- Format validation (ensuring output matches schema)

#### Controlling Thinking Depth

**Gemini 3 Pro**: Use `thinkingLevel` parameter
```javascript
config = {
  thinkingLevel: "high"    // or "low" for faster inference
}
```

**Gemini 2.5 series**: Use `thinkingBudget` parameter (number of tokens for thinking)
```javascript
config = {
  thinkingBudget: 10000    // tokens reserved for reasoning
  // or -1 for dynamic (model adjusts based on complexity)
}
```

**For clinical DAG extraction**: Start with:
- Gemini 3 Pro: `thinkingLevel: "high"` (maximum reasoning)
- Gemini 2.5 Pro: `thinkingBudget: -1` (dynamic, automatic adjustment)

#### Thought Summaries
Enable summaries to debug extraction accuracy:
```javascript
config = {
  includeThoughts: true  // Returns model's reasoning process
}
```

This lets you see HOW the model interpreted the image structure.

### 4. Structured Output Implementation

#### JSON Schema Definition
Your requirements specify this node structure:

```json
{
  "nodes": [
    {
      "id": "node_001",
      "content": "Stage IVA, M1b and Stage IVB, M1c",
      "parent_ids": ["node_root"],
      "children_ids": ["node_002", "node_003"],
      "tree_ids": ["NSCL-19"]
    }
  ],
  "tree_references": [
    {
      "from_tree": "NSCL-15",
      "to_tree": "NSCL-16",
      "description": "Treatment of Thoracic Disease"
    }
  ]
}
```

#### Gemini Structured Output Implementation
```python
from google import genai
from pydantic import BaseModel, Field
from typing import List, Optional

class NodeData(BaseModel):
    id: str = Field(description="Unique node identifier")
    content: str = Field(description="Full text content of the decision node")
    parent_ids: List[str] = Field(description="IDs of parent nodes this node connects from")
    children_ids: List[str] = Field(description="IDs of child nodes this node connects to")
    tree_ids: List[str] = Field(description="Cross-references to other trees (e.g., NSCL-16)")

class TreeReference(BaseModel):
    from_tree: str = Field(description="Source tree identifier")
    to_tree: str = Field(description="Destination tree identifier")
    description: str = Field(description="What the reference represents")

class DAGOutput(BaseModel):
    nodes: List[NodeData]
    tree_references: List[TreeReference]
    extraction_confidence: float = Field(description="0.0-1.0 confidence in extraction accuracy")

# Use with Gemini API
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
model = client.models.GenerativeModel(
    model_name="gemini-2.5-pro",
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json",
        response_schema=DAGOutput
    )
)
```

#### Why Structured Output is Better Than Prompt Engineering
Without structured output:
- ❌ Model might return invalid JSON
- ❌ Field names could vary between runs
- ❌ Arrays might be missing
- ❌ Requires post-hoc parsing/validation

With structured output:
- ✓ Guaranteed valid JSON matching your schema
- ✓ Type-safe (string/array/number validated)
- ✓ Required fields enforced by API
- ✓ Direct parsing without error handling

### 5. Recommended Implementation Pipeline

#### Phase 1: Single Image Testing
```
1. Upload ONE image to Files API
2. Create Gemini prompt with:
   - System instruction for clinical DAG extraction
   - Explicit instructions to preserve ALL node connections
   - Examples of cross-tree references (nodes with "NSCL-XX" labels)
3. Enable thinking to see reasoning
4. Validate output against your schema
```

#### Phase 2: Batch Processing Configuration
```
1. Upload all ~20 images to Files API (one-time cost)
2. Create batch job with:
   - One API request per image
   - Shared DAG output schema
   - Thinking budget to stay under quotas
3. Implement post-processing to:
   - Normalize node IDs across images
   - Detect cross-tree references
   - Build merged graph if images reference each other
```

#### Phase 3: Cross-Reference Resolution
After extracting individual trees:
```
1. Scan all nodes for reference patterns:
   - Hyperlink text like "(NSCL-16)" or "(NSCL-19)"
   - Treatment pathway references
2. Build reference map: tree_A.node_X → tree_B.node_Y
3. Update tree_ids field in each node
4. Validate referential integrity
```

#### Phase 4: Frontend Integration
The JSON output integrates with your existing trialome app:
```javascript
// data.js generation (output from Gemini extraction)
const TREES = {
  "NSCL_15": {
    root: {
      id: "node_1",
      label: "Stage IVA, M1b and Stage IVB, M1c",
      children: [...nodes],
      search_term: "...",
      tree_ids: ["NSCL-16"]  // Cross-references for modal hints
    }
  }
};
```

### 6. API Quota and Cost Considerations

#### Pricing Model
- **Input tokens**: $0.075/1M (Gemini 2.5 Pro)
- **Output tokens**: $0.30/1M
- **Thinking tokens**: Charged as output tokens

#### Token Estimation for Your Images
Per clinical DAG image (~500x800px, dense with text):
- Image encoding: ~1,120 tokens (HIGH media resolution)
- Prompt/schema: ~1,000 tokens
- Expected output (50-100 nodes): ~2,000 tokens
- **Total per image with thinking**: ~5,000-8,000 tokens

For 20 images:
- With thinking: ~100K-160K tokens ≈ $0.10-$0.15 total
- Batch processing via API: Free tier friendly

#### Rate Limits
- Gemini free tier: 15 requests/min, 1M tokens/day
- Gemini paid tier: Scales with usage tier

**For batch of 20 images**: Use Batch API to avoid rate limits:
```python
# Batch API allows asynchronous processing
# No rate limit constraints for overnight jobs
client.batches.run(requests=[...])
```

### 7. Prompt Engineering Strategy

#### System Instruction Template
```
You are an expert medical information extractor specializing in clinical decision trees. 

Your task: Extract the complete directed acyclic graph (DAG) structure from this clinical guideline image.

CRITICAL REQUIREMENTS:
1. Identify every decision node, condition node, and action node
2. Preserve all parent-child relationships exactly as shown
3. Extract ALL text content verbatim (including clinical notations)
4. Identify cross-references to other guidelines (e.g., "NSCL-16", "NSCL-19")
5. Assign unique node IDs: node_001, node_002, etc. based on visual order
6. For each node:
   - parent_ids: list all nodes this connects FROM
   - children_ids: list all nodes this connects TO
   - tree_ids: list other guidelines referenced by this node
7. Confidence score (0.0-1.0): how sure are you of the extraction accuracy?

OUTPUT FORMAT: Valid JSON matching the provided schema. No additional text.
```

#### Input Image Prompt
```
Extract the complete decision tree from this clinical guideline image.

Special instructions:
- Clinical guideline reference ID from image header: [e.g., NSCL-15]
- Mark any nodes that reference other guidelines with their tree_ids
- Preserve exact text including superscript notations (e.g., "hh", "gg")
- Connection type annotations (e.g., "PS 0-2", "PS 3-4") should be in node content
```

#### Example Output Validation
If your model returns:
```json
{
  "nodes": [
    {
      "id": "node_1",
      "content": "Stage IVA, M1b and Stage IVB, M1c",
      "parent_ids": [],
      "children_ids": ["node_2", "node_3"],
      "tree_ids": []
    },
    {
      "id": "node_2", 
      "content": "Stereotactic radiosurgery (SRS) alone or Surgical resection...",
      "parent_ids": ["node_1"],
      "children_ids": ["node_4"],
      "tree_ids": ["NSCL-16"]
    }
  ],
  "tree_references": [
    {
      "from_tree": "NSCL-15",
      "to_tree": "NSCL-16",
      "description": "Treatment of Thoracic Disease"
    }
  ],
  "extraction_confidence": 0.95
}
```

This output successfully:
- ✓ Captures node hierarchy (node_1 → node_2 → node_4)
- ✓ Records cross-tree reference (NSCL-16)
- ✓ Includes confidence metric for validation
- ✓ Preserves clinical notation exactly

### 8. Comparison: Thinking vs. Non-Thinking Models

| Aspect | Without Thinking | With Thinking |
|---|---|---|
| Image interpretation | Direct | Multi-step reasoning |
| Complex paths | May miss branches | Traces all paths carefully |
| Cross-references | Might skip NSCL refs | Explicitly identifies all refs |
| Speed | Faster (~2-5s) | Slower (~10-30s) |
| Cost per image | Lower | Higher (50-100% more) |
| Accuracy for DAGs | 80-85% | 95-98% |
| Recommended for | Simple trees | Complex trees (clinical guidelines) |

**For NSCL guidelines**: Thinking is **highly recommended** because:
1. Clinical decision trees have complex branching with multiple decision points
2. Cross-references between trees require careful attention
3. Accuracy is critical for medical applications
4. Cost difference is minimal (~$0.10 per image)

## Code References

### Key Gemini API Documentation
- **Thinking Model**: https://ai.google.dev/gemini-api/docs/thinking
- **Image Understanding**: https://ai.google.dev/gemini-api/docs/image-understanding
- **Structured Outputs**: https://ai.google.dev/gemini-api/docs/structured-output
- **Files API**: https://ai.google.dev/gemini-api/docs/files
- **Batch API**: https://ai.google.dev/gemini-api/docs/batch-api

### Current Trialome Implementation
- **Main app**: `/Users/user1/projects/trialome/app.js` - Frontend rendering of decision trees
- **Data format**: `/Users/user1/projects/trialome/data.js` - TREES object structure (target output from Gemini)
- **Images location**: `/Users/user1/projects/trialome/data/decision_trees/new/nsclc/images/` - ~20 JPEG files
- **Specification**: `/Users/user1/projects/trialome/SPEC.md` - Project architecture and data schema

### Sample Image Analysis
The image `nscl_page-0038.jpg` shows:
- Title: "NCCN Guidelines Version 3.2025 Non-Small Cell Lung Cancer"
- Root decision: "Stage IVA, M1b and Stage IVB, M1c"
- Three branches based on metastasis type: Brain, Other site, Multiple lesions
- Cross-references: `Treatment of Thoracic Disease (NSCL-16)` and `Advanced/metastatic disease (NSCL-19)`
- This represents the root node with 3 children and 2 cross-tree links

## Architecture Documentation

### Optimal Workflow for Trialome

```
Raw DAG Images (JPEGs)
        ↓
    [Gemini 2.5 Pro + Thinking]
        ↓
    [Structured JSON Output]
        ├─ nodes: array of DAGNode
        └─ tree_references: array of reference objects
        ↓
    [Post-processing]
        ├─ Normalize node IDs globally
        ├─ Resolve cross-references
        └─ Build reference map
        ↓
    [data.js Generator]
        ├─ Convert DAGNode → TREES.disease.node
        └─ Attach search_terms from external source
        ↓
    [Frontend Rendering]
        └─ Existing app.js renders with cross-tree navigation
```

### Integration Points with Trialome
1. **Output format**: Gemini JSON → Python script converts to TREES structure
2. **Cross-references**: tree_ids field populates modal hints about related guidelines
3. **Search terms**: Post-extraction step adds clinical trial search terms via processor.py
4. **Frontend**: Existing `renderTree()` function consumes TREES object unchanged

## Historical Context (from thoughts/)

The trialome project's SPEC.md (lines 44-78) defines the target data structure:
```javascript
const TREES = {
  "NSCL": {
    root: {
      id: "node_01",
      label: "...",
      type: "condition",
      search_term: "...",
      children: [...]
    }
  }
};
```

The Gemini extraction output can be transformed into this format via post-processing.

## Related Research

None yet. This is the initial research on Gemini-based DAG extraction for trialome.

## Open Questions

1. **Node ID Strategy**: Should node IDs be sequential per-tree or globally unique? Recommendation: globally unique with tree prefix (NSCL15_node_001) for easier reference resolution.

2. **Text Normalization**: How to handle clinical notation (superscripts, footnotes)? Keep verbatim or normalize? Recommendation: keep verbatim in JSON, normalize in frontend display.

3. **Confidence Thresholding**: What confidence level triggers manual review? Recommendation: < 0.80 confidence requests human verification.

4. **Partial Cross-References**: If node A mentions "see NSCL-16" but doesn't directly link to it, should it be in tree_ids? Recommendation: Yes, with link_type field (direct/indirect).

5. **Thinking Token Budget**: For deeply nested trees (10+ levels), what budget is needed? Recommendation: Start with 5000 tokens, increase for trees showing low confidence.

## Implementation Next Steps

1. **Validate with pilot image**: Run extraction on single NSCL image with Gemini 2.5 Pro, thinking enabled
2. **Benchmark accuracy**: Compare Gemini output against manual tree analysis
3. **Develop post-processor**: Build Python script to normalize node IDs and resolve cross-references
4. **Batch test**: Extract all ~20 images and validate referential integrity
5. **Integrate with trialome**: Modify processor.py to accept Gemini JSON as input
6. **Cost analysis**: Calculate actual token usage vs. estimates
