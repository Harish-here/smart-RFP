<template>
  <div id="app">
    <nav v-show='!showHotel' class='fl w15 bg-dark h-full white al-left b6 f16'>
      <a href='#' class='p20-40'>RFP's</a>
      <a href='#' class='p20-40 hover'><router-link to='/'>Create RFP</router-link></a>
      <a href='#' class='p20-40'>Drafts</a>
      <a href='#' class='p20-40'><router-link to='./rfp/hotel/questions'>Settings</router-link></a>
      <a href='#' class='p20-40'><router-link to='./rfp/hotel/'>Proposal</router-link></a>
      <a href='#' class='p20-40'><router-link to='./rfp/hotel/review'>Review</router-link></a>
      <a href='#' class='p20-40'><router-link to='/send'>send</router-link></a>
      <a href='#' class='p20-40'><router-link to='/received'>Received</router-link></a>
      <a href='#' class='p20-40'><router-link to='/rfp/hotel/engaged'>Engaged</router-link></a>
      <a href='#' class='p20-40'><router-link to='/questionsCorp'>Question Corp</router-link></a> 
    </nav>
    <nav v-show='showHotel' class='fl w15 bg-dark h-full white al-left b6 f16'>
      <a href='#' class='p20-40'><router-link to='./'>Proposal</router-link></a>
      <a href='#' class='p20-40'><router-link to='./engaged'>Engaged</router-link></a>
      <a href='#' class='p20-40'><router-link to='./review'>Review</router-link></a>
      <a href='#' class='p20-40'><router-link to='./questions'>Settings</router-link></a>
    </nav>
   
    <div id='main_container' class='h-full'>
        <router-view/>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
    showHotel : true
    }
  },
  methods: {
    switchTab: function(){
      $('nav a').removeClass('hover');
    }
  },
  watch: {
    '$router' (to,from){
      console.log(this.$router.path)
    }
  },
  created(){
    var hotel = new RegExp("rfp/hotel")
    var str = location.pathname.toString()
   if(hotel.test(str))
   {
     this.showHotel = true;
   }else{
     this.showHotel = false;
   }
  }
};
</script>

<style src='./assets/basic.css'>


</style>
