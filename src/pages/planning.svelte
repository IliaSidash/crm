<script>
  import { onMount } from "svelte";
  import { link } from "svelte-routing";

  import Layout from "../layouts/main";
  import Loader from "../components/loader";

  import { category, info, record } from "../store";
  import { format } from "../helpers/currencyFormatter";
  import { tooltip } from "../actions/tooltip";

  let loading = true;
  let categories = [];

  onMount(async () => {
    try {
      await category.fetch();
      await record.fetchRecords();

      loading = false;

      categories = $category.map(cat => {
        const spending = $record
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === "outcome")
          .reduce((total, cur) => {
            return (total += +cur.amount);
          }, 0);

        const percent = (spending * 100) / cat.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor =
          percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
        const tooltipValue = +cat.limit - spending;
        const tooltipText = `${
          tooltipValue >= 0 ? "Осталось" : "Превышение на"
        } ${format(Math.abs(tooltipValue), "RUB")}`;
        return {
          ...cat,
          spending,
          percent: progressPercent,
          color: progressColor,
          tooltipText
        };
      });
    } catch (e) {}
  });
</script>

<Layout>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{format($info.bill, 'RUB')}</h4>
      </div>

      {#if loading}
        <Loader />
      {:else if !categories.length}
        <p class="center">
          Категорий пока нет.
          <a href="/categories" use:link>Добавьте новую категорию</a>
        </p>
      {:else}
        <section>
          {#each categories as { id, name, limit, spending, percent, color, tooltipText } (id)}
            <div>
              <p>
                <strong>{name}:</strong>
                 {format(spending, 'RUB')} из {format(limit, 'RUB')}
              </p>
              <div class="progress" use:tooltip={{ html: tooltipText }}>
                <div class="determinate {color}" style="width:{percent}%" />
              </div>
            </div>
          {/each}
        </section>
      {/if}
    </div>
  </div>
</Layout>
