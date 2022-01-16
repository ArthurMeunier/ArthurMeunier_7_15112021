<template>
  <header>
    <a href="/Posts" class="logo"><v-img src="../assets/logo_groupo.png" width="300px"> </v-img></a>
    <v-avatar
      @click="toProfile()"
      size="56"
    >
    
      <img
        class="profile__avatarimg"
        alt="Avatar"
        :src="'http://localhost:8081/images/'+ user.imageURL"
      >
    
    </v-avatar>
  </header>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
  name: "Header",
    data() {
    return {
        user: {
        imageURL: ""
      },
    };
  },
  methods: {
    toProfile() {
      this.$router.push('/Profile');
    },

        getProfile() {
      console.log("getProfile");
      UsersDataService.myprofile()
        .then((response) => {
          console.log("then");
          console.log(response.status);
          this.user = response.data[0]; 
          console.log(response.data)
          console.log(response.data[0].id)
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
    }
  },
  beforeMount() {
      this.getProfile();
  },
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}





.profile__avatarimg {
  border: 1px solid black;
  cursor: pointer!important;
}

@media screen and (max-width: 480px) {

  .logo {
    width: 13rem;
  }

}

@media screen and (min-width:481px) and (max-width: 768px) {

  .logo {
    width: 18rem;
  }

}

</style>