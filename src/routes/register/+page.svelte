<script>
  import { app, db } from "$lib/firebase";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

  let email = "";
  let password = "";
  let errorMessage = "";

  const handleSubmit = async () => {
    try {
      const auth = app ? getAuth(app) : null;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", userCredential.user);
      errorMessage = "";
      window.location.href = "/prompt";
    } catch (error) {
      console.error("Error creating user:", error);
      errorMessage = error.message;
    }
  };
</script>

<form on:submit={handleSubmit}>
  <label for="email">Email:</label>
  <input type="email" id="email" bind:value={email} required />
  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password} required />
  <button type="submit">Register</button>
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
</form>
