#!/usr/bin/env python3
"""
NCCN Decision Tree Processor

Converts raw NCCN JSON files into a unified data.js file with:
- Unicode citations removed
- Search terms extracted and pre-computed
- Recursive tree structure for frontend rendering
"""

import json
import os
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

# Regex pattern to match unicode superscripts, subscripts, and citations
# Covers: Latin-1 supplement (¹²³), modifier letters, superscripts/subscripts block,
# phonetic extensions, Canadian syllabics (used as superscripts), and more
UNICODE_CITATION_PATTERN = re.compile(
    r'[\u00b0-\u00bf'           # Latin-1 Supplement (°±²³´µ¶·¸¹º»¼½¾¿)
    r'\u00aa\u00ba'              # ª º (ordinal indicators)
    r'\u02b0-\u02ff'             # Spacing Modifier Letters
    r'\u1d00-\u1dff'             # Phonetic Extensions + Supplement
    r'\u2070-\u209f'             # Superscripts and Subscripts block (⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁱⁿ etc.)
    r'\u1400-\u167f'             # Canadian Aboriginal Syllabics (ᑫ etc. used as citation marks)
    r'\ua720-\ua7ff'             # Latin Extended-D (modifier letters)
    r'\u0370-\u03ff'             # Greek (sometimes used for superscripts)
    r']+'
)

# Common medical stop words to remove
STOPWORDS = {
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'of', 'to', 'for',
    'with', 'by', 'from', 'at', 'on', 'if', 'is', 'as', 'per',
    'y', 'other', 'only', 'not', 'no', 'use', 'consideration',
}


def clean_text(text: str) -> str:
    """
    Remove unicode citations while preserving clinical information.
    Only removes actual citation markers, not meaningful parenthetical content.
    """
    # Remove unicode superscript citations
    cleaned = UNICODE_CITATION_PATTERN.sub('', text)
    
    # Remove common citation patterns like "See ABC-1" or "(ABC-1)" - these are cross-references
    cleaned = re.sub(r'\s*See\s+[A-Z]+-\d+\s*', '', cleaned)
    
    # Remove ONLY citation-style parentheticals (e.g., "(ABC-1)", "(AML-A)")
    # These are cross-references to other guideline pages, not clinical info
    cleaned = re.sub(r'\s*\([A-Z]+-[A-Z0-9]+\)', '', cleaned)
    
    # Remove brackets with guideline references (e.g., "[AML-7]")
    cleaned = re.sub(r'\s*\[[A-Z]+-\d+\]', '', cleaned)
    
    # Remove leading/trailing whitespace
    cleaned = cleaned.strip()
    
    # Collapse multiple spaces
    cleaned = re.sub(r'\s+', ' ', cleaned)
    
    # Final cleanup: remove trailing punctuation and whitespace
    cleaned = cleaned.rstrip(',:;')
    
    return cleaned


def extract_search_terms(text: str) -> Optional[str]:
    """
    Extract core drug names or interventions from cleaned text.
    Returns a simplified search term or None if the text is a condition/decision node.
    """
    cleaned = clean_text(text)
    
    if not cleaned:
        return None
    
    lower_text = cleaned.lower()
    
    # List of known drug names and interventions to look for
    known_drugs = {
        'cytarabine', 'midostaurin', 'quizartinib', 'gemtuzumab', 'daunorubicin',
        'idarubicin', 'mitoxantrone', 'venetoclax', 'azacitidine', 'decitabine',
        'cpx-351', 'flag-ida', 'hct', 'chemotherapy', 'radiation', 'immunotherapy',
        'cabazitaxel', 'docetaxel', 'paclitaxel', 'pembrolizumab', 'nivolumab',
        'atezolizumab', 'durvalumab', 'trastuzumab', 'pertuzumab', 'lapatinib',
        'erlotinib', 'gefitinib', 'afatinib', 'osimertinib', 'alectinib',
        'crizotinib', 'ceritinib', 'bevacizumab', 'ramucirumab', 'lenvatinib',
        'sunitinib', 'sorafenib', 'regorafenib', 'imatinib', 'dasatinib', 'nilotinib',
        'bortezomib', 'carfilzomib', 'ixazomib', 'lenalidomide', 'pomalidomide',
        'thalidomide', 'capecitabine', 'fluorouracil', '5-fu', 'oxaliplatin',
        'irinotecan', 'cisplatin', 'carboplatin', 'rituximab', 'ofatumumab',
        'obinutuzumab', 'alemtuzumab', 'blincyomab', 'blinatumomab',
    }
    
    # Identify likely condition/decision nodes (not treatments)
    condition_keywords = {
        'eligible', 'risk', 'mutation', 'abnormality', 'criteria', 'ineligible',
    }
    
    # If the text contains condition keywords AND no known drugs, it's a decision node
    has_condition_keyword = any(keyword in lower_text for keyword in condition_keywords)
    has_known_drug = any(drug in lower_text for drug in known_drugs)
    
    if has_condition_keyword and not has_known_drug:
        return None
    
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
    
    if search_terms:
        return ' '.join(search_terms)
    
    return None


def process_node(key: str, value: Any, node_id: str = None) -> Dict[str, Any]:
    """
    Recursively process a JSON node into the target structure.
    Preserves all information from the original JSON.
    """
    if node_id is None:
        node_id = f"node_{hash(key) % 100000:05d}"
    
    # Clean the key for display
    label = clean_text(key)
    
    # Determine node type based on context
    node_type = "condition"  # Default
    if "treatment" in label.lower():
        node_type = "treatment"
    elif "maintenance" in label.lower() or "surveillance" in label.lower():
        node_type = "next"
    
    # Compute search term
    search_term = extract_search_terms(label)
    
    # Initialize node
    node = {
        "id": node_id,
        "label": label,
        "type": node_type,
        "search_term": search_term,
        "children": []
    }
    
    # Process value recursively based on type
    if isinstance(value, str):
        # String value becomes a child node with the string as its label
        cleaned_value = clean_text(value)
        if cleaned_value:
            child_node = {
                "id": f"{node_id}_child_0",
                "label": cleaned_value,
                "type": "condition",
                "search_term": extract_search_terms(cleaned_value),
                "children": []
            }
            node["children"].append(child_node)
    
    elif isinstance(value, dict):
        child_id = 0
        for child_key, child_value in value.items():
            child_node = process_node(
                child_key, 
                child_value, 
                f"{node_id}_child_{child_id}"
            )
            node["children"].append(child_node)
            child_id += 1
    
    elif isinstance(value, list):
        # Handle all items in list (strings, dicts, etc.)
        for idx, item in enumerate(value):
            if isinstance(item, str):
                cleaned_item = clean_text(item)
                if cleaned_item:
                    child_node = {
                        "id": f"{node_id}_child_{idx}",
                        "label": cleaned_item,
                        "type": "condition",
                        "search_term": extract_search_terms(cleaned_item),
                        "children": []
                    }
                    node["children"].append(child_node)
            elif isinstance(item, dict):
                # Process each key-value pair in the dict
                for item_key, item_value in item.items():
                    child_node = process_node(
                        item_key,
                        item_value,
                        f"{node_id}_child_{idx}_{hash(item_key) % 10000:04d}"
                    )
                    node["children"].append(child_node)
    
    return node


def load_and_process_trees() -> Dict[str, Dict[str, Any]]:
    """
    Load all JSON files from data/decision_trees/ and process them.
    """
    trees = {}
    tree_dir = Path(__file__).parent / "data" / "decision_trees"
    
    if not tree_dir.exists():
        print(f"Error: {tree_dir} does not exist")
        return trees
    
    # Get all JSON files
    json_files = sorted(tree_dir.glob("*.json"))
    
    for json_file in json_files:
        try:
            # Try multiple encodings for problematic files
            raw_data = None
            for encoding in ['utf-8', 'latin-1', 'iso-8859-1', 'cp1252']:
                try:
                    with open(json_file, 'r', encoding=encoding) as f:
                        raw_data = json.load(f)
                    break
                except (UnicodeDecodeError, json.JSONDecodeError):
                    continue
            
            if raw_data is None:
                print(f"✗ Failed to read {json_file.name}: could not parse with any encoding")
                continue
            
            # Generate a tree key from filename (e.g., "aml_12" -> "AML_Induction")
            stem = json_file.stem
            parts = stem.split('_')
            disease_code = parts[0].upper()
            
            # Map disease codes to full names
            disease_map = {
                'AML': 'AML',
                'BLA': 'B-cell_Lymphomas',
                'BON': 'Bone',
                'BRE': 'Breast',
                'CER': 'Cervical',
                'CML': 'CML',
                'CNS': 'CNS',
                'COL': 'Colorectal',
                'ESO': 'Esophageal',
                'GAS': 'Gastric',
                'HCC': 'Hepatocellular',
                'NSCL': 'NSCLC',
                'PANCREATIC': 'Pancreatic',
                'PROSTATE': 'Prostate',
                'SCLC': 'SCLC',
                'THYROID': 'Thyroid',
                'VULVAR': 'Vulvar',
            }
            
            disease_name = disease_map.get(disease_code, disease_code)
            tree_key = f"{disease_name}_{parts[1] if len(parts) > 1 else 'root'}"
            
            # Process the raw JSON into a tree structure
            if isinstance(raw_data, dict):
                # Get the root node
                root_key = list(raw_data.keys())[0] if raw_data else "root"
                root_value = raw_data.get(root_key, {})
                
                root_node = process_node(root_key, root_value, "node_root")
                
                trees[tree_key] = {"root": root_node}
            
            print(f"✓ Processed {json_file.name} -> {tree_key}")
        
        except json.JSONDecodeError as e:
            print(f"✗ Failed to parse {json_file.name}: {e}")
        except Exception as e:
            print(f"✗ Error processing {json_file.name}: {e}")
    
    return trees


def generate_data_js(trees: Dict[str, Dict[str, Any]]) -> str:
    """
    Generate the data.js JavaScript module.
    """
    js_content = "// Auto-generated data.js from processor.py\n"
    js_content += "// Contains processed NCCN decision trees with search terms\n\n"
    js_content += "const TREES = "
    js_content += json.dumps(trees, indent=2, ensure_ascii=False)
    js_content += ";\n\n"
    js_content += "// Export for use in HTML\n"
    js_content += "if (typeof module !== 'undefined' && module.exports) {\n"
    js_content += "  module.exports = { TREES };\n"
    js_content += "}\n"
    
    return js_content


def main():
    """Main entry point."""
    print("Starting NCCN Decision Tree Processing...\n")
    
    # Process all trees
    trees = load_and_process_trees()
    
    print(f"\nProcessed {len(trees)} decision trees\n")
    
    # Generate data.js
    js_content = generate_data_js(trees)
    
    output_file = Path(__file__).parent / "data.js"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"✓ Generated {output_file}")
    print(f"✓ Total trees: {len(trees)}")
    
    # Show sample of first tree for verification
    if trees:
        first_key = list(trees.keys())[0]
        print(f"\nSample tree ({first_key}):")
        print(json.dumps(trees[first_key], indent=2)[:500] + "...")


if __name__ == "__main__":
    main()
