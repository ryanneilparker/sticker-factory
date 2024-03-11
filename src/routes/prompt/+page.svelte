<script>
  import { app, db } from "$lib/scripts/firebase";
  import { saveImageToStorage } from "$lib/scripts/firestore";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  let stickerHistoryStore = writable([]);
  let cartItemsStore = writable([]);
  let generatedStickerUrl = "";
  let isHistoryDrawerOpen = false;
  let isCartDrawerOpen = false;

  async function generateSticker() {
    let randomID = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    generatedStickerUrl = `https://picsum.photos/id/${randomID}/200`;

    stickerHistoryStore.update((history) => [...history, generatedStickerUrl]);
    // saveImageToStorage(generatedStickerUrl);
  }

  function addToCart() {
    if (generatedStickerUrl) {
      cartItemsStore.update((cartItems) => [...cartItems, generatedStickerUrl]);
    }
  }

  onMount(async () => {
    // Fetch image history from Firestore on component mount
  });
</script>

<div class="sticker-generator">
  <img src={generatedStickerUrl} alt="Generated sticker" />

  <button on:click={() => (isHistoryDrawerOpen = !isHistoryDrawerOpen)}>
    {isHistoryDrawerOpen ? "Close History" : "Show History"}
  </button>

  <div class="history-drawer {isHistoryDrawerOpen ? 'open' : ''}">
    <h2>Image History</h2>
    {#each $stickerHistoryStore as image}
      <img src={image} alt="Generated sticker in history" />
    {/each}
  </div>

  <button on:click={generateSticker}>Generate Sticker</button>

  <button on:click={addToCart}>Add to Cart</button>

  <button on:click={() => (isCartDrawerOpen = !isCartDrawerOpen)}>
    {isCartDrawerOpen ? "Close Cart" : "Show Cart"}
  </button>

  <div class="cart-drawer {isCartDrawerOpen ? 'open' : ''}">
    <h2>Shopping Cart</h2>
    {#each $cartItemsStore as item}
      <img src={item} alt="Item in Cart" />
    {/each}
  </div>
</div>

<style>
  .history-drawer {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: white;
    padding: 1rem;
    box-sizing: border-box;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%); /* Initially hidden on the left */
  }

  .history-drawer.open {
    transform: translateX(0); /* Slide in on open */
  }

  .cart-drawer {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    background-color: white;
    padding: 1rem;
    box-sizing: border-box;
    transition: transform 0.3s ease-in-out;
    transform: translateX(100%); /* Initially hidden on the right */
  }

  .cart-drawer.open {
    transform: translateX(0); /* Slide in on open */
  }
</style>
