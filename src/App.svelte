<script>
  import { Router, Link, Route } from "svelte-routing";
  import {
    Categories,
    DetailRecord,
    History,
    Home,
    Login,
    Planning,
    Profile,
    Record,
    Register
  } from "./pages";
</script>

<style>

</style>

<Router>
  <Route path="/categories" component={Categories} />
  <Route path="/detail-record/:id" component={DetailRecord} />
  <Route path="/history" component={History} />
  <Route path="/login" component={Login} />
  <Route path="/planning" component={Planning} />
  <Route path="/profile" component={Profile} />
  <Route path="/record" component={Record} />
  <Route path="/register" component={Register} />
  <Route path="/" component={Home} />
</Router>
