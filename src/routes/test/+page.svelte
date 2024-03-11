<script>
  import db from "$lib/firebase.js";
  import { addDoc, collection } from "firebase/firestore";
  let input;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "tests"), {
      testText: input,
      Id: crypto.randomUUID(),
    });
    console.log(db);
    console.log(input);
  };
</script>

<main>
  <form on:submit={handleSubmit}>
    <input type="text" bind:value={input} />
    <button type="submit">Submit</button>
  </form>
</main>

<style>
</style>
