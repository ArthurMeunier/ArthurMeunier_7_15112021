<template>
  <header>
    <a href="/Posts" class="logo"><v-img src="../assets/logo_groupo.png" alt="logo" width="300px"> </v-img></a>
    <v-avatar
      class="profile__avatar"
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
      UsersDataService.myprofile()
        .then((response) => {
          this.user = response.data[0]; 
        })
        .catch((e) => {
          if (e.response.status == 401) {
            sessionStorage.clear();
            this.$router.push('/login')
          }
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

  .profile__avatar {
    height: 2rem!important;
    width: 2rem!important;
  }
}

@media screen and (min-width:481px) and (max-width: 768px) {

  .logo {
    width: 18rem;
  }

  .profile__avatar {
    height: 3rem!important;
    width: 3rem!important;
  }
}
</style>