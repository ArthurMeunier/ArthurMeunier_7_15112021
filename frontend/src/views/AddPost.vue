<template>
<div class="mainAddPost">

  <Header />
  <h1>Page AddPost</h1>
  <div class="submit-form mt-3 mx-auto">
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="post.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="post.description"
          :rules="[(v) => !!v || 'Description is required']"
          label="Description"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="savePost">Submit</v-btn>
    </div>
  </div>

</div>
</template>


<script>
import PostsDataService from "../services/PostsDataService";
import Header from '../components/Header.vue'


export default {
  name: "addPost",
  data() {
    return {
      post: {
        id: null,
        user_id: null,
        title: "",
        description: "",
        imageURL: null,
      },
      submitted: false,
    };
  },
  methods: {
    savePost() {
      var data = {
        user_id: this.post.user_id,
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
    },

    newPost() {
      this.submitted = false;
      this.post = {};
    },
  },
  components: {
    Header,
  }
};
</script>


<style>
.submit-form {
  max-width: 300px;
}

</style>