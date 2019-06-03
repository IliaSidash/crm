<script>
  import { link, navigate } from "svelte-routing";

  import { auth } from "../store";
  import { required, email, minLength } from "../helpers/validators";
  import Layout from "../layouts/auth";
  import Input from "../components/input";

  let inputs = [
    {
      id: "email",
      value: "",
      label: "Email",
      type: "text",
      validity: null,
      validators: [required(), email()]
    },
    {
      id: "password",
      value: "",
      label: "Пароль",
      type: "password",
      validity: null,
      validators: [required(), minLength(6)]
    },
    {
      id: "name",
      value: "",
      label: "Имя",
      type: "text",
      validity: null,
      validators: [required()]
    }
  ];

  let agree = false;

  function handleChange({ detail }) {
    const { value, id } = detail;

    const newInputs = [...inputs];
    const currentIndex = newInputs.findIndex(input => input.id === id);

    newInputs[currentIndex].value = value;

    inputs = newInputs;
  }

  async function handleSubmit() {
    const formData = inputs.reduce((acc, cur) => {
      acc[cur.id] = cur.value;
      return acc;
    }, {});

    try {
      await auth.register(formData);
      navigate("/");
    } catch (e) {}
  }

  $: formIsValid = inputs.every(input => input.validity) && agree;
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
      <p>
        <label>
          <input type="checkbox" bind:checked={agree} />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          disabled={!formIsValid}>
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <a href="/login" use:link>Войти!</a>
      </p>
    </div>
  </form>
</Layout>
