<script>
  import HistoryItem from "$lib/components/historyItem.svelte";
  import { stickerHistory } from "$lib/stores/stickerHistory";
  export let isHistoryDrawerOpen;
</script>

<div class="history-drawer {isHistoryDrawerOpen ? 'open' : ''}">
  <h2>Sticker History</h2>
  {#each $stickerHistory as sticker}
    <HistoryItem {sticker} />
  {/each}
</div>

<style>
  .history-drawer {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: 100%;
    color: white;
    background-color: #1e1f20;
    padding: 1rem;
    box-sizing: border-box;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%); /* Initially hidden on the left */
  }

  .history-drawer.open {
    transform: translateX(0); /* Slide in on open */
  }
</style>
