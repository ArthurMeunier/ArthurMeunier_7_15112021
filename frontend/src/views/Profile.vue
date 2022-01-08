<template>
<div class="profileMain">

  <Header/>

  <ReturnToPosts/>
  <h1>Mon compte</h1>
  <div class= "profile">
    <v-avatar
        class="profile__avatar"
        color="secondary"
        size="110"
    >
      <!-- <img
        src="http://localhost:8081/images/1641305703123.png"
      > -->
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
    @click="deleteUser(id)"
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

    deleteUser() {
      console.log("deleteUser");
      console.log();
      UsersDataService.delete()
        .then((response) => {
          console.log("thendeleteUser");
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
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.profile{
  display: flex;
  flex-direction: column;
  align-items: center;
  &__avatar {
    margin-top: 4rem;
  }
  &__card {
    background-color: $card-color;
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

.return {
  margin-left: 1rem;
}


@media screen and (max-width:480px) {

  .profile__card {
    width: 15rem;
  }

}

@media screen and (min-width:481px)  {

  .profile__card {
    width: 25rem;
  }
}



</style>

