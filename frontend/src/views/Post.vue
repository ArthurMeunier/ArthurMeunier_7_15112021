<template>
  <div class="mainPosts">
    <Header />
    <ReturnToPosts />
    <div class="mainPosts__wrap">
      <Post />
      <Comments />
      <AddComment />
    </div>
    <Logout />
  </div>
</template>



<script>
import Header from "../components/Header.vue";
import ReturnToPosts from "../components/ReturnToPosts.vue";
import Post from "../components/Post.vue";
import Comments from "../components/Comments.vue";
import AddComment from "../components/AddComment.vue";
import Logout from "../components/Logout.vue";

export default {
  name: "post",
  components: {
    Header,
    ReturnToPosts,
    Post,
    Comments,
    AddComment,
    Logout,
  },
};
</script>



<style lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.mainPosts__wrap {
  @include flexcenter;
}


.return {
  margin-left: 1rem;
}

</style>