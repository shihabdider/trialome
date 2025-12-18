import glob
import json
import os
import csv
import time
from google import genai

# --- CONFIGURATION ---
API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_API_KEY_HERE")
MODEL_NAME = "gemini-2.5-flash"

# Configure the SDK
client = genai.Client(api_key=API_KEY)

# --- STEP 1: PRUNING UTILITY (Cost Saver) ---
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
        'criteria': elig.get('eligibilityCriteria'),
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
        if (out.get('type') == 'PRIMARY' or 
            'SURVIVAL' in t_upper or 
            'PROGRESSION' in t_upper or 
            'RESPONSE' in t_upper):
            relevant_outcomes.append(out)
            
    pruned['outcomes'] = relevant_outcomes
    
    return pruned

# --- STEP 2: BUILD JSONL FILE FOR BATCH ---
# --- BATCH SIZE CONFIG ---
BATCH_SIZE = 200  # Stay well under 3M token limit per batch

def build_batch_jsonl_files(trial_files: list, output_prefix: str = "batch_requests") -> tuple:
    """
    Build multiple JSONL files for batch API, split into chunks.
    Returns (list of jsonl file paths, dict mapping request keys to trial metadata).
    """
    prompt_template = """You are an expert oncologist and data curator. Extract key data from this NSCLC clinical trial.

TASKS:
1. Experimental Drugs: Identify the specific drug being tested. Ignore standard chemo backbones. Return as a list.
2. Biomarkers: Look at eligibility criteria. Extract genes (EGFR, ALK, KRAS, ROS1, PD-L1). If none, return ["Unselected"]. Return as a list.
3. Efficacy Analysis:
   - POSITIVE: Primary endpoint met significance (p < 0.05).
   - NEGATIVE: Primary endpoint failed (p >= 0.05) or CI crosses 1.0/0.
   - MIXED: Contradictory primary endpoints.
   - UNCERTAIN: No results reported.

Return ONLY valid JSON with these exact keys:
{
  "experimental_drugs": ["string"],
  "biomarkers": ["string"],
  "primary_outcomes_summary": "string summary of outcomes",
  "efficacy_status": "POSITIVE|NEGATIVE|MIXED|UNCERTAIN",
  "reasoning": "brief explanation"
}

Input Data:"""
    
    metadata_map = {}
    batch_files = []
    
    # Split trial_files into chunks
    chunks = [trial_files[i:i + BATCH_SIZE] for i in range(0, len(trial_files), BATCH_SIZE)]
    
    for batch_idx, chunk in enumerate(chunks):
        jsonl_path = f"{output_prefix}_{batch_idx + 1}.jsonl"
        batch_files.append(jsonl_path)
        
        with open(jsonl_path, 'w') as f:
            for filename in chunk:
                nct_id = filename.split('/')[-1].replace('.json', '')
                
                try:
                    with open(filename, 'r') as trial_file:
                        trial_data = json.load(trial_file)
                    
                    pruned_data = prune_trial_json(trial_data)
                    official_title = pruned_data['id_info'].get('officialTitle', 'UNKNOWN')
                    
                    # Create JSONL request line
                    request_key = f"request-{nct_id}"
                    request_line = {
                        "key": request_key,
                        "request": {
                            "contents": [{
                                "parts": [{
                                    "text": prompt_template + "\n" + json.dumps(pruned_data, indent=2)
                                }],
                                "role": "user"
                            }]
                        }
                    }
                    
                    # Write to JSONL (one JSON object per line)
                    f.write(json.dumps(request_line) + '\n')
                    
                    # Store metadata for later lookup
                    metadata_map[request_key] = {
                        'nct_id': nct_id,
                        'official_title': official_title
                    }
                    
                except Exception as e:
                    print(f"Error loading {nct_id}: {e}")
        
        print(f"  ✓ Batch {batch_idx + 1}: {len(chunk)} trials -> {jsonl_path}")
    
    return batch_files, metadata_map

# --- STEP 3: UPLOAD JSONL FILE ---
def upload_batch_file(jsonl_path: str):
    """Upload JSONL file using File API."""
    from google.genai import types
    print(f"Uploading batch file: {jsonl_path}")
    uploaded_file = client.files.upload(
        file=jsonl_path,
        config=types.UploadFileConfig(mime_type="application/jsonl")
    )
    print(f"✓ File uploaded: {uploaded_file.name}")
    return uploaded_file

# --- STEP 4: CREATE AND SUBMIT BATCH JOB ---
def create_batch_job(uploaded_file, display_name: str):
    """Create batch job from uploaded file."""
    print(f"Creating batch job: {display_name}")
    batch_job = client.batches.create(
        model=MODEL_NAME,
        src=uploaded_file.name,
        config={
            'display_name': display_name
        }
    )
    print(f"✓ Batch job created: {batch_job.name}")
    return batch_job

# --- STEP 5: POLL JOB STATUS ---
def poll_batch_status(batch_job, max_wait_minutes: int = 1440):
    """Poll batch job status until completion."""
    start_time = time.time()
    max_wait_seconds = max_wait_minutes * 60
    poll_count = 0
    
    print(f"Job name: {batch_job.name}")
    print("Polling every 30 seconds (Ctrl+C to stop and resume later)...")
    print("-" * 60)
    
    while True:
        batch_job = client.batches.get(name=batch_job.name)
        state_name = batch_job.state.name if hasattr(batch_job.state, 'name') else str(batch_job.state)
        elapsed = time.time() - start_time
        elapsed_str = f"{int(elapsed // 60)}m {int(elapsed % 60)}s"
        
        # Try to get batch stats if available
        stats_str = ""
        if hasattr(batch_job, 'batch_stats') and batch_job.batch_stats:
            stats = batch_job.batch_stats
            total = getattr(stats, 'total_request_count', 0)
            succeeded = getattr(stats, 'succeeded_request_count', 0)
            failed = getattr(stats, 'failed_request_count', 0)
            if total > 0:
                stats_str = f" | Progress: {succeeded + failed}/{total} ({succeeded} ✓, {failed} ✗)"
        
        print(f"[{elapsed_str}] State: {state_name}{stats_str}")
        
        if state_name in ['JOB_STATE_SUCCEEDED', 'JOB_STATE_FAILED', 'JOB_STATE_CANCELLED', 'JOB_STATE_EXPIRED']:
            print("-" * 60)
            return batch_job
        
        if time.time() - start_time > max_wait_seconds:
            print(f"Batch processing timed out after {max_wait_minutes} minutes")
            return batch_job
        
        time.sleep(30)  # Poll every 30 seconds
        poll_count += 1

# --- STEP 6: RETRIEVE AND PARSE RESULTS ---
def process_batch_results(batch_job, metadata_map: dict, output_csv: str):
    """Retrieve results from completed batch and write to CSV."""
    state_name = batch_job.state.name if hasattr(batch_job.state, 'name') else str(batch_job.state)
    
    if state_name != 'JOB_STATE_SUCCEEDED':
        print(f"Batch job did not succeed. Final state: {state_name}")
        return 0
    
    # Open CSV file in append mode (in case of earlier writes)
    csvfile = open(output_csv, 'a', newline='', encoding='utf-8')
    
    fieldnames = [
        "NCT_ID",
        "Official Title",
        "Experimental Drugs",
        "Biomarkers",
        "Primary Outcomes",
        "Efficacy Status",
        "Reasoning"
    ]
    
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    
    success_count = 0
    
    try:
        # Results are in a file
        if batch_job.dest and batch_job.dest.file_name:
            print(f"Downloading results from: {batch_job.dest.file_name}")
            
            # Download file content
            file_content_bytes = client.files.download(file=batch_job.dest.file_name)
            file_content = file_content_bytes.decode('utf-8')
            
            # Parse JSONL results (one JSON per line)
            for line in file_content.splitlines():
                if not line.strip():
                    continue
                
                try:
                    result_obj = json.loads(line)
                    request_key = result_obj.get('key', '')
                    
                    # Get metadata for this request
                    request_meta = metadata_map.get(request_key, {})
                    nct_id = request_meta.get('nct_id', 'UNKNOWN')
                    official_title = request_meta.get('official_title', 'UNKNOWN')
                    
                    # Check if this is an error response
                    if 'error' in result_obj:
                        print(f"✗ {nct_id} (API error: {result_obj['error']})")
                        continue
                    
                    # Parse response - batch API returns response directly
                    response = result_obj.get('response', {})
                    
                    # Extract text from response candidates
                    candidates = response.get('candidates', [])
                    if not candidates:
                        print(f"✗ {nct_id} (no candidates in response)")
                        continue
                    
                    candidate = candidates[0]
                    content = candidate.get('content', {})
                    parts = content.get('parts', [])
                    
                    if not parts:
                        print(f"✗ {nct_id} (no parts in response)")
                        continue
                    
                    response_text = parts[0].get('text', '')
                    
                    # Extract JSON if wrapped in markdown
                    if "```json" in response_text:
                        response_text = response_text.split("```json")[1].split("```")[0]
                    elif "```" in response_text:
                        response_text = response_text.split("```")[1].split("```")[0]
                    
                    trial_data = json.loads(response_text.strip())
                    
                    # Flatten and write to CSV
                    drugs = "; ".join(trial_data.get('experimental_drugs', [])) if trial_data.get('experimental_drugs') else ""
                    biomarkers = "; ".join(trial_data.get('biomarkers', [])) if trial_data.get('biomarkers') else ""
                    outcomes = trial_data.get('primary_outcomes_summary', '')
                    
                    row = {
                        "NCT_ID": nct_id,
                        "Official Title": official_title,
                        "Experimental Drugs": drugs,
                        "Biomarkers": biomarkers,
                        "Primary Outcomes": outcomes,
                        "Efficacy Status": trial_data.get('efficacy_status', 'UNKNOWN'),
                        "Reasoning": trial_data.get('reasoning', '')
                    }
                    
                    writer.writerow(row)
                    csvfile.flush()
                    success_count += 1
                    print(f"✓ {nct_id}")
                    
                except json.JSONDecodeError as e:
                    print(f"✗ JSON parse error: {e}")
                except Exception as e:
                    print(f"✗ Error processing result: {e}")
        
        else:
            # Results are inline (for smaller batches)
            print("Retrieving inline results...")
            if hasattr(batch_job, 'inlined_responses') and batch_job.inlined_responses:
                for inline_response in batch_job.inlined_responses:
                    # Similar parsing as above
                    pass
    
    finally:
        csvfile.close()
    
    return success_count

# --- MAIN EXECUTION BLOCK ---
if __name__ == "__main__":
    if API_KEY == "YOUR_API_KEY_HERE":
        print("CRITICAL WARNING: You must set the GEMINI_API_KEY environment variable.")
        exit(1)

    output_csv = "trial_extractions.csv"
    
    # Check if CSV already exists, if not create header
    csv_exists = os.path.exists(output_csv)
    if not csv_exists:
        with open(output_csv, 'w', newline='', encoding='utf-8') as f:
            fieldnames = [
                "NCT_ID",
                "Official Title",
                "Experimental Drugs",
                "Biomarkers",
                "Primary Outcomes",
                "Efficacy Status",
                "Reasoning"
            ]
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()

    try:
        # Get all trial files
        trial_files = sorted(glob.glob("data/ctg-studies/*.json"))
        print(f"Found {len(trial_files)} trial files")
        
        # Build JSONL files (split into batches)
        print("\nBuilding JSONL batch files...")
        batch_files, metadata_map = build_batch_jsonl_files(trial_files, "batch_requests")
        print(f"✓ Built {len(batch_files)} batch files with {len(metadata_map)} total requests")
        
        total_success = 0
        
        # Process each batch sequentially
        for batch_idx, jsonl_path in enumerate(batch_files):
            print(f"\n{'='*60}")
            print(f"BATCH {batch_idx + 1}/{len(batch_files)}: {jsonl_path}")
            print(f"{'='*60}")
            
            # Upload file
            print("\nUploading batch file to API...")
            uploaded_file = upload_batch_file(jsonl_path)
            
            # Create batch job
            print("\nCreating batch job...")
            batch_job = create_batch_job(uploaded_file, f"trial-extraction-batch-{batch_idx + 1}")
            
            # Poll for completion
            print("\nPolling batch job status (this may take up to 24 hours)...")
            completed_job = poll_batch_status(batch_job)
            
            # Process results
            print("\nProcessing results...")
            success_count = process_batch_results(completed_job, metadata_map, output_csv)
            total_success += success_count
            print(f"✓ Batch {batch_idx + 1} complete: {success_count} trials processed")
        
        print(f"\n{'='*60}")
        print(f"✓ Successfully processed {total_success}/{len(metadata_map)} trials")
        print(f"✓ CSV output written to {output_csv}")
    
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
