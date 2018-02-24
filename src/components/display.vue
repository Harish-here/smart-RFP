<template>
 <div id='display' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP - Questions</div>
      <ul class='fr p5-10'>
        <li class='di p5-10'>
          <button class='btn btn-primary btn-sm b6' @click='exit'> Save & Exit</button>
        </li>
      </ul>
      <div v-if='ss' class='pab saveBox'>Saving...</div>
      <hr>
    </header>
    <ul id='tab_head' class='fl w10 p5-10 b6 f12 center'>
      <li id='tab_1' data-id='1' class='fl p10-20 tb tb--active' @click='moveToNext(1)'>Property Baisc</li>
      <li id='tab_7' data-id='7' class='fl p10-20 tb' @click='moveToNext(7)'>Client Specific</li>
      <li id='tab_24' data-id='24' class='fl p10-20 tb' @click='moveToNext(24)'>Safety & Security</li>
      <li id='tab_14' data-id='14' class='fl p10-20 tb' @click='moveToNext(14)'>Hotel Amenities & services</li>
      <li id='tab_31' data-id='31' class='fl p10-20 tb' @click='moveToNext(31)'>Extended Stay</li>
      <li id='tab_36' data-id='36' class='fl p10-20 tb' @click='moveToNext(36)'>Group / Meetings</li>
      <li id='tab_44' data-id='44' class='fl p10-20 tb' @click='moveToNext(44)'>Corporate Q/A</li>
    </ul>
    <div id='tab_body' class='fl w100 p5-10 h-75'>
        <Question :quesData='quesData' :nxt='moveTab' @finish='sumbit' :save='save' @exit='move' />
    </div>
    
 </div>
</template>

<script>
import Question from '@/components/question'
import axios from 'axios'
import api from '@/api/api'

export default {
  name: 'display',
  components: {Question},
  data() {
    return {
      quesData : [],
      curr : null,
      next: false,
      save: false,
      moveTab: false,
      ss:false

    }
  },
  methods: {
    sumbit: function(id){
      const self =this;
      var nxt = self.$store.state.hotel.nextScreen;
      $('#tab_head li ').removeClass('tb--active');
      $('li#tab_'+nxt).addClass('tb--active');
      if($('li#tab_'+nxt).is(':last-child')){
        self.getQues(nxt);
        self.next = true;
        self.$store.commit('setNextScreen',1); //will set the first tab
      }else{
      self.getQues(nxt);
      self.next = true;
       var nnxt = $('li#tab_'+nxt).next().data('id');
       self.$store.commit('setNextScreen',nnxt);

      }
     this.ss = false;
    },
    moveToNext : function(id){
      const self = this;
      this.$store.commit('setNextScreen',id);
     // alert('Please Click Save button in last sub category and you\'ll be moved to next category');
     this.moveTab = true;
     this.ss = true;
    },
    getQues : function(id){
      const self = this;
      if(api.forProd){
         $.post(api.getQuesH,{questionCategoryParent : id}).done(function(data){
          //get q obj
              var temp = JSON.parse(data);
              temp.quesCategory.map(function(x){
              x.ques.map(function(y){
                  if(y.questionSubTypeId == "1" || y.questionSubTypeId == "2" || y.questionSubTypeId == "3" || y.questionSubTypeId == "4" || y.questionSubTypeId == "6" ){
                      if(y.answer.length == 0){
                        y['answer'] = [{
                                answerId: "",
                                answer: ""
                              }];
                      }
                  }
                
                });
              });
          
            self.quesData = temp;
            self.moveTab = false;
        });
      }else{
         $.get(api.getQuesH,{questionCategoryParent : id}).done(function(data){
          //get q obj
              var temp = data;
              temp.quesCategory.map(function(x){
              x.ques.map(function(y){
                  if(y.questionSubTypeId == "1" || y.questionSubTypeId == "2" || y.questionSubTypeId == "3" || y.questionSubTypeId == "4" || y.questionSubTypeId == "6" ){
                      if(y.answer.length == 0){
                        y['answer'] = [{
                                answerId: "",
                                answer: ""
                              }];
                      }
                  }
                
                });
              });
          
          // console.log(temp);
            self.quesData = temp;
              // console.log('ajax fired')
        });
      }
    
    },
    exit: function(){
      this.save = true;
    },
    move:function(){
      this.save= false;
      this.$router.push({path:"/"+self.$store.state.path+"/hotel"});
    }
  },
  created(){
    const self =this;
    //make netx screen
    self.curr = 1;
    self.next = 7;
    self.$store.commit('setNextScreen',7);
    self.$store.commit('showProgress');
    if(api.forProd){
      $.post(api.getQuesH,{questionCategoryParent : self.curr}).done(function(data){
      //get q obj
      var temp = JSON.parse(data);
      temp.quesCategory.map(function(x){
       x.ques.map(function(y){
          if(y.questionSubTypeId == "1" || y.questionSubTypeId == "2" || y.questionSubTypeId == "3" || y.questionSubTypeId == "4" || y.questionSubTypeId == "6" ){
              if(y.answer.length == 0){
                y['answer'] = [{
                        answerId: "",
                        answer: ""
                      }];
              }
          }
        
        });
      });
      
      self.quesData = temp;
      
    });
    }else{
      $.get(api.getQues).done(function(data){
      //get q obj
      var temp = data;
      temp.quesCategory.map(function(x){
       x.ques.map(function(y){
          if(y.questionSubTypeId == "1" || y.questionSubTypeId == "2" || y.questionSubTypeId == "3" || y.questionSubTypeId == "4" || y.questionSubTypeId == "6" ){
              if(y.answer.length == 0){
                y['answer'] = [{
                        answerId: "",
                        answer: ""
                      }];
              }
          }
        
        });
      });
      
      // console.log(temp);
      self.quesData = temp;
      // $(function(){
      //           $('ul#tab_v_head li').removeClass('tb-v--active');
      //           $('ul#tab_v_head li:first-child').addClass('tb-v--active');
      //          $('section#body_0').css('display','block')
           
      //   });
    });
    }
    $(function(){
        $('nav#hotel div').removeClass('act');
        $('nav#hotel div:nth-child(3)').addClass('act');
        });
    

  }
};
</script>

<style>
.saveBox{
    border: 1px solid #e1e1e1;
    padding: 4px;
    background-color: lightblue;
    color: aliceblue;
    font-weight: 600;
    top: 5px;
    left: 50%;
}
</style>