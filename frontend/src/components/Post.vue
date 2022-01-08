<template>
  <div class="Posts">
    <v-card
    class="mx-auto my-12 posts"
    max-width="374"
    >
 
    <v-card-title class="posts__title">{{post.title}}</v-card-title>
    <div class="posts__image">
      <img class="posts__img"
       :src="'http://localhost:8081/images/'+ post.imageURL"/>
    </div>

    <v-card-text class="posts__description">

      <div>{{post.description}}</div>
    </v-card-text>

    <v-divider class="mx-4 divider"></v-divider>

    <div class="posts__react">
      <div class="posts__reactleft">
          <div class ="posts__reactlike">
            <v-icon class="posts__reactlikeicon">mdi-thumb-up</v-icon>
            <div class="posts__reactlikenumber">{{ post.countLikes }}</div>
          </div>
          <div class ="posts__reactdislike">
            <v-icon class="posts__reactdislikeicon">mdi-thumb-down</v-icon>
            <div class="posts__reactdislikenumber">{{ post.countDislikes }}</div>
          </div>      
      </div>
      <div class="posts__reactright">
        <div class ="posts__reactcomment">
        <v-icon class="posts__reactcommenticon">mdi-message</v-icon>
          <div class="posts__reactcommentnumber">{{ post.countComments }}</div>
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
      countComments: "",
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



<style scoped lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";




.posts {
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
    padding: 2%;
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
  
  .divider {
    margin: 0;
  }
}

@media screen and (max-width:480px) {

  .posts {
    width: 17rem!important;
    &__img {
      height: 150px;
    }
  }

}

@media screen and (min-width:481px) and (max-width: 768px) {

  .posts {
    width: 25rem;
    &__title {
      font-size: 1rem;
    }
    &__img {
      height: 175px;
    }
  }

}

@media screen and (min-width:769px) and (max-width: 1024px) {

  .posts {
    width: 40rem;
    &__title {
      font-size: 1rem;
    }
    &__img {
      height: 225px;
    }
  }

}


</style>