<script>
  import datetime from "../helpers/datetime";
  import { format } from "../helpers/currencyFormatter";

  export let rates;

  const currencies = ["RUB", "EUR", "USD"];
</script>

<div class="card orange darken-3 bill-card">
  <div class="card-content white-text">
    <div class="card-header">
      <span class="card-title">Курс валют</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Валюта</th>
          <th>Курс</th>
          <th>Дата</th>
        </tr>
      </thead>

      <tbody>
        {#each currencies as currency}
          <tr>
            <td>{currency}</td>
            <td>{rates[currency].toFixed(3)}</td>
            <td>{datetime(new Date(), 'date')}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
