<script>
  import Input from "../components/input";
  import { required, limit } from "../helpers/validators";
  import { category } from "../store";
  import { setMessage } from "../helpers/message";

  let inputs = [
    {
      id: "name",
      value: "",
      label: "Название",
      type: "text",
      validity: null,
      validityText: "Введите название",
      validators: [required()]
    },
    {
      id: "limit",
      value: "",
      label: "Лимит",
      type: "number",
      validity: null,
      validityText: "Минимальная величина",
      validators: [required(), limit(200)]
    }
  ];

  function handleChange({ detail }) {
    const { value, id } = detail;

    const newInputs = [...inputs];
    const currentIndex = newInputs.findIndex(input => input.id === id);

    newInputs[currentIndex].value = value;

    inputs = newInputs;
  }

  async function handleSubmit() {
    try {
      await category.create({
        name: inputs[0].value,
        limit: inputs[1].value
      });
      setMessage("Категория добавлена");
    } catch (e) {}
  }

  $: formIsValid = inputs.every(input => input.validity);
</script>

<div>
  <div class="page-subtitle">
    <h4>Создать</h4>
  </div>

  <form on:submit|preventDefault={handleSubmit}>
    {#each inputs as input (input.id)}
      <div class="input-field">
        <Input
          bind:validity={input.validity}
          {...input}
          on:change={handleChange} />
      </div>
    {/each}

    <button
      class="btn waves-effect waves-light"
      type="submit"
      disabled={!formIsValid}>
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
