<script>
  export let isCartDrawerOpen;
  import { cartItemsStore } from "$lib/stores/cartItemsStore";
  // import PayfastForm from "$lib/components/payfastForm.svelte";
</script>

<div class="cart-drawer {isCartDrawerOpen ? 'open' : ''}">
  <h2>Shopping Cart</h2>
  {#each $cartItemsStore as item}
    <img src={item} alt="Item in Cart" />
  {/each}

  <!-- <PayfastForm /> -->
</div>

<style>
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
