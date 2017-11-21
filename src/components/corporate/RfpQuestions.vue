<template>
 <div id='displayCorp'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>RFP - Questions</div>
      <ul class='fr p5-10'>
        <li class='di p5-10'>
          <button class='btn btn-primary btn-xs b6' @click='showQues'><i class="fa fa-plus" aria-hidden="true" ></i> Finish</button>
        </li>
        <li class='di p5-10 b6'><button class='btn btn-default btn-xs b6'>Save as Draft</button></li>
        <li class='di p5-10 b6'><button class='btn btn-default btn-xs b6' @click='showQues' v-show='false'>Add Questions</button></li>
      </ul>
      <hr>
    </header>
    <ul id='tab_head' class='fl w100 p5-10 b6 f12 center'>
      <li id='tab_1' data-id='1' class='fl p10-20 tb tb--active' @click='getQuestion("Property Baisc")'>Property Baisc</li>
      <li id='tab_7' data-id='7' class='fl p10-20 tb' @click='getQuestion("Property Baisc")' disabled>Client Specific</li>
      <li id='tab_24' data-id='24' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Safety & Security</li>
      <li id='tab_28' data-id='28' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Blackout / Fair Dates</li>
      <li id='tab_31' data-id='31' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Extended Stay</li>
      <li id='tab_36' data-id='36' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Group / Meetings</li>
      <li id='tab_44' data-id='44' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Corporate Q/A</li>
    </ul>
    <div id='tab_body' class='fl w100 p5-10 h-75'>
        <RfpDisplayQuestions @parentDone='moveNxt' :quesData='qData' :sub='show.questionBar' @doneSubmit='closeQues'  @close='closeQues' :nxt='nxt' />
    </div>
    
 </div>
</template>

<script>
import RfpDisplayQuestions from '@/components/corporate/RfpDisplayQuestions'
import api from '@/api/api'

export default {
  name: 'RfpQuestions',
  components: {RfpDisplayQuestions},
  data() {
    return {
      nxt: '',
      show: {
        questionBar : false
      },
      qData:''
    }
  },

  created(){
    const self =this;
    self.nxt = "7";
  },

  methods: {
    
    subQues : function(){
      console.log('hi');
    },
    showQues: function(){
        const self = this;
        self.show.questionBar = true; 
    },
    closeQues: function(){
        const self = this;
        self.show.questionBar = false; 
    },
    getQuestion: function(){
      alert('Please Click the save in the last tab and you will be moved to next category')
    },
    moveNxt: function(){
      const self = this;
      var nxxt = self.nxt;
      $('ul#tab_head li ').removeClass('tb--active');
      $('li#tab_'+nxxt).addClass('tb--active');
      if($('li#tab_'+nxxt).is(':last-child')){
        //self.getQues(nxt);
        self.nxt = "1"; //will set the first tab
      }else{
        //self.getQues(nxt);
       var nnxt = $('li#tab_'+nxxt).next().data('id');
       self.nxt = nnxt;
      }
    },
    getQues : function(id){
      self.$store.commit('showProgress')
     $.post(api.getQues,{questionCategoryParent : id}).done(function(data){
      //get q obj
      self.quesData = JSON.parse(data);
    })
    }
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>