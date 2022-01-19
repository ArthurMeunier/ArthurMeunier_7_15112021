<template>
  <header class="headerOffline">
      <a href="/" class="logo"><v-img src="../assets/logo_groupo.png" alt="logo" width="300px"> </v-img></a>
  </header>
</template>

<script>
export default {
  name: 'HeaderOffline'
}
</script>

<style>
.headerOffline {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}


@media screen and (max-width:480px) {

  .logo {
    width: 14rem;
  }

}
</style>