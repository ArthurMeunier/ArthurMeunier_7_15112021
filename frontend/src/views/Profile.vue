<template>
<div class="profileMain">

  <Header/>

  <ReturnToPosts/>
  <h1>Mon compte</h1>
  <div class= "profile">
    <v-avatar
        color="secondary"
        size="110"
    >
    <v-file-input
  truncate-length="15"
></v-file-input>
    </v-avatar>
    <v-card class="profile__card">
      <div class="profile__name">{{ user.firstname }} {{ user.lastname }}</div>
      <div class="profile__email">{{ user.email }}</div>
    </v-card>

    <v-btn
    color="red"
    class="profile__deletebtn"
    >
    Supprimer mon compte 
    </v-btn>
  </div>
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
      console.log("getProfile");
      UsersDataService.myprofile()
        .then((response) => {
          console.log("then");
          console.log(response.status);
          this.user = response.data[0]; 
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response.status);
          if (e.response.status == 401) {
            sessionStorage.clear();
            this.$router.push('/login')
          }
          // console.error;
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


<style lang="scss">
.profile{
  display: flex;
  flex-direction: column;
  align-items: center;
  &__card {
    margin-top: 2rem;
    width: 25%;
    text-align: center;
    font-weight: bold;
  }
  &__deletebtn {
    margin-top: 4rem;
  }
}

h1 {
  text-align: center;
}

</style>

