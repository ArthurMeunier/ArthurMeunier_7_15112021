<template>
  <header>
    <a href="/Posts" class="logo"><v-img src="../assets/logo_groupo.png" width="300px"> </v-img></a>
    <v-avatar
      @click="toProfile()"
      color="secondary"
      size="56"
    ></v-avatar>
  </header>
</template>

<script>


export default {
  name: "Header",
  methods: {
    toProfile() {
      this.$router.push('/Profile');
    }
  },
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.v-avatar {
  cursor: pointer!important;
}
</style>