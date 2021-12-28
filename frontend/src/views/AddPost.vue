<template>
<div class="mainAddPost">

  <Header />
  <ReturnToPosts/>
  <h1>Ajouter une publication</h1>
  <div class="submit-form mt-3 mx-auto">
    <div v-if="!submitted">
      <v-form 
        @keyup.enter="addPost"
        class="addpost__form"
        ref="form"
        v-model="valid"
        >
        <v-text-field
          v-model="post.title"
          :rules="[(v) => !!v || 'Ce champs est requis']"
          label="Titre"
          required
        ></v-text-field>

        <v-text-field
          v-model="post.description"
          :rules="[(v) => !!v || 'Ce champs est requis']"
          label="Description"
          required
        ></v-text-field>

        <v-file-input
          accept="image/*"
          label="Ajouter une image"
        ></v-file-input>

        <v-btn
        :disabled="!valid"
        color="primary"
        class="addpost__addbtn"
        @click="addPost"
        >
        Publier
        </v-btn>

      </v-form>

    </div>
  </div>

  <Logout />

</div>
</template>


<script>
import PostsDataService from "../services/PostsDataService";
import Header from '../components/Header.vue';
import ReturnToPosts from "../components/ReturnToPosts.vue";
import Logout from "../components/Logout.vue";


export default {
  name: "addPost",
  data() {
    return {
      post: {
        id: null,
        userId: "",
        title: "",
        description: "",
        imageURL: null,
      },
      submitted: false,
    };
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    addPost() {
      var data = {
        userId: this.post.userId,
        title: this.post.title,
        description: this.post.description,
        imageURL: this.post.imageURL,
      };


      PostsDataService.create(data)
        .then((response) => {
          this.post.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
      this.$router.push({ name: "posts" });
      window.location.reload();
    },

    newPost() {
      this.submitted = false;
      this.post = {};
    },
  },
  components: {
    Header,
    Logout,
    ReturnToPosts
  }
};
</script>



<style lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.main {
  @include flexcenter;
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
}

h1 {
  text-align: center;
}

.submit-form {
  max-width: 300px;
}

</style>