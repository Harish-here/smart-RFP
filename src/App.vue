<template>
  <div id="app">
    <transition name='fade'>
      <div v-show='toShow' class='fl w100 pab p5-10 center white bg-green b6' style='top:0'>
         {{label}}
      </div>
    </transition>
    <nav id='corporate' v-if='!showHotel' class='fl w10 bg-drk h-full al-left b6 f16  br-l cursor'>
      <div id='nav_1' class='p20-40 center act' @click='go({path:"/"+$store.state.path+"/corprate/"},1)'><i class="fa fa-envelope-open-o" aria-hidden="true"></i><br>RFP's</div>
      <div id='nav_2' v-if='$store.state.permission != 0'  class='p20-40 center' @click='go({path:"/"+$store.state.path+"/corprate/create"},2)'><i class="fa fa-telegram" aria-hidden="true"></i><br/>Create </div>
      <div id='nav_3' class='p20-40 center' @click='go({path:"/"+$store.state.path+"/corprate/connected"},3)'><i class="fa fa-handshake-o" aria-hidden="true"></i><br/>Contracted</div>
      <div id='nav_4' class='p20-40 center' @click='go({path:"/"+$store.state.path+"/corprate/draft"},4)'><i class="fa fa-vcard-o" aria-hidden="true"></i><br/>Saved</div>
      <div id='nav_5' href='#' class='p20-40 center' @click='go({path:"/"+$store.state.path+"/corprate/trash"},5)'><i class="fa fa-trash" aria-hidden="true"></i><br/> Trash</div> 
    </nav>
    <nav id='hotel' v-if='showHotel' class='fl w10 bg-drk h-full al-left b6 f16  br-l cursor'>
      <div id='nav_1' class='p20-40 center' @click='goo({path:"/"+$store.state.path+"/hotel"},1)'><i class="fa fa-inbox" aria-hidden="true"></i><br/> Proposal</div>
      <div id='nav_2' class='p20-40 center' @click='goo({path:"/"+$store.state.path+"/hotel/engaged"},2)'><i class="fa fa-linux" aria-hidden="true"></i><br/> Engaged</div>
      <div id='nav_3' class='p20-40 center act' @click='goo({path:"/"+$store.state.path+"/hotel/questions"},3)'><i class="fa fa-cogs" aria-hidden="true"></i><br/> Settings</div>
      <div id='nav_4' class='p20-40 center' @click='goo({path:"/"+$store.state.path+"/hotel/preview"},4)'><i class="fa fa-book" aria-hidden="true"></i> Preview</div>
      <div id='nav_5' class='p20-40 center' @click='goo({path:"/"+$store.state.path+"/hotel/trash"},5)'><i class="fa fa-trash" aria-hidden="true"></i> Trash</div>
    </nav>
   
    <div id='main_container' class='fl w90 h-full y-flow'>
        <router-view/>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import api from '@/api/api'
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
      $('nav div').removeClass('hover');
    },
    go: function(obj,num){
      $('nav#corporate div').removeClass('act');
      $('nav#corporate div#nav_'+num).addClass('act')
      this.$router.push(obj)
    },
    goo: function(obj,num){
      $('nav#hotel div').removeClass('act');
      $('nav#hotel div#nav_'+num).addClass('act')
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
     // console.log(this.$router.path)
    }
  },
  created(){
    const self = this;
    var hotel = new RegExp("rfp/hotel")
    var str = location.pathname.toString()
    if(hotel.test(str))
    {
      this.showHotel = true;
    }else{
      this.showHotel = false;
    }
    self.$store.commit('setPath',self.$route.params.foo);

    axios(api.checkPermission).then(function(data){
      self.$store.commit('setPermission',data.data.permission);
     // console.log(data);
    });
  }
};
</script>

<style src='./assets/basic.css'>
</style>
