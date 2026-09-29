import os
import json
import tensorflow as tf
from tensorflow.keras import layers, models, applications

def main():
    print("Setting up training...")
    dataset_dir = r"d:\Chilli-Nexis\Preprocessed Chilli Disease Dataset"
    train_dir = os.path.join(dataset_dir, "train")
    valid_dir = os.path.join(dataset_dir, "valid")
    
    # Parameters
    batch_size = 32
    img_height = 224
    img_width = 224
    epochs = 3 # Keep epochs small for local CPU training
    
    print("Loading datasets...")
    train_ds = tf.keras.utils.image_dataset_from_directory(
        train_dir,
        seed=123,
        image_size=(img_height, img_width),
        batch_size=batch_size,
        label_mode='categorical'
    )
    
    val_ds = tf.keras.utils.image_dataset_from_directory(
        valid_dir,
        seed=123,
        image_size=(img_height, img_width),
        batch_size=batch_size,
        label_mode='categorical'
    )
    
    class_names = train_ds.class_names
    print(f"Found classes: {class_names}")
    
    # Save class names
    os.makedirs("models", exist_ok=True)
    with open("models/class_names.json", "w") as f:
        json.dump(class_names, f)
    print("Saved class names to models/class_names.json")
    
    # Optimize dataset for performance
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)
    
    # Build Model (Transfer Learning with MobileNetV2)
    print("Building model (MobileNetV2)...")
    base_model = applications.MobileNetV2(
        input_shape=(img_height, img_width, 3),
        include_top=False,
        weights='imagenet'
    )
    
    # Freeze the base model
    base_model.trainable = False
    
    # Data augmentation layer inside the model
    data_augmentation = tf.keras.Sequential([
        layers.RandomFlip('horizontal_and_vertical'),
        layers.RandomRotation(0.2),
    ])
    
    # Model pipeline
    inputs = tf.keras.Input(shape=(img_height, img_width, 3))
    x = data_augmentation(inputs)
    # MobileNetV2 expects [-1, 1] input range. Application preprocess_input does this.
    x = applications.mobilenet_v2.preprocess_input(x)
    x = base_model(x, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(0.2)(x)
    outputs = layers.Dense(len(class_names), activation='softmax')(x)
    
    model = models.Model(inputs, outputs)
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    print("Starting training...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=epochs
    )
    
    # Save model in native Keras format
    model_path = "models/chilli_disease_model.keras"
    model.save(model_path)
    print(f"Training complete! Model saved successfully to {model_path}.")

if __name__ == "__main__":
    main()
