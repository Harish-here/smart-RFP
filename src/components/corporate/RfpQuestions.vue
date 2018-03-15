<template>
 <div id='displayCorp' class='fl w100 p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP - Questions</div>
      <ul class='fr p5-10'>
        <li class='di p5-10'>
          <button class='btn btn-primary btn-xs b6' @click='showQues'><i class="fa fa-plus" aria-hidden="true" ></i> Finish</button>
        </li>
        <li class='di p5-10 b6'><button @click='saveDraft' class='btn btn-default btn-xs b6'>Save as Draft</button></li>
        <li class='di p5-10 b6'><button class='btn btn-default btn-xs b6' @click='showQues' v-show='false'>Add Questions</button></li>
      </ul>
      <hr class='w100'>
    </header>
    <ul id='tab_head' class='fl w10 p5-10 b6 f12 center'>
      <li id='tab_1' data-id='1' class='fl p10-20 tb tb--active' @click='getQuestion("Property Baisc")'>Property Baisc</li>
      <li id='tab_7' data-id='7' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Client Specific</li>
      <li id='tab_24' data-id='24' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Safety & Security</li>
      <li id='tab_14' data-id='14' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Hotel Amenities</li>
      <li id='tab_31' data-id='31' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Extended Stay</li>
      <li id='tab_36' data-id='36' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Group / Meetings</li>
      <li id='tab_44' data-id='44' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Corporate Q/A</li>
    </ul>
    <div id='tab_body' class='fl w100 p5-10'>
        <RfpDisplayQuestions @parentDone='moveNxt' :incList='iList' :manList='mList' :draft='toDraft' :quesData='qData' :sub='show.questionBar' @doneSubmit='closeQues'  @close='closeQues' :nxt='nxt' />
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
      nxt: '7',
      show: {
        questionBar : false
      },
      qData:'',
      toDraft: false,
      mList: [],
      iList: []
    }
  },

  created(){
  
  },

  methods: {
    
    saveDraft : function(){
      const self = this;
      if(confirm('Are you sure to save it as draft?')){
        self.toDraft = true;
      }
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
      const self= this;
      self.$store.commit('showProgress')
     $.post(api.getQues,{questionCategoryParent : id}).done(function(data){
      
      var temp = JSON.parse(JSON.stringify(data));
               temp.quesCategory.forEach(element => {
                   element.ques.forEach(c => {
                       c.isMandatory = "0"
                   });
               });
               var temp2 = JSON.parse(JSON.stringify(data));
               temp2.quesCategory.forEach(element => {
                   element.ques.forEach(c => {
                       c.isMandatory = "1"
                   });
               });
             self.iList = temp2;
             self.mList = temp;
      
      //get q obj
      self.qData = JSON.parse(data);
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