<script>
  import { onMount } from "svelte";
  // Components
  import HistoryDrawer from "$lib/components/historyDrawer.svelte";
  import CartDrawer from "$lib/components/cartDrawer.svelte";
  // Scripts
  import { saveImageToStorage } from "$lib/scripts/firestore";
  import { getTopTenStickers } from "$lib/scripts/firestore";
  // Stores
  import { stickerHistoryStore } from "$lib/stores/stickerHistoryStore";
  import { cartItemsStore } from "$lib/stores/cartItemsStore";

  let prompt = "";
  let generatedStickerUrl = "";
  let isHistoryDrawerOpen = false;
  let isCartDrawerOpen = false;

  async function generateSticker() {
    //dev: placeholder for api call
    let randomID = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    generatedStickerUrl = `https://picsum.photos/id/${randomID}/200`;

    isHistoryDrawerOpen = false;
    updateStickerHistory(generatedStickerUrl);
    saveImageToStorage(generatedStickerUrl, prompt);
  }

  function updateStickerHistory(generatedStickerUrl) {
    stickerHistoryStore.update((history) => [...history, generatedStickerUrl]);
    localStorage.setItem("stickerHistory", JSON.stringify($stickerHistoryStore));
  }

  async function loadStickerHistory() {
    const cloudStickerHistory = await getTopTenStickers(localStorage.getItem("uid"));
    const localStickerHistory = localStorage.getItem("stickerHistory");
    let stickerHistory = localStickerHistory ? JSON.parse(localStickerHistory) : [];
    if (stickerHistory.length == 0) {
      stickerHistory = stickerHistory.concat(cloudStickerHistory);
    }
    stickerHistoryStore.update(() => stickerHistory);
    localStorage.setItem("stickerHistory", JSON.stringify(stickerHistory));
  }

  function addToCart() {
    const lastStickerUrl = $stickerHistoryStore[$stickerHistoryStore.length - 1];
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

  <input type="text" placeholder="Enter a prompt..." bind:value={prompt} />

  <button on:click={generateSticker}>Generate Sticker</button>

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
