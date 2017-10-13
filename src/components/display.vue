<template>
 <div id='display'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Basic Information</div>
      <ul class='fr p5-10'>
        <li class='di p5-10'>
          <button class='btn btn-default btn-xs b6'><i class="fa fa-plus" aria-hidden="true"></i> Add Questions</button>
        </li>
        <li class='di p5-10 b6'><button class='btn btn-default btn-xs b6'>Clear all</button></li>
        <li class='di p5-10 f16'><i class="fa fa-pencil" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-trash" aria-hidden="true"></i></li>
      </ul>
      <hr>
    </header>
    <ul id='tab_head' class='fl w100 p5-10 b6 f12 center'>
      <li id='tab1' class='fl p10-20 tb tb--active'>Property Baisc</li>
      <li id='tab2' class='fl p10-20 tb'>Client Specific</li>
      <li id='tab3' class='fl p10-20 tb'>Safety & Security</li>
      <li id='tab4' class='fl p10-20 tb'>Blackout / Fair Dates</li>
      <li id='tab5' class='fl p10-20 tb'>Extended Stay</li>
      <li id='tab6' class='fl p10-20 tb'>Group / Meetings</li>
      <li id='tab7' class='fl p10-20 tb'>Corporate Q/A</li>
    </ul>
    <div id='tab_body' class='fl w100 p10-20'>
      <ul id='tab_v_head' class='fl w20 p5-10 b6 f12 al-left'>
        <li class='p20-40 tb tb-v--active'>Property Location  Contact</li>
        <li class='p20-40 tb'>Property Overview</li>
        <li class='p20-40 tb'>Facilities</li>
        <li class='p20-40 tb'>Service / Amenities</li>
        <li class='p20-40 tb'>Payment</li>
      </ul>
      <div id='tab_v_body fl w80'>
      </div>
    </div>
    
 </div>
</template>

<script>
export default {
  name: 'display',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  methods: {
    sumbit: () => {
    },
  },
};
</script>

<style>
hr{
  margin-bottom:0px !important;
}
</style>