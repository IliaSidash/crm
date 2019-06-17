<script>
  import { onMount } from "svelte";
  import { links } from "svelte-routing";

  import Layout from "../layouts/main";
  import Loader from "../components/loader";
  import HistoryTable from "../components/history-table";

  import { category, record } from "../store";
  import { chart } from "../actions/chart.js";

  let records = [];
  let loading = true;

  function getChartsOptions() {
    const data = $category.map(({ id }) => {
      const spending = records
        .filter(
          ({ categoryId, type }) => categoryId === id && type === "outcome"
        )
        .reduce((total, { amount }) => {
          return (total += +amount);
        }, 0);
      return spending;
    });
    return {
      labels: $category.map(({ name }) => name),
      data
    };
  }

  function normalizeData() {
    records = $record.map(record => {
      const { name } = $category.find(
        category => category.id === record.categoryId
      );
      const recordClass = record.type === "income" ? "green" : "red";
      const typeText = record.type === "income" ? "Доход" : "Расход";

      return { ...record, categoryName: name, recordClass, typeText };
    });
  }

  async function fetchData() {
    try {
      await category.fetch();
      await record.fetchRecords();
      normalizeData();
      loading = false;
    } catch (e) {}
  }

  onMount(() => {
    fetchData();
  });
</script>

<Layout>
  <div class="app-page" use:links>
    <div>
      <div class="page-title">
        <h3>История записей</h3>
      </div>

      {#if loading}
        <Loader />
      {:else if !records.length}
        <p class="center">
          Записей пока нет.
          <a href="/record">Добавьте новую запись</a>
        </p>
      {:else}
        <div class="history-chart">
          <canvas use:chart={getChartsOptions()} />
        </div>

        <section>
          <HistoryTable {records} />
        </section>
      {/if}
    </div>
  </div>
</Layout>
