<template>
<div class="addpost">

  <Header />
  <ReturnToPosts/>
  <h1>Ajouter une publication</h1>
    <div class="addpost__wrap">
      <v-card class="addpost__card">
        <v-form 
          @submit.prevent="addPost"
          enctype="multipart/form-data"
          class="addpost__form"
          ref="form"
          v-model="valid"
          >
          <v-text-field
            v-model="post.title"
            label="Titre"
            :rules="titleRules"
            required
            clearable
          ></v-text-field>

          <v-textarea
            v-model="post.description"
            :rules="descriptionRules"
            label="Description"
            required
            ></v-textarea>

            <input
                type="file"
                ref="file"
                id="file-input"
                @change="selectFile"
                style="display: none;"
                v-on:change="updatePreview"
              > 
      
        <div v-on:click="openUpload" id="addpost__text">AJOUTER UNE IMAGE</div>
          <img v-bind:src="imagePreview" alt="imagePreview" v-on:click="openUpload" id="addpost__preview" >
          <v-btn
          :disabled="!valid"
          color="primary"
          class="addpost__addbtn"
          @click="addPost"
          >
          Publier
          </v-btn>

          <div v-if="message"
            :class="`message ${error ? 'is-danger' : 'is-success'}`"
          >
      
          <div class="message-body">{{ message }}</div>

      </div>
      

        </v-form>
      </v-card>
    </div>


  <Logout />

</div>
</template>


<script>
import PostsDataService from "../services/PostsDataService";
import Header from '../components/Header.vue';
import ReturnToPosts from "../components/ReturnToPosts.vue";
import Logout from "../components/Logout.vue";
import axios from 'axios';


export default {
  name: "addPost",
  data () {
    return {
      file: "",
      message: "",
      imagePreview: '',
      error: false,
      valid: true,
      titleRules: [
        v => !!v || 'Ce champ est requis',
        v => (v && v.length <= 75) || '75 caractères maximum',
      ],
      descriptionRules: [
        v => !!v || 'Ce champ est requis',
        v => (v && v.length <= 500) || '500 caractères maximum',
      ],
      post: {
        id: null,
        userId: "",
        title: "",
        description: "",
        imageURL: "",
      },
    }
  },
  methods: {


    async addPost() {
      const response = await this.sendFile();
      let imageURL = null;
      if (response != null) {
        imageURL = response.data.file.filename;
      }

      var data = {
        userId: this.post.userId,
        title: this.post.title,
        description: this.post.description,
        imageURL: imageURL,
      };


      PostsDataService.create(data)
        .then((response) => {
          this.post.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
      this.$router.push({ name: "Posts" });
      window.location.reload();
    },

    newPost() {
      this.submitted = false;
      this.post = {};
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

      if (this.file == "") {
        return null;
      }
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
    openUpload() {
      document.getElementById('file-input').click()
    },

    updatePreview (e) {
        document.getElementById("addpost__preview").style.display = 'block';
        console.log('e', e)
        var reader, files = e.target.files
        if (files.length === 0) {
          console.log('Empty');
          return
        }
        reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
          document.getElementById('addpost__text').style.display = 'none';

        }
        reader.readAsDataURL(files[0])
      }
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

.addpost {
  &__wrap {
    display:flex;
    justify-content: center;
  }
  &__card {
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: $card-color;  
    width: 35rem;
  }
  &__form {
    @include flexcenter;
    margin-top: 2.5%;
    width: 35rem!important;
  }
  &__addbtn {
    margin: 2rem 0rem 1rem 0rem;
  }
}

#addpost__preview {
  height: 100px;
  display:none;
  cursor: pointer;
}

#addpost__text {
  background-color: $border-color;
  border: 2px dashed black;
  height: 5rem;
  text-align: center;
  align-items: center;
  display: flex;
  padding: 5%;
  font-style: italic;
  font-weight: bold;
  cursor: pointer;
}

.v-input {
  width: 75%;
}

.file-input {
  margin-top: 5%;
}

h1 {
  text-align: center;
}

.submit-form {
  max-width: 300px;
}

@media screen and (max-width:480px) {
  .addpost__card {
    width: 16rem!important;
  }

  .addpost__form {
    width: 16rem!important;
  }
}

@media screen and (min-width:481px) and (max-width: 768px) {
  .addpost__card {
    width: 26rem!important;
  }

  .addpost__form {
    width: 26rem!important;
  }
}
</style>