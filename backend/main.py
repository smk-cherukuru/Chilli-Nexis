import os
import json
import io
import numpy as np
from PIL import Image
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf

app = FastAPI(title="Chilli Disease Detection API", version="2.0.0")

# Enable CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model and classes
MODEL = None
CLASS_NAMES = []
IMG_SIZE = (224, 224)

@app.on_event("startup")
async def load_model():
    global MODEL, CLASS_NAMES
    print("Loading AI Model...")
    
    # Load class names
    class_names_path = os.path.join("models", "class_names.json")
    if os.path.exists(class_names_path):
        with open(class_names_path, "r") as f:
            CLASS_NAMES = json.load(f)
    else:
        # Fallback based on typical dataset
        CLASS_NAMES = ["Healthy", "Leaf Curl", "Leaf Spot", "Whitefly"]
        
    # Load model
    model_path = os.path.join("models", "chilli_disease_model.keras")
    if not os.path.exists(model_path):
        model_path = os.path.join("models", "chilli_disease_model.h5")
        
    try:
        MODEL = tf.keras.models.load_model(model_path, compile=False)
        print(f"Model successfully loaded from {model_path}!")
        print(f"Loaded Classes: {CLASS_NAMES}")
    except Exception as e:
        print(f"Failed to load model: {e}")

@app.get("/")
def read_root():
    return {"status": "Active", "model_loaded": MODEL is not None}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if MODEL is None:
        raise HTTPException(status_code=500, detail="Model is not loaded.")
        
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    try:
        # Read and preprocess the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize(IMG_SIZE)
        
        # Convert to array and expand dims
        img_array = tf.keras.preprocessing.image.img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)
        
        # The model already contains the MobileNetV2 preprocess_input layer internally!
        
        # Predict
        predictions = MODEL.predict(img_array)[0]
        predicted_idx = np.argmax(predictions)
        
        # Calculate confidence
        confidence = float(predictions[predicted_idx] * 100)
        predicted_class = CLASS_NAMES[predicted_idx] if predicted_idx < len(CLASS_NAMES) else "Unknown"
        
        # Create detailed confidences
        all_confidences = {
            CLASS_NAMES[i]: float(predictions[i] * 100)
            for i in range(len(CLASS_NAMES))
        }
        
        return {
            "success": True,
            "disease": predicted_class,
            "confidence": round(confidence, 2),
            "severity": "Medium" if predicted_class != "Healthy" else "None",
            "all_confidences": all_confidences
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
