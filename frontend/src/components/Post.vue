<template>
  <div class="Posts">
    <v-card
    class="mx-auto my-12 posts"
    max-width="374"
    >
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
       :src="'http://localhost:8081/images/'+ post.imageURL"/>
    </div>

    <v-card-text class="posts__description">

      <div>{{post.description}}</div>
    </v-card-text>

      <div class="posts__delete" v-if="isAdmin">
        <v-icon class="posts__deleteicon" @click="deletePost(post)">mdi-delete</v-icon>
      </div>

    <v-divider class="mx-4 divider"></v-divider>

    <div class="posts__react">
      <div class="posts__reactleft">
          <div class ="posts__reactlike">
            <v-icon @click="likePost(post)" class="posts__reactlikeicon">mdi-thumb-up</v-icon>
            <div class="posts__reactlikenumber">{{ post.like }}</div>
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
const isAdmin = sessionStorage.getItem("admin") == "true";

export default {
  name: "post",
  data() {
    return {
      post: [],
      id: "",
      title: "",
      description: "",
      like:"",
      countComments: "",
      isAdmin,
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

    deletePost(post) {
      if(confirm("Voulez-vous vraiment supprimer votre compte ? Cette action est définitive.")) {
      PostsDataService.delete(post.id)
      .then((response) => {
        console.log(response.data);
        this.$router.push('/posts')
      }).catch((e) => {
          console.log(e);
        });
      }
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
    max-width: 250px;
    max-height: 250px;
    object-fit: cover!important;
  }
    &__description {
    margin-top: 1rem;
    text-align: center;
    font-weight: 600;
  }
  &__delete {
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
  }
  &__deleteicon {
    color: red;
    border: 1px solid red;
    border-radius: 15px;
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
    justify-content: flex-start;
    margin-left: 10%;
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
  }
  &__reactcomment {
    display:flex;
    margin-right: 10%;
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