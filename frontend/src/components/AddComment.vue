<template>
  <div class="addcomment">

    <v-form 
    class="addcomment__form"
    ref="form"
    v-model="valid"
    @submit.prevent="addComment"
    >

      <v-text-field
        class="addcomment__input"
        v-model="comment"
        :rules="commentRules"
        label="Ajouter un commentaire"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="addcomment__sendbtn"
        @click="addComment"
      >
        Envoyer
      </v-btn>

    </v-form>

  </div>
</template>


<script>
import CommentsDataService from "../services/CommentsDataService";

  export default {
    name: "addcomment",
      data: () => ({
      valid: true,
      comment: '',
      userId: "",
      postId: "",
      commentRules: [
        v => !!v || 'Ce champ est requis',
      ],
    }),
      methods: {
        validate () {
          this.$refs.form.validate()
      },
        addComment() {
          console.log("addComment");
          // console.log(this.userId + "," + this.$route.params.id );
          CommentsDataService.create({ comment : this.comment, userId: this.userId, postId: this.$route.params.id })
            .then(() => {
              window.location.reload();
          return;
        }); 
    },
  },
  }
</script>


<style lang="scss">
.addcomment {
  display:flex;
  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 800px;
    width: 35rem!important;
  }
}

@media screen and (max-width:480px) {

  .addcomment__form {
    width: 17rem!important;
  }

}

@media screen and (min-width:481px) and (max-width: 768px) {

  .addcomment__form {
    width: 25rem!important;
  }

}

@media screen and (min-width:769px) and (max-width: 1024px) {

  .addcomment__form {
    width: 40rem;
  }


}

</style>