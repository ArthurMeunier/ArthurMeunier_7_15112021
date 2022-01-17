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
      <img  v-if="post.imageURL != null" class="posts__img"
        :src="'http://localhost:8081/images/'+ post.imageURL"/>
    </div>

    <v-card-text class="posts__description">

      <div>{{post.description}}</div>
    </v-card-text>

      <div class="posts__delete" v-if="isAdmin">
        <v-icon class="posts__deleteicon" @click="deletePost(post)">mdi-delete</v-icon>
      </div>

    <div class="posts__react">
      <div class="posts__reactleft">
          <div class ="posts__reactlike">
            <v-icon  @click="likePost(post.id)" v-if="postIsLiked == false"  id ="myimage" class="posts__reactlikeicon rotating">mdi-thumb-up-outline</v-icon>
            <v-icon  @click="likePost(post.id)" v-else id="myimage" class="posts__reactlikeicon rotating">mdi-thumb-up</v-icon>
            <div class="posts__reactlikenumber">{{ post.countLikes }}</div>
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
      postIsLiked : false,
    };
  },
  methods: {
    getPost(id) {
      PostsDataService.get(id)
        .then((response) => {
          this.post = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    likePost(postId) {
     PostsDataService.likePost(postId)
      .then(res => {
        console.log(res);
        this.getPost(this.$route.params.id);
      })
      .catch(error => {
        alert('Action impossible !')
        console.log(error)
      })
    },

    getUserLike(id) {
      PostsDataService.getOneLike(id)
      .then(result => {
        if (result.ok) {
          return result.json()
        } else {
          return;
        }
      })
      .then(data => {
        if (data !== null) {
          this.postIsLiked = true;
        }
      })
      .catch(e => {
        console.log(e)
      })
    },

    deletePost(post) {
      if(confirm("Voulez-vous vraiment supprimer cette publication ?")) {
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
    this.getUserLike(this.$route.params.id);
    this.getPost(this.$route.params.id);
  },
};
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.rotating {
  transition: transform 0.75s ease-in-out;
}
.rotating:hover {
  transform: rotateZ(360deg);
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
object-fit: cover !important;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 250px;
    border-radius: 24px;
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
    color: black;
    border: 1px solid black;
    border-radius: 15px;
  }
  &__react {
    background-color: $subcard-color;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2%;
    border-top: 4px solid $border-color;
    border-bottom: 2px solid $border-color;
    border-left: 2px solid $border-color;
    border-right: 2px solid $border-color;
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
    color: $icon-color;
    margin-right: 50%;
  }
  &__reactlikenumber {
    font-weight: bold;
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
    &__img {
      height: 100px;
    }
    &__description {
      margin-top: 0;
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
      height: 150px;
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
      height: 150px;
    }
  }

}


</style>