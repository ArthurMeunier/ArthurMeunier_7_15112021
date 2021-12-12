<template>
  <div class="mainPosts">
    <Header />

    <v-btn fab color="primary" @click="addPostRedirect()" fixed left top>
        <v-icon>mdi-plus</v-icon>
    </v-btn>
   
    <v-card @click="postRedirect(post.id)" v-for="(post, index) in posts" :key="index"
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
// import axios from "axios";
import PostsDataService from "../services/PostsDataService";
import Header from "../components/Header.vue";

export default {
  name: "posts",
  data() {
    return {
      posts: [],
      title: "",
      description: "",
    };
  },
  methods: {
    addPostRedirect() {
      this.$router.push("/addPost");
    },
    postRedirect(id) {
      this.$router.push(`/posts/${id}`);
    },
    getAllPosts() {
      PostsDataService.getAll()
        .then((response) => {
          this.posts = response.data.map(this.getPostContent);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPostContent(post) {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
      };
    },
  },
  mounted() {
    this.getAllPosts();
  },
  components: {
    Header,
  },
};
</script>


<style lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.mainPosts {
  font-family: "Rajdhani", sans-serif;
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
}

.v-btn {
  top: 6rem!important;
  left: 1.5rem!important;
}


.posts {
  background-color: #fdefef!important;
  max-width: 800px!important;
  width: 800px;
  border-radius: 20px!important;
  &__title {
    font-weight: 800!important;
  }
  &__img {
    margin: 2.5%;
    object-fit: cover!important;
  }
  &__react {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 1%;
  }
  &__reactleft {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  &__reactlike {
    display:flex;
  }
  &__reactlikeicon {
    margin-right: 50%;
  }
  &__reactdislike {
    display: flex;
  }
  &__reactdislikeicon {
    margin-right: 50%;
  }
  &__reactright {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-right: 10%;
  }
  &__reactcomment {
    display:flex;
  }
  &__reactcommenticon {
    margin-right: 50%;
  }

}
</style>