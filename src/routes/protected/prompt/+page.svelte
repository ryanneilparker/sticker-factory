<script>
  import { onMount } from "svelte";
  // Components
  import HistoryDrawer from "$lib/components/historyDrawer.svelte";
  import CartDrawer from "$lib/components/cartDrawer.svelte";
  // Scripts
  import { testImageGenerator } from "$lib/scripts/genai";
  import { uploadImageToCloudStorage, saveStickerToFirestore, getStickersFromFirestore } from "$lib/scripts/firestore";
  // Stores
  import { stickerHistory } from "$lib/stores/stickerHistory";
  import { cartItemsStore } from "$lib/stores/cartItemsStore";

  let prompt = "";
  let generatedStickerUrl = "";
  let isHistoryDrawerOpen = false;
  let isCartDrawerOpen = false;

  async function generateSticker(prompt) {
    //dev: to be replaced by actual gen-ai api
    const testImageUrl = await testImageGenerator();

    try {
      const imageRef = await uploadImageToCloudStorage(testImageUrl);
      const stickerData = await saveStickerToFirestore(imageRef, prompt);
      updateStickerHistory(stickerData);
    } catch (error) {
      console.error("Error generating sticker:", error);
    }
  }

  function updateStickerHistory(stickerData) {
    try {
      stickerHistory.update((history) => [...history, stickerData]);
      localStorage.setItem("stickerHistory", JSON.stringify($stickerHistory));
      console.log("Sticker saved to local storage successfully!");
    } catch (error) {
      console.error("Error saving sticker to local storage:", error);
    }
  }

  async function loadStickerHistory() {
    //todo: load from local storage to avoid network calls
    const stickerHistoryStore = await getStickersFromFirestore();

    stickerHistory.update(() => stickerHistoryStore);
    localStorage.setItem("stickerHistory", JSON.stringify(stickerHistoryStore));
  }

  function addToCart() {
    const lastStickerUrl = $stickerHistory[$stickerHistory.length - 1];
    cartItemsStore.update((history) => [...history, lastStickerUrl]);
    localStorage.setItem("cartItems", JSON.stringify($cartItemsStore));
    isCartDrawerOpen = true;
  }

  function loadCartItems() {
    const localCartItems = localStorage.getItem("cartItems");
    let cartItems = localCartItems ? JSON.parse(localCartItems) : [];
    cartItemsStore.update(() => cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  onMount(() => {
    // dev: placeholder image
    generatedStickerUrl = `https://picsum.photos/id/420/200`;

    loadStickerHistory();
    loadCartItems();
  });
</script>

<div class="sticker-generator">
  <img src={generatedStickerUrl} alt="Generated sticker" />

  <button on:click={() => (isHistoryDrawerOpen = !isHistoryDrawerOpen)}>
    {isHistoryDrawerOpen ? "Close History" : "Show History"}
  </button>

  <HistoryDrawer bind:isHistoryDrawerOpen />

  <input type="text" placeholder="Enter a prompt..." bind:value={prompt} required />

  <button on:click={generateSticker(prompt)}>Generate Sticker</button>

  <button on:click={addToCart}>Add to Cart</button>

  <button on:click={() => (isCartDrawerOpen = !isCartDrawerOpen)}>
    {isCartDrawerOpen ? "Close Cart" : "Show Cart"}
  </button>

  <CartDrawer bind:isCartDrawerOpen />
</div>

<style>
  .sticker-generator {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
