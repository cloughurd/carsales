<template>
  <div class="feed">
    <div v-for="item in feed" class="item">
      <p class="idline"><span class="user">{{item.title}}</span><span class="handle">${{item.price}}</span><span class="time">{{item.created | since}}</span></p>
      <p class="listing">{{item.description}}
      <br>Year: {{item.year}}
      <br>Miles: {{item.miles}}
      <br>Posted By: {{item.username}}</p>
    </div>
  </div>
</template>

<script>
 import moment from 'moment';
 export default {
   name: 'Results',
   filters: {
     since: function(datetime) {
       moment.locale('en', {
      	 relativeTime: {
      	   future: 'in %s',
      	   past: '%s',
      	   s:  'seconds',
      	   ss: '%ss',
      	   m:  '1m',
      	   mm: '%dm',
      	   h:  'h',
      	   hh: '%dh',
      	   d:  'd',
      	   dd: '%dd',
      	   M:  ' month',
      	   MM: '%dM',
      	   y:  'a year',
      	   yy: '%dY'
      	 }
       });
       return moment(datetime).fromNow();
     },
   },
   computed: {
     feed: function() {
       return this.$store.getters.results;
     },
   },
 }
</script>

<style scoped>
.item {
    border-bottom: 1px solid #ddd;
    padding: 10px;
}
.listing {
    margin-top: 0px;
}
.idline {
    margin-bottom: 0px;
}
.user {
    font-weight: bold;
    margin-right: 10px;
}
.handle {
    margin-right: 10px;
    color: #666;
}
.time {
    float: right;
    color: #666;
}
</style>
