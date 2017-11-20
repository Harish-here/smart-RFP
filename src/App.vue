<template>
  <div id="app">
    <nav id='corporate' v-show='!showHotel' class='fl w10 bg-drk h-full al-left b6 f16 bl br-l'>
      <a href='#' class='p20-40 center' @click='go({name:"RfpList",params:{foo:"rfp"}})'><i class="fa fa-envelope-open-o" aria-hidden="true"></i><br>
 RFP's</a>
      <a href='#' class='p20-40 center' @click='go({name:"RfpCreate",params:{foo:"rfp"}})'><i class="fa fa-telegram" aria-hidden="true"></i><br/>
 Create </a>
      <a href='#' class='p20-40 center' @click='go({name:"RfpConnected",params:{foo:"rfp"}})'><i class="fa fa-handshake-o" aria-hidden="true"></i>
 Contracted</a>
      <a href='#' class='p20-40 center' @click='go({name:"RfpDraft",params:{foo:"rfp"}})'><i class="fa fa-vcard-o" aria-hidden="true"></i>
 Saved</a>
      <a href='#' class='p20-40 center'><i class="fa fa-trash" aria-hidden="true"></i> Trash</a> 
    </nav>
    <nav id='hotel' v-show='showHotel' class='fl w10 h-full al-left b6 f16 bl'>
      <a href='javascript: void(0);' class='p20-40' @click='go({name:"proposal",params:{foo:"rfp"}})'>Proposal</a>
      <a href='javascript: void(0);' class='p20-40' @click='go({name:"engaged",params:{foo:"rfp"}})' >Engaged</a>
      <a href='javascript: void(0);' class='p20-40' @click='go({name:"display",params:{foo:"rfp"}})'>Settings</a>
      <a href='javascript: void(0);' class='p20-40'>Trash</a>
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
    'this.$router' (to,from){
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
