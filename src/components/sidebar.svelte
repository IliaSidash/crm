<script>
  import { links } from "svelte-routing";

  export let sidebarIsOpen;

  const menu = [
    {
      id: 1,
      label: "Счет",
      href: "/"
    },
    {
      id: 2,
      label: "История",
      href: "/history"
    },
    {
      id: 3,
      label: "Планирование",
      href: "/planning"
    },
    {
      id: 4,
      label: "Новая запись",
      href: "/record"
    },
    {
      id: 5,
      label: "Категории",
      href: "/categories"
    }
  ];
</script>

<ul class="sidenav app-sidenav" class:open={sidebarIsOpen} use:links>
  {#each menu as { id, label, href } (id)}
    <li>
      <a {href} class="waves-effect waves-orange pointer">{label}</a>
    </li>
  {/each}
</ul>
