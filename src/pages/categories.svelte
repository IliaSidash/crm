<script>
  import { onMount } from "svelte";

  import Layout from "../layouts/main";
  import CreateCategory from "../components/create-category";
  import EditCategory from "../components/edit-category";
  import Loader from "../components/loader";

  import { category } from "../store";

  onMount(async () => {
    try {
      await category.fetch();
    } catch (e) {}
  });
</script>

<Layout>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Категории</h3>
      </div>
      <section>
        <div class="row">
          <div class="col s12 m6">
            <CreateCategory />
          </div>
          {#if $category.length}
            <div class="col s12 m6">
              <EditCategory categories={$category} />
            </div>
          {/if}
        </div>
      </section>
    </div>
  </div>

</Layout>
