<script>
  import Sidebar from "../components/sidebar";
  import Navbar from "../components/navbar";

  let sidebarIsOpen = true;
</script>

<div class="app-main-layout">
  <Sidebar {sidebarIsOpen} />
  <Navbar on:toggle={() => (sidebarIsOpen = !sidebarIsOpen)} />

  <main class="app-content" class:full={!sidebarIsOpen}>
    <slot />
  </main>

  <div class="fixed-action-btn">
    <a class="btn-floating btn-large blue" href="/">
      <i class="large material-icons">add</i>
    </a>
  </div>
</div>
