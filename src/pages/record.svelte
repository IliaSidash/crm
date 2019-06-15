<script>
  import { onMount } from "svelte";
  import Layout from "../layouts/main";
  import Select from "../components/select";
  import Input from "../components/input";

  import { setMessage } from "../helpers/message";
  import { required, limit as minValue } from "../helpers/validators";
  import { category, info, record } from "../store";

  $: selected = $category[0];

  let amount = "";
  let description = "";
  let currentRadio = "income";
  let canCreateRecord = false;

  $: amountIsValid = null;
  $: descriptionIsValid = null;
  $: formIsValid = amountIsValid && descriptionIsValid;
  $: if (currentRadio === "outcome") {
    const { bill } = $info;
    canCreateRecord = bill - amount >= 0;
  } else {
    canCreateRecord = true;
  }

  function handleChange({ detail }) {
    const { value, id } = detail;
    if (id === "amount") amount = value;
    if (id === "description") description = value;
  }

  async function handleSubmit() {
    if (!canCreateRecord) {
      setMessage("Недостаточно средств на счете");
      return;
    }
    try {
      await record.create({
        categoryId: selected.id,
        amount,
        description,
        type: currentRadio,
        date: new Date().toJSON()
      });

      const { bill } = $info;
      const newBill =
        currentRadio === "income" ? +bill + +amount : +bill - +amount;

      await info.updateInfo({ ...$info, bill: newBill });

      setMessage("Запись успешно добавлена");
      amount = "";
      description = "";
      currentRadio = "income";
    } catch (e) {}
  }

  onMount(() => {
    if (!$category.length) {
      category.fetch();
    }
  });
</script>

<Layout>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Новая запись</h3>
      </div>

      <form class="form" on:submit|preventDefault={handleSubmit}>
        <div class="input-field">
          <Select {selected} options={$category} label="Выберите категорию" />
        </div>

        <p>
          <label>
            <input
              class="with-gap"
              bind:group={currentRadio}
              name="type"
              type="radio"
              value="income" />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input
              class="with-gap"
              bind:group={currentRadio}
              name="type"
              type="radio"
              value="outcome" />
            <span>Расход</span>
          </label>
        </p>

        <div class="input-field">
          <Input
            id="amount"
            value={amount}
            label="Сумма"
            type="number"
            bind:validity={amountIsValid}
            validityText="Amount"
            validators={[required(), minValue(0)]}
            on:change={handleChange} />
        </div>
        <div class="input-field">
          <Input
            id="description"
            value={description}
            label="Описагие"
            type="text"
            bind:validity={descriptionIsValid}
            validityText="Description"
            validators={[required()]}
            on:change={handleChange} />
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          disabled={!formIsValid}>
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</Layout>
