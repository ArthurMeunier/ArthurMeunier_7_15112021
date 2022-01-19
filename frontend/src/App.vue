<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: "app",
};
</script>

<style lang="scss">
@import "./scss/mixins.scss";
@import "./scss/variables.scss";

.v-main {
  font-family: 'Rajdhani', sans-serif;
    background-color: $mainbackgroundcolor;
}

h1 {
  margin-top: 5rem;
}

.v-avatar img {
  width: 2rem;
  height: 2rem;
}
</style>