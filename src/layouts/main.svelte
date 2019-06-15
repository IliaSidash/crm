<script>
  import { onMount } from "svelte";

  import Sidebar from "../components/sidebar";
  import Navbar from "../components/navbar";
  import Loader from "../components/loader";
  import { info } from "../store";

  let sidebarIsOpen = true;

  onMount(() => {
    if (!$info.loaded) {
      info.fetch();
    }
  });
</script>

{#if $info.loaded}
  <div class="app-main-layout">
    <Sidebar {sidebarIsOpen} />
    <Navbar
      userName={$info.name}
      on:toggle={() => (sidebarIsOpen = !sidebarIsOpen)} />
    <main class="app-content" class:full={!sidebarIsOpen}>
      <slot />
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="/">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
{:else}
  <Loader />
{/if}
