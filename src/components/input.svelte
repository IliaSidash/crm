<script>
  import { onMount, createEventDispatcher } from "svelte";

  export let id;
  export let value;
  export let label;
  export let type = "text";
  export let validity = null;
  export let validators = [];
  let validityText = null;
  let touched = false;
  const dispatch = createEventDispatcher();

  function handleBlur() {
    if (value.trim()) {
      touched = true;

      validity = validators.every(validator => {
        const { isValid, errorMessage } = validator(value);

        validityText = errorMessage;
        return isValid;
      });
    }
  }

  function handleInput(e, id) {
    const { value } = e.target;

    touched = false;
    dispatch("change", { value, id });
  }
</script>

<input
  {id}
  {type}
  {value}
  class:invalid={validity === false && touched}
  on:input={e => handleInput(e, id)}
  on:blur={handleBlur} />
<label for={id}>{label}</label>
{#if validity === false && touched}
  <small class="helper-text invalid">{validityText}</small>
{/if}
