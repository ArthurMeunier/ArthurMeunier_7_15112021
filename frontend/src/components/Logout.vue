<template>
    <v-btn fab class="logout__btn" @click="logout()" fixed right bottom>
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

<style lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.logout__btn {
  height: 2.5rem!important;
  width: 2.5rem!important;
  background-color: $delete-color;
}

</style>