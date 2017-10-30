<template>
 <div id='display'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>RFP Questions</div>
      <ul class='fr p5-10'>
        <li class='di p5-10'>
          <button class='btn btn-primary btn-xs b6'><i class="fa fa-plus" aria-hidden="true"></i> Save</button>
        </li>
        <li class='di p5-10 b6'><button class='btn btn-default btn-xs b6'>Clear all</button></li>
        <li class='di p5-10 f16'><i class="fa fa-pencil" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-trash" aria-hidden="true"></i></li>
      </ul>
      <hr>
    </header>
    <ul id='tab_head' class='fl w100 p5-10 b6 f12 center'>
      <li id='tab_1' data-id='1' class='fl p10-20 tb tb--active' @click='moveToNext(1)'>Property Baisc</li>
      <li id='tab_7' data-id='7' class='fl p10-20 tb' @click='moveToNext(7)' disabled>Client Specific</li>
      <li id='tab_24' data-id='24' class='fl p10-20 tb' @click='moveToNext(24)'>Safety & Security</li>
      <li id='tab_28' data-id='28' class='fl p10-20 tb' @click='moveToNext(28)'>Blackout / Fair Dates</li>
      <li id='tab_31' data-id='31' class='fl p10-20 tb' @click='moveToNext(31)'>Extended Stay</li>
      <li id='tab_36' data-id='36' class='fl p10-20 tb' @click='moveToNext(36)'>Group / Meetings</li>
      <li id='tab_44' data-id='44' class='fl p10-20 tb' @click='moveToNext(44)'>Corporate Q/A</li>
    </ul>
    <div id='tab_body' class='fl w100 p5-10 h-75'>
        <Question :quesData='quesData' current='null' next='null' @finish='sumbit' />
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
      msg: 'Welcome to Your Vue.js App',
      quesData : [],
      curr : null,
      next: null

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
        self.$store.commit('setNextScreen',1); //will set the first tab
      }else{
      self.getQues(nxt);
       var nnxt = $('li#tab_'+nxt).next().data('id');
       self.$store.commit('setNextScreen',nnxt);
      }
    
    },
    moveToNext : function(id){
      const self = this;
      this.$store.commit('setNextScreen',id);
      alert('Please Click Save button in last sub category and you\'ll be moved to next category');
    },
    getQues : function(id){
     $.post(api.getQues,{questionCategoryParent : id}).done(function(data){
      //get q obj
      self.quesData = data;
    })
    }
  },
  created(){
    const self =this;
    //make netx screen
    self.curr = 1;
    self.next = 7;
    self.$store.commit('setNextScreen',7);
    if(api.forProd){
      $.post(api.getQues,{questionCategoryParent : self.curr}).done(function(data){
      //get q obj
      self.quesData = JSON.parse(data);
      console.log(self.quesData);
    });
    }else{
      $.get(api.getQues).done(function(data){
      //get q obj
      self.quesData = data;
    });
    }
    

  }
};
</script>

<style>

</style>