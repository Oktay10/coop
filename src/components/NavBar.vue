<template>
    <b-navbar v-if="this.membreConnecter()" fixed="top" toggleable="md" type="dark" variant="dark">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand to="/channels">Co'op</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item to="/members">Membres</b-nav-item>
      <b-nav-item to="/channels">Discussions</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown id="myNav" right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{ $store.state.member.fullname }}</em>
        </template>
        <b-dropdown-item to="/logout">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<script>

export default {
  name: 'navBar',
  computed: {
   member(){
     return this.$store.state.member;
   } 
  }

}
</script>

<style>
#dropdown {
  z-index: 20;
}
</style>
