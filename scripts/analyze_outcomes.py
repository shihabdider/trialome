#!/usr/bin/env python3
"""
Analyze outcome data across clinical trials in ctg-studies.
Generates a CSV summary with outcome metrics found in each trial.
"""

import json
import os
import csv
import re
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Set, Tuple

# Keywords that indicate safety/adverse event measures - exclude these from efficacy columns
SAFETY_KEYWORDS = {
    'trae', 'sae', 'adverse event', 'adverse events', 'ae ', ' ae(',
    'discontinuation', 'toxicity', 'adverse reaction', 'immune-mediated'
}

# Standard oncology outcome metrics to look for
# Use more restrictive matching with word boundaries to avoid false matches
STANDARD_OUTCOMES = {
    'OS': ['overall survival', ' os ', ' os(', ' os)', 'os '],
    'PFS': ['progression-free survival', ' pfs ', ' pfs)', 'pfs ', 'progression free survival'],
    'DFS': ['disease-free survival', ' dfs ', ' dfs)', 'dfs ', 'disease free survival'],
    'RR': ['response rate', ' rr ', ' rr('],
    'ORR': ['objective response rate', ' orr ', ' orr)', 'orr ', ' orr('],
    'TTP': ['time to progression', ' ttp ', ' ttp)', 'ttp '],
    'TTF': ['time to treatment failure', ' ttf ', ' ttf)', 'ttf '],
    'EFS': ['event-free survival', ' efs ', ' efs)', 'efs '],
    'LRFS': ['locoregional recurrence-free survival', ' lrfs ', ' lrfs)', 'lrfs '],
    'DMFS': ['distant metastasis-free survival', ' dmfs ', ' dmfs)', 'dmfs '],
    'CR': ['complete response', ' cr ', ' cr)', ' cr('],
    'PR': ['partial response', ' pr ', ' pr)', ' pr('],
    'DoR': ['duration of response', ' dor ', ' dor)', 'dor '],
    'CBR': ['clinical benefit rate', ' cbr ', ' cbr)', 'cbr '],
    'TOX': ['toxicity', 'safety', 'adverse events', ' ae'],
    'QOL': ['quality of life', ' qol ', 'qol '],
}

def normalize_outcome_text(text: str) -> str:
    """Normalize outcome measure text for comparison."""
    if not text:
        return ""
    return text.lower().strip()

def is_safety_measure(text: str) -> bool:
    """Check if a measure is a safety/adverse event measure."""
    if not text:
        return False
    normalized = normalize_outcome_text(text)
    for keyword in SAFETY_KEYWORDS:
        if keyword in normalized:
            return True
    return False

def identify_outcome_type(measure_text: str) -> Set[str]:
    """Identify which standard outcome types are mentioned in the measure text."""
    if not measure_text:
        return set()
    
    normalized = normalize_outcome_text(measure_text)
    identified = set()
    
    for outcome_key, keywords in STANDARD_OUTCOMES.items():
        for keyword in keywords:
            if keyword in normalized:
                identified.add(outcome_key)
                break  # Only add once per outcome type
    
    return identified

def format_outcome_measure(outcome: Dict) -> str:
    """
    Format a single outcome measure with available data.
    Returns empty string if no measurement data exists or value is NA.
    Only includes title, param type, unit, and measured value.
    """
    title = outcome.get('title', '')
    param_type = outcome.get('paramType', '')
    unit = outcome.get('unitOfMeasure', '')
    
    # Try to get the first measurement value if available
    value_str = ""
    
    if 'classes' in outcome and outcome['classes']:
        if 'categories' in outcome['classes'][0] and outcome['classes'][0]['categories']:
            cat = outcome['classes'][0]['categories'][0]
            if 'measurements' in cat and cat['measurements']:
                m = cat['measurements'][0]
                value = m.get('value', '')
                lower = m.get('lowerLimit', '')
                upper = m.get('upperLimit', '')
                
                # Skip NA values - check comment field for explanation
                if value and value.strip().upper() != 'NA':
                    if lower and upper and lower.strip().upper() != 'NA' and upper.strip().upper() != 'NA':
                        value_str = f"{value} [{lower}-{upper}]"
                    elif lower and lower.strip().upper() != 'NA' and upper and upper.strip().upper() != 'NA':
                        value_str = f"{value} [{lower}-{upper}]"
                    else:
                        value_str = f"{value}"
    
    # Only return formatted measure if we have actual measurement data
    if not value_str:
        return ""
    
    # Build final text only with actual measurements
    parts = [title]
    if param_type:
        parts.append(f"({param_type})")
    if unit:
        parts.append(unit)
    parts.append(f"= {value_str}")
    
    return " ".join(parts)

def extract_outcomes_from_trial(trial_data: Dict) -> Tuple[List[str], List[str]]:
    """
    Extract primary and secondary outcome measures from trial data.
    Prefers actual results data from outcomeMeasuresModule, falls back to protocol.
    Returns (primary_outcomes, secondary_outcomes) as lists of measure texts.
    """
    primary = []
    secondary = []
    
    # Try resultsSection with outcomeMeasuresModule first (actual results data)
    if 'resultsSection' in trial_data:
        if 'outcomeMeasuresModule' in trial_data['resultsSection']:
            om = trial_data['resultsSection']['outcomeMeasuresModule']
            if 'outcomeMeasures' in om:
                for outcome in om['outcomeMeasures']:
                    measure_text = format_outcome_measure(outcome)
                    
                    outcome_type = outcome.get('type', '').upper()
                    if outcome_type == 'PRIMARY':
                        primary.append(measure_text)
                    elif outcome_type == 'SECONDARY':
                        secondary.append(measure_text)
    
    # Fall back to protocolSection outcomes if results data not found
    if not primary and not secondary:
        if 'protocolSection' in trial_data:
            if 'outcomesModule' in trial_data['protocolSection']:
                outcomes = trial_data['protocolSection']['outcomesModule']
                if 'primaryOutcomes' in outcomes:
                    primary = [o.get('measure', '') for o in outcomes['primaryOutcomes']]
                if 'secondaryOutcomes' in outcomes:
                    secondary = [o.get('measure', '') for o in outcomes['secondaryOutcomes']]
    
    return primary, secondary

def extract_measures_for_outcome_type(outcome_key: str, primary_outcomes: List[str], secondary_outcomes: List[str]) -> str:
    """
    Extract actual measure text that matches a specific outcome type.
    Excludes safety measures from efficacy outcome columns.
    Returns concatenated measures as string.
    """
    # Skip safety measures unless we're explicitly looking for TOX
    keywords = STANDARD_OUTCOMES[outcome_key]
    matching_measures = []
    
    all_outcomes = primary_outcomes + secondary_outcomes
    for measure in all_outcomes:
        if not measure:
            continue
        
        # Exclude safety measures from non-TOX columns
        if outcome_key != 'TOX' and is_safety_measure(measure):
            continue
        
        # Also exclude non-safety-related measures from TOX column
        if outcome_key == 'TOX' and is_safety_measure(measure) == False:
            continue
        
        normalized = normalize_outcome_text(measure)
        for keyword in keywords:
            if keyword in normalized:
                matching_measures.append(measure)
                break
    
    return '; '.join(matching_measures) if matching_measures else ""

def process_trial_files(data_dir: str) -> List[Dict]:
    """
    Process all trial JSON files and extract outcome information.
    Returns list of dicts with trial metadata and actual outcome measures.
    """
    results = []
    
    # Get all JSON files
    json_files = sorted(Path(data_dir).glob('*.json'))
    
    for json_file in json_files:
        trial_id = json_file.stem  # Filename without .json
        
        try:
            with open(json_file, 'r') as f:
                trial_data = json.load(f)
            
            # Extract outcomes
            primary_outcomes, secondary_outcomes = extract_outcomes_from_trial(trial_data)
            
            # Get trial title if available
            title = ""
            if 'protocolSection' in trial_data:
                if 'identificationModule' in trial_data['protocolSection']:
                    title = trial_data['protocolSection']['identificationModule'].get('briefTitle', '')
            
            # Create result entry
            result = {
                'Trial_ID': trial_id,
                'Title': title[:100],  # Truncate for CSV readability
                'Has_Outcome_Data': len(primary_outcomes) > 0 or len(secondary_outcomes) > 0,
                'Primary_Outcome_Count': len(primary_outcomes),
                'Secondary_Outcome_Count': len(secondary_outcomes),
                'Primary_Outcomes': '; '.join(primary_outcomes) if primary_outcomes else "",
                'Secondary_Outcomes': '; '.join(secondary_outcomes) if secondary_outcomes else "",
            }
            
            # Add actual measure text for each outcome type
            for outcome_key in STANDARD_OUTCOMES.keys():
                measure_text = extract_measures_for_outcome_type(outcome_key, primary_outcomes, secondary_outcomes)
                result[outcome_key] = measure_text
            
            results.append(result)
        
        except Exception as e:
            print(f"Error processing {json_file.name}: {e}")
            continue
    
    return results

def generate_summary_stats(results: List[Dict]) -> Dict:
    """Generate summary statistics from the results."""
    stats = {
        'total_trials': len(results),
        'trials_with_outcome_data': sum(1 for r in results if r['Has_Outcome_Data']),
        'outcome_type_counts': {}
    }
    
    # Count each outcome type (present if there's non-empty measure text)
    for outcome_key in STANDARD_OUTCOMES.keys():
        count = sum(1 for r in results if r[outcome_key] and r[outcome_key].strip())
        stats['outcome_type_counts'][outcome_key] = count
    
    return stats

def main():
    data_dir = "/Users/user1/projects/trialome/data/ctg-studies"
    output_csv = "/Users/user1/projects/trialome/scripts/trial_outcomes_summary.csv"
    
    print(f"Processing trials from {data_dir}...")
    results = process_trial_files(data_dir)
    
    print(f"Analyzed {len(results)} trials.")
    
    # Generate summary stats
    stats = generate_summary_stats(results)
    print(f"\n=== SUMMARY STATISTICS ===")
    print(f"Total trials: {stats['total_trials']}")
    print(f"Trials with outcome data: {stats['trials_with_outcome_data']} ({100*stats['trials_with_outcome_data']/stats['total_trials']:.1f}%)")
    print(f"\nOutcome Type Frequencies:")
    for outcome_key in sorted(STANDARD_OUTCOMES.keys()):
        count = stats['outcome_type_counts'][outcome_key]
        pct = 100 * count / stats['total_trials']
        print(f"  {outcome_key:6s}: {count:3d} trials ({pct:5.1f}%)")
    
    # Write CSV
    print(f"\nWriting CSV to {output_csv}...")
    
    fieldnames = [
        'Trial_ID', 'Title', 'Has_Outcome_Data',
        'Primary_Outcome_Count', 'Secondary_Outcome_Count',
        'Primary_Outcomes', 'Secondary_Outcomes'
    ] + sorted(STANDARD_OUTCOMES.keys())
    
    with open(output_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        # Sort by whether data exists and then by trial ID
        sorted_results = sorted(
            results,
            key=lambda x: (not x['Has_Outcome_Data'], x['Trial_ID'])
        )
        
        for result in sorted_results:
            writer.writerow(result)
    
    print(f"✓ CSV written successfully with {len(results)} trials")
    print(f"✓ CSV file: {output_csv}")

if __name__ == '__main__':
    main()
