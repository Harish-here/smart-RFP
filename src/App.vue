<template>
  <div id="app">
    <nav id='corporate' v-show='!showHotel' class='fl w10 bg-drk h-full al-left b6 f16 blue br-l cursor'>
      <div class='p20-40 center act' @click='go({name:"RfpList",params:{foo:"rfp"}},1)'><i class="fa fa-envelope-open-o" aria-hidden="true"></i><br>
 RFP's</div>
      <div href='#' class='p20-40 center' @click='go({name:"RfpCreate",params:{foo:"rfp"}},2)'><i class="fa fa-telegram" aria-hidden="true"></i><br/>
 Create </div>
      <div href='#' class='p20-40 center' @click='go({name:"RfpConnected",params:{foo:"rfp"}},3)'><i class="fa fa-handshake-o" aria-hidden="true"></i>
 Contracted</div>
      <div href='#' class='p20-40 center' @click='go({name:"RfpDraft",params:{foo:"rfp"}},4)'><i class="fa fa-vcard-o" aria-hidden="true"></i>
 Saved</div>
      <div href='#' class='p20-40 center' @click='go({name:"RfpTrash",params:{foo:"rfp"}},5)'><i class="fa fa-trash" aria-hidden="true"></i> Trash</div> 
    </nav>
    <nav id='hotel' v-show='showHotel' class='fl w10 bg-drk h-full al-left b6 f16 blue br-l cursor'>
      <div  class='p20-40 center' @click='go({name:"proposal",params:{foo:"rfp"}})'><i class="fa fa-inbox" aria-hidden="true"></i>
 <br/> Proposal</div>
      <div  class='p20-40 center' @click='go({name:"engaged",params:{foo:"rfp"}})'><i class="fa fa-linux" aria-hidden="true"></i>

<br/> Engaged</div>
      <div  class='p20-40 center' @click='go({name:"display",params:{foo:"rfp"}})'><i class="fa fa-cogs" aria-hidden="true"></i><br/> Settings</div>
      <div  class='p20-40 center'><i class="fa fa-trash" aria-hidden="true"></i> Trash</div>
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
      $('nav div').removeClass('hover');
    },
    go: function(obj,num){
      $('nav#corporate div').removeClass('act');
      $('nav#corporate div:nth-child('+num+')').addClass('act')
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
