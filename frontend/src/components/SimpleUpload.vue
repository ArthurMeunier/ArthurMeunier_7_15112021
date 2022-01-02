<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">

    <div v-if="message"
      :class="`message ${error ? 'is-danger' : 'is-success'}`"
    >
    
      <div class="message-body">{{ message }}</div>

    </div>
    


 
    <div class="field">


      <v-card class="file is-boxed is-primary">
        <label class="file-label">

          <input
            type="file"
            ref="file"
            class="file-input"
            @change="selectFile"
          /> 

          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file...
            </span>
          </span>

          <span v-if="file" class="file-name">{{ file.name }}</span>
          
        </label>
      </v-card>

    </div>

    <div class="field">
      <button class="button is-info">Send</button>
    </div>

  </form>
</template>


<script>
import axios from 'axios';

export default {
  name: "SimpleUpload",
  data () {
    return {
      file: "",
      message: "",
      error: false
    }
  },

  methods: {
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
      const formData = new FormData();
      formData.append('file', this.file);

      try {
        await axios.post('http://localhost:8080/upload', formData)
        this.message = "File has been uploaded";
        this.file = "";
        this.error = false;
      } catch(err) {
        this.message = err.response.data.error;
        this.error = true;
      console.log(err);
      }
    }
  }
};
</script>



<style lang="scss">


</style>