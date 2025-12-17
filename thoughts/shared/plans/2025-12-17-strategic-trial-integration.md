# Strategic Trial Integration Implementation Plan

## Overview

Transform the current count-based trial heatmap into an evidence-weighted, context-aware trial intelligence system that surfaces novel alternatives, provides confidence signals, and shows research momentum.

## Current State Analysis

The application currently:
- Fetches trial counts via `fetchTrialCount()` in [app.js](file:///Users/user1/projects/trialome/app.js#L324-L345) using a simple keyword search
- Displays red/yellow/green heatmap based on count thresholds (0, 1-5, 6+)
- Shows a modal with top 10 recruiting trials when clicking a node
- Uses `extractSearchTerm()` in [dag_loader.js](file:///Users/user1/projects/trialome/dag_loader.js#L224-L243) which extracts just the first line of content

### Key Discoveries:
- Search terms lack disease context (NSCLC never included in queries)
- No node classification - diagnostic/administrative nodes are queried unnecessarily
- No phase breakdown or result status tracking
- Modal shows only basic trial metadata (title, NCT ID)

## Desired End State

A Research View that provides:
1. **Smart filtering**: Only treatment nodes queried
2. **Context-enriched queries**: Disease + stage context included
3. **Phase breakdown badges**: Stacked [P1|P2|P3] indicators per node
4. **Completed trial highlighting**: Trials with `hasResults: true` flagged
5. **Enhanced modal**: Phase distribution, outcome data for completed trials

### Verification:
- Research View loads faster (fewer API calls)
- Queries return more precise results (verified via manual spot-check)
- Phase breakdown visible on treatment nodes
- Completed trials with results shown in modal

## What We're NOT Doing

- Eligibility matching / NLP parsing of criteria (P3 - future)
- Negative result detection and scoring (P3 - future)
- Novel alternative identification via drug name comparison (P2 - future)
- Patient-specific filtering
- Caching of completed trial results to local database

---

## Implementation Approach

Follow the P0 → P1 priorities from the research document:

| Phase | Goal | Effort |
|-------|------|--------|
| 1 | Node classification + smart filtering | Low |
| 2 | Disease context enrichment | Low |
| 3 | Phase breakdown in queries + display | Medium |
| 4 | Completed trial detection + enhanced modal | Medium |

---

## Phase 1: Smart Node Classification & Filtering

### Overview
Reduce unnecessary API calls by classifying nodes and only querying treatment-relevant nodes.

### Changes Required:

#### 1. dag_loader.js - Enhanced Node Classification
**File**: `dag_loader.js`
**Changes**: Replace simple `classifyNodeType()` with more granular classification that identifies queryable vs non-queryable nodes.

```javascript
/**
 * Node classification for trial query filtering
 * Returns: { type: string, queryable: boolean }
 */
function classifyNode(content) {
    const lower = content.toLowerCase();
    
    // Skip: Administrative/structural nodes
    const skipPatterns = [
        /^(see|refer to)/i,
        /^evaluation$/i,
        /^options?$/i,
        /^treatment$/i,
        /^criteria$/i,
        /^management$/i,
        /^findings?$/i,
        /^initial (presentation|evaluation)$/i,
        /^disease location$/i,
        /^subsequent therapy$/i,
        /^recurrence therapy$/i
    ];
    
    for (const pattern of skipPatterns) {
        if (pattern.test(content.trim())) {
            return { type: 'header', queryable: false };
        }
    }
    
    // Query: Treatment nodes (drugs, regimens, procedures)
    const treatmentIndicators = [
        'therapy', 'chemotherapy', 'radiation', 'surgery', 
        'resection', 'ablation', 'immunotherapy', 'targeted',
        'pembrolizumab', 'carboplatin', 'cisplatin', 'docetaxel',
        'nivolumab', 'atezolizumab', 'osimertinib', 'erlotinib'
    ];
    
    if (treatmentIndicators.some(term => lower.includes(term))) {
        return { type: 'treatment', queryable: true };
    }
    
    // Query: Stage/mutation conditions (valuable context)
    const conditionIndicators = [
        'stage', 'egfr', 'alk', 'ros1', 'kras', 'braf', 'met',
        'pd-l1', 'mutation', 'positive', 'negative'
    ];
    
    if (conditionIndicators.some(term => lower.includes(term))) {
        return { type: 'condition', queryable: true };
    }
    
    // Default: Don't query generic text
    return { type: 'generic', queryable: false };
}
```

#### 2. dag_loader.js - Add queryable flag to tree nodes
**File**: `dag_loader.js`
**Changes**: Modify `buildTree()` to include queryable flag

```javascript
const classification = classifyNode(node.content);
const treeNode = {
    id: node.id,
    label: node.content,
    type: classification.type,
    queryable: classification.queryable,
    search_term: classification.queryable ? extractSearchTerm(node.content) : null,
    footnote_labels: node.footnote_labels || [],
    tree_ids: node.tree_ids || [],
    children: []
};
```

#### 3. app.js - Skip non-queryable nodes in Research View
**File**: `app.js`
**Changes**: Modify `fetchAllTrialCounts()` to check queryable flag

```javascript
async function fetchAllTrialCounts(node, results = []) {
    // Only query nodes marked as queryable
    if (node.queryable && node.search_term) {
        const count = await fetchTrialCount(node.search_term);
        results.push({ nodeId: node.id, count });
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

### Success Criteria:

#### Automated Verification:
- [ ] Application starts without errors: `node server.js` 
- [ ] Browser console shows no JavaScript errors
- [ ] Count of API calls in Research View reduced (check Network tab)

#### Manual Verification:
- [ ] Header nodes (e.g., "Treatment", "Options") show no trial badge
- [ ] Treatment nodes (e.g., "Pembrolizumab + chemotherapy") show trial counts
- [ ] Heatmap still applies correctly to queryable nodes

---

## Phase 2: Disease Context Enrichment

### Overview
Add NSCLC disease context to all search queries to dramatically improve precision.

### Changes Required:

#### 1. dag_loader.js - Store disease context in tree metadata
**File**: `dag_loader.js`
**Changes**: Modify `loadDAGFile()` to store disease context

```javascript
async function loadDAGFile(filename) {
    try {
        const response = await fetch(`./data/decision_trees/new/nsclc/json/${filename}`);
        const dagData = await response.json();
        
        const treeId = dagData.tree_id || extractTreeIdFromFilename(filename);
        const treeData = dagToTree(dagData);
        
        TREES[treeId] = {
            root: treeData,
            raw: dagData,
            footnotes: dagData.footnotes || [],
            // Add disease context metadata
            disease: 'NSCLC',
            diseaseFullName: 'Non-Small Cell Lung Cancer'
        };
        
        console.log(`Loaded DAG: ${treeId}`);
    } catch (error) {
        console.error(`Error loading DAG file ${filename}:`, error);
    }
}
```

#### 2. app.js - Include disease context in API queries
**File**: `app.js`
**Changes**: Modify `fetchTrialCount()` to append disease context

```javascript
async function fetchTrialCount(searchTerm, diseaseContext = null) {
    // Build enriched query with disease context
    const enrichedTerm = diseaseContext 
        ? `${searchTerm} ${diseaseContext}` 
        : searchTerm;
    
    const cacheKey = enrichedTerm;
    if (state.trialCache[cacheKey]) {
        return state.trialCache[cacheKey];
    }
    
    try {
        const url = new URL('https://clinicaltrials.gov/api/v2/studies');
        url.searchParams.set('query.term', enrichedTerm);
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

#### 3. app.js - Pass disease context from tree metadata
**File**: `app.js`
**Changes**: Modify `fetchAllTrialCounts()` to use tree's disease metadata

```javascript
async function fetchAllTrialCounts(node, results = []) {
    // Get disease context from current tree
    const treeData = state.currentDisease ? TREES[state.currentDisease] : null;
    const diseaseContext = treeData?.disease || null;
    
    if (node.queryable && node.search_term) {
        const count = await fetchTrialCount(node.search_term, diseaseContext);
        results.push({ nodeId: node.id, count });
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

### Success Criteria:

#### Automated Verification:
- [ ] Application starts without errors: `node server.js`
- [ ] Network tab shows queries include "NSCLC" term

#### Manual Verification:
- [ ] Trial counts are more relevant (spot-check a few nodes)
- [ ] Generic drug names return NSCLC-specific trials

---

## Phase 3: Phase Distribution Breakdown

### Overview
Query trial counts by phase and display stacked phase breakdown badges on nodes.

### Changes Required:

#### 1. app.js - Add phase-specific trial fetching
**File**: `app.js`
**Changes**: Add new function to fetch phase breakdown

```javascript
/**
 * Fetch trial counts broken down by phase
 * Returns: { phase1: number, phase2: number, phase3: number, total: number }
 */
async function fetchTrialPhaseBreakdown(searchTerm, diseaseContext = null) {
    const enrichedTerm = diseaseContext 
        ? `${searchTerm} ${diseaseContext}` 
        : searchTerm;
    
    const phases = ['PHASE1', 'PHASE2', 'PHASE3'];
    const results = { phase1: 0, phase2: 0, phase3: 0, total: 0 };
    
    // Parallel fetch for all phases
    const promises = phases.map(async (phase) => {
        try {
            const url = new URL('https://clinicaltrials.gov/api/v2/studies');
            url.searchParams.set('query.term', enrichedTerm);
            url.searchParams.set('filter.overallStatus', 'RECRUITING');
            url.searchParams.set('filter.phase', phase);
            url.searchParams.set('pageSize', '0'); // Count only
            
            const response = await fetch(url);
            const data = await response.json();
            return { phase, count: data.totalCount || 0 };
        } catch (error) {
            console.error(`Error fetching ${phase} trials:`, error);
            return { phase, count: 0 };
        }
    });
    
    const phaseResults = await Promise.all(promises);
    
    phaseResults.forEach(({ phase, count }) => {
        if (phase === 'PHASE1') results.phase1 = count;
        if (phase === 'PHASE2') results.phase2 = count;
        if (phase === 'PHASE3') results.phase3 = count;
        results.total += count;
    });
    
    return results;
}
```

#### 2. app.js - Update fetchAllTrialCounts to use phase breakdown
**File**: `app.js`
**Changes**: Replace count-only fetch with phase breakdown

```javascript
async function fetchAllTrialCounts(node, results = []) {
    const treeData = state.currentDisease ? TREES[state.currentDisease] : null;
    const diseaseContext = treeData?.disease || null;
    
    if (node.queryable && node.search_term) {
        const phaseData = await fetchTrialPhaseBreakdown(node.search_term, diseaseContext);
        results.push({ nodeId: node.id, ...phaseData });
        updateNodeWithPhaseBreakdown(node.id, phaseData);
    }
    
    if (node.children) {
        for (const child of node.children) {
            await fetchAllTrialCounts(child, results);
        }
    }
    
    return results;
}
```

#### 3. app.js - New function to render phase breakdown badges
**File**: `app.js`
**Changes**: Add phase visualization function

```javascript
/**
 * Update node with phase breakdown visualization
 */
function updateNodeWithPhaseBreakdown(nodeId, phaseData) {
    const nodeEl = document.getElementById(nodeId);
    if (!nodeEl) return;
    
    // Remove old badges
    nodeEl.querySelectorAll('.trial-badge, .phase-breakdown').forEach(el => el.remove());
    
    // Apply heatmap based on total
    nodeEl.classList.remove('heatmap-red', 'heatmap-yellow', 'heatmap-green');
    if (phaseData.total === 0) {
        nodeEl.classList.add('heatmap-red');
    } else if (phaseData.total <= 5) {
        nodeEl.classList.add('heatmap-yellow');
    } else {
        nodeEl.classList.add('heatmap-green');
    }
    
    // Create phase breakdown badge
    const breakdownEl = document.createElement('div');
    breakdownEl.className = 'phase-breakdown';
    breakdownEl.innerHTML = `
        <span class="phase-p1" title="Phase 1">P1: ${phaseData.phase1}</span>
        <span class="phase-p2" title="Phase 2">P2: ${phaseData.phase2}</span>
        <span class="phase-p3" title="Phase 3">P3: ${phaseData.phase3}</span>
    `;
    
    nodeEl.appendChild(breakdownEl);
}
```

#### 4. style.css - Phase breakdown styling
**File**: `style.css`
**Changes**: Add styles for phase breakdown badges

```css
/* Phase breakdown badge */
.phase-breakdown {
    display: flex;
    gap: 4px;
    margin-top: 4px;
    font-size: 10px;
    font-weight: 500;
}

.phase-breakdown span {
    padding: 2px 4px;
    border-radius: 3px;
}

.phase-p1 {
    background-color: #dbeafe;
    color: #1e40af;
}

.phase-p2 {
    background-color: #fef3c7;
    color: #92400e;
}

.phase-p3 {
    background-color: #d1fae5;
    color: #065f46;
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Application starts without errors: `node server.js`
- [ ] Network tab shows 3 parallel requests per node (one per phase)

#### Manual Verification:
- [ ] Phase breakdown badges appear on treatment nodes
- [ ] Badge colors match the phase (blue P1, yellow P2, green P3)
- [ ] Totals are consistent with individual phase counts

---

## Phase 4: Enhanced Modal with Completed Trial Detection

### Overview
Detect and highlight completed trials with results in the trial modal.

### Changes Required:

#### 1. app.js - Fetch trials with results status
**File**: `app.js`
**Changes**: Modify `showTrialModal()` to include completed trials

```javascript
async function showTrialModal(node) {
    const modal = document.getElementById('trial-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    const viewAllLink = document.getElementById('view-all-link');
    
    title.textContent = node.label;
    content.innerHTML = '<p class="text-gray-600">Loading trials...</p>';
    
    const treeData = state.currentDisease ? TREES[state.currentDisease] : null;
    const diseaseContext = treeData?.disease || null;
    const enrichedTerm = diseaseContext 
        ? `${node.search_term} ${diseaseContext}` 
        : node.search_term;
    
    try {
        // Fetch recruiting trials
        const recruitingUrl = new URL('https://clinicaltrials.gov/api/v2/studies');
        recruitingUrl.searchParams.set('query.term', enrichedTerm);
        recruitingUrl.searchParams.set('filter.overallStatus', 'RECRUITING');
        recruitingUrl.searchParams.set('pageSize', '10');
        
        // Fetch completed trials with results
        const completedUrl = new URL('https://clinicaltrials.gov/api/v2/studies');
        completedUrl.searchParams.set('query.term', enrichedTerm);
        completedUrl.searchParams.set('filter.overallStatus', 'COMPLETED');
        completedUrl.searchParams.set('filter.resultsStatus', 'WITH_RESULTS');
        completedUrl.searchParams.set('pageSize', '5');
        completedUrl.searchParams.set('fields', 'protocolSection.identificationModule,protocolSection.designModule,hasResults');
        
        const [recruitingRes, completedRes] = await Promise.all([
            fetch(recruitingUrl),
            fetch(completedUrl)
        ]);
        
        const recruitingData = await recruitingRes.json();
        const completedData = await completedRes.json();
        
        const recruitingTrials = recruitingData.studies || [];
        const completedTrials = completedData.studies || [];
        
        // Build modal content
        content.innerHTML = '';
        
        // Completed trials section (if any)
        if (completedTrials.length > 0) {
            const completedSection = document.createElement('div');
            completedSection.className = 'mb-4';
            completedSection.innerHTML = `
                <h3 class="text-sm font-semibold text-green-700 mb-2">
                    ✓ Completed Trials with Results (${completedTrials.length})
                </h3>
            `;
            
            const completedList = document.createElement('div');
            completedList.className = 'space-y-2';
            
            completedTrials.forEach(trial => {
                const item = renderTrialItem(trial, true);
                completedList.appendChild(item);
            });
            
            completedSection.appendChild(completedList);
            content.appendChild(completedSection);
        }
        
        // Recruiting trials section
        const recruitingSection = document.createElement('div');
        recruitingSection.innerHTML = `
            <h3 class="text-sm font-semibold text-blue-700 mb-2">
                Actively Recruiting (${recruitingTrials.length})
            </h3>
        `;
        
        if (recruitingTrials.length === 0) {
            recruitingSection.innerHTML += '<p class="text-gray-600 text-sm">No recruiting trials found.</p>';
        } else {
            const recruitingList = document.createElement('div');
            recruitingList.className = 'space-y-2';
            
            recruitingTrials.forEach(trial => {
                const item = renderTrialItem(trial, false);
                recruitingList.appendChild(item);
            });
            
            recruitingSection.appendChild(recruitingList);
        }
        
        content.appendChild(recruitingSection);
        
        // Footnotes
        appendFootnotes(content, node);
        
        // View all link
        const ctURL = new URL('https://clinicaltrials.gov/search');
        ctURL.searchParams.set('q', enrichedTerm);
        viewAllLink.href = ctURL.toString();
        
    } catch (error) {
        console.error('Error loading trials:', error);
        content.innerHTML = '<p class="text-red-600">Error loading trials. Please try again.</p>';
    }
    
    modal.classList.remove('hidden');
}

/**
 * Render a single trial item
 */
function renderTrialItem(trial, isCompleted) {
    const item = document.createElement('div');
    item.className = `border ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'} p-3 rounded-md`;
    
    const phase = trial.protocolSection?.designModule?.phases?.[0] || 'Phase N/A';
    
    const titleEl = document.createElement('a');
    titleEl.href = `https://clinicaltrials.gov/study/${trial.protocolSection.identificationModule.nctId}`;
    titleEl.target = '_blank';
    titleEl.className = 'text-blue-600 hover:text-blue-800 font-medium text-sm';
    titleEl.textContent = trial.protocolSection.identificationModule.officialTitle || 'Untitled Study';
    
    const metaEl = document.createElement('div');
    metaEl.className = 'flex gap-2 items-center text-xs text-gray-500 mt-1';
    metaEl.innerHTML = `
        <span class="font-mono">${trial.protocolSection.identificationModule.nctId}</span>
        <span class="px-1.5 py-0.5 bg-gray-100 rounded">${phase}</span>
        ${isCompleted ? '<span class="px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Has Results</span>' : ''}
    `;
    
    item.appendChild(titleEl);
    item.appendChild(metaEl);
    
    return item;
}

/**
 * Append footnotes to modal content
 */
function appendFootnotes(content, node) {
    if (node.footnote_labels && node.footnote_labels.length > 0 && state.currentDisease) {
        const treeData = TREES[state.currentDisease];
        if (treeData && treeData.footnotes && treeData.footnotes.length > 0) {
            const footnotesDiv = document.createElement('div');
            footnotesDiv.className = 'mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-2';
            
            node.footnote_labels.forEach(label => {
                const footnote = treeData.footnotes.find(f => f.label === label);
                if (footnote) {
                    const footnoteEl = document.createElement('div');
                    footnoteEl.innerHTML = `<strong>${footnote.label}.</strong> ${footnote.content}`;
                    footnotesDiv.appendChild(footnoteEl);
                }
            });
            
            if (footnotesDiv.children.length > 0) {
                content.appendChild(footnotesDiv);
            }
        }
    }
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Application starts without errors: `node server.js`
- [ ] Network tab shows 2 parallel requests when opening modal

#### Manual Verification:
- [ ] Modal displays "Completed Trials with Results" section when available
- [ ] Completed trials have green styling and "Has Results" badge
- [ ] Recruiting trials display with phase badge
- [ ] Both sections load simultaneously

---

## Testing Strategy

### Unit Tests:
- `classifyNode()` returns correct type/queryable for various inputs
- `extractSearchTerm()` handles edge cases (empty, headers, drugs)
- `fetchTrialPhaseBreakdown()` aggregates phases correctly

### Integration Tests:
- Research View renders without errors
- Clicking nodes triggers correct API calls
- Modal displays enriched data

### Manual Testing Steps:
1. Load NSCL-1 tree in Research View
2. Verify only treatment nodes show trial badges
3. Verify phase breakdown colors (P1 blue, P2 yellow, P3 green)
4. Click a treatment node in Clinical View
5. Verify modal shows both completed and recruiting sections
6. Verify "Has Results" badge on completed trials

---

## Performance Considerations

- **Phase breakdown triples API calls**: Phase 3 adds 3 calls per node instead of 1. Consider lazy-loading phase breakdown on hover/demand if performance degrades significantly.
- **Parallel fetching**: All phase queries run in parallel using `Promise.all()` to minimize latency.
- **Caching**: Trial cache keyed by enriched term to avoid duplicate calls.

---

## References

- Original research: `thoughts/shared/research/2025-12-17-strategic-trial-integration.md`
- Current implementation: [app.js](file:///Users/user1/projects/trialome/app.js), [dag_loader.js](file:///Users/user1/projects/trialome/dag_loader.js)
- ClinicalTrials.gov API v2 docs: https://clinicaltrials.gov/data-api/api
