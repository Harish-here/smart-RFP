<template>
 <div id='display'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Basic Information</div>
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
      <li id='tab1' class='fl p10-20 tb tb--active' @click='getQuestion("Property Baisc")'>Property Baisc</li>
      <li id='tab2' class='fl p10-20 tb' @click='getQuestion("Property Baisc")' disabled>Client Specific</li>
      <li id='tab3' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Safety & Security</li>
      <li id='tab4' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Blackout / Fair Dates</li>
      <li id='tab5' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Extended Stay</li>
      <li id='tab6' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Group / Meetings</li>
      <li id='tab7' class='fl p10-20 tb' @click='getQuestion("Property Baisc")'>Corporate Q/A</li>
    </ul>
    <div id='tab_body' class='fl w100 p5-10 h-75'>
        <Question quesData='null' />
    </div>
    
 </div>
</template>

<script>
import Question from '@/components/question'

export default {
  name: 'display',
  components: {Question},
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods: {
    sumbit: () => {
    },
    getQuestion : (id) =>{
      console.log(id);
      
    }
  },
};
</script>

<style>

</style>