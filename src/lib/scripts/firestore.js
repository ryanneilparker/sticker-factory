import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, where, orderBy, limit, query } from "firebase/firestore";
import { app } from "$lib/scripts/firebase";

const db = getFirestore(app);

export async function uploadImageToCloudStorage(image) {
  const filename = Math.random().toString(36).substring(2, 15) + ".png";
  const storage = getStorage(app);
  const imageRef = ref(storage, filename);

  //dev: fetch image and convert to byte blob
  const blob = await fetch(image).then((response) => response.blob());

  try {
    await uploadBytes(imageRef, blob);
    console.log("Image uploaded to cloud storage successfully!");
    return imageRef.fullPath;
  } catch {
    console.error("Error uploading image to cloud storage:", error);
  }
}

export async function saveStickerToFirestore(imageRef, prompt) {
  const stickerRef = await collection(db, "stickers");
  try {
    const stickerData = {
      prompt: prompt,
      creator: localStorage.getItem("uid"),
      timestamp: new Date().getTime(),
      uri: imageRef,
    };
    await addDoc(stickerRef, stickerData);
    console.log("Sticker saved to firestore successfully!");
    return stickerData;
  } catch (error) {
    console.error("Error saving sticker to firestore:", error);
  }
}

export async function getStickersFromFirestore() {
  const userUid = localStorage.getItem("uid");
  const stickersRef = collection(db, "stickers");
  const stickerQuery = query(stickersRef, where("creator", "==", userUid), orderBy("timestamp", "desc"), limit(5));

  try {
    const snapshot = await getDocs(stickerQuery);
    let stickers = [];

    snapshot.forEach((doc) => {
      const stickerData = {
        prompt: doc.data().prompt,
        creator: doc.data().creator,
        timestamp: doc.data().timestamp,
        uri: doc.data().uri,
      };
      stickers.push(stickerData);
    });

    console.log("Sticker history loaded from firestore successfully!");
    return stickers.reverse();
  } catch (error) {
    console.error("Error loading sticker history from firestore:", error);
  }
}
