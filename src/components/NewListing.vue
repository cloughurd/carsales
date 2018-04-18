<template>
  <div>
    <div v-if="loggedIn">
      <form v-on:submit.prevent="addListing">
        <p>Enter a title</p>
        <input class="wide" v-model="title" placeholder="Title">
        <p>Describe your vehicle</p>
        <input class="narrow" type="number" v-model="price" placeholder="price">
        <input class="narrow" type="number" v-model="year" placeholder="year">
        <input class="narrow" type="number" v-model="miles" placeholder="miles">
        <textarea v-model="description" placeholder="description"/>
        <button class="alternate" type="submit">Submit</button>
      </form>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>


<script>
 import WelcomePage from './WelcomePage';
 export default {
   name: 'NewListing',
   data(){
    return{
      title: '',
      price: '',
      year: '',
      miles: '',
      description: '',
    }
   },
   components: {WelcomePage},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
   methods: {
    addListing: function(){
      this.$store.dispatch('addListing', {
        title: this.title,
        price: this.price,
        year: this.year,
        miles: this.miles,
        description: this.description,
      });
      this.$router.push({ path: '/'})
    }
   },
 }
</script>

<style scoped>
 img {
     width: 100px;
 }

 h1 {
     margin-bottom: 0px;
 }
 h2 {
     margin-top: 0px;
     font-size: 1.2em;
     font-weight: normal;
     margin-bottom: 50px;
 }
 .narrow {
     width: 170px;
 }
 .wide {
     width: 370px;
 }
</style>
