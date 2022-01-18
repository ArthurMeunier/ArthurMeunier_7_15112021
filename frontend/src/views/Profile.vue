<template>
<div class="profileMain">

  <Header/>

  <ReturnToPosts/>
  <h1>Mon compte</h1>
  <div class= "profile">
    <v-card class="profile__wrap">
      <v-form 
        @submit.prevent="updateProfile"
        enctype="multipart/form-data"
        class="profile__form"
        ref="form"
        v-model="valid"
      >
        <div class="profile__picture">
          <v-avatar
              class="profile__avatar"
              size="110"

              >
            <!-- <img
              src="http://localhost:8081/images/1641305703123.png"
            > -->

              <img 
                class="profile__image"
                v-on:click="openUpload"
                v-bind:src="imagePreview"
                alt="Avatar"
              >
              <input
                  
                  type="file"
                  ref="file"
                  id="file-input"
                  @change="selectFile"
                  style="display: none;"
                  v-on:change="updatePreview"
                > 

          </v-avatar>
        </div>
        <div class="profile__info">
          <div class="profile__name">{{ user.firstname }} {{ user.lastname }}</div>
          <div class="profile__email">{{ user.email }}</div>
        </div>

        <v-btn
        :disabled="!hasFile"
        color="primary"
        class="profile__savebtn"
        @click="updateProfile"
        >
        Enregistrer
        </v-btn>
      </v-form>
    </v-card>

      <v-btn
      color="red lighten-1"
      class="profile__deletebtn"
      @click="deleteUser()"
      >
      Supprimer mon compte 
      </v-btn>

      <div class="profile__message" v-if="message">{{ message }}</div>

  </div>
  <Logout />
</div>
</template>




<script>
import Header from "../components/Header.vue";
import ReturnToPosts from "../components/ReturnToPosts.vue";
import Logout from "../components/Logout.vue";
import UsersDataService from "../services/UsersDataService";
import axios from 'axios';

export default {
  name: "profile",
  data() {
    return {
        user: {
        imageURL: ""
      },
      message: "",
      valid: true,
      hasFile: false,
      imagePreview: "http://localhost:8081/images/"
    };
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },

    getProfile() {
      console.log("getProfile");
      UsersDataService.myprofile()
        .then((response) => {
          this.user = response.data[0];
          this.imagePreview += this.user.imageURL;
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status == 401) {
            sessionStorage.clear();
            this.$router.push('/login')
          }
        });
    },

    async updateProfile() {
      const response = await this.sendFile();

      var data = {
        imageURL: response.data.file.filename,
      };
   
      UsersDataService.update(this.user.id, data)
        .then((response) => {
          this.user.id = response.data.id;
          this.user.imageURL = data.imageURL;
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
      window.location.reload();
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    },

    deleteUser() {
      if(confirm("Voulez-vous vraiment supprimer votre compte ? Cette action est définitive.")) {
      UsersDataService.deleteme()
        .then((response) => {
          this.user = response.data[0]; 
          this.$router.push('/login')
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status == 401) {
            sessionStorage.clear();
            this.$router.push('/login')
          }
          if (e.response.status == 404) {
             this.message = "Impossible de supprimer cet utilisateur";
          }
        });
      }
    },

    
    openUpload() {
      document.getElementById('file-input').click()
    },

    updatePreview (e) {
        console.log('e', e)
        var reader, files = e.target.files
        if (files.length === 0) {
          console.log('Empty')
        }
        reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        }
        reader.readAsDataURL(files[0])
      },

    selectFile() {
      this.hasFile = true;
      const file = this.$refs.file.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const MAX_SIZE = 10000000;
      const tooLarge = file.size > MAX_SIZE;


      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = this.$refs.file.files[0];
        this.error = false;
        this.message = "";
      } else {
        this.error = true;
        this.message = tooLarge ? `Too large. Max size is ${MAX_SIZE / 1000}Kb.` : "Only images are allowed";
      }
    },

    async sendFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      
      let response = null;

       try {
        response = await axios.post('http://localhost:8080/upload', formData);
      } catch(err) {
        this.message = err.response.data.error;
        this.error = true;
        console.log(err);
      }
      return response;
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
  &__wrap {
    background-color: $card-color;
    width: 35rem;
  }
  @include flexcenter;
  &__form {
  @include flexcenter;
  }
  &__picture {
    display: flex;
    justify-content: center;
  }
  &__avatar {
    margin-top: 1rem;
  }
  &__image {
    border: 2px solid black;
    cursor: pointer!important;
  }
  &__info {
    background-color: $card-color;
    margin-top: 2rem;
    text-align: center;
    font-weight: bold;
  }
  &__email {
    font-weight: 500;
  }
  &__savebtn {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  &__deletebtn {
    margin-top: 4rem;
  }
  &__message {
    color: red;
    margin-top: 2rem;
  }
}

h1 {
  text-align: center;
}

.return {
  margin-left: 1rem;
}


@media screen and (max-width:480px) {

  .profile__wrap {
    width: 15rem;
  }

  .profile__card {
    width: 15rem;
  }

}

@media screen and (min-width:481px) and (max-width: 768px) {

  .profile__wrap {
    width: 20rem;
  }

  .profile__card {
    width: 20rem;
  }

}

@media screen and (min-width:769px) and (max-width: 1024px) {

  .profile__wrap {
    width: 35rem;
  }

  .profile__card {
    width: 35rem;
  }
}
</style>

