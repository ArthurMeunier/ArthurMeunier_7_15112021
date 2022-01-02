<template>
  <div class="Post">
    <v-card
    class="mx-auto my-12 posts"
    max-width="374"
    >
 
    <v-card-title class="posts__title">{{post.title}}</v-card-title>
    <div class="post__image">
      <img class="post__img"
       :src="'http://localhost:8081/images/'+ post.imageURL"/>
    </div>

    <v-card-text class="post__description">

      <div>{{post.description}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <div class="posts__react">
      <div class="posts__reactleft">
          <div class ="posts__reactlike">
            <v-icon class="posts__reactlikeicon">mdi-thumb-up</v-icon>
            <div class="posts__reactlikenumber">2</div>
          </div>
          <div class ="posts__reactdislike">
            <v-icon class="posts__reactdislikeicon">mdi-thumb-down</v-icon>
            <div class="posts__reactdislikenumber">4</div>
          </div>      
      </div>
      <div class="posts__reactright">
        <div class ="posts__reactcomment">
        <v-icon class="posts__reactcommenticon">mdi-message</v-icon>
          <div class="posts__reactcommentnumber">6</div>
        </div>   
      </div>      
    </div>


  </v-card>
  </div>
</template>



<script>
import PostsDataService from "../services/PostsDataService";

export default {
  name: "post",
  data() {
    return {
      post: [],
      id: "",
      title: "",
      description: "",
    };
  },
  methods: {
    getPost(id) {
      PostsDataService.get(id)
        .then((response) => {
          this.post = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getPost(this.$route.params.id);
  },
};
</script>



<style lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";




.post {
  background-color: #fdefef!important;
  max-width: 800px!important;
  width: 800px;
  border-radius: 20px!important;
  &__addpost {
    top: 6rem!important;
    left: 1.5rem!important;
  }
  &__title {
    font-weight: 800!important;
  }
  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__img {
    max-width: 250px;
    max-height: 250px;
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