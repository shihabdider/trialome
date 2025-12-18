#!/usr/bin/env python3
"""
Generate a comprehensive CSV table of clinical trials data from ctg-studies.
Includes trial metadata, outcomes, design info, and other useful information.
"""

import json
import os
import csv
import re
from pathlib import Path
from typing import Dict, List, Set, Tuple
from collections import defaultdict

# Keywords that indicate safety/adverse event measures
SAFETY_KEYWORDS = {
    'trae', 'sae', 'adverse event', 'adverse events', 'ae ', ' ae(',
    'discontinuation', 'toxicity', 'adverse reaction', 'immune-mediated'
}

# Standard oncology outcome metrics
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


def normalize_text(text: str) -> str:
    """Normalize text for comparison."""
    if not text:
        return ""
    return text.lower().strip()


def is_safety_measure(text: str) -> bool:
    """Check if a measure is a safety/adverse event measure."""
    if not text:
        return False
    normalized = normalize_text(text)
    for keyword in SAFETY_KEYWORDS:
        if keyword in normalized:
            return True
    return False


def format_outcome_measure(outcome: Dict) -> str:
    """Format a single outcome measure with available data."""
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
                
                if value and value.strip().upper() != 'NA':
                    if lower and upper and lower.strip().upper() != 'NA' and upper.strip().upper() != 'NA':
                        value_str = f"{value} [{lower}-{upper}]"
                    else:
                        value_str = f"{value}"
    
    if not value_str:
        return ""
    
    parts = [title]
    if param_type:
        parts.append(f"({param_type})")
    if unit:
        parts.append(unit)
    parts.append(f"= {value_str}")
    
    return " ".join(parts)


def extract_outcomes_from_trial(trial_data: Dict) -> Tuple[List[str], List[str]]:
    """Extract primary and secondary outcome measures from trial data."""
    primary = []
    secondary = []
    
    # Try resultsSection first
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
    
    # Fall back to protocolSection
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
    """Extract actual measure text that matches a specific outcome type."""
    keywords = STANDARD_OUTCOMES[outcome_key]
    matching_measures = []
    
    all_outcomes = primary_outcomes + secondary_outcomes
    for measure in all_outcomes:
        if not measure:
            continue
        
        if outcome_key != 'TOX' and is_safety_measure(measure):
            continue
        
        if outcome_key == 'TOX' and is_safety_measure(measure) == False:
            continue
        
        normalized = normalize_text(measure)
        for keyword in keywords:
            if keyword in normalized:
                matching_measures.append(measure)
                break
    
    return '; '.join(matching_measures) if matching_measures else ""


def safe_get(d: Dict, *keys):
    """Safely navigate nested dictionaries."""
    if not d:
        return None
    for key in keys:
        if isinstance(d, dict) and key in d:
            d = d[key]
        else:
            return None
    return d


def extract_trial_data(trial_data: Dict, trial_id: str) -> Dict:
    """Extract comprehensive trial data into a dictionary."""
    result = {
        'Trial_ID': trial_id,
    }
    
    protocol = safe_get(trial_data, 'protocolSection')
    if not protocol:
        return result
    
    # Identification Module
    id_module = safe_get(protocol, 'identificationModule')
    if id_module:
        result['Title'] = id_module.get('briefTitle', '')[:150]
        result['Official_Title'] = id_module.get('officialTitle', '')[:200]
        result['Organization'] = safe_get(id_module, 'organization', 'fullName') or ''
    
    # Status Module
    status_module = safe_get(protocol, 'statusModule')
    if status_module:
        result['Overall_Status'] = status_module.get('overallStatus', '')
        result['Start_Date'] = safe_get(status_module, 'startDateStruct', 'date') or ''
        result['Primary_Completion_Date'] = safe_get(status_module, 'primaryCompletionDateStruct', 'date') or ''
        result['Completion_Date'] = safe_get(status_module, 'completionDateStruct', 'date') or ''
    
    # Design Module
    design_module = safe_get(protocol, 'designModule')
    if design_module:
        result['Study_Type'] = design_module.get('studyType', '')
        phases = design_module.get('phases', [])
        result['Study_Phase'] = '; '.join(phases) if phases else ''
        result['Enrollment'] = design_module.get('enrollment', '')
        result['Masking'] = design_module.get('masking', '')
        result['Allocation'] = design_module.get('allocation', '')
    
    # Conditions Module
    conditions_module = safe_get(protocol, 'conditionsModule')
    if conditions_module:
        conditions = conditions_module.get('conditions', [])
        result['Primary_Condition'] = conditions[0][:100] if conditions else ''
        result['All_Conditions'] = '; '.join(conditions[:3]) if conditions else ''
        result['Condition_Count'] = len(conditions)
    
    # Sponsor/Collaborators Module
    sponsor_module = safe_get(protocol, 'sponsorCollaboratorsModule')
    if sponsor_module:
        lead_sponsor = safe_get(sponsor_module, 'leadSponsor')
        if lead_sponsor:
            result['Lead_Sponsor'] = lead_sponsor.get('name', '')
            result['Lead_Sponsor_Type'] = lead_sponsor.get('class', '')
    
    # Arms/Interventions Module
    arms_module = safe_get(protocol, 'armsInterventionsModule')
    if arms_module:
        arm_groups = arms_module.get('armGroups', [])
        result['Num_Arms'] = len(arm_groups)
        
        interventions = arms_module.get('interventions', [])
        result['Num_Interventions'] = len(interventions)
        intervention_types = set()
        for interv in interventions:
            itype = interv.get('type')
            if itype:
                intervention_types.add(itype)
        result['Intervention_Types'] = '; '.join(sorted(intervention_types))
    
    # Eligibility Module
    eligibility_module = safe_get(protocol, 'eligibilityModule')
    if eligibility_module:
        result['Gender'] = eligibility_module.get('gender', '')
        result['Accepts_Healthy_Volunteers'] = eligibility_module.get('acceptsHealthyVolunteers', '')
    
    # Outcomes Module
    outcomes_module = safe_get(protocol, 'outcomesModule')
    if outcomes_module:
        primary_outcomes = outcomes_module.get('primaryOutcomes', [])
        secondary_outcomes = outcomes_module.get('secondaryOutcomes', [])
        result['Primary_Outcome_Count'] = len(primary_outcomes)
        result['Secondary_Outcome_Count'] = len(secondary_outcomes)
    
    # Extract actual outcome measures (from results or protocol)
    primary_outcomes, secondary_outcomes = extract_outcomes_from_trial(trial_data)
    result['Has_Outcome_Data'] = len(primary_outcomes) > 0 or len(secondary_outcomes) > 0
    result['Primary_Outcomes'] = '; '.join(primary_outcomes) if primary_outcomes else ""
    result['Secondary_Outcomes'] = '; '.join(secondary_outcomes) if secondary_outcomes else ""
    
    # Add standard outcome type columns
    for outcome_key in STANDARD_OUTCOMES.keys():
        measure_text = extract_measures_for_outcome_type(outcome_key, primary_outcomes, secondary_outcomes)
        result[f'Outcome_{outcome_key}'] = measure_text
    
    # Results section info
    has_results = trial_data.get('hasResults', False)
    result['Has_Results'] = 'Yes' if has_results else 'No'
    
    return result


def process_trial_files(data_dir: str) -> List[Dict]:
    """Process all trial JSON files and extract comprehensive data."""
    results = []
    json_files = sorted(Path(data_dir).glob('*.json'))
    
    total = len(json_files)
    for idx, json_file in enumerate(json_files):
        trial_id = json_file.stem
        
        try:
            with open(json_file, 'r') as f:
                trial_data = json.load(f)
            
            result = extract_trial_data(trial_data, trial_id)
            results.append(result)
            
            if (idx + 1) % 50 == 0:
                print(f"  Processed {idx + 1}/{total} trials...")
        
        except Exception as e:
            print(f"Error processing {json_file.name}: {e}")
            continue
    
    return results


def main():
    data_dir = "/Users/user1/projects/trialome/data/ctg-studies"
    output_csv = "/Users/user1/projects/trialome/scripts/clinical_trials_summary.csv"
    
    print(f"Processing trials from {data_dir}...")
    results = process_trial_files(data_dir)
    
    print(f"\nAnalyzed {len(results)} trials.")
    
    # Build fieldnames in logical order
    base_fields = [
        'Trial_ID',
        'Title',
        'Official_Title',
        'Organization',
        'Lead_Sponsor',
        'Lead_Sponsor_Type',
        'Overall_Status',
        'Start_Date',
        'Primary_Completion_Date',
        'Completion_Date',
        'Study_Type',
        'Study_Phase',
        'Enrollment',
        'Masking',
        'Allocation',
        'Primary_Condition',
        'All_Conditions',
        'Condition_Count',
        'Num_Arms',
        'Num_Interventions',
        'Intervention_Types',
        'Gender',
        'Accepts_Healthy_Volunteers',
        'Primary_Outcome_Count',
        'Secondary_Outcome_Count',
        'Has_Outcome_Data',
        'Has_Results',
        'Primary_Outcomes',
        'Secondary_Outcomes',
    ]
    
    # Add outcome type columns
    outcome_fields = [f'Outcome_{key}' for key in sorted(STANDARD_OUTCOMES.keys())]
    
    fieldnames = base_fields + outcome_fields
    
    # Filter to only fields that exist in results
    if results:
        available_fields = set(results[0].keys())
        fieldnames = [f for f in fieldnames if f in available_fields]
    
    print(f"\nWriting CSV to {output_csv}...")
    
    with open(output_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        # Sort by Trial_ID
        sorted_results = sorted(results, key=lambda x: x.get('Trial_ID', ''))
        
        for result in sorted_results:
            writer.writerow(result)
    
    print(f"✓ CSV written successfully with {len(results)} trials")
    print(f"✓ CSV file: {output_csv}")
    print(f"✓ Columns: {len(fieldnames)}")
    
    # Print summary statistics
    print(f"\n=== SUMMARY STATISTICS ===")
    trials_with_results = sum(1 for r in results if r.get('Has_Results') == 'Yes')
    trials_with_outcomes = sum(1 for r in results if r.get('Has_Outcome_Data'))
    print(f"Trials with results: {trials_with_results}/{len(results)}")
    print(f"Trials with outcome data: {trials_with_outcomes}/{len(results)}")


if __name__ == '__main__':
    main()
