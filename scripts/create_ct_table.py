import glob
import json
import os
import typing_extensions as typing
from pydantic import BaseModel, Field
from typing import List, Optional, Literal
import google.generativeai as genai

# --- CONFIGURATION ---
# TODO: specific your API Key here or in an environment variable
API_KEY = os.environ.get("GOOGLE_API_KEY", "YOUR_API_KEY_HERE")

# We use 'gemini-1.5-flash' as it is the most cost-effective model for this task
MODEL_NAME = "gemini-2.5-flash" 

# Configure the SDK
genai.configure(api_key=API_KEY)

# --- STEP 1: DEFINE THE OUTPUT SCHEMA (The Contract) ---
# These Pydantic models define exactly what the AI must return.
# This ensures your "Traffic Light" logic (Positive/Negative) always works.

class Outcome(BaseModel):
    measure: str = Field(..., description="Name of the outcome measure (e.g., 'Overall Survival')")
    p_value: Optional[float] = Field(None, description="The statistical p-value if available")
    stat_result: str = Field(..., description="Summary of the result (e.g., '11.4m vs 10.5m, HR 0.98')")
    significance: Literal["Significant", "Not Significant", "Unknown"]

class TrialExtraction(BaseModel):
    nct_id: str
    official_title: str
    experimental_drugs: List[str] = Field(..., description="List of experimental drugs tested (exclude control/backbone unless specific)")
    biomarkers: List[str] = Field(..., description="List of inclusion biomarkers (e.g., 'EGFR', 'ALK'). Use 'Unselected' if none.")
    
    primary_outcomes: List[Outcome]
    
    efficacy_status: Literal["POSITIVE", "NEGATIVE", "MIXED", "UNCERTAIN"] = Field(
        ..., 
        description="POSITIVE: Met primary endpoint. NEGATIVE: Failed primary endpoint. MIXED: Conflicting results. UNCERTAIN: No results."
    )
    
    reasoning: str = Field(..., description="Brief explanation for the efficacy status.")

# --- STEP 2: PRUNING UTILITY (Cost Saver) ---
def prune_trial_json(trial_data: dict) -> dict:
    """
    Strips ~70% of the JSON (admin data, safety tables, detailed flows) 
    to reduce AI token costs and noise.
    """
    pruned = {}
    
    # 1. Identification (Context)
    proto = trial_data.get('protocolSection', {})
    ident = proto.get('identificationModule', {})
    pruned['id_info'] = {
        'nctId': ident.get('nctId'),
        'briefTitle': ident.get('briefTitle'),
        'officialTitle': ident.get('officialTitle')
    }
    
    # 2. Arms (Drug Names)
    arms = proto.get('armsInterventionsModule', {})
    pruned['arms'] = arms.get('armGroups')
    pruned['interventions'] = arms.get('interventions')
    
    # 3. Eligibility (Biomarkers lie here)
    elig = proto.get('eligibilityModule', {})
    pruned['eligibility'] = {
        'criteria': elig.get('eligibilityCriteria'), # The text blob with "Inclusion Criteria"
        'gender': elig.get('sex'),
        'minAge': elig.get('minimumAge')
    }
    
    # 4. Results (Outcomes)
    results = trial_data.get('resultsSection', {})
    outcomes_mod = results.get('outcomeMeasuresModule', {})
    all_outcomes = outcomes_mod.get('outcomeMeasures', [])
    
    relevant_outcomes = []
    for out in all_outcomes:
        t_upper = out.get('title', '').upper()
        # Keep Primary endpoints OR those mentioning key survival metrics
        # This filters out minor secondary endpoints (like PK/PD) to save tokens
        if (out.get('type') == 'PRIMARY' or 
            'SURVIVAL' in t_upper or 
            'PROGRESSION' in t_upper or 
            'RESPONSE' in t_upper):
            relevant_outcomes.append(out)
            
    pruned['outcomes'] = relevant_outcomes
    
    return pruned

# --- STEP 3: AI ANALYSIS FUNCTION ---
def extract_trial_data(trial_json: dict) -> TrialExtraction:
    """
    1. Prunes the raw JSON.
    2. Sends it to Gemini Flash.
    3. Validates the response against the Pydantic schema.
    """
    
    # A. Prune Data
    pruned_data = prune_trial_json(trial_json)
    
    # B. Prepare the Prompt
    # We instruct the model to act as a Bioinformatics Curator.
    prompt = """
    You are an expert oncologist and data curator. Extract key data from this NSCLC clinical trial.
    
    TASKS:
    1. Experimental Drugs: Identify the specific drug being tested. Ignore standard chemo backbones.
    2. Biomarkers: Look at eligibility criteria. Extract genes (EGFR, ALK, KRAS, ROS1, PD-L1). If none, return ["Unselected"].
    3. Efficacy Analysis:
       - POSITIVE: Primary endpoint met significance (p < 0.05).
       - NEGATIVE: Primary endpoint failed (p >= 0.05) or CI crosses 1.0/0.
       - MIXED: Contradictory primary endpoints.
       - UNCERTAIN: No results reported.
    
    Input Data:
    """
    
    # C. Call Gemini
    model = genai.GenerativeModel(
        model_name=MODEL_NAME,
        system_instruction=prompt,
        generation_config={
            "response_mime_type": "application/json",
            "response_schema": TrialExtraction
        }
    )
    
    try:
        response = model.generate_content(json.dumps(pruned_data))
        
        # D. Parse & Validate
        # Since we enforced response_schema, response.text is guaranteed to be valid JSON structure.
        return TrialExtraction.model_validate_json(response.text)
        
    except Exception as e:
        print(f"Error processing {pruned_data['id_info']['nctId']}: {e}")
        # Return a dummy object or raise depending on your pipeline needs
        return None

# --- MAIN EXECUTION BLOCK ---
if __name__ == "__main__":
    # Run the pipeline
    if API_KEY == "YOUR_API_KEY_HERE":
        print("CRITICAL WARNING: You must set the API_KEY variable or GOOGLE_API_KEY env var.")
        print("The script will now prune the data but FAIL on the AI step.")

    # SAMPLE DATA (The raw JSON you provided earlier)
    # In production, you would loop through your directory of files:
    for filename in glob.glob("data/ctg-studies/*.json"):
        with open(filename, 'r') as f:
            raw_sample_json_str = f.read()
    
            trial_data = json.loads(raw_sample_json_str)
            
            # If no API key is set, we can still show you the Pruning working
            if API_KEY == "YOUR_API_KEY_HERE":
                pruned = prune_trial_json(trial_data)
                print(f"Pruning successful! Reduced payload to {len(json.dumps(pruned))} chars.")
            else:
                result = extract_trial_data(trial_data)
                if result:
                    print("\n--- GEMINI EXTRACTION COMPLETE ---\n")
                    print(result.model_dump_json(indent=2))
