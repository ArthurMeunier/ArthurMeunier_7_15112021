<template>
  <div class="mainPosts">
    <Header />

    <v-btn class="posts__addpost" fab @click="addPostRedirect()" fixed left top>
        <v-icon class="posts__addposticon">mdi-plus</v-icon>
    </v-btn>

    <v-btn v-if="isAdmin" class="posts__admin" fab color="green" @click="AdminRedirect()" fixed left bottom>
        <v-icon class="posts__adminicon">mdi-account-group</v-icon>
    </v-btn>
    <transition name="fade">
      <Posts />
    </transition>
    <Logout />
  </div>
</template>


<script>
// import axios from "axios";
import Header from "../components/Header.vue";
import Posts from "../components/Posts.vue";
import Logout from "../components/Logout.vue";
const isAdmin = sessionStorage.getItem("admin") == "true";


export default {
  name: "posts",
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
    addPostRedirect() {
      this.$router.push("/addPost");
    },
    AdminRedirect() {
      this.$router.push("/admin");
    },
  },
  components: {
    Header,
    Logout,
    Posts,
  },
};
</script>


<style lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
    background-color: $subcard-color;
    top: 6rem!important;
    left: 1.5rem!important;
  }
  &__addposticon {
    border: 5px solid $card-color;
    border-radius: 25px;
    padding: 1.5rem;
  }
  &__admin {
    width: 2rem!important;
    height: 2rem!important;
  }
  &__adminicon {
    font-size: 1rem!important;
  }
  &__title {
    font-weight: 800!important;
  }
  &__img {
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

@media screen and (max-width:480px) {

  .posts__addpost {
    top: 5rem!important;
    left: 1.2rem!important;
    height: 2rem!important;
    width: 2rem!important;
  }
  .posts__addposticon {
      border: 0;
      padding: 1rem;
    }
}

</style>