<script>
  export let isHistoryDrawerOpen;
  import { stickerHistoryStore } from "$lib/stores/stickerHistoryStore";
</script>

<div class="history-drawer {isHistoryDrawerOpen ? 'open' : ''}">
  <h2>Image History</h2>
  {#each $stickerHistoryStore.slice().reverse() as image}
    <img src={image} alt="Generated sticker in history" />
  {/each}
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
    transform: translateX(-120%); /* Initially hidden on the left */
  }

  .history-drawer.open {
    transform: translateX(0); /* Slide in on open */
  }
</style>
