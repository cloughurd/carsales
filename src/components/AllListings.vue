<template>
  <div class="feed">
    <results/>
  </div>
</template>

<script>
 import Results from './Results';
 export default {
   name: 'AllListings',
   components: { Results },
   data () {
     return {
       text: '',
     }
   },
   created: function() {
     this.$store.dispatch('getResults');
   },
   methods: {
   }
 }
</script>

<style scoped>
 .feed {
     width: 600px;
 }
 .listingForm {
     background: #eee;
     padding: 10px;
     margin-bottom: 10px;
 }
 .buttonWrap {
     width: 100%;
     display: flex;
 }
 button {
     margin-left: auto;
     height: 2em;
     font-size: 0.9em;
 }
 textarea {
     width: 100%;
     height: 5em;
     padding: 2px;
     margin-bottom: 5px;
     resize: none;
     box-sizing: border-box;
 }
</style>
