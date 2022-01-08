<template>
  <v-container fluid class="PostsContainer">
    <v-card v-for="(post, index) in posts" :key="index"
    class="mx-auto my-12 posts"
    max-width="374"
    >
      <v-card class="posts__top" @click="postRedirect(post.id)">
        <div class="posts__header">
          <v-card-title class="posts__title">{{post.title}}</v-card-title>
          <div class="posts__userinfo">
            <v-avatar
              class="posts__avatar"
              @click="toProfile()"
              color="secondary"
              size="24"
            ></v-avatar>
            <div class="posts__user">{{post.firstname}} {{post.lastname}}</div>
          </div>
        </div>
        <div class="posts__image">
          <img class="posts__img"
            :src="'http://localhost:8081/images/'+ post.imageURL"
          >
        </div>

        <v-card-text class="posts__description">
          <div>{{post.description}}</div>
        </v-card-text>
      </v-card>

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
        <div class="posts__reactcommentnumber"> {{ post.countComments }}</div>
        </div>   
      </div>      
    </div>


    </v-card>
  </v-container>
</template>


<script>
// import axios from "axios";
import PostsDataService from "../services/PostsDataService";



export default {
  name: "posts",
  data() {
    return {
      posts: [],
      // title: "",
      // description: "",
      // imageURL: "",
      // CommentsCount: "",
    };
  },

  methods: {
    postRedirect(id) {
      this.$router.push(`/Posts/${id}`);
    },
    getAllPosts() {
      PostsDataService.getAll()
        .then((response) => {
          this.posts = response.data.map(this.getPostContent);
          console.log(this.posts);
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status == 401) {
            sessionStorage.clear();
            this.$router.push('/login')
          }
        });
    },
    
    getPostContent(post) {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        imageURL: post.imageURL,
        countComments: post.countComments,
        countLikes: post.countLikes,
        countDislikes: post.countDislikes,
        userimageURL: post.userimageURL,
        firstname: post.firstname,
        lastname: post.lastname,
      };
    },
  },
  mounted() {
    this.getAllPosts();
  },
};
</script>


<style scoped lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.mainPosts {
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
}

.posts {
  background-color: #fdefef!important;
  max-width: 800px!important;
  width: 800px;
  border-radius: 20px!important;
  &__addpost {  
    top: 6rem!important;
    left: 1.5rem!important;
  }
  &__top {
    cursor: pointer;
    background-color: #fdefef!important;
    box-shadow: none!important;;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__userinfo {
    padding: 16px;
    display: flex;
    align-items: center;
  }
  &__user {
    font-weight: 500;
  }
  &__avatar {
    margin-right: 0.5rem;
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
    object-fit: cover!important;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 250px;
  }
  &__description {
    margin-top: 1rem;
    text-align: center;
    font-weight: 600;
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
    &__title {
      font-size: 1rem;
    }
    &__img {
      height: 125px;
    }
    &__userinfo {
      width: 7rem!important;
    }
  }

}

@media screen and (min-width:481px) and (max-width: 768px) {

  .posts {
    width: 25rem!important;
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
    width: 40rem!important;
    &__title {
      font-size: 1rem;
    }
    &__img {
      height: 225px;
    }
  }

}
</style>