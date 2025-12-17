# Strategic Research: Clinical Trial Integration Goals

**Date**: December 17, 2025  
**Researcher**: amp  
**Status**: Draft

---

## Executive Summary

The current clinical trial implementation treats trial data as a simple heatmap overlay (count-based). This misses the core clinical value proposition. A strategic rethink reveals **two fundamental intents** the system should serve, plus additional considerations that emerge from thinking about how clinicians and researchers actually use this data.

---

## Core Intents

### Intent A: Discovery of Cutting-Edge Alternatives

**Goal**: Inform users about alternatives to guideline treatments that may offer superior outcomes.

#### Where Alternatives Matter

| Scenario | Example | Why It Matters |
|----------|---------|----------------|
| **Late-stage/refractory** | NSCLC after 3+ lines of therapy | Guidelines often end with "clinical trial" or best supportive care. Active research is the primary option. |
| **Ambiguous decision points** | Adjuvant vs. observation in Stage IB NSCLC | Guidelines may list options as equivalent; trials may show emerging differentiation. |
| **Challenging established treatments** | Immunotherapy vs. chemo in first-line | Trials actively seeking to displace standard-of-care with novel agents or combinations. |
| **Off-label/repurposed drugs** | Metformin in cancer prevention | Drugs with known safety profiles being tested in new contexts. |
| **Novel mechanisms** | Bispecific antibodies, ADCs, CAR-T | Entirely new drug classes that don't appear in current guidelines. |

#### Strategic Implication

The system shouldn't just count trials—it should **surface novelty**. A search for "pembrolizumab NSCLC" returning 200 trials is less valuable than surfacing "3 Phase III trials testing XYZ-1234, a novel bispecific, as first-line alternative to pembrolizumab."

**Key Question**: How do we identify trials that are *competing with* or *improving upon* the guideline treatment at a given node, rather than simply testing it?

---

### Intent B: Confidence/Evidence Weighting

**Goal**: Provide evidence-based confidence signals for treatment decisions using trial data as supporting or disconfirming evidence.

#### Evidence Hierarchy from Trials

| Evidence Type | Source | Confidence Weight |
|---------------|--------|-------------------|
| **Phase III results** | Completed trials with `resultsSection.outcomeMeasuresModule` | High |
| **Phase III recruiting** | Active trials with Phase III design | Medium-high (expected validation) |
| **Phase II with results** | Completed Phase II trials | Medium |
| **Negative results** | Trials showing futility, stopped early, or inferior outcomes | High (disconfirming) |
| **Phase I** | Early safety/dose-finding | Low (but signals innovation trajectory) |

#### Available API Data for Evidence

From ClinicalTrials.gov API v2, we can retrieve:

```javascript
// Completed trial outcomes
resultsSection.outcomeMeasuresModule.outcomeMeasures[].classes[].categories[].measurements[]
// Contains: value, spread, lowerLimit, upperLimit

// Statistical analysis
resultsSection.outcomeMeasuresModule.outcomeMeasures[].analyses[]
// Contains: paramType (e.g., "Hazard Ratio"), paramValue, pValue, ciLowerLimit, ciUpperLimit

// Outcome measure descriptions (PFS, OS, ORR are named here)
resultsSection.outcomeMeasuresModule.outcomeMeasures[].title
resultsSection.outcomeMeasuresModule.outcomeMeasures[].description
```

**Key Insight**: PFS/OS/ORR aren't explicit fields—they're encoded in `outcomeMeasures[].title` as free text (e.g., "Progression-Free Survival", "Overall Survival"). We'd need to parse these.

#### Negative Results as Disconfirming Evidence

ClinicalTrials.gov requires reporting of negative results. We can detect:
- Trials stopped early for futility
- Trials with inferior outcomes vs. control arm
- Non-inferiority trials that failed to meet threshold

This is **high-value signal** often missing from guidelines (which focus on what works, not what failed).

---

## Additional Strategic Considerations

### Intent C: Patient Eligibility Matching (Future)

**Goal**: Help clinicians determine if a specific patient is eligible for relevant trials.

**Why It Matters**: A trial count means nothing if the patient can't enroll. Key eligibility factors:
- Prior lines of therapy
- Specific mutations (EGFR, ALK, KRAS G12C, etc.)
- Performance status
- Prior treatment types (TKI-naive, immunotherapy-experienced)
- Geographic proximity to trial sites

**API Support**: `eligibilityModule.eligibilityCriteria` contains inclusion/exclusion criteria as text. Would require NLP parsing or structured extraction.

---

### Intent D: Innovation Trajectory Mapping

**Goal**: Show where research momentum exists in a treatment pathway.

**Why It Matters**: A node with 50 Phase III trials suggests mature research. A node with 50 Phase I trials suggests emerging innovation. The *distribution* of trial phases tells a story.

**Visualization Idea**: Instead of red/yellow/green heatmap based on count, show a stacked visualization:
```
[Phase I: 12] [Phase II: 8] [Phase III: 3] → "Active innovation, maturing"
[Phase III: 25] [Phase II: 2] [Phase I: 0] → "Mature, less innovation"
```

---

### Intent E: Trial-to-Guideline Feedback Loop

**Goal**: Identify trials that could influence future guideline updates.

**Why It Matters**: Phase III trials with positive results that aren't yet in guidelines represent the "leading edge" of practice. These are highest-value signals for clinicians who want to practice at the cutting edge.

**Detection Strategy**:
1. Find Phase III trials with `hasResults: true`
2. Check if intervention drug/regimen appears in current guideline node
3. If new drug, flag as "emerging evidence"

---

## Technical Architecture Implications

### Current Problem

```
Node content → extractSearchTerm() → single keyword → API query → count → heatmap
```

This pipeline loses:
- Disease context (always query in context of disease)
- Node position context (is this first-line? salvage?)
- Node purpose (is this worth querying at all?)
- Result depth (just count, not phase/outcomes)

### Proposed Architecture

```
Phase 1: Smart Filtering (reduce API calls)
┌─────────────────────────────────────────────────────────────────┐
│ Node Classification                                              │
│ ├─ Treatment nodes → Query                                      │
│ ├─ Diagnostic nodes → Skip                                      │
│ ├─ Administrative nodes → Skip                                  │
│ └─ Decision points → Query only if treatment-related            │
└─────────────────────────────────────────────────────────────────┘

Phase 2: Context-Enriched Queries (improve precision)
┌─────────────────────────────────────────────────────────────────┐
│ Query Construction                                               │
│ ├─ Base: drug/regimen name                                      │
│ ├─ + Disease condition (from tree root/metadata)                │
│ ├─ + Stage (from ancestor nodes)                                │
│ └─ + Line of therapy (from position in pathway)                 │
└─────────────────────────────────────────────────────────────────┘

Phase 3: Rich Result Retrieval (on-demand, modal open)
┌─────────────────────────────────────────────────────────────────┐
│ Detailed Fetch (triggered by user action)                        │
│ ├─ Trial metadata (phase, status, sponsor)                      │
│ ├─ Outcome measures (if completed)                              │
│ ├─ Statistical results (HR, p-value, CI)                        │
│ └─ Eligibility criteria summary                                 │
└─────────────────────────────────────────────────────────────────┘

Phase 4: Evidence Synthesis (display layer)
┌─────────────────────────────────────────────────────────────────┐
│ Presentation                                                     │
│ ├─ Phase distribution breakdown                                 │
│ ├─ Completed trials with results (highlight)                    │
│ ├─ Negative results (disconfirming evidence)                    │
│ ├─ Novel alternatives (drugs not in guideline)                  │
│ └─ Confidence score (weighted by phase + results)               │
└─────────────────────────────────────────────────────────────────┘
```

---

## API Rate Limiting Strategy

**Problem**: Fetching detailed results for every node is prohibitive.

**Solution**: Two-tier fetching:

1. **Summary tier** (on Research View load):
   - Query: `pageSize=0` to get `totalCount` only
   - Store: count by phase (requires multiple queries or filter)
   - Display: heatmap + phase breakdown badge

2. **Detail tier** (on node click → modal open):
   - Query: `pageSize=20`, include `fields=resultsSection.*`
   - Parse: outcome measures, statistical results
   - Display: full trial cards with evidence summary

**Phase-Filtered Queries**:
```javascript
// For phase breakdown, need 4 queries per node (can parallel):
url.searchParams.set('filter.phase', 'PHASE1');  // etc.
```

---

## Open Questions

1. **How to detect "alternatives" vs. "same treatment"?**
   - Need to compare trial interventions against guideline drug names
   - Fuzzy matching for brand/generic names

2. **How to score negative results?**
   - Not all failures are equal (stopped for safety vs. futility vs. sponsor decision)
   - May need manual curation or ML classification

3. **How to present confidence without overwhelming clinicians?**
   - Risk of information overload
   - Need clean UX for progressive disclosure

4. **Should we cache completed trial results?**
   - Results don't change once posted
   - Could pre-fetch results for common drug searches
   - Build local database of trial outcomes over time

---

## Recommended Priorities

| Priority | Goal | Effort | Impact |
|----------|------|--------|--------|
| P0 | Filter non-treatment nodes from queries | Low | Reduces noise, API calls |
| P0 | Add disease context to all queries | Low | Dramatically improves precision |
| P1 | Phase distribution breakdown | Medium | Enables trajectory visualization |
| P1 | Detect completed trials with results | Medium | High-value confidence signal |
| P2 | Parse outcome measures for PFS/OS | High | Deep evidence integration |
| P2 | Identify novel alternatives | High | Core discovery value |
| P3 | Negative result detection | High | Unique disconfirming evidence |
| P3 | Eligibility matching | Very High | Patient-specific value |

---

## Summary

The current implementation answers: "How many trials mention this term?"

The strategic goal should answer:
1. "What novel alternatives exist to this treatment?" (Intent A)
2. "How confident should I be in this treatment choice?" (Intent B)
3. "Where is the research momentum in this pathway?" (Intent D)
4. "What recent evidence might change guidelines?" (Intent E)

This requires moving from **count-based heatmaps** to **evidence-weighted, context-aware trial intelligence**.
