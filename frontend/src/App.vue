
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

<style>

.v-main {
  font-family: 'Rajdhani', sans-serif;
  background-color: #f4f3ee;
}

h1 {
  margin-top: 5rem;
}

.v-avatar img {
  width: unset!important;
}



</style>