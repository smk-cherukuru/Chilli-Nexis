import os
import sys
import subprocess
import json
import shutil

def check_and_install_requirements():
    print("Checking requirements...")
    try:
        import flask
        import tensorflow
        import pymongo
        import google.genai
        print("Required packages are already installed.")
    except ImportError:
        print("Missing requirements. Installing from requirements.txt...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("Requirements installed successfully.")

def organize_folder_structure():
    print("Organizing folder structure...")
    
    # Define target directories
    directories = ['models', 'scripts', 'notebooks', 'docs']
    for d in directories:
        os.makedirs(d, exist_ok=True)
    
    # File mappings (source pattern/name -> destination directory)
    file_moves = {
        'best_chilli_disease_model.h5': 'models',
        'chilli_disease_detection_model_final.h5': 'models',
        'chilli_disease_detection_model_final.keras': 'models',
        'chilli_disease_model_saved': 'models',
        'class_names.json': 'models',
        
        'add_admin_user.py': 'scripts',
        'check_mongodb_status.py': 'scripts',
        'create_admin.py': 'scripts',
        'debug_flask.py': 'scripts',
        'download_disease_images.py': 'scripts',
        'get_location_from_ip.py': 'scripts',
        'init_mongodb.py': 'scripts',
        'list_gemini_models.py': 'scripts',
        'optimize_disease_images.py': 'scripts',
        'save_logo.py': 'scripts',
        'verify_mongodb_data.py': 'scripts',
        'quick_test.py': 'scripts',
        
        'chilli_disease_detection.ipynb': 'notebooks',
        'Modal training outputs': 'notebooks',
        
        'Other Documents': 'docs',
        'USER_MANUAL.md': 'docs',
        'model_summary_report.txt': 'docs',
    }
    
    for filename, dest_dir in file_moves.items():
        if os.path.exists(filename):
            dest_path = os.path.join(dest_dir, filename)
            # If the destination already exists, we skip to avoid overwrite errors
            if not os.path.exists(dest_path):
                print(f"Moving {filename} to {dest_dir}/")
                shutil.move(filename, dest_path)
            else:
                print(f"Note: {dest_path} already exists. Skipping.")

    # Remove unnecessary .bat / .sh scripts that were cluttering root
    for f in ['start.bat', 'start.sh', 'setup_firewall.bat']:
        if os.path.exists(f):
            print(f"Removing unused script {f}...")
            os.remove(f)
            
    print("Folder structure organized.")

def fix_class_names():
    class_file = os.path.join('models', 'class_names.json')
    if os.path.exists(class_file):
        try:
            with open(class_file, 'r') as f:
                classes = json.load(f)
            
            updated = False
            for i, name in enumerate(classes):
                if name == "Chilli Anthacnose":
                    classes[i] = "Chilli Anthracnose"
                    updated = True
                    
            if updated:
                with open(class_file, 'w') as f:
                    json.dump(classes, f)
                print("Fixed spelling of 'Chilli Anthracnose' in class_names.json")
        except Exception as e:
            print(f"Could not update class_names.json: {e}")

def run_application():
    print("\nStarting the application...")
    if os.path.exists('.env'):
        print("Found .env file.")
    else:
        print("WARNING: .env file not found. Ensure required environment variables (like MongoDB URI) are set.")
    
    # Run app.py
    subprocess.call([sys.executable, "app.py"])

if __name__ == "__main__":
    print("=== Chilli Care Project Auto-Setup ===")
    organize_folder_structure()
    fix_class_names()
    try:
        check_and_install_requirements()
    except subprocess.CalledProcessError as e:
        print(f"Warning: Failed to install some requirements. The application may not run. Error: {e}")
    print("Setup complete.")
    run_application()
