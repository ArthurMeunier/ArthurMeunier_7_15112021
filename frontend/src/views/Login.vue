<template>
  <div class="main">
    <HeaderOffline />

    <div class="login">
      <v-form class="login__form">
        <v-text-field
          v-model="email"
          label="Email"
          @keyup.enter="loginUser"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Mot de passe"
          type="password"
          @keyup.enter="loginUser"
        ></v-text-field>

        <v-btn class="login__signinbtn" @click="loginUser" color="primary">
          Connexion
        </v-btn>

        <div class="login__message" v-if="message">{{ message }}</div>
      </v-form>

      <v-btn class="login__signupbtn" @click="createAccountRedirect()">
        Créer un compte
      </v-btn>
    </div>
  </div>
</template>

<script>
import HeaderOffline from "../components/HeaderOffline.vue";
import usersDataService from "../services/UsersDataService";

export default {
  data: () => {
    return {
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    createAccountRedirect() {
      this.$router.push("/createAccount");
    },
    loginUser() {
      if (this.email == "" || this.password == "") {
        this.message =
          "Veuillez entrer votre email et votre mot de passe pour vous connecter";
      } else {
        console.log(this.email);
        usersDataService
          .login(this.email, this.password)
          .then((response) => {
            let responseToken = response.data.token;
            sessionStorage.setItem("token", responseToken);
            this.$router.push("/Posts");
          })
          .catch(() => {
            {
              this.message = "Mail ou mot de passe inconnu";
            }
          });
      }
    },
  },
  components: {
    HeaderOffline,
  },
};
</script>

<style lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.main {
  font-family: "Rajdhani", sans-serif;
  @include flexcenter;
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
}

.login {
  @include flexcenter;
  padding: 5%;
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__signupbtn {
    margin-top: 50px;
    background-color: $btn-color-1;
    color: white !important;
  }
  &__message {
    color: red;
    margin-top: 2rem;
  }
}
</style>