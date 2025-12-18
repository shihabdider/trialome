import os
import google.generativeai as genai

API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_API_KEY_HERE")
print(f"API Key set: {API_KEY != 'YOUR_API_KEY_HERE'}")

if API_KEY != "YOUR_API_KEY_HERE":
    genai.configure(api_key=API_KEY)
    
    # Try a simple test
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content("Say hello")
    print("✓ API is working")
    print(response.text[:100])
else:
    print("✗ API key not set")
