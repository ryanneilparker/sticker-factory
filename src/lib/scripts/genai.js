export async function testImageGenerator() {
  let randomID = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  let generatedStickerUrl = `https://picsum.photos/id/${randomID}/200`;
  console.log("Test image generated successfully!");
  return generatedStickerUrl;
}
