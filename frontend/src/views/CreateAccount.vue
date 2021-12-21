<template>
 <div class="main">

  <HeaderOffline />

  <div class="signup">

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
        hint="Au moins 2 caractères"
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="signup__signupbtn"
        @click="createUser"
      >
        Créer mon compte
      </v-btn>
    </v-form>

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
      nameRules: [
        v => !!v || 'Ce champ est requis',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Ce champ est requis',
        v => /.+@.+\..+/.test(v) || `L'email doit être valide`,
      ],
      password: '',
        rules: {
          required: value => !!value || 'Ce champ est requis',
          min: v => v.length >= 2 || 'Min 2 characters'
        },
    }),

  methods: {
    validate () {
      this.$refs.form.validate()
    },
    createUser() {
      console.log("createUser");
      UsersDataService.create(this.firstname, this.lastname, this.email, this.password)
        .then((response) => {
          for (var key in response.data) {
            this.profile[key] = response.data[key];
          }
          return;
        });
      this.$router.push({ name: "posts" });
    },
    loginRedirect() {
      this.$router.push({ name: "login" });
    }
  },
  components: {
    HeaderOffline,
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
  &__signupbtn {
    margin-top: 1.5rem;
  }
  &__signin {
    margin-top: 4rem;
  }
}
</style>