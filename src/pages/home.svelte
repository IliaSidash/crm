<script>
  import { onMount } from "svelte";

  import Layout from "../layouts/main";
  import Loader from "../components/loader";
  import BillCard from "../components/bill-card.svelte";
  import CurrencyCard from "../components/currency-card.svelte";
  import { format } from "../helpers/currencyFormatter";
  import { info } from "../store/info";
  import { converter } from "../helpers/converter";

  let currency = null;
  let rates = {};

  $: if (currency) {
    rates = converter(currency.rates);
  }

  async function fetchCurrency() {
    currency = null;
    currency = await info.fetchCurrency();
  }

  onMount(() => {
    fetchCurrency();
  });
</script>

<Layout>
  {#if currency}
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Счет</h3>

          <button
            class="btn waves-effect waves-light btn-small"
            on:click={fetchCurrency}>
            <i class="material-icons">refresh</i>
          </button>
        </div>

        <div class="row">
          <div class="col s12 m6 l4">
            <BillCard bill={$info.state.bill} {rates} />
          </div>

          <div class="col s12 m6 l8">
            <CurrencyCard {rates} />
          </div>
        </div>
      </div>
    </div>
  {:else}
    <Loader />
  {/if}
</Layout>
