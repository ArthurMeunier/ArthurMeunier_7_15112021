<template>
  <div class="mainAdmin">
    <Header />
    <ReturnToPosts />
    <div class="users__wrap">

      <h1>Admin</h1>
    
      <v-card v-for="(user, index) in users" :key="index"
        class="users"
        max-width="374"
      >
        <div class="users__user">{{user.firstname}} {{user.lastname}}</div>
        <v-icon @click="deleteUser(user.id)" class="users__deleteicon">mdi-delete</v-icon>
        
    </v-card>

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
  name: "users",
    data() {
    return {
      users: [],
    };
  },
  components: {
    Header,
    ReturnToPosts,
    Logout,
  },
  methods: {
    getAllUsers() {
      UsersDataService.getAll()
        .then((response) => {
          this.users = response.data.map(this.getUserContent);
          console.log(this.users);
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status == 401) {
            sessionStorage.clear();
            this.$router.push('/login')
          }
        });
    },
    
    getUserContent(user) {
      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        imageURL: user.imageURL,
      };
    },

    deleteUser(userId) {
      console.log("deleteUser");
      console.log(userId);
      if(confirm("Voulez-vous vraiment supprimer cet utilisateur ?"))
      UsersDataService.delete(userId)
        .then((response) => {
          console.log("thendeleteUser");
          console.log(response.status);
          this.user = response.data[0]; 
          window.location.reload();
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
    this.getAllUsers();
  },
};
</script>



<style lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.users__wrap {
  @include flexcenter;
}

.users {
  background-color: $card-color;
  width: 15rem;
  display: flex!important;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 1rem;
  &__deleteicon {
    color: red!important;
  }
}

.return {
  position: absolute;
  left: 0;
}

</style>