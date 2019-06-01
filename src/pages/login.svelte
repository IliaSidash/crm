<script>
  import { link, navigate } from "svelte-routing";

  import Layout from "../layouts/auth";
  import Input from "../components/input";

  import { required, email, minLength } from "../helpers/validators";

  let inputs = [
    {
      id: "email",
      value: "",
      label: "Email",
      type: "text",
      validity: null,
      validityText: "eMAIL",
      validators: [required(), email()]
    },
    {
      id: "password",
      value: "",
      label: "Пароль",
      type: "password",
      validity: null,
      validityText: "Password",
      validators: [required(), minLength(6)]
    }
  ];

  function handleChange({ detail }) {
    const { value, id } = detail;

    const newInputs = [...inputs];
    const currentIndex = newInputs.findIndex(input => input.id === id);

    newInputs[currentIndex].value = value;

    inputs = newInputs;
  }

  function handleSubmit() {
    const formData = inputs.reduce((acc, cur) => {
      acc[cur.id] = cur.value;
      return acc;
    }, {});

    console.log(formData);
    navigate("/");
  }

  $: formIsValid = inputs.every(input => input.validity);
</script>

<Layout>
  <form class="card auth-card" on:submit|preventDefault={handleSubmit}>
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      {#each inputs as input (input.id)}
        <div class="input-field">
          <Input
            bind:validity={input.validity}
            {...input}
            on:change={handleChange} />
        </div>
      {/each}
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          disabled={!formIsValid}>
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Нет аккаунта?
        <a href="/register" use:link>Зарегистрироваться</a>
      </p>
    </div>
  </form>
</Layout>
