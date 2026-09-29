import os
import sys
import glob

def check_requirements():
    print("========================================")
    print(" ChilliNexis Setup & Verification Check ")
    print("========================================")
    
    # 1. Check Python Version
    print("\n[1] Checking Python Version...")
    print(f"Current Python: {sys.version.split(' ')[0]}")
    
    # 2. Check Backend Modules
    print("\n[2] Checking Backend Modules...")
    modules = ["fastapi", "uvicorn", "tensorflow", "numpy", "PIL", "multipart"]
    for mod in modules:
        try:
            __import__(mod)
            print(f" [OK] {mod} is installed.")
        except ImportError:
            print(f" [MISSING] {mod} is missing. Run: pip install -r backend/requirements.txt")

    # 3. Check Models
    print("\n[3] Checking AI Models...")
    keras_models = glob.glob("backend/models/*.keras") + glob.glob("backend/models/*.h5")
    if keras_models:
        print(f" [OK] Found model: {keras_models[0]}")
    else:
        print(" [MISSING] No .keras or .h5 models found in backend/models/")

    if os.path.exists("backend/models/class_names.json"):
        print(" [OK] backend/models/class_names.json found.")
    else:
        print(" [MISSING] backend/models/class_names.json is missing!")

    # 4. Check Frontend
    print("\n[4] Checking Frontend...")
    if os.path.exists("frontend/package.json"):
        print(" [OK] frontend/package.json found.")
    else:
        print(" [MISSING] frontend/package.json is missing!")
        
    if os.path.exists("frontend/.env.local"):
        print(" [OK] frontend/.env.local found.")
    else:
        print(" [MISSING] frontend/.env.local is missing! Please create it with NEXT_PUBLIC_ADMIN_USER and NEXT_PUBLIC_ADMIN_PASS.")

    # 5. Deployment Instructions
    print("\n========================================")
    print(" Deployment Guidelines ")
    print("========================================")
    print("1. Frontend (Vercel): Connect your GitHub repo, set the Framework to Next.js, and set the Root Directory to 'frontend'.")
    print("2. Backend (Railway): Connect your GitHub repo, set the Root Directory to 'backend'. Railway will auto-detect Python from requirements.txt.")
    print("   Set the Railway start command to: uvicorn main:app --host 0.0.0.0 --port $PORT")
    print("\nVerification Complete.")

if __name__ == "__main__":
    check_requirements()
