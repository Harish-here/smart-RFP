<template>
  <div id="app">
    <nav v-show='!showHotel' class='fl w15 bg-drk h-full al-left b6 f16 bl'>
      <a href='#' class='p20-40' @click='go({name:"RfpList",params:{foo:"rfp"}})'>RFP's</a>
      <a href='#' class='p20-40' @click='go({name:"RfpCreate",params:{foo:"rfp"}})'>Create RFP</a>
      <a href='#' class='p20-40' @click='go({name:"RfpConnected",params:{foo:"rfp"}})'>Contracted</a>
      <a href='#' class='p20-40' @click='go({name:"RfpDraft",params:{foo:"rfp"}})'>Drafts</a>
      <a href='#' class='p20-40'>Trash</a> 
    </nav>
    <nav v-show='showHotel' class='fl w15 h-full al-left b6 f16 bl'>
      <a href='#' class='p20-40'><router-link to='./'>Proposal</router-link></a>
      <a href='#' class='p20-40'><router-link to='./hotel/engaged'>Engaged</router-link></a>
      <a href='#' class='p20-40'><router-link to='./hotel/questions'>Settings</router-link></a>
      <a href='#' class='p20-40'><router-link to='./hotel/review'>Trash</router-link></a>
    </nav>
   
    <div id='main_container' class=' h-full'>
        <router-view/>
    </div>
    <transition name='fade'>
      <div v-show='toShow' class='fl w100 pab p5-10 center white bg-green b6' style='top:0'>
         {{label}}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
    showHotel : true,
    alt: true
    }
  },
  methods: {
    switchTab: function(){
      $('nav a').removeClass('hover');
    },
    go: function(obj){
      this.$router.push(obj)
    }

  },

  computed: {
    label(){
      return this.$store.state.label
    },

    toShow(){
      return this.$store.state.alt
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
