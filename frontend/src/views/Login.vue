<template>
  <div class="main">
    <HeaderOffline />

    <div class="login">
      <v-card class="login__card">
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

                 <v-btn class="login__signupbtn" @click="createAccountRedirect()">
          Créer un compte
          </v-btn>
        </v-form>
   
      </v-card>

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
            let responseAdmin = response.data.admin;
            sessionStorage.setItem("token", responseToken);
            sessionStorage.setItem("admin", responseAdmin);
            window.location.href="/Posts";
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
  @include flexcenter;
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
}

.login {
  @include flexcenter;
  padding: 2%;
  &__card {
    background-color: $card-color;
    padding: 5%;
    width: 35rem;
  }
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


@media screen and (max-width:480px) {

  .login__card {
    width: 15rem;
  }

}

@media screen and (min-width:481px) and (max-width: 768px) {

  .login__card {
    width: 25rem;
  }


}

@media screen and (min-width:769px) and (max-width: 1024px) {

  .login__card {
    width: 30rem;
  }


}

</style>