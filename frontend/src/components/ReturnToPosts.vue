<template>
  <!-- <div class="return" @click="toPosts()">
    <v-icon class="return__icon">mdi-arrow-left-thick</v-icon>
  </div> -->

  <v-btn class="return__icon" fab color="teal lighten-1" @click="$router.go(-1)" fixed left top>
      <v-icon>mdi-arrow-left-thick</v-icon>
    </v-btn>

</template>

<script>
export default {
  name: "ReturnToPosts",
};
</script>

<style>
.return__icon {
    top: 6rem!important;
    left: 1.5rem!important;
    color: green!
}




</style>