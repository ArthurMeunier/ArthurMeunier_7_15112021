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
        <v-avatar
          class="users__avatar"
          size="24"
        >
        
          <img
            class="users__avatarimg"
            alt="Avatar"
            :src="'http://localhost:8081/images/'+ user.imageURL"
          >

        </v-avatar>
          <div class="users__user">{{user.firstname}} {{user.lastname}}</div>
          <div class="users__delete">
            <v-icon @click="deleteUser(user.id)" class="users__deleteicon">mdi-delete</v-icon>
          </div>
        

    </v-card>
    <div class="users__message" v-if="message">{{ message }}</div>

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
      message: "",
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
      if(confirm("Voulez-vous vraiment supprimer cet utilisateur ?"))
      UsersDataService.delete(userId)
        .then((response) => {
          this.user = response.data[0]; 
          window.location.reload();
        })
        .catch((e) => {
          console.log(e.response.status);
          if (e.response.status == 401) {
            sessionStorage.clear();
            this.$router.push('/login')
          }
          if (e.response.status == 404) {
             this.message = "Impossible de supprimer cet utilisateur";
          }
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
  justify-content: space-between;
  display: flex!important;
  align-items: center!important;
  margin-top: 1rem;
  padding: 1rem;
  &__avatarimg {
    border: 1px solid black;
  }
  &__delete {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 1rem;
  }
  &__deleteicon {
    color: black!important;
    border: 1px solid black;
    border-radius: 15px;
  }
  &__message {
    color: red;
    margin-top: 2rem;
  }
}

.return {
  position: absolute;
  left: 0;
}

</style>