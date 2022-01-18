<template>
  <v-container fluid class="PostsContainer">
    <transition-group name="fade" tag="div" class="postsfade">
      <v-card v-for="(post, index) in posts" :key="index+0"
      class="mx-auto my-12 posts"
      max-width="374"
      >

        <v-card class="posts__top" @click="postRedirect(post.id)">

          <div class="posts__header">
            <v-card-title class="posts__title">{{post.title}}</v-card-title>
            <div class="posts__userinfo">
              <v-avatar
                class="posts__avatar"
                size="24"
              >
                <img 
                  class="posts__avatarimg"
                  alt="Avatar"
                  :src="'http://localhost:8081/images/'+ post.userimageURL"
                >
              
              </v-avatar>
              <div class="posts__user">{{post.firstname}} {{post.lastname}}</div>
            </div>
          </div>
          <div class="posts__image">
            <img v-if="post.imageURL != null" class="posts__img"
              :src="'http://localhost:8081/images/'+ post.imageURL"
            >
          </div>


        </v-card>


      <div class="posts__react">
        <div class="posts__reactleft">
            <div class ="posts__reactlike">
              <v-icon  @click="likePost(post.id)" v-if="post.countLikes <= 0" class="posts__reactlikeicon rotating">mdi-thumb-up-outline</v-icon>
              <v-icon  @click="likePost(post.id)" v-else class="posts__reactlikeicon rotating">mdi-thumb-up</v-icon>
              <div v-if="post.countLikes <= 0" class="posts__reactlikenumber">{{ post.countLikes }}</div>
              <div v-else class="posts__reactlikenumberbold">{{ post.countLikes }}</div>
            </div>  
        </div>
        <div class="posts__reactright">
          <div class ="posts__reactcomment">
          
          <v-icon @click="postRedirect(post.id)" v-if="post.countComments <= 0" class="posts__reactcommenticon">mdi-message-outline</v-icon>
          <v-icon @click="postRedirect(post.id)" v-else class="posts__reactcommenticon">mdi-message</v-icon>

          <!-- <v-icon @click="postRedirect(post.id)" class="posts__reactcommenticon">mdi-message</v-icon> -->

          <div v-if="post.countComments <= 0" class="posts__reactcommentnumber"> {{ post.countComments }}</div>
          <div v-else class="posts__reactcommentnumberbold"> {{ post.countComments }}</div>
          </div>   
        </div>      
      </div>


      </v-card>
  </transition-group>
  </v-container>
</template>


<script>
// import axios from "axios";
import PostsDataService from "../services/PostsDataService";
const isAdmin = sessionStorage.getItem("admin") == "true";


export default {
  name: "posts",
  data() {
    return {
      posts: [],
      isAdmin,
      postIsLiked: false,
    };
  },

  methods: {
    
    postRedirect(id) {
      this.$router.push(`/Posts/${id}`);
    },

    deletePost(post) {
      PostsDataService.delete(post.id)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      }).catch((e) => {
          console.log(e);
        });
    },

    likePost(postId) {
     PostsDataService.likePost(postId)
      .then(res => {
        console.log(res)
        this.getAllPosts()
      })
      .catch(error => {
        alert('Action impossible !')
        console.log(error)
      })
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
        like: post.like,
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.rotating {
  transition: transform 0.75s ease-in-out!important;
}
.rotating:hover {
  transform: rotateZ(360deg);
}


.mainPosts {
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
}

.posts {
  background-color: $card-color;
  max-width: 800px!important;
  width: 800px;
  border-radius: 20px!important;
  &__addpost {  
    top: 6rem!important;
    left: 1.5rem!important;
  }
  &__top {
    background-color: #ece5d4!important;
    cursor: pointer;
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
  &__avatarimg {
    border: 1px solid black;
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
    border-radius: 24px;
    margin-bottom: 1rem;
  }

  &__description {
    margin-top: 1rem;
    text-align: center;
    font-weight: 600;
  }
  &__react {
    border-top: 4px solid $border-color;
    border-bottom: 2px solid $border-color;
    border-left: 2px solid $border-color;
    border-right: 2px solid $border-color;

  background-color: $subcard-color;
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
    justify-content: flex-start;
    margin-left: 10%;
  }
  &__reactlike {
    display:flex;
  }
  &__reactlikeicon {
    margin-right: 50%;
    color: $icon-color;
  }
  &__reactlikenumberbold {
    font-weight: bold;
  } 
  &__reactcommentnumberbold {
    font-weight: bold;
  }
  &__reactright {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  &__reactcomment {
    display:flex;
    margin-right: 10%;
  }
  &__reactcommenticon {
    color: $icon-color;
    margin-right: 50%;
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
    &__user {
      font-size: 0.8rem;
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
    &__user {
      font-size: 0.9rem;
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