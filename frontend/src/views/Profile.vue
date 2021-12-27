<template>
<div class="mainPosts">

  <Header/>

  <ReturnToPosts/>
  <h1>Page Profile</h1>
  <div class="profile__firstname">{{ firstname }}</div>
  
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
    };
  },
  methods: {
    getUser(id) {
      UsersDataService.get(id)
        .then((response) => {
          this.User = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getUser(this.$route.params.id);
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

