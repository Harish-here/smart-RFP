<template>
  <div id="Rfp_Create" class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP - Basic Requirements</div>
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
  <!--  {{bData}} -->
    <form id='basic'
           v-if = 'bData.length > 0'
          @submit.prevent="sumbit" >
          <div class='fl w100 p10-20'>
            <div class='fl w30 al-right'>
              <label class='p5-10 b6'>RFP Name</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' v-model='id'/>
            </div>
          </div>
        <section v-for='i in bData' 
                 :key ='i.divison.vaule'
                 class='fl w100 p5-10'>
          <h4 class='pl-40'>{{ i.divison.label }}</h4>
          <div  v-for='j in i.ques'
                :key='j.bqId'
                class='fl w100 p10-20'>
            <div class='fl w30 al-right'>
              <label class='p5-10 b6'>{{ j.bqText }}</label>
            </div>
            <div v-if='j.bqId != 9 &&  j.bqId != 10 && j.bqId != 5 && j.bqId != 1 && j.bqId != 2 && j.bqId != 3' 
                 key='Single' 
                 class='fl w50 pl-25'>
              <input type='number' class='p5-10' min='0'
                     v-model='j.answer' 
                     :id='"_"+j.bqId' />
            </div>
            <div class='fl w50 pl-25'
                 v-else-if='j.bqId == 5' 
                 key='Dropdown'>
              <v-select v-model='holder'  :options='cityData' multiple></v-select>
              <span v-if='holder !== null && holder.length > 0' class='fl w100 b6 p5-10'>Rooms Needed Annually</span>
              <div id='town' v-if='holder !== null && holder.length > 0'
                    v-for='t in holder' class='fl w100 pl-25'
                    :key='t.value'>
                <span class='fl w30 p5-10'>{{t.label}}</span>
                <span class='fl w30 p5-10'><input type='number' v-model='t.rooms' min='0'></span>
              </div>
            </div>
            <div class='fl w50 pl-25'
                 v-else-if='j.bqId == 1 || j.bqId == 2 || j.bqId == 3' 
                 key='Dropdown'>
              <input type='text'  :id='"_"+j.bqId'>
            </div>
            <div class='fl w50 pl-25'
                 v-else-if='j.bqId == 9'>
              <div class='fl w100 p5-10'>
                <button type='button' id='Jan' data-active='no' @click='addMonth("Jan")' class='btn btn-default btn-xs'>Jan</button>
                <button type='button' id='Feb'  data-active='no' @click='addMonth("Feb")' class='btn btn-default btn-xs' >Feb</button>
                <button type='button' id='Mar' data-active='no' @click='addMonth("Mar")' class='btn btn-default btn-xs' >Mar</button>
                <button type='button' id='Apr' data-active='no' @click='addMonth("Apr")'  class='btn btn-default btn-xs'>Apr</button>
                <button type='button' id='May' data-active='no' @click='addMonth("May")' class='btn btn-default btn-xs'>May</button>
                <button type='button' id='Jun' data-active='no' @click='addMonth("Jun")' class='btn btn-default btn-xs' >Jun</button>
              </div>
              <div class='fl w100 p5-10'>
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
          <li class='fl w30 center dbNo'> <button type='button' class='btn btn-default btn-sm' @click='saveDraft' disabled>Save as Draft</button></li>
          <li class='fl w60 center'><button type='submit' class='btn btn-primary btn-sm'>Next</button></li>
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
      id:null,
      holder : null
    };
  },

  computed: {
    sum(){
      const self = this;
      if(self.holder !== null){
        return  Number(self.holder.map(x => x.rooms).reduce(function(tot,el){
          return Number(tot) + Number(el);
        }));
      }
    }
  },

  created(){
    const self = this;
    self.$store.commit('flushRfp');
    axios.get(api.getBasic).then(function(data){
      self.bData = data.data.division;
      
      // $(function(){
      //   $('#_1').datepicker();
      //   $('#_2').datepicker();
      //   $('#_3').datepicker();
      // });
      self.bData.forEach(function(x){
        x.ques.forEach(function(y){
          y.answer = null;
          y.answerId = null;
        });
      });
    
    });
    axios.get(api.listCity).then(function(data){
      var temp = data.data
         temp.map(function(x){
          x['rooms'] = 0;
        });
      self.cityData = [...temp]
      $('#_1').datepicker({minDate: new Date()});
      $('#_2').datepicker({minDate: new Date()});
      $('#_3').datepicker({minDate: new Date()});
    });
      $('nav#corporate div').removeClass('act');
      $('nav#corporate div:nth-child(2)').addClass('act');
  },

  watch : {
    'holder' : function(old,ne,l){
      const self = this;
      self.bData[0].ques[3].answerId = old;
      if(self.holder.length === 0){
        self.holder = null
      }
     
    },

    'sum' : function(old,ne){ const self = this;
      //self.bData[1].ques[]
      self.bData[1].ques[2].answer = self.sum;
    }
    
  },

  methods: {
    sumbit: function(){
      const self = this;
      self.bData[0].ques[0].answer = $('#_1').val();
      self.bData[0].ques[1].answer = $('#_2').val();
      self.bData[0].ques[2].answer = $('#_3').val(); var find=true;
      self.bData.map(function(x){
        x.ques.map(function(y){
          if(((y.answer === null && y.answerId === null) || (y.answer === "" && y.answerId === "") )&& self.id !== null && self.id.indexOf(" ") !== 0 )
          find = false;
        });
      })
    
      var toPost = (self.id !== null && self.id !== "" && self.id.indexOf(" ") !== 0 && find) ? true : false; 
      (toPost) ?
      $.post(api.sendBasic,{rfpName:self.id,rfpId:"",travelAgencyMasterId:"",division:self.bData}).done(function(data){
        self.$store.commit('showProgress');
        var obj = JSON.parse(data);
        self.$store.commit('setRfp',obj);
        self.$router.push({path:"/"+ self.$store.state.path +"/corprate/questions"});
      }):
      alert('You should fill all the fields');
    },
    saveDraft: function(){
      $.post().done(function(){

      });
    },
    addMonth: function(str){
      var obj = $('#'+str);
      const self = this;
      if(self.bData[1].ques[3].answer === null) { 
      self.bData[1].ques[3].answer = "" ;
      }//to remove the null

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
      if(self.bData[1].ques[4].answer == null) { 
      self.bData[1].ques[4].answer = "" ;
      }//to remove the null
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
<style>

#Rfp_Create select,#Rfp_Create input,.v-select,#Rfp_Create .dropdown-toggle,#Rfp_Create .form-control{ height: 24px !important;width:300px;}
#town input{ width:50px;}
.form-control{
    height:24px !important;
}

</style>
