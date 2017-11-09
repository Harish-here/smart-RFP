<template>
  <div id="app">
    <nav v-show='!showHotel' class='fl w15 bg-drk h-full white al-left b6 f16'>
      <router-link to='./'><a href='#' class='p20-40'>RFP's</a></router-link>
      <router-link to='./create'><a href='#' class='p20-40'> Create RFP</a></router-link>
      <router-link to='./'><a href='#' class='p20-40'>Contracted</a></router-link>
      <router-link to='./'><a href='#' class='p20-40'>Drafts</a></router-link>
      <router-link to='./'><a href='#' class='p20-40'>Trash</a></router-link> 
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
