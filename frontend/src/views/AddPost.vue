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

        <v-text-field
          v-model="post.description"
          :rules="[(v) => !!v || 'Ce champs est requis']"
          label="Description"
          required
        ></v-text-field>

        <input
            type="file"
            ref="file"
            class="file-input"
            @change="selectFile"
          /> 

         <span v-if="file" class="file-name">{{ file.name }}</span>


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
    // validate () {
    //   this.$refs.form.validate()
    // },
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
      // console.log(this.file);
      // console.log(this.file.name);
      
      let response = null;

       try {
        response = await axios.post('http://localhost:8080/upload', formData);
        console.log(response);
        // let formData = new FormData();
        // formData.append('title', this.post.title);
        // formData.append('description', this.post.description);
        // formData.append('filename', response.data.file.filename);
        // this.message = "File has been uploaded";
        // this.file = "";
        // this.error = false;
        // console.log(response);
        // console.log(response.data.file.filename)
      } catch(err) {
        this.message = err.response.data.error;
        this.error = true;
        console.log(this.file.filename);

      console.log(err);
      }
      return response;
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
  &__addbtn {
    margin-top: 5rem;
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