<script>
  export let sticker;

  function focusOnSticker() {}
</script>

<div class="history-item">
  <img
    class="history-item-image"
    src={"https://sticker-factory-411909.appspot.com.storage.googleapis.com/" + sticker.uri}
    alt={sticker.prompt}
  />
</div>

<style>
  .history-item {
    margin: 1rem 0;
  }

  .history-item:hover {
    background-color: #282a2c;
  }

  .history-item-image {
    border-radius: 1rem;
  }

  .history-item-image:hover {
    opacity: 0;
  }
</style>
