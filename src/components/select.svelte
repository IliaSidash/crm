<script>
  import { afterUpdate, onDestroy, createEventDispatcher } from "svelte";

  export let label;
  export let options = [];
  export let selected;

  let node;
  let formSelect;
  const dispatch = createEventDispatcher();

  function handleChange() {
    dispatch("change", { selected });
  }

  afterUpdate(() => {
    formSelect = M.FormSelect.init(node);
    M.updateTextFields();
  });

  onDestroy(() => {
    if (formSelect && formSelect.destroy) formSelect.destroy();
  });
</script>

<select bind:this={node} bind:value={selected} on:change={handleChange}>
  {#each options as option}
    <option value={option}>{option.name}</option>
  {/each}
</select>
<label>{label}</label>
