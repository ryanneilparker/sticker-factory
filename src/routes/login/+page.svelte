<script>
  // Firebase configuration
  import firebase from "firebase/compat/app";
  var config = {
    apiKey: "AIzaSyBVFZTC7wzqhuQvbHi9Oj55HepexKXio5o",
    authDomain: "sticker-factory-411909.firebaseapp.com",
  };
  firebase.initializeApp(config);

  import { writable } from "svelte";
  const user = writable(null); // Initialize user as null

  let email = "";
  let password = "";

  const handleSignIn = async () => {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      user.set(result.user); // Update user store with signed-in user
    } catch (error) {
      console.error("Sign-in error:", error.message);
      // You can display an error message to the user here
    }
  };
</script>

<h1>Login Page</h1>

{#if !user.value}
  <input type="email" bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={handleSignIn}>Sign In</button>
{:else}
  <p>Welcome, {user.value.email}</p>
{/if}

<button on:click={() => console.log(firebase)}>Check Firebase Instance</button>
