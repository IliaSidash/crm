<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { links } from "svelte-routing";
  import M from "materialize-css";

  import datetimeFormat from "../helpers/datetime";

  const dispatch = createEventDispatcher();
  const handleClick = () => dispatch("toggle");
  let dropdownNode;
  let dropdown;
  let intervalId;
  let date = new Date();

  onMount(() => {
    intervalId = setInterval(() => {
      date = new Date();
    }, 1000);
    dropdown = M.Dropdown.init(dropdownNode, { constrainWidth: false });
  });

  onDestroy(() => {
    clearInterval(intervalId);

    if (dropdown && dropdown.destroy) dropdown.destroy();
  });
</script>

<nav class="navbar orange lighten-1">
  <div class="nav-wrapper">
    <div class="navbar-left">
      <a href="/" on:click|preventDefault={handleClick}>
        <i class="material-icons black-text">dehaze</i>
      </a>
      <span class="black-text">{datetimeFormat(date, 'datetime')}</span>
    </div>

    <ul class="right hide-on-small-and-down">
      <li>
        <a
          class="dropdown-trigger black-text"
          href="/"
          bind:this={dropdownNode}
          data-target="dropdown">
          USER NAME
          <i class="material-icons right">arrow_drop_down</i>
        </a>

        <ul id="dropdown" class="dropdown-content" use:links>
          <li>
            <a href="/profile" class="black-text">
              <i class="material-icons">account_circle</i>
              Профиль
            </a>
          </li>
          <li class="divider" tabindex="-1" />
          <li>
            <a href="/login" class="black-text">
              <i class="material-icons">assignment_return</i>
              Выйти
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</nav>
