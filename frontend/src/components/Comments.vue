<template>
  <div class="comments">
    <v-card v-for="(comment, index) in comments" :key="index"
    class="comments__comment"
    >
 
      <div class="comments__info">
        <v-avatar
          class="comments__avatar"
          @click="toProfile()"
          color="secondary"
          size="24"
        ></v-avatar>
        <div class ="comments__user"> {{comment.firstname}} {{comment.lastname}} {{renderDate(comment.createdAt)}} </div>
      </div>

      <div class="comments__content">{{comment.comment}}</div>



  </v-card>
  </div>
</template>


<script>
// import axios from "axios";
import CommentsDataService from "../services/CommentsDataService";



export default {
  name: "comments",
  data() {
    return {
      comments: [],
      comment: "",
      firstname: "",
      lastname: "",
      createdAt: "",
    };
  },
  methods: {
    getAllComments(postId) {
      CommentsDataService.getAllByPost(postId)
        .then((response) => {
          this.comments = response.data.map(this.getCommentContent);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCommentContent(comment) {
      return {
        id: comment.id,
        comment: comment.comment,
        firstname: comment.firstname,
        lastname: comment.lastname,
        createdAt: comment.createdAt,
      };
    },
    
    renderDate(str)
    {
      function doubleDigits(n)
      {
        if(n<10)
        {
          return("0" + n);
        }
        return(n.toString());
      }

      let d = new Date(str);
      return doubleDigits(d.getDate()) + "/" + doubleDigits(d.getMonth() + 1) + "/" + d.getFullYear() + " " + doubleDigits(d.getHours()) + "h" + doubleDigits(d.getMinutes());
    },
    },
  mounted() {
        this.getAllComments(this.$route.params.id);
  },
};
</script>


<style scoped lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";


.comments {
  max-width: 800px!important;
  width: 800px;
  border-radius: 20px!important;
  @include flexcenter;
  &__comment {
      background-color: #f8dcdc!important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 1rem 2rem 1rem 2rem!important;
    padding: 1rem 1rem 1rem 1rem!important;

  }
  &__info {
    display: flex;
    margin-bottom: 1rem;
  }
  &__user {
    margin-left: 1rem;
  }
  &__content {
    margin-left: 1rem;
  }
}


@media screen and (max-width:480px) {

  .comments {
    width: 17rem;
  }

}

@media screen and (min-width:481px) and (max-width: 768px) {

  .comments {
    width: 25rem!important;
  }

}

@media screen and (min-width:769px) and (max-width: 1024px) {

  .comments {
    width: 40rem!important;
  }


}


</style>