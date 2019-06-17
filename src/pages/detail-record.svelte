<script>
  import { onMount } from "svelte";
  import { links } from "svelte-routing";

  import Layout from "../layouts/main";
  import Loader from "../components/loader";

  import { record, category } from "../store";
  import datetime from "../helpers/datetime";

  export let id;
  let rec = {};
  let cat = {};
  let loading = true;

  async function fetchData() {
    try {
      rec = await record.fetchRecordById(id);
      const { categoryId } = rec;
      cat = await category.fetchById(categoryId);

      loading = false;
    } catch (e) {}
  }

  onMount(() => {
    fetchData();
  });
</script>

<Layout>
  <div class="app-page">
    <div>
      <div>
        {#if loading}
          <Loader />
        {:else}
          <div class="breadcrumb-wrap" use:links>
            <a href="/history" class="breadcrumb">История</a>
            <a href="/" class="breadcrumb">
               {rec.type === 'income' ? 'Доход' : 'Расход'}
            </a>
          </div>
          <div class="row">
            <div class="col s12 m6">
              <div class="card {rec.type === 'income' ? 'green' : 'red'}">
                <div class="card-content white-text">
                  <p>Описание: {rec.description}</p>
                  <p>Сумма: {rec.amount}</p>
                  <p>Категория: {cat.name}</p>

                  <small>{datetime(rec.date)}</small>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</Layout>
