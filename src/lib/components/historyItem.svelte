<script>
  export let sticker;
</script>

<div class="history-item">
  <img
    class="history-item-image"
    src={"https://sticker-factory-411909.appspot.com.storage.googleapis.com/" + sticker.uri}
    alt="A generated sticker."
  />
</div>

<style>
  .history-item {
    margin: 1rem 0;
  }

  .history-item-image {
    border-radius: 1rem;
  }
</style>
