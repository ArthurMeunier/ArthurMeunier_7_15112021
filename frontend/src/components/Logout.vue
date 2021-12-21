<template>
    <v-btn fab color="red" @click="logout()" fixed right bottom>
        <v-icon>mdi-logout</v-icon>
    </v-btn>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    logout(){
        sessionStorage.clear();
        this.$router.push('/')
    }
  },
};
</script>

<style>

</style>