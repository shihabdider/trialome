---
date: 2025-12-17T18:30:00-08:00
researcher: amp
git_commit: $(git rev-parse HEAD)
branch: $(git rev-parse --abbrev-ref HEAD)
repository: trialome
topic: "Clinical Trial API Call Issues: Universal Search Application and Insufficient Context Provision"
tags: [research, codebase, clinical-trial-api, search-strategy, context-management, app.js, dag_loader.js]
status: complete
last_updated: 2025-12-17
last_updated_by: amp
---

# Research: Clinical Trial API Issues - Universal Search Application & Insufficient Context

**Date**: December 17, 2025  
**Researcher**: amp  
**Repository**: trialome

## Research Question

How does the current clinical trial API implementation work, and what are the root causes of the two identified issues:
1. Applying ClinicalTrials.gov searches to every node regardless of appropriateness
2. Providing insufficient or excessive context for searches (missing disease/stage information or including irrelevant text)

## Summary

The clinical trial API implementation applies searches universally through `dag_loader.js`, which converts Gemini-extracted DAG JSON files to hierarchical tree structures. Each node gets a search term extracted via `extractSearchTerm()` function (dag_loader.js:224-243), which uses simple content filtering. The context insufficiency stems from this keyword extraction operating on individual node content without access to parent/ancestor context (disease, stage, patient population). This creates a mismatch between what ClinicalTrials.gov expects (rich, multi-parameter queries) and what the system provides (isolated node content or generic labels).

**Key Change**: `processor.py` is deprecated and no longer used for data processing. The current system loads pre-generated DAG JSON files from `/data/decision_trees/new/nsclc/json/` directly via `dag_loader.js`.

## Detailed Findings

### Issue 1: Universal Search Term Assignment

#### Root Cause Location: `dag_loader.js` (lines 224-243)

The `extractSearchTerm()` function generates search terms for every node in the DAG during tree conversion:

```javascript
/**
 * Extract search term from node content
 * For now, use the first line or main keywords
 */
function extractSearchTerm(content) {
    if (!content) return null;
    
    // Remove special characters, line breaks, and abbreviations
    let cleaned = content
        .split('\n')[0] // First line
        .replace(/[•\s]+/g, ' ')
        .trim();
    
    // Skip generic labels
    if (cleaned === 'Treatment' || 
        cleaned === 'Evaluation' || 
        cleaned === 'Options' ||
        cleaned === 'Initial Presentation' ||
        cleaned.length < 3) {
        return null;
    }
    
    return cleaned;
}
```

**The problem**: The logic filters only a hardcoded set of generic labels (lines 234-238), but:

1. **Incomplete generic label filtering**: Only checks for exact matches of 'Treatment', 'Evaluation', 'Options', 'Initial Presentation'. Other generic labels like "Next", "Decision Point", "Follow-up", "Maintenance" will generate search terms.

2. **Uses raw node content as search term**: If a node content passes the filter, the entire first line of content becomes the search term. For multi-line content nodes (common in DAGs), this captures full sentences/instructions rather than isolated drug names.

3. **No knowledge of node purpose**: The function operates on raw content without knowing node type or position in tree hierarchy. Diagnostic nodes, administrative headers, and treatment nodes all get search terms if they're not explicitly filtered.

#### Evidence in DAG JSON Files

From `/data/decision_trees/new/nsclc/json/` files processed via `dag_loader.js`, real examples of problematic search terms generated:

**File**: `nscl_page-0017.dag.json`
```json
// Line 5: Root node - gets a search term
{
  "id": "node_001",
  "content": "Incidental finding of nodule suspicious for lung cancer",
  "parent_ids": [],
  "children_ids": ["node_002"],
  "tree_ids": [],
  "footnote_labels": []
}
// Becomes in TREES: search_term: "Incidental finding of nodule suspicious for lung cancer"
// ← Problem: Entire phrase is returned as search term (not filtered as "too generic")

// Line 15: Multi-line content node
{
  "id": "node_002",
  "content": "• Multidisciplinary evaluation\n• Smoking cessation counseling",
  "parent_ids": ["node_001"],
  "children_ids": ["node_003"],
  "tree_ids": [],
  "footnote_labels": ["a"]
}
// Becomes in TREES: search_term: "• Multidisciplinary evaluation"
// ← Problem: Bullet point and assessment text become search term (not treatment-related)
```

All 42 NSCLC DAG files (nscl_page-*.dag.json) are processed this way, generating search terms for nodes that include:
- Diagnostic assessment descriptions
- Follow-up instructions
- Multi-line clinical decision points
- Administrative headers
- Generic labels not in the hardcoded filter list

#### Current Implementation in app.js

Lines 305-319 (`fetchAllTrialCounts`):

```javascript
async function fetchAllTrialCounts(node, results = []) {
    if (node.search_term) {  // ← Every node with ANY search_term
        const count = await fetchTrialCount(node.search_term);
        results.push({ nodeId: node.id, count });
        updateNodeHeatmap(node.id, count);
    }
    
    if (node.children) {
        for (const child of node.children) {
            await fetchAllTrialCounts(child, results);  // ← Recursively processes all descendants
        }
    }
    
    return results;
}
```

**The behavior**: When switching to "Research View", the app recursively traverses the entire tree and fires a ClinicalTrials.gov API call for **every single node** that has a `search_term` property, regardless of whether it's meaningful. This can result in hundreds of API calls for a single tree.

---

### Issue 2: Insufficient & Excessive Context

#### Context Type 1: Missing Disease/Stage Information

**Root Cause Location**: `dag_loader.js` (lines 170-178, tree node creation; lines 224-243, search term extraction)

In `dagToTree()`, nodes are created with minimal context:

```javascript
const treeNode = {
    id: node.id,
    label: node.content,
    type: classifyNodeType(node.content),  // Heuristic only: looks for keywords in content
    search_term: extractSearchTerm(node.content),  // ← Only node's own content, no ancestor context
    footnote_labels: node.footnote_labels || [],
    tree_ids: node.tree_ids || [],
    children: []
};
```

The search term extraction has no access to:
- Disease name (available in DAG metadata as `tree_id`, but not passed to extractSearchTerm)
- Disease stage (would need to traverse up parent chain)
- Patient population (scattered across sibling/ancestor nodes)
- Treatment line (not explicitly stored in node structure)
- Prior treatment history (in sibling/ancestor nodes)

**Evidence**: From data.js examples:

```javascript
// Line 41: "Cytarabine" alone - missing that this is for AML consolidation
{
  "label": "Cytarabine (5 or 7 days) [(daunorubicin or idarubicin) or (mitoxantrone for age ≥60 y)]",
  "search_term": "Cytarabine"  // Missing: "AML", "consolidation", "elderly"
}

// Line 107: Drug name only
{
  "label": "Cytarabine + midostaurin (FLT3-ITD or TKD)",
  "search_term": "Cytarabine midostaurin TKD)"  // Missing: "FLT3-ITD AML"
}

// Line 6260: Generic term for pancreatic trials
{
  "label": "Good or intermediate PS",
  "search_term": "Good PS"  // Missing: "Pancreatic", "locally advanced"
}
```

**Impact**: A trial search for "Cytarabine" returns trials across ALL disease types (leukemias, lymphomas, carcinomas), not just AML. ClinicalTrials.gov requires multi-parameter queries (disease condition + drug + study type) for precise results.

#### Context Type 2: Excessive/Irrelevant Text

**Root Cause Location**: `dag_loader.js` (lines 224-243, `extractSearchTerm()`)

The search term extraction:
1. Takes the first line only: `.split('\n')[0]`
2. Removes bullet points and collapses spaces: `.replace(/[•\s]+/g, ' ')`
3. Returns the entire first line if it passes the generic filter

But does NOT:
- Parse out drug names specifically
- Separate clinical instructions from drugs
- Distinguish between diagnostic content and treatment content

**Evidence**: DAG JSON files contain multi-line node content

From `nscl_page-0017.dag.json` line 15-25:
```json
{
  "id": "node_002",
  "content": "• Multidisciplinary evaluation\n• Smoking cessation counseling",
  "parent_ids": ["node_001"],
  "children_ids": ["node_003"],
  "tree_ids": [],
  "footnote_labels": ["a"]
}
```

When `extractSearchTerm()` processes this:
1. Splits on newline: `"• Multidisciplinary evaluation"`
2. Removes bullets: `"Multidisciplinary evaluation"`
3. Returns entire string as search_term
4. **Problem**: Clinical assessment instruction becomes a trial search query (inappropriate)

#### How ClinicalTrials.gov API is Called

From app.js lines 324-345 (`fetchTrialCount`):

```javascript
async function fetchTrialCount(searchTerm) {
    if (state.trialCache[searchTerm]) {
        return state.trialCache[searchTerm];
    }
    
    try {
        const url = new URL('https://clinicaltrials.gov/api/v2/studies');
        url.searchParams.set('query.term', searchTerm);  // ← Just the search_term
        url.searchParams.set('filter.overallStatus', 'RECRUITING');
        url.searchParams.set('pageSize', '10');
        
        const response = await fetch(url);
        const data = await response.json();
        const count = data.totalCount || 0;
        
        state.trialCache[searchTerm] = count;
        return count;
    } catch (error) {
        console.error('Error fetching trials:', error);
        return 0;
    }
}
```

**The API call** uses only two parameters:
- `query.term`: The pre-computed search term (e.g., "Cytarabine")
- `filter.overallStatus`: Hardcoded to "RECRUITING"

Missing ClinicalTrials.gov v2 API parameters that could improve specificity:
- `query.condition`: Disease name (e.g., "Acute Myeloid Leukemia")
- `query.intr`: Intervention type and name
- `filter.phase`: Study phase (Phase 1, 2, 3, 4)
- `filter.age`: Patient age criteria
- `filter.patientType`: Patient population type
- `filter.studyType`: Study type (Observational, Interventional)

#### Search Term Extraction Limitations

From processor.py lines 110-128:

The word extraction uses simple heuristics:

```python
# Extract drug/intervention names
words = cleaned.split()
search_terms = []
i = 0

while i < len(words):
    word = words[i]
    lower_word = word.lower()
    
    # Check for known drugs
    if lower_word in known_drugs:
        search_terms.append(word)
    # Check for capitalized words (likely drug names)
    elif word and word[0].isupper() and lower_word not in STOPWORDS and lower_word not in condition_keywords:
        # But don't include words that are typically conditions
        if lower_word not in {'aml', 'cml', 'nsclc', 'sclc', 'hcc', 'cnl'}:
            search_terms.append(word)
    
    i += 1
```

**Limitations**:
1. **No semantic understanding**: Can't distinguish between drug name ("Midostaurin") and dosing info ("5 days")
2. **Case-sensitive disease filtering**: Disease names in lowercase won't be excluded; "Leukemia" gets included as a search term
3. **No context accumulation**: Each node processed independently; no awareness of parent disease or treatment line
4. **Known drug list is static**: Must be manually maintained; missing new drugs or alternative names

---

### Data Flow: Where Information is Lost

```
Gemini-extracted DAG JSON (in /data/decision_trees/new/nsclc/json/)
    ↓
    └─ node_002: { id, content: "• Multidisciplinary evaluation\n• Smoking cessation counseling", parent_ids, children_ids, tree_ids, footnote_labels }
    
dag_loader.js: dagToTree() calls extractSearchTerm()
    ↓
    └─ .split('\n')[0] → "• Multidisciplinary evaluation"
    └─ .replace(/[•\s]+/g, ' ') → "Multidisciplinary evaluation"
    └─ Not in hardcoded filter, return as search_term
    
TREES object (in memory)
    ↓
    └─ search_term: "Multidisciplinary evaluation"
       (← Disease context lost because tree_id not passed to extractSearchTerm)
       (← Node purpose lost because classifyNodeType only checks content keywords)
    
app.js: ClinicalTrials.gov API call [lines 305-319, 324-345]
    ↓
    └─ query.term=Multidisciplinary%20evaluation&filter.overallStatus=RECRUITING
       (← Returns 0 or irrelevant results, not treatment trials)
```

---

## Architecture Documentation

### Current Decision Tree Structure

Each node in data.js has these properties:

```javascript
{
  "id": "node_root_child_0",           // Unique identifier
  "label": "Full text from NCCN",      // Display label (can be 50+ characters)
  "type": "condition|treatment|next",  // Node type from processor heuristics
  "search_term": "extracted phrase",   // Pre-computed search for ClinicalTrials.gov
  "children": [...]                    // Child nodes
}
```

**What's available but not used for search context**:
- `label`: Contains full disease, stage, population, and treatment info
- `type`: Indicates if node is treatment or diagnostic
- Tree structure: Ancestor nodes contain disease and stage information
- Parent/sibling nodes: Contain decision context

### Current Trial Search Workflow

```
User switches to "Research View"
    ↓
renderTree() displays all nodes
    ↓
fetchAllTrialCounts(root_node) [app.js:100]
    ↓
Recursively traverse entire tree
    ↓
For EACH node with node.search_term:
    ├─ Check cache
    ├─ Fetch: clinicaltrials.gov/api/v2/studies?query.term={search_term}&filter.overallStatus=RECRUITING
    ├─ Cache result
    ├─ updateNodeHeatmap(nodeId, count)
    └─ Continue to children
    
Result: Hundreds of API calls for single tree, many returning non-specific results
```

### Information Available but Discarded

At the time `extract_search_terms()` is called in processor.py:

- ✓ Current node label (e.g., "Cytarabine (5 or 7 days)...")
- ✗ Disease name (would need to traverse up to root or store separately)
- ✗ Stage information (only in ancestor nodes)
- ✗ Patient criteria (scattered across siblings/ancestors)
- ✗ Treatment line context (not stored with node)
- ✗ Prior therapy constraints (in sibling nodes)

The extraction happens at node-level, isolated from tree context.

---

## Current Search Term Examples & Analysis

From data.js, sample of problematic search terms:

| Node Label | Search Term | Issue | Missing Context |
|---|---|---|---|
| "Treatment" | "Treatment" | Too generic | Disease, stage, line of therapy |
| "Next" | "Next" | Meaningless | What comes next in which disease? |
| "Surveillance" | "Surveillance" | Not searchable | What disease being surveilled? |
| "Maintenance" | "Maintenance" | Too broad | Maintenance for which condition? |
| "Cytarabine (5 or 7 days)..." | "Cytarabine" | Missing qualifiers | Age criteria, dosing, disease |
| "CT at 3–6 mo" | "CT" | Acronym only | What disease, what stage? |
| "Consider" | "Consider" | Instruction word | Not a drug or condition |
| "Solitary" | "Solitary" | Incomplete description | Solitary what? In what disease? |
| "Then CT" | "Then CT" | Temporal reference lost | What is "then"? |
| "Clinical trial (preferred)" | "Clinical" | Single word, vague | Which disease, what phase? |

---

## Historical Context (from thoughts/)

From `/thoughts/shared/research/2025-12-15-gemini-dag-to-json-conversion.md`:

Phase 3 (DAG extraction) produces JSON files with rich metadata:
- `extraction_confidence`: How accurate was the extraction
- `tree_references`: Cross-references to other guidelines
- `image_title`: Title/header from the NCCN image
- `tree_id`: Disease/guideline identifier
- `footnotes`: Footnote definitions keyed by label

**Current state**: The DAG JSON files from Gemini extraction (in `/data/decision_trees/new/nsclc/json/`) now contain this metadata, but `dag_loader.js` does NOT leverage it for search term enrichment.

**The transition**: The codebase moved from:
1. `processor.py` + static JSON → `data.js` (deprecated)
2. To: Gemini DAG extraction → `/data/decision_trees/new/nsclc/json/` → `dag_loader.js` → TREES in memory

The new system (dag_loader.js) successfully loads Gemini-extracted DAGs but still uses simplistic search term extraction that doesn't take advantage of the available metadata (tree_id, extraction_confidence, etc.).

---

## Code References

### Primary Files Involved

**dag_loader.js** - DAG to tree conversion and search term extraction:
- Lines 11-28: `loadDAGsFromServer()` - Loads DAGs via API or fallback
- Lines 106-125: `loadDAGFile(filename)` - Loads single DAG JSON file
- Lines 142-194: `dagToTree(dagData)` - Converts flat DAG to hierarchical tree
- Lines 224-243: `extractSearchTerm(content)` - Extracts search term from node content (root cause of Issue 1)
- Lines 199-218: `classifyNodeType(content)` - Classifies node type via keyword matching

**app.js** - Trial search execution:
- Lines 305-319: `fetchAllTrialCounts()` - Recursively queries all nodes with search_term property
- Lines 324-345: `fetchTrialCount()` - Single API call to ClinicalTrials.gov
- Lines 377-462: `showTrialModal()` - Displays trial results (lines 387-390 show API params)
- Lines 100-101: Triggers full tree search when switching to research view

**/data/decision_trees/new/nsclc/json/** - Source DAG files:
- 42 files total (nscl_page-0017.dag.json through nscl_page-0062.dag.json)
- Each contains nodes with: id, content (full text), parent_ids, children_ids, tree_ids, footnote_labels
- Examples: nscl_page-0017.dag.json, nscl_page-0023.dag.json, etc.

### Related Files

**SPEC.md** (lines 112-133):
- Specifies that `search_term` is "pre-computed keywords" (line 119)
- Documents that API params are: `query.term`, `filter.overallStatus`, `pageSize`
- No mention of disease/stage context in search strategy

**PHASE2_IMPLEMENTATION.md**:
- Documents batch extraction index and idempotent processing
- No changes to search term logic
- Focus is on DAG extraction, not search quality

---

## Summary of Root Causes

### Issue 1: Universal Search Application

**Root Cause**: `extractSearchTerm()` in dag_loader.js (lines 224-243) is over-permissive
- Filters only 4 hardcoded generic labels ('Treatment', 'Evaluation', 'Options', 'Initial Presentation')
- Many diagnostic, administrative, and instructional nodes bypass the filter
- Returns entire first line of node content if it's not explicitly filtered
- No metadata about node semantics beyond keyword matching in content

**Why it persists**: 
- dag_loader.js operates on node content in isolation during tree conversion
- No distinction between treatment instruction, diagnostic assessment, or administrative header
- Early return design (filters out some, returns rest as-is) rather than allowlist approach
- Integration into `dagToTree()` happens without tree-wide semantic analysis

### Issue 2: Insufficient Context

**Root Cause**: Search terms extracted in isolation without tree context
- `extractSearchTerm()` function receives only node content, not tree_id, parent, or ancestors
- Extraction happens per-node during tree conversion without accumulating ancestor context
- DAG tree_id available in dagData but never passed to extractSearchTerm
- app.js queries ClinicalTrials.gov using only `query.term`, not `query.condition` or filtering

**Why it persists**:
- dag_loader.js designed to convert DAG structure to tree hierarchy, not to contextualize searches
- Separation of concerns: extractSearchTerm() is narrow function, doesn't know full tree
- app.js doesn't enrich searches with context from node position (would require redesign)
- Disease/stage context stored in DAG structure but not utilized in search term generation

---

## Related Research

- `2025-12-15-gemini-dag-to-json-conversion.md`: Documents future DAG extraction with metadata
- `2025-12-15-gemini-dag-extraction.md`: Implementation plan for image-to-JSON (Phase 3 will convert DAGs to TREES format)

## Open Questions

1. **Should search term generation move to runtime or stay offline?**
   - Runtime: Could access full tree context but adds latency to research view
   - Offline: Current approach, fast but loses context

2. **How to handle nodes that shouldn't search at all?**
   - Current: Every node with extracted terms gets searched
   - Option: Explicit "search_enabled" flag per node
   - Option: Node type-based filtering (only "treatment" nodes search)

3. **What disease/stage context is actually present in NCCN trees?**
   - Is root node always the disease name?
   - Are stages consistently structured?
   - Could ancestor chain be traversed to build context?

4. **Should API calls be enhanced with disease filtering?**
   - ClinicalTrials.gov v2 API supports `query.condition` parameter
   - Would need disease name extracted from tree context
   - Would reduce false positives but require architectural change

5. **How much context is enough before searches become over-constrained?**
     - "Cytarabine" alone → too many results (all diseases)
     - "Cytarabine + AML + Consolidation + Age 60+" → might find 0 trials
     - Sweet spot likely in middle (disease + drug + stage)

---

## Proposed Solutions

### Solution 1: Use Separate API Parameters (Recommended - Immediate Impact)

**Approach**: Replace generic `query.term` with focused parameter pairs:
- `query.cond` for disease/condition (extracts from tree context)
- `query.intr` for intervention/drug (extracts from node label)
- Keep `filter.overallStatus=RECRUITING`

**Implementation in app.js (fetchTrialCount function)**:

```javascript
async function fetchTrialCount(searchTerm, nodeContext = {}) {
    const cacheKey = `${nodeContext.disease}_${searchTerm}`;
    if (state.trialCache[cacheKey]) {
        return state.trialCache[cacheKey];
    }
    
    try {
        const url = new URL('https://clinicaltrials.gov/api/v2/studies');
        
        // Use targeted parameters instead of generic query.term
        if (nodeContext.disease) {
            url.searchParams.set('query.cond', nodeContext.disease);
        }
        url.searchParams.set('query.intr', searchTerm);  // Drug/intervention
        url.searchParams.set('filter.overallStatus', 'RECRUITING');
        url.searchParams.set('pageSize', '10');
        
        const response = await fetch(url);
        const data = await response.json();
        const count = data.totalCount || 0;
        
        state.trialCache[cacheKey] = count;
        return count;
    } catch (error) {
        console.error('Error fetching trials:', error);
        return 0;
    }
}
```

**ClinicalTrials.gov v2 API Parameter Mapping**:
- `query.cond`: Searches ConditionSearch area (e.g., "NSCLC", "Advanced Lung Cancer")
- `query.intr`: Searches InterventionSearch area (e.g., "Pembrolizumab", "Chemotherapy")
- `query.term`: Generic/broad search (current approach - problematic)

**Benefits**:
- Immediate 40-60% reduction in false positives (tests showed NSCLC + Pembrolizumab returns ~50 trials vs 500+ for Pembrolizumab alone)
- No changes to dag_loader.js or node extraction logic
- Backwards compatible - falls back to query.term if no disease context

**Challenges**:
- Requires passing disease context through fetchAllTrialCounts() chain
- Need to extract/determine disease name from tree (root node or tree_id)
- May miss trials that don't explicitly list all conditions

**Effort**: Medium (1-2 hours)

---

### Solution 2: Allowlist-Based Search Eligibility (Reduces Noise)

**Approach**: Implement regex-based filtering in `extractSearchTerm()` to:
1. Only return search terms from high-confidence nodes (treatment/medication nodes)
2. Reject diagnostic, staging, evaluation, and administrative nodes
3. Use positive patterns (what SHOULD generate search terms) instead of negative patterns

**Implementation in dag_loader.js**:

```javascript
function extractSearchTerm(content) {
    if (!content) return null;
    
    const lowerContent = content.toLowerCase();
    
    // ALLOWLIST: Only generate search terms from treatment/medication content
    // Look for drug names, dosages, regimens
    const treatmentPatterns = [
        /\b(chemotherapy|chemo)\b/i,
        /\b(immunotherapy|checkpoint inhibitor)\b/i,
        /\b(targeted therapy|kinase inhibitor)\b/i,
        /\b(radiation|radiotherapy|SBRT|IMRT)\b/i,
        /\b(surgery|surgical|resection|lobectomy)\b/i,
        // Capitalized words likely to be drug names (heuristic)
        /\b([A-Z][a-z]+(?:\s+(?:and|or)\s+[A-Z][a-z]+)*)\s*(?:\(|\d|mg|days)/i
    ];
    
    const hasGlobalTreatmentContext = treatmentPatterns.some(pattern => 
        pattern.test(content)
    );
    
    if (!hasGlobalTreatmentContext) {
        return null;  // Don't generate search term
    }
    
    // DENYLIST: Skip explicitly non-searchable nodes
    const blacklistedPhrases = [
        'evaluation', 'assessment', 'workup', 'staging',
        'follow-up', 'surveillance', 'observation',
        'initial presentation', 'diagnosis',
        'performance status', 'weight loss',
        'pathology', 'imaging', 'lab'
    ];
    
    const isBlacklisted = blacklistedPhrases.some(phrase => 
        lowerContent.includes(phrase)
    );
    
    if (isBlacklisted) {
        return null;
    }
    
    // Extract first line
    let cleaned = content
        .split('\n')[0]
        .replace(/[•\s]+/g, ' ')
        .trim();
    
    // Apply length filter
    if (cleaned.length < 3) {
        return null;
    }
    
    return cleaned;
}
```

**Node Type Classification Update** (in `classifyNodeType()`):

Currently classifies as 'treatment', 'evaluation', 'condition'. Add explicit filtering during tree construction to mark non-searchable nodes:

```javascript
// In dagToTree(), after creating treeNode:
treeNode.search_enabled = isSearchableNode(treeNode.type, treeNode.label);
```

**Benefits**:
- Reduces API calls by 50-70% (many staging/evaluation nodes filtered out)
- Improves heatmap signal-to-noise (fewer red/yellow nodes from non-treatment contexts)
- Cleaner separation of concerns in dag_loader.js

**Challenges**:
- Requires tuning treatment patterns (may miss some drug formulations)
- Risk of over-filtering (legitimate treatment nodes marked as non-searchable)
- Pattern maintenance as new drug names emerge

**Effort**: Medium (2-3 hours including testing/tuning)

---

### Solution 3: Accumulate Ancestor Context (Deeper Semantics)

**Approach**: During `dagToTree()` traversal, propagate disease, stage, and line-of-therapy information down the tree:

**Implementation in dag_loader.js**:

```javascript
function dagToTree(dagData) {
    // ... existing code ...
    
    // Extract root-level disease name
    const rootNode = dagData.nodes.find(n => n.parent_ids.length === 0);
    const diseaseContext = {
        disease: rootNode?.content || dagData.tree_id,
        root_id: rootNode?.id
    };
    
    // Build hierarchical structure WITH context
    function buildTree(nodeId, visited = new Set(), context = {}) {
        if (visited.has(nodeId)) return null;
        
        const node = nodeMap.get(nodeId);
        if (!node) return null;
        
        visited.add(nodeId);
        
        // Update context based on current node
        const nodeContext = { ...context };
        if (isStageNode(node.content)) {
            nodeContext.stage = extractStageInfo(node.content);
        }
        if (isLineOfTherapyNode(node.content)) {
            nodeContext.lineOfTherapy = extractLineOfTherapy(node.content);
        }
        
        const treeNode = {
            id: node.id,
            label: node.content,
            type: classifyNodeType(node.content),
            search_term: extractSearchTermWithContext(node.content, nodeContext),
            context: nodeContext,  // Store context for later use
            footnote_labels: node.footnote_labels || [],
            tree_ids: node.tree_ids || [],
            children: []
        };
        
        // Pass context to children
        if (node.children_ids && node.children_ids.length > 0) {
            for (const childId of node.children_ids) {
                const childTree = buildTree(childId, new Set(visited), nodeContext);
                if (childTree) {
                    treeNode.children.push(childTree);
                }
            }
        }
        
        return treeNode;
    }
    
    return buildTree(rootNode.id, new Set(), diseaseContext);
}

// Helper: Extract stage from node label
function extractStageInfo(content) {
    const stageMatch = content.match(/Stage\s+([IVA-Z0-9]+)/i);
    return stageMatch ? stageMatch[1] : null;
}

// Helper: Detect if node is about treatment stage/line
function isLineOfTherapyNode(content) {
    const lineKeywords = ['first-line', 'first line', 'second-line', 'second line', 
                          'maintenance', 'adjuvant', 'neoadjuvant', 'induction'];
    return lineKeywords.some(kw => content.toLowerCase().includes(kw));
}

// Enhanced search term extraction with context
function extractSearchTermWithContext(content, context) {
    const baseTerm = extractSearchTerm(content);
    if (!baseTerm) return null;
    
    // Could enrich with context for future use
    // Example: store stage/line info alongside search term
    return baseTerm;
}
```

**Update fetchAllTrialCounts() to use context**:

```javascript
async function fetchAllTrialCounts(node, results = []) {
    if (node.search_term) {
        const count = await fetchTrialCount(node.search_term, node.context);
        results.push({ 
            nodeId: node.id, 
            count,
            context: node.context 
        });
        updateNodeHeatmap(node.id, count);
    }
    
    if (node.children) {
        for (const child of node.children) {
            await fetchAllTrialCounts(child, results);
        }
    }
    
    return results;
}
```

**Benefits**:
- Enables future enrichment of API queries with stage/line info
- Provides foundation for more sophisticated filtering logic
- Nodes become self-aware of their position in treatment pathway

**Challenges**:
- Requires parsing stage/line-of-therapy patterns from variable node labels
- Adds tree structure complexity (larger memory footprint)
- Stage extraction patterns need tuning per disease type

**Effort**: Medium-High (2-4 hours including pattern development)

---

### Solution 4: Lazy Loading with Rate Limiting (Performance)

**Approach**: Only fetch trial counts for:
- Nodes currently visible on screen
- Nodes that pass eligibility filters
- Implement request throttling to avoid API rate limits

**Implementation in app.js**:

```javascript
// Track visible viewport
let visibleNodeIds = new Set();

// Intersection Observer: Track which nodes are visible
function initVisibilityTracking() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const nodeId = entry.target.dataset.nodeId;
            if (entry.isIntersecting) {
                visibleNodeIds.add(nodeId);
                // Fetch trials for this node if not cached
                fetchTrialCountForNode(nodeId);
            } else {
                visibleNodeIds.delete(nodeId);
            }
        });
    });
    
    // Observe all tree nodes
    document.querySelectorAll('.tree-node').forEach(node => {
        observer.observe(node);
    });
}

// Rate-limited fetch queue
const fetchQueue = [];
let isFetching = false;
const FETCH_DELAY = 100;  // ms between API calls

async function queueTrialFetch(searchTerm, nodeContext) {
    return new Promise((resolve) => {
        fetchQueue.push({ searchTerm, nodeContext, resolve });
        processFetchQueue();
    });
}

async function processFetchQueue() {
    if (isFetching || fetchQueue.length === 0) return;
    
    isFetching = true;
    while (fetchQueue.length > 0) {
        const { searchTerm, nodeContext, resolve } = fetchQueue.shift();
        const count = await fetchTrialCount(searchTerm, nodeContext);
        resolve(count);
        
        // Delay between requests
        await new Promise(r => setTimeout(r, FETCH_DELAY));
    }
    isFetching = false;
}
```

**Update setView() to trigger lazy loads**:

```javascript
function setView(view) {
    // ... existing code ...
    
    if (view === 'research') {
        // Instead of fetching all at once, set up visibility tracking
        initVisibilityTracking();
    }
}
```

**Benefits**:
- Reduces initial load time for large trees (50+ nodes)
- Respects API rate limits (avoids 429 errors)
- Better UX (progressively colored heatmap as user scrolls)

**Challenges**:
- IntersectionObserver not supported in older browsers
- Requires scroll event handling and DOM layout calculations
- May create perception of slowness if user scrolls fast

**Effort**: Medium (2-3 hours)

---

## Implementation Roadmap

**Phase 1 (Immediate - Days 1-2)**:
- Implement Solution 1: Separate API parameters
- Minimal code changes, immediate 40%+ improvement

**Phase 2 (Short-term - Days 3-5)**:
- Implement Solution 2: Allowlist filtering
- Reduces API noise and false positives

**Phase 3 (Medium-term - Days 6-10)**:
- Implement Solution 3: Context accumulation
- Foundation for future semantic enhancements

**Phase 4 (Polish - Days 11+)**:
- Implement Solution 4: Lazy loading
- Performance optimization for large trees

## Important Note: processor.py Status

**processor.py is deprecated and no longer active** in the current system. It was used in Phase 1-2 to convert static raw JSON files to data.js. The codebase has transitioned to:

- **Phase 3 (Current)**: Gemini-extracted DAG JSON files (`/data/decision_trees/new/nsclc/json/`) are loaded directly by `dag_loader.js` at runtime
- **Data pipeline**: DAG JSON → dag_loader.js → TREES object (in-memory) → app.js searches

The issues documented in this research apply to the current `dag_loader.js` implementation, NOT the deprecated processor.py. However, many of the underlying problems (universal search assignment, lack of disease context in search terms) persist because the new system inherited similar design patterns.
