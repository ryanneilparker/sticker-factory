<script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { app } from "$lib/scripts/firebase";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let errorMessage = "";

  const handleSubmit = async () => {
    try {
      const auth = app ? getAuth(app) : null;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("uid", userCredential.user.uid);
      console.log("User signed in:", userCredential.user.uid);
      errorMessage = "";
      goto("/protected/prompt");
    } catch (error) {
      console.error("Error signing in:", error);
      errorMessage = error.message;
    }
  };
</script>

<form on:submit={handleSubmit}>
  <label for="email">Email:</label>
  <input type="email" id="email" bind:value={email} required />
  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password} required />
  <button type="submit">Sign In</button>
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
</form>
