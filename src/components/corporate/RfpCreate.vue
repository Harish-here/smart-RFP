<template>
  <div id="Rfp_Create">
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>RFP - Basic Requirements</div>
      <ul  v-show='false' class='fr p5-10'>
        <li class='di p5-10'>
          <button class='btn btn-default btn-xs b6'><i class="fa fa-plus" aria-hidden="true"></i> Add Questions</button>
        </li>
        <li class='di p5-10 b6'><button class='btn btn-default btn-xs b6'>Clear all</button></li>
        <li class='di p5-10 f16'><i class="fa fa-pencil" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-trash" aria-hidden="true"></i></li>
      </ul>
      <hr>
    </header>
    <!--
    <form v-show='false' id='basic_info' v-on:submit.prevent="sumbit">
      <section class='fl w100 p5-10'>
        <h4 class=''>Event info</h4>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>RFP Name</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' name='name' class='p5-10' placeholder='Your RFP name'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Due Date</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' name='dueDate' class='p5-10' placeholder='Due Date'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Start Date</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' class='p5-10' placeholder='Start Date'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>End Date</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' class='p5-10' placeholder='End Date'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Location</label>
            </div>
            <div class='fl w50 pl-25'>
              <select name='location'>
                <option>Tamil Nadu</option>
              </select>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Template</label>
            </div>
            <div class='fl w50 pl-25'>
              <button type='submit' class='btn btn-primary btn-sm'>Marketing</button>
              <button type='button' class='btn btn-default btn-sm' >Lesiure Travel</button>
              <button type='button' class='btn btn-default btn-sm' >Bussiness Travel</button>
              <button type='button' class='btn btn-default btn-sm'>Booking Travel</button>
            </div>
        </div>
      </section>

      <section class='fl w100 p5-10'>
        <h4>Event Requirements</h4>
          <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>No of Persons Travelling in a month</label>
            </div>
            <div class='fl w50 pl-25'>
              <select name='location'>
                <option>Below 10</option>
                <option>15+</option>
                <option>25+</option>
                <option>Above 30</option>
              </select>
            </div>
          </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>No of room Needed in a month</label>
            </div>
            <div class='fl w50 pl-25'>
              <select name='location'>
                <option>Below 10</option>
                <option>15+</option>
                <option>25+</option>
                <option>Above 30</option>
              </select>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>No of Rooms in needed in year</label>
            </div>
            <div class='fl w50 pl-25'>
              <select name='roomNo'>
                <option>Below 50</option>
                <option>150+</option>
                <option>250+</option>
                <option>Above 300</option>
              </select>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Month in year</label>
            </div>
            <div class='fl w80 pl-25'>
              <div class='p10-20'>
                <button type='submit' class='btn btn-primary btn-sm'>Jan</button>
                <button type='button' class='btn btn-default btn-sm' >Aug</button>
                <button type='button' class='btn btn-primary btn-sm'>Sep</button>
                <button type='button' class='btn btn-default btn-sm'>Oct</button>
                <button type='button' class='btn btn-default btn-sm'>Nov</button>
                <button type='button' class='btn btn-default btn-sm'>Dec</button>
              </div>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Approx day in week</label>
            </div>
            <div class='fl w50 pl-25'>
              <button type='submit' class='btn btn-primary btn-xs'>Marketing</button>
              <button type='button' class='btn btn-default btn-xs' >Lesiure Travel</button>
              <button type='button' class='btn btn-default btn-xs' >Bussiness Travel</button>
              <button type='button' class='btn btn-default btn-xs'>Booking Travel</button>
            </div>
        </div>
        
      </section>

      <section class='fl w100 p5-10'>
        <h4>Event Budget</h4>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Type of Room</label>
            </div>
            <div class='fl w50 pl-25'>
              <select name='location'>
                <option>Normal suite</option>
                <option>Presindetal suite</option>
                <option>Extra suite</option>
              </select>
            </div>
          </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Overall Budget</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' class='p5-10' placeholder='Overall Budget'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Budget Per Person</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' class='p5-10' placeholder='Budget Per Person'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Food & Bevarage</label>
            </div>
            <div class='fl w50 pl-25'>
              <button type='submit' class='btn btn-primary btn-sm'>Inclusive Budget</button>
              <button type='button' class='btn btn-default btn-sm' >Dinner</button>
            </div>
        </div>
      
      </section>
      <ul class='fl w100 p5-10'>
        <li class='fl w30 center'> <button type='button' class='btn btn-default btn-sm'>Save as Draft</button></li>
        <li class='fl w20 center'><button type='submit' class='btn btn-primary btn-sm'>Next</button></li>
      </ul>
    </form>
    -->
    <form id='basic' 
          @submit.prevent="sumbit" >
        <section v-for='i in bData' 
                 :key ='i.divison.vaule'
                 class='fl w100 p5-10'>
          <h4>{{ i.divison.label }}</h4>
          <div  v-for='j in i.ques'
                :key='i.bqId'
                class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>{{ j.bqText }}</label>
            </div>
            <div v-if=' j.bqId != 9 &&  j.bqId != 10 && j.bqId != 5' 
                 key='Single' 
                 class='fl w50 pl-25'>
              <input type='text' class='p5-10' 
                     :placeholder='j.bqText' 
                     v-model='j.answer' 
                     :id='"_"+j.bqId' />
            </div>
            <div class='fl w50 pl-25'
                 v-else-if='j.bqId == 5' 
                 key='Dropdown'>
              <v-select multiple  v-model='holder'  :options='cityData'></v-select>
            </div>
            <div class='fl w80 pl-25'
                 v-else-if='j.bqId == 9'>
              <div class='p10-20'>
                <button type='button' id='Jan' data-active='no' @click='addMonth("Jan")' class='btn btn-default btn-xs'>Jan</button>
                <button type='button' id='Feb'  data-active='no' @click='addMonth("Feb")' class='btn btn-default btn-xs' >Feb</button>
                <button type='button' id='Mar' data-active='no' @click='addMonth("Mar")' class='btn btn-default btn-xs' >Mar</button>
                <button type='button' id='Apr' data-active='no' @click='addMonth("Apr")'  class='btn btn-default btn-xs'>Apr</button>
                <button type='button' id='May' data-active='no' @click='addMonth("May")' class='btn btn-default btn-xs'>May</button>
                <button type='button' id='Jun' data-active='no' @click='addMonth("Jun")' class='btn btn-default btn-xs' >Jun</button>
              </div>
              <div class='p10-20'>
                <button type='button' id='Jul' data-active='no' @click='addMonth("Jul")' class='btn btn-default btn-xs' >JuL</button>
                <button type='button' id='Aug' data-active='no' @click='addMonth("Aug")' class='btn btn-default btn-xs' >Aug</button>
                <button type='button' id='Sep' data-active='no' @click='addMonth("Sep")' class='btn btn-default btn-xs'>Sep</button>
                <button type='button' id='Oct' data-active='no' @click='addMonth("Oct")' class='btn btn-default btn-xs'>Oct</button>
                <button type='button' id='Nov' data-active='no' @click='addMonth("Nov")' class='btn btn-default btn-xs'>Nov</button>
                <button type='button' id='Dec' data-active='no' @click='addMonth("Dec")' class='btn btn-default btn-xs'>Dec</button>
              </div>
            </div>
            <div class='fl w50 pl-25'
                  v-else>
              <button type='button' id='Mon' @click='addDay("Mon")' data-active='no' class='btn btn-default btn-xs'>Mon</button>
              <button type='button' id='Tue' @click='addDay("Tue")'  data-active='no' class='btn btn-default btn-xs' >Tue</button>
              <button type='button' id='Wed' @click='addDay("Wed")' data-active='no' class='btn btn-default btn-xs' >Wed</button>
              <button type='button' id='Thu' @click='addDay("Thu")' data-active='no' class='btn btn-default btn-xs'>Thu</button>
              <button type='button' id='Fri' @click='addDay("Fri")' data-active='no' class='btn btn-default btn-xs'>Fri</button>
              <button type='button' id='Sat' @click='addDay("Sat")' data-active='no' class='btn btn-default btn-xs'>Sat</button>
              <button type='button' id='Sun' @click='addDay("Sun")' data-active='no' class='btn btn-default btn-xs'>Sun</button>
            </div>
          </div>
        </section>
        <ul v-if='bData.length > 0' class='fl w100 p5-10' key='submit-area'>
          <li class='fl w30 center'> <button type='button' class='btn btn-default btn-sm' @click='saveDraft'>Save as Draft</button></li>
          <li class='fl w20 center'><button type='submit' class='btn btn-primary btn-sm'>Next</button></li>
        </ul>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import api from '@/api/api'
import vSelect from "vue-select"

export default {
  name: 'RfpCreate',
  components: {vSelect},

  data() {
    return {
      bData:[],
      cityData:[],
      holder : null
    };
  },

  created(){
    const self = this;
    self.$store.commit('flushRfp');
    axios.get(api.getBasic).then(function(data){
      self.bData = data.data.division;
      console.log(data.data);
      $(function(){
        $('#_1').datepicker();
        $('#_2').datepicker();
        $('#_3').datepicker();
      });
    });
    axios.get(api.listCity).then(function(data){
      self.cityData = data.data
    });
    
  },

  watch : {
    'holder' : function(old,ne,l){
      const self = this;
      self.bData[0].ques[3].answer = old;
    },
    
  },

  methods: {
    sumbit: function(){
      const self = this;
      $.post(api.sendBasic,self.bData).done(function(data){
        console.log(self.bData)
        var obj = JSON.parse(data);
        self.$store.commit('setRfp',obj);
        self.$router.push('./questions');
      });
    },
    saveDraft: function(){
      $.post().done(function(){

      });
    },
    addMonth: function(str){
      var obj = $('#'+str);
      const self = this;
      if(obj.attr('data-active') == 'no') {
          self.bData[1].ques[3].answer += ' ' + str
          obj.removeClass('btn-default').addClass('btn-primary');
          obj.attr('data-active','yes');
        }else{
          var arr = self.bData[1].ques[3].answer.split(' ');
           arr.splice(arr.indexOf(str),1);
           self.bData[1].ques[3].answer = arr.join(' ');
          
          obj.removeClass('btn-primary').addClass('btn-default');
          obj.attr('data-active','no');
        }
    },
    addDay: function(str){
      var obj = $('#'+str);
      const self = this;
      if(obj.attr('data-active') == 'no') {
          self.bData[1].ques[4].answer += ' ' + str
          obj.removeClass('btn-default').addClass('btn-primary');
          obj.attr('data-active','yes');
        }else{
          var arr = self.bData[1].ques[4].answer.split(' ');
           arr.splice(arr.indexOf(str),1);
           self.bData[1].ques[4].answer = arr.join(' ');
          obj.removeClass('btn-primary').addClass('btn-default');
          obj.attr('data-active','no');
        }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

select,input,.v-select{ height: 30px;width:300px;}

</style>
