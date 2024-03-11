import { getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { app, db } from "$lib/scripts/firebase";

export async function saveImageToStorage(imageUrl) {
  const filename = Math.random().toString(36).substring(2, 15) + ".png";
  const storage = getStorage(app);
  const imageRef = ref(storage, filename);

  console.log(filename);

  // Fetch the image data using the data URL and convert it to a Blob
  const blob = await fetch(imageUrl).then((response) => response.blob());

  // Upload the image to Cloud Storage
  try {
    await uploadBytes(imageRef, blob);
    console.log("Image uploaded successfully!");

    // After successful upload, save the image URL to Firestore
    await saveImageUrlToFirestore(filename);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

async function saveImageUrlToFirestore(imageUrl) {
  const imageRef = collection(db, "generatedImages");
  await addDoc(imageRef, {
    url: imageUrl,
    // Add any other relevant data for the image
  });
  imageHistory.push({ url: imageUrl }); // Update image history locally
}
