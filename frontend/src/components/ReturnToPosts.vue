<template>
  <div class="return" @click="toPosts()">
    <v-icon class="return__icon">mdi-arrow-left-thick</v-icon>
  </div>
</template>

<script>
export default {
  name: "ReturnToPosts",
  methods: {
    toPosts() {
      this.$router.push("/Posts");
    },
  },
};
</script>

<style>
.return__icon {
  font-size: 4rem!important;
  color: black!important;
  cursor: pointer!important;
}

</style>