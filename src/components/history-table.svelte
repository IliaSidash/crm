<script>
  import { format } from "../helpers/currencyFormatter";
  import datetime from "../helpers/datetime";
  import { tooltip } from "../actions/tooltip";

  export let records = [];
</script>

<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
  </thead>

  <tbody>
    {#each records as { id, amount, date, categoryName, recordClass, typeText }, index (id)}
      <tr>
        <td>{index + 1}</td>
        <td>{format(amount, 'RUB')}</td>
        <td>{datetime(date)}</td>
        <td>{categoryName}</td>
        <td>
          <span class="white-text badge {recordClass}"> {typeText} </span>
        </td>
        <td>
          <a
            href="/detail-record/{id}"
            class="btn-small btn"
            use:tooltip={{ html: 'Посмотреть запись' }}>
            <i class="material-icons">open_in_new</i>
          </a>
        </td>
      </tr>
    {/each}

  </tbody>
</table>
