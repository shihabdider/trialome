# Technical Specification: Oncology Trialome "Live-Guide" MVP

**Version:** 1.0  
**Date:** December 10, 2025

## 1. Executive Summary

The Oncology Trialome Live-Guide is a browser-based single-page application (SPA) that visualizes NCCN clinical decision trees. It augments the standard static guideline view with real-time clinical trial data fetched from ClinicalTrials.gov.

**Key Distinction:** Unlike traditional PDF guidelines, this tool allows:

- Clinicians to find active recruiting trials for specific decision nodes
- Researchers to visualize "innovation gaps" (nodes with zero trials) via a heatmap overlay

## 2. System Architecture

### 2.1 High-Level Overview

The system follows a "No-Build" Static Site architecture. It does not require a backend server. All logic executes in the client browser, consuming a static data file and a public 3rd-party API.

- **Frontend:** Vanilla HTML5, JavaScript (ES6+), CSS3
- **Styling:** Tailwind CSS (via CDN)
- **Data Persistence:** None (Session only)
- **External API:** ClinicalTrials.gov API v2

### 2.2 Data Flow

1. **Offline Pre-processing:** Raw NCCN JSON files (in data/decision_trees/) are processed (Python) to clean text and extract search terms
2. **App Load:** Browser loads index.html and imports data.js (containing the processed trees)
3. **User Interaction:** User selects a disease → App renders Flowchart
4. **Live Query:** User clicks a node → App uses pre-computed keywords to query ClinicalTrials.gov
5. **Render:** Trial counts or details are displayed on the node or in a modal

## 3. Data Schema & Offline Processing

### 3.1 Offline Keyword Extraction Strategy

- **Input:** Raw NCCN JSON files containing unicode characters (e.g., Cytarabine ͫ)
- **Processing:** A Python script will iterate through all keys in the JSON structure
- **Clean:** Remove unicode citations, parenthetical conditions, and stopwords
- **Extract:** Identify the core drug name or intervention
- **Output:** A unified data.js file exporting a TREES object

### 3.2 Target Data Structure (data.js)

The offline script must transform the nested raw JSON into a recursive object structure that includes the `search_term` property.

```javascript
// data.js
const TREES = {
  "AML_Induction": {
    "root": {
      "id": "node_01",
      "label": "Intensive Induction Eligible",
      "type": "condition",
      "search_term": null, // Conditions usually don't trigger trial searches
      "children": [
        {
          "id": "node_02",
          "label": "AML with FLT3 mutation",
          "type": "condition",
          "search_term": "AML FLT3",
          "children": [
            {
              "id": "node_03",
              "label": "Midostaurin + Cytarabine",
              "type": "treatment",
              "search_term": "Midostaurin Cytarabine AML", // Pre-computed!
              "children": []
            }
          ]
        }
      ]
    }
  },
  // ... other disease trees
};
```

## 4. Frontend Functional Requirements

### 4.1 Global Controls

**Disease Selector:**
- A `<select>` dropdown positioned in the header
- Source: Keys of the TREES object in data.js
- Action: On change, clear the canvas and render the new tree

**View Toggle:**
- A toggle switch (Clinical View vs. Research View)
- **Clinical View** (Default): Standard gray nodes
- **Research View:** Nodes colored by trial count (Heatmap)

### 4.2 Interactive Flowchart

**Visuals:** Horizontal layout (Left-to-Right)

**Rendering Logic:**
- Use CSS Flexbox/Grid to align generations of nodes
- Connectors drawn using CSS pseudo-elements (`::before`, `::after`) to create the "branching" lines

**Node States:**
- **Default:** White background, gray border
- **Hover:** Slight scale up, shadow
- **Active/Selected:** Blue border

**Heatmap (Research View):**
- 🔴 Red (`bg-red-100`): 0 Trials
- 🟡 Yellow (`bg-yellow-100`): 1-5 Trials
- 🟢 Green (`bg-green-100`): 6+ Trials

### 4.3 API Integration (The "Trialome" Engine)

**Trigger:** When a node with a valid `search_term` is clicked (or on load if in Research View)

**Endpoint:** `https://clinicaltrials.gov/api/v2/studies`

**Parameters:**
- `query.term`: {node.search_term}
- `filter.overallStatus`: RECRUITING
- `pageSize`: 10 (for performance)

**Error Handling:** If API fails, show a "Data Unavailable" tooltip

### 4.4 Trial Browser Modal

**Trigger:** Clicking a node in "Clinical View"

**Content:**
- **Header:** Node Label ("Midostaurin + Cytarabine")
- **List:** Top 5-10 recruiting trials
- **Format:** [Phase] Title (NCT ID) → Link to ClinicalTrials.gov
- **Footer:** "View all on ClinicalTrials.gov" link

## 5. UI/UX Specifications

### 5.1 Layout (Tailwind)

- **Container:** `w-full h-screen overflow-x-auto bg-gray-50` (Infinite horizontal scroll for large trees)
- **Node Card:** `min-w-[200px] p-4 bg-white border rounded shadow-sm cursor-pointer text-sm font-medium`
- **Connectors:** `border-gray-300` lines

### 5.2 Interactions

**Path Highlighting:** When a leaf node is selected, recursively highlight the parent nodes back to the root to visualize the "Decision Path"

## 6. Implementation Roadmap

### Phase 1: Data Prep (Python)

- Write `processor.py` to parse raw JSON
- Implement regex cleaning logic (strip unicode, etc.)
- Generate data.js

### Phase 2: Core UI (HTML/JS)

- Scaffold index.html with Tailwind CDN
- Implement recursive `renderTree(node)` function
- Implement CSS for connectors

### Phase 3: Integration

- Connect `renderTree` to data.js
- Implement `fetchTrials(searchTerm)` function
- Build the Modal component

### Phase 4: Research View

- Implement logic to batch-fetch trial counts for visible nodes
- Apply conditional CSS classes based on count results


# Notes

Prompt for converting images to trees:

1. Ignore any titles/headers
2. Represent as a graph instead of tree (allowing cross-links)
3. Each node should have atrributes: id, parent_ids[], children_ids[], tree_ids[], content (text)
4. Use JSON format for output
