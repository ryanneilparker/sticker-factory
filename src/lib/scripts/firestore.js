import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, where, orderBy, limit, query } from "firebase/firestore";
import { app } from "$lib/scripts/firebase";

const db = getFirestore(app);

export async function saveImageToStorage(imageUrl, prompt) {
  const filename = Math.random().toString(36).substring(2, 15) + ".png";
  const storage = getStorage(app);
  const imageRef = ref(storage, filename);

  // fetch image and convert to byte blob
  const blob = await fetch(imageUrl).then((response) => response.blob());

  try {
    await uploadBytes(imageRef, blob);
    console.log("Sticker uploaded successfully!");

    await saveImageUrlToFirestore(filename, prompt);
  } catch (error) {
    console.error("Error uploading sticker:", error);
  }
}

async function saveImageUrlToFirestore(imageUrl, prompt) {
  const imageRef = collection(db, "stickers");
  try {
    await addDoc(imageRef, {
      url: imageUrl,
      timestamp: new Date().getTime(),
      prompt: prompt,
      creator: localStorage.getItem("uid"),
    });
    console.log("Sticker document created successfully!");
  } catch {
    console.error("Error creating sticker document:", error);
  }
}

export async function getTopTenStickers(userUid) {
  const stickersRef = collection(db, "stickers");
  const stickerQuery = query(stickersRef, where("creator", "==", userUid), orderBy("timestamp", "desc"), limit(5));
  const snapshot = await getDocs(stickerQuery);

  let stickerUri = "";
  let storageUrl = "";
  let cloudStickerHistory = [];
  snapshot.forEach((doc) => {
    console.log(doc.data().uri);
    stickerUri = doc.data().uri;
    storageUrl = "https://sticker-factory-411909.appspot.com.storage.googleapis.com/" + stickerUri;
    cloudStickerHistory.push(storageUrl);
  });

  return cloudStickerHistory.reverse();
}
