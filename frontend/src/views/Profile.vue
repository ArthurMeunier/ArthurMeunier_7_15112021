<template>
<div class="mainPosts">

  <Header/>
  <ReturnToPosts/>
  <h1>Page Profile</h1>
  

</div>
</template>


<script>
// import PostsDataService from "../services/PostsDataService";
import Header from '../components/Header.vue'
import ReturnToPosts from '../components/ReturnToPosts.vue'


export default {
    components: {
    Header,
    ReturnToPosts,
  },
};
</script>


<style>


</style>