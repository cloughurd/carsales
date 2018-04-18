<template>
  <div class="feed">
    <h1>Search Results</h1>
    <p>Searched for {{keywords}}</p>
    <results/>
  </div>
</template>

<script>
 import Results from './Results';
 export default {
   name: 'SearchResults',
   components: { Results },
   created: function() {
     this.$store.dispatch('doSearch',this.$route.query.keywords);
   },
   computed: {
     keywords: function() {
       return this.$route.query.keywords;
     }
   },
   watch: {
     '$route.query.keywords'() {
       this.$store.dispatch('doSearch',this.$route.query.keywords);
     }
   },
 }
</script>
