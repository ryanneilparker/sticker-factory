import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  where,
  orderBy,
  limit,
  query,
} from "firebase/firestore";
import { app, db } from "$lib/scripts/firebase";

export async function saveImageToStorage(imageUrl, prompt) {
  const filename = Math.random().toString(36).substring(2, 15) + ".png";
  const storage = getStorage(app);
  const imageRef = ref(storage, filename);

  // Fetch the image data using the data URL and convert it to a Blob
  const blob = await fetch(imageUrl).then((response) => response.blob());

  // Upload the image to Cloud Storage
  try {
    await uploadBytes(imageRef, blob);
    console.log("Sticker uploaded successfully!");

    // After successful upload, save the image URL to Firestore
    await saveImageUrlToFirestore(filename, prompt);
  } catch (error) {
    console.error("Error uploading sticker:", error);
  }
}

async function saveImageUrlToFirestore(imageUrl, prompt) {
  const imageRef = collection(db, "generatedStickers");
  await addDoc(imageRef, {
    url: imageUrl,
    timestamp: new Date().getTime(),
    prompt: prompt,
    creator: localStorage.getItem("uid"),
  });
  console.log("Sticker document successfully created!");
}

export async function getTopTenStickers(userUid) {
  const stickersRef = collection(db, "generatedStickers");

  const stickerQuery = query(
    stickersRef,
    where("creator", "==", userUid),
    orderBy("timestamp", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(stickerQuery);

  let stickerUrl = "";
  let storageUrl = "";
  let cloudStickerHistory = [];
  snapshot.forEach((doc) => {
    stickerUrl = doc.data().url;
    storageUrl =
      "https://sticker-factory-411909.appspot.com.storage.googleapis.com/" +
      stickerUrl;
    cloudStickerHistory.push(storageUrl);
  });

  return cloudStickerHistory.reverse();
}
