import os
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

def create_dummy_model():
    print("Generating a valid dummy Keras model since Git LFS files were lost...")
    
    # Define a simple model that accepts standard image inputs (224, 224, 3)
    # and outputs probabilities for 5 classes
    inputs = keras.Input(shape=(224, 224, 3))
    x = layers.GlobalAveragePooling2D()(inputs)
    outputs = layers.Dense(5, activation='softmax')(x)
    
    model = keras.Model(inputs, outputs)
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    
    # Save to the models directory
    os.makedirs('models', exist_ok=True)
    model_path = os.path.join('models', 'best_chilli_disease_model.h5')
    model.save(model_path)
    print(f"Successfully created dummy model at: {model_path}")
    
    # Re-create the class names if missing
    class_names_path = os.path.join('models', 'class_names.json')
    if not os.path.exists(class_names_path):
        import json
        with open(class_names_path, 'w') as f:
            json.dump([
                "Chilli Whitefly",
                "Chilli Yellowish",
                "Chilli Anthracnose",
                "Chilli Leaf Curl Virus",
                "Chilli healthy"
            ], f)

if __name__ == "__main__":
    create_dummy_model()
