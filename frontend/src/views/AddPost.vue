<template>
<div class="addpost">

  <Header />
  <ReturnToPosts/>
  <h1>Ajouter une publication</h1>

      <v-form 
        @submit.prevent="addPost"
        enctype="multipart/form-data"
        class="addpost__form"
        ref="form"
        v-model="valid"
        >
        <v-text-field
          v-model="post.title"
          :rules="[(v) => !!v || 'Ce champs est requis']"
          label="Titre"
          required
        ></v-text-field>

        <v-textarea
          v-model="post.description"
          :rules="[(v) => !!v || 'Ce champs est requis']"
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
          <!-- <v-file-input
            
              truncate-length="15"
          ></v-file-input> -->

          <!-- <v-file-input label="Ajouter une image" ref="file" v-model="file"></v-file-input> -->

         <!-- <span v-if="file" class="file-name">{{ file.name }}</span> -->

    

        <img v-bind:src="imagePreview" class="addpost__preview" v-on:click="openUpload">
        <!-- <button class="button is-info">Send</button> -->

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
      imagePreview: 'http://localhost:8081/images/img.png',
      error: false,
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
      console.log("addpost");    

      var data = {
        userId: this.post.userId,
        title: this.post.title,
        description: this.post.description,
        imageURL: response.data.file.filename,
      };
      console.log(data);


      PostsDataService.create(data)
        .then((response) => {
          this.post.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
      this.$router.push({ name: "posts" });
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
  &__form {
    @include flexcenter;
    margin-top: 2.5%;
  }
  &__preview {
    height: 100px;
    cursor: pointer;
  }
  &__addbtn {
    margin-top: 2rem;
  }
}


.v-input {
  width: 50%;
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

</style>