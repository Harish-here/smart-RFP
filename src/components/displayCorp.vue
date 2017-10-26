<template>
 <div id='displayCorp'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Create RFP</div>
      <ul class='fr p5-10'>
        <li class='di p5-10'>
          <button class='btn btn-primary btn-xs b6'><i class="fa fa-plus" aria-hidden="true"></i> Save</button>
        </li>
        <li class='di p5-10 b6'><button class='btn btn-default btn-xs b6'>Save as Draft</button></li>
        <li class='di p5-10 b6'><button class='btn btn-default btn-xs b6' @click='showQues'>Add Questions</button></li>
        <li class='di p5-10 f16'><button class='btn btn-primary btn-xs b6'>Next </button></li>
      </ul>
      <hr>
    </header>
    <ul id='tab_head' class='fl w100 p5-10 b6 f12 center'>
      <li id='tab1' class='fl p10-20 tb tb--active' @click='getQuestion("Property Baisc")'>Property Baisc</li>
      <li id='tab2' class='fl p10-20 tb' @click='getQuestion("Property Baisc")' disabled>Client Specific</li>
      <li id='tab3' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Safety & Security</li>
      <li id='tab4' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Blackout / Fair Dates</li>
      <li id='tab5' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Extended Stay</li>
      <li id='tab6' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Group / Meetings</li>
      <li id='tab7' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Corporate Q/A</li>
    </ul>
    <div id='tab_body' class='fl w100 p5-10 h-75'>
        <QuestionCorp :quesData='show.questionBar' @close='closeQues' />
    </div>
    
 </div>
</template>

<script>
import QuestionCorp from '@/components/questionCorp'

export default {
  name: 'displayCorp',
  components: {QuestionCorp},
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: {
        questionBar : false
      }
    }
  },
  methods: {
    sumbit: () => {
    },
    getQuestion : (id) =>{
      console.log(id);
    },
    showQues: function(){
        const self = this;
        self.show.questionBar = true; 
    },
    closeQues: function(){
        const self = this;
        self.show.questionBar = false; 
    }
  },
};
</script>

<style>
hr{
  margin-bottom:0px !important;
}
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar
{
	width: 5px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}

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