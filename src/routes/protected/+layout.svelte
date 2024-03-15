<script>
  import { onMount } from "svelte";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  import { goto } from "$app/navigation";

  import { isLoggedIn } from "$lib/stores/authStore";

  import Navbar from "../../lib/components/navbar.svelte";

  onMount(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.update(() => true);
      } else {
        goto("/auth/login");
      }
    });
  });
</script>

<Navbar />
<slot />
