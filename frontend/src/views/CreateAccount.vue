<template>
 <div class="main">

  <HeaderOffline />

  <div class="signup">
    <v-card class="signup__wrap">
      <v-form 
      @keyup.enter="createUser"
      class="signup__form"
      ref="form"
      v-model="valid"
      >
        <v-text-field
          v-model="firstname"
          :rules="nameRules"
          label="Prénom"
          required
        ></v-text-field>

          <v-text-field
          v-model="lastname"
          :rules="nameRules"
          label="Nom"
          required
        ></v-text-field>


        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          :rules="[rules.required, rules.min]"
          label="Mot de passe"
          hint="Au moins 8 caractères"
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="signup__signupbtn"
          @click="createUser"
        >
          Créer mon compte
        </v-btn>

        <div class="signup__message" v-if="message">{{ message }}</div>
      </v-form>
    </v-card>
    <a href="/" class="signup__signin">J'ai déjà un compte</a>

  </div>

</div> 
</template>

<script>
import HeaderOffline from '../components/HeaderOffline.vue'
import UsersDataService from "../services/UsersDataService";

export default {
  data: () => ({
      valid: true,
      firstname: '',
      lastname: '',
      message: "",
      nameRules: [
        v => !!v || 'Ce champ est requis',
        v => (v && v.length <= 10) || '10 caractères maximum',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Ce champ est requis',
        v => /[^()[\]{}*&^%$#@!]+/.test(v) || `L'email doit être valide`,
      ],
      password: '',
        rules: {
          required: value => !!value || 'Ce champ est requis',
          min: v => v.length >= 8 || '8 caractères minimum'
        },
    }),

  methods: {
    validate () {
      this.$refs.form.validate()
    },
  

    createUser() {
      UsersDataService.create(this.firstname, this.lastname, this.email, this.password)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "Login" });
        })
        .catch(() => {
          {
            this.message = "Adresse mail déjà utilisée";
          }
        });
    }
  },
  components: {
    HeaderOffline,
  },
  created: 
  function() {
    if (sessionStorage.getItem("token") != null) {
      window.location.href="/Posts";
    }
  }
};
</script>



<style lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.main {
@include main;
}

.signup {
  margin-top: 3rem;
    @include flexcenter;
  &__wrap {
    @include flexcenter;
    background-color: $card-color;
    padding: 5%;
    width: 35rem;
  }
  &__signupbtn {
    margin-top: 1.5rem;
  }
  &__signin {
    margin-top: 4rem;
  }
  &__message {
    color: red;
    margin-top: 2rem;
  }
}

@media screen and (max-width:480px) {

  .signup__wrap {
    width: 15rem;
  }
}

@media screen and (min-width:481px) and (max-width: 768px) {

  .signup__wrap {
    width: 25rem;
  }
}

@media screen and (min-width:769px) and (max-width: 1024px) {

  .signup__wrap {
    width: 30rem;
  }
}
</style>