<template>
  <v-btn class="return" fab @click="$router.go(-1)" fixed left top>
      <v-icon class="return__icon">mdi-arrow-left-thick</v-icon>
    </v-btn>

</template>

<script>
export default {
  name: "ReturnToPosts",
};
</script>

<style lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.return {
    background-color: $back-color;
    width: 2rem;
    height: 2rem;
    top: 6rem!important;
    left: 1.5rem!important;
    &__icon {
        border: 5px solid $card-color;
        border-radius: 25px;
        padding: 1.5rem;
    }
}

@media screen and (max-width:480px) {
  .return {
    top: 5rem!important;
    left: 1.2rem!important;
    height: 2rem!important;
    width: 2rem!important;
    &__icon {
      border: 0;
      padding: 1rem;
    }
  }
}
</style>