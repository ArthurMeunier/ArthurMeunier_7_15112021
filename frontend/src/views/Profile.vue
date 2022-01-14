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
                :src="'http://localhost:8081/images/'+ user.imageURL"
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
        :disabled="!valid"
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
      valid: "",
      imagePreview: '',
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
    },

    async updateProfile() {
      const response = await this.sendFile();
      console.log("updateProfile");    

      var data = {
        imageURL: response.data.file.filename,
      };
      console.log(data);

      
      UsersDataService.update(this.user.id, data)
        .then((response) => {
          this.user.id = response.data.id;
          console.log("inUpdate")
          console.log(response.data);
          console.log(data);
          console.log(data.imageURL);
          this.user.imageURL = data.imageURL;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
      // window.location.reload();
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    },

    deleteUser() {
      console.log("deleteUser");
      console.log();
      if(confirm("Voulez-vous vraiment supprimer votre compte ? Cette action est définitive.")) {
      UsersDataService.deleteme()
        .then((response) => {
          console.log("thendeleteUser");
          console.log(response.status);
          this.user = response.data[0]; 
          this.$router.push('/login')
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
          this.imagePreview = e.target.result
        }
        reader.readAsDataURL(files[0])
      },

    selectFile() {
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
      console.log("sendfile");
      console.log(this.file);
      
      let response = null;

       try {
        response = await axios.post('http://localhost:8080/upload', formData);
        console.log(response);
      } catch(err) {
        this.message = err.response.data.error;
        this.error = true;
        console.log(this.file.filename);

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
    width: unset!important;
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

