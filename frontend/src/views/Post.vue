<template>
  <div class="mainPosts">
    <Header />
    <ReturnToPosts />

   
    <v-card
    :loading="loading"
    class="mx-auto my-12 posts"
    max-width="374"
    >
 
    <v-card-title class="posts__title">{{post.title}}</v-card-title>
    <v-img class="posts__img"
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>



    <v-card-text class="posts__description">

      <div>{{post.description}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <div class="posts__react">
      <div class="posts__reactleft">
          <div class ="posts__reactlike">
            <div class="posts__reactlikeicon">+</div>
            <div class="posts__reactlikenumber">2</div>
          </div>
          <div class ="posts__reactdislike">
            <div class="posts__reactdislikeicon">-</div>
            <div class="posts__reactdislikenumber">4</div>
          </div>      
      </div>
      <div class="posts__reactright">
        <div class ="posts__reactcomment">
          <div class="posts__reactcommenticon">Cmt</div>
          <div class="posts__reactcommentnumber">6</div>
        </div>   
      </div>      
    </div>


  </v-card>
  </div>
</template>



<script>
import PostsDataService from "../services/PostsDataService";
import Header from "../components/Header.vue";
import ReturnToPosts from "../components/ReturnToPosts.vue";

export default {
  name: "post",
  data() {
    return {
      post: [],
      title: "",
      description: "",
    };
  },
  methods: {
    getPost(id) {
    console.log("startfct");
      PostsDataService.get(id)
        .then((response) => {
          this.post = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    toPosts() {
      this.$router.push("/Posts");
    },
  },
  mounted() {
    this.getPost(this.$route.params.id);
  },
  components: {
    Header,
    ReturnToPosts,
  },
};
</script>



<style>


</style>