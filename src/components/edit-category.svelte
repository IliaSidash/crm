<script>
  import Input from "../components/input";
  import Select from "../components/select";
  import { category } from "../store/category";
  import { required, limit as minValue } from "../helpers/validators";
  import { setMessage } from "../helpers/message";

  export let categories = [];
  let nameIsValid = true;
  let limitIsValid = true;

  $: selected = categories[0];
  $: id = selected ? selected.id : "";
  $: name = selected ? selected.name : "";
  $: limit = selected ? selected.limit : "";

  function handlerSelectChange(event) {
    const { selected: currentOption } = event.detail;
    selected = currentOption;
  }

  function handleChange({ detail }) {
    const { value, id } = detail;
    if (id === "change-name") name = value;
    if (id === "change-limit") limit = value;
  }

  async function handleSubmit() {
    try {
      await category.update({ id, name, limit });
      setMessage("Категория успешно обновлена");
    } catch (e) {}
  }

  $: formIsValid = nameIsValid && limitIsValid;
</script>

<div>
  <div class="page-subtitle">
    <h4>Редактировать</h4>
  </div>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="input-field">
      <Select
        options={categories}
        {selected}
        label="Выберите категорию"
        on:change={handlerSelectChange} />
    </div>

    <div class="input-field">
      <Input
        id="change-name"
        value={name}
        label="Название"
        type="text"
        bind:validity={nameIsValid}
        validityText="Введите название"
        validators={[required()]}
        on:change={handleChange} />
    </div>
    <div class="input-field">
      <Input
        id="change-limit"
        value={limit}
        label="Лимит"
        type="number"
        bind:validity={limitIsValid}
        validityText="Минимальная величина"
        validators={[required(), minValue(200)]}
        on:change={handleChange} />
    </div>

    <button
      class="btn waves-effect waves-light"
      type="submit"
      disabled={!formIsValid}>
      Обновить
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
