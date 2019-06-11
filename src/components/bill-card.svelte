<script>
  import { format } from "../helpers/currencyFormatter";

  export let bill;
  export let rates;

  const currencies = ["RUB", "EUR", "USD"];
</script>

<div class="card light-blue bill-card">
  <div class="card-content white-text">
    <span class="card-title">Счет в валюте</span>

    {#each currencies as currency}
      <p class="currency-line">
        <span> {format(bill * rates[currency], currency)} </span>
      </p>
    {/each}

  </div>
</div>
