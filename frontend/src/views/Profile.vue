<template>
<div class="mainPosts">

  <Header/>
  <div class="profile">
 
    <div class="profile__title">{{users.firstname}}</div>

  </div>
  <ReturnToPosts/>
  <h1>Page Profile</h1>
  
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
      user: [],
      id: "",
      firstname: "",
      lastname: "",
      email: "",
    };
  },
  methods: {
    getProfile(id) {
      UsersDataService.get(id)
        .then((response) => {
          this.profile = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  components: {
    Header,
    ReturnToPosts,
    Logout,
  },
  mounted() {
    this.getProfile(this.$route.params.id);
  },
};
</script>


<style>


</style>

