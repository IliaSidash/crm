<script>
  import { onMount, afterUpdate, tick } from "svelte";
  import Layout from "../layouts/main";
  import Input from "../components/input";
  import { info } from "../store";
  import { required, minLength } from "../helpers/validators";

  $: name = "";
  let nameIsValid = null;

  function handleChange(e) {
    const { value } = e.detail;

    name = value;
  }

  async function handleSubmit() {
    if (!nameIsValid) return null;
    try {
      await info.updateInfo({ ...$info, name });
    } catch (e) {}
  }
</script>

<Layout>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Профиль</h3>
      </div>

      <form class="form" on:submit|preventDefault={handleSubmit}>
        <div class="input-field">
          <Input
            label="Имя"
            id="name"
            bind:value={name}
            type="text"
            bind:validity={nameIsValid}
            validators={[required(), minLength(3)]}
            on:change={handleChange} />
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</Layout>
