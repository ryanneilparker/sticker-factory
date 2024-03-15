<script>
  import { goto } from "$app/navigation";
  import { getAuth, signOut } from "firebase/auth";
  import { isLoggedIn } from "$lib/stores/authStore";

  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("uid");
      localStorage.removeItem("stickerHistory");
      localStorage.removeItem("cartItems");
      isLoggedIn.update(() => false);
      goto("/auth/login");
      console.log("User has been logged out successfully!");
    } catch (error) {
      console.error("Error loggin out:", error);
    }
  };
</script>

<ul>
  <li><a href="/">Landing Page</a></li>
  <li><a href="/protected/prompt">Prompt Page</a></li>
  <li><a href="/protected/orders">Orders Page</a></li>
  <li>
    <a on:click|preventDefault={handleLogout} href="/signout">Sign Out</a>
  </li>
</ul>
