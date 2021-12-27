<template>
<div class="mainPosts">

  <Header/>

  <ReturnToPosts/>
  <h1>Page Profile</h1>
  <div class="profile__firstname">{{ firstname }}</div>
  <div class="profile__firstname2">{{ user.firstname }}</div>
  <div class="profile__lastname">{{ lastname }}</div>
  <div class="profile__lastname2">{{ user.lastname }}</div>
  <Logout />
</div>
</template>




<script>
import Header from "../components/Header.vue";
import ReturnToPosts from "../components/ReturnToPosts.vue";
import Logout from "../components/Logout.vue";
import UsersDataService from "../services/UsersDataService";

export default {
  name: "profile",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getProfile() {
      UsersDataService.myprofile()
        .then((response) => {
          this.user = response.data;
          console.log(this.firstname)
          console.log(response.data);
        })
        .catch((e) => {
          console.error;
          console.log(e);
        });
    },
  },
  mounted() {
    this.getProfile();
  },
  components: {
    Header,
    Logout,
    ReturnToPosts
  }
};
</script>


<style>


</style>

