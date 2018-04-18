<template>
  <div>
    <div v-if="loggedIn == false">
      <welcome-page/>
    </div>
    <div>
      <all-listings/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import AllListings from './AllListings';
 export default {
   name: 'HomePage',
   components: {WelcomePage,AllListings},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<style scoped>
</style>
