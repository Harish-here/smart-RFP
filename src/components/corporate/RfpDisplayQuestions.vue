<template>
 <div id='questionCorp' class='h-75'>
 
    <ul  id='tab_v_head' class='fl w25 p5-10 b6 f12 al-left'>
        <span v-for='(i,index) in qData.quesCategory'>
        <li class='p20-40 tb' @click='show(index)' :id='index'>{{i.questionCategory}}</li>
        </span>
        <li class='p20-40 tb tb-v--active'>Payment</li>
    </ul>
    <div id='content'>
        <ul class='fr w40 b6 f14'>
          <li style='visibility:hidden;'  class='fr w10 f14'> <button class='btn btn-default btn-xs' type='button'><i class="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
          </li>
          <li style='visibility:hidden;'  class='fr w10 f10'>skip</li>
          <li class='fr w25 center'>Mandatory</li>
          <li class='fr w25 center'>Include</li>
        </ul>
        <section style='display:none' v-for='(y,index_1) in qData.quesCategory' class='fr w75 f16 y-flow' :id='"body_"+index_1'>
            <div id='Next_btn' class='fl w100 center'>
              <ul>
               <li class='di p10-20' v-if='(qData.quesCategory.length) != (index_1 + 1)'>
                <button :id='index_1' class='btn btn-primary btn-sm' @click='show(index_1 + 1)'>Next</button>
               </li>
               <li class='di p10-20' v-else> <button class='btn btn-primary btn-sm' @click='submitAnswers'>save and Continue to next category</button></li>
              </ul>
            </div>
            <div v-for='(i,index_2) in y.ques' class='fl w100'>    
                <div class=' fl w60 p10-20'>
                {{i.questionText}} 
                </div>
                <ul class='fl w40 p5-10'>
                    <li class='fl w40 p5-10 center'>
                        <input type='checkbox' id="ans_" value='i' @click='include(i)' :data-ans='JSON.stringify(i)' :data-que='JSON.stringify(i)' >
                    </li>
                    <li class='fl w40 p5-10 center'>
                        <input type='checkbox' id="ans_" value='i' @click='mand(i)' :data-ans='JSON.stringify(i)' :data-que='JSON.stringify(i)' >
                    </li>
                </ul>
            </div>
           
        </section>
    </div>
    <transition name='slide-fade'>
        <section v-show='quesData' id='answer_view' class='pab h-full z-500  w25 bg-dd top-right-0 p5-10 shadow'>
            <span class='fr' @click='emits'><i class="fa fa-close" aria-hidden="true"></i></span>
            <label class='p10-20 f14 fr w100'>Enter the Question</label>
            <input class='p5-10 fr w100' type='text' placeholder='what is your pet name?'>
            <label class='p10-20 f14 fr w100'>Type of Answer</label>
            <select class='p5-10 fr w100'>
                <option value='single'>Single choice</option>
                <option value='multiple'> Multiple choice</option>
            </select>
            <div class='w100 fr p20-40 center'>
                <button class='btn btn-primary btn-sm'>Add Question</button>
            </div>
        </section>
    </transition>
    
 </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
import api from '@/api/api'
export default {
    name: 'RfpDisplayQuestions',
    props: ['quesData','sub','nxt'],
    data() {
        return {
            cData:[],
            qData:[]
        }
    },

    created(){
        const self = this;
        if(api.forProd){
             $.post(api.getQues,{questionCategoryParent : "1"}).done(function(data){
      //get q obj
             self.qData = data;
            });
        }else{
            $.get(api.getQues,{questionCategoryParent : "1"}).done(function(data){
      //get q obj\
             self.qData = data;
            });
        }
       
    },
    
    computed : {
        sample() {
            return this.sub
        }
    },

    watch: {
        'sample' : function(){
            const self = this;
            
            if(self.sample){
               this.submitAnswersFinal();
                this.$emit('doneSubmit');
            }
        },
        'nxt' : function(){
           if(api.forProd){
             $.post(api.getQues,{questionCategoryParent : self.nxt}).done(function(data){
      //get q obj
             self.qData = data;
            });
        }else{
            $.get(api.getQues,{questionCategoryParent : self.nxt}).done(function(data){
      //get q obj\
             self.qData = data;
            });
        }
        }
    },

    methods: {
        submitAnswers: function(){
            const self = this;
            (self.cData.length > 0) ? self.$store.commit('submitRfpCat',self.cData,"0") : alert('You should include atleast one question') ;
            self.$emit('parentDone');
        },
        submitAnswersFinal: function(){
            const self = this;
            if(self.cData.length > 0) {
                if(confirm('Are you sure you want finish the RFP')){
                 self.$store.commit('submitRfpCat',self.cData,"1")
                 self.$router.push('./preview');
                }
                 
             }
            else{
                alert('You should include atleast one question') 
                }
        },
        addAns: function(id){
            console.log($('#ans_'+id).data('ans'));
        },
        show: function(id){
            $('div#content section').hide();
            $('div#content section#body_'+id).show();
            $('li').removeClass('tb-v--active');
            $('li#'+id).addClass('tb-v--active');
        },
        // txtAns: _.debounce(function(id){
        //     console.log($('#ans_'+id).data('ans'));
        //     console.log($('#ans_'+id).data('que'));
        // },700),
        emits: function(){
            this.$emit('close',1)
        },
        remove: function(obj){
            delete obj.questionSubTypeId;
            delete obj.questionText;
            if(obj.hasOwnProperty('concatAns')) {
                    delete obj.concatAns;
            }
            for(var i in obj.answer){
                delete obj.answer[i].answer;
            }
            return obj
        },
        removeObj: function(index){
            const self =this;
            self.cData.splice(index,1);
        },
        include: function(obj){
           const self = this;
           obj = self.remove(obj);
           if(self.cData.length > 0){
               var arr = _.filter(self.cData,{'questionId' : obj.questionId});
               if(arr.length == 0) {
                   self.cData.push(obj);//push que obj
               }else{//remove the ques obj
               var index = self.cData.findIndex((ele) => { return  ele.questionId == obj.questionId});
                  if(obj['isMandatory'] == "0" && self.cData[index].isMandatory != "1"){
                        
                        self.removeObj(index) ;
                   }else{
                       (obj['isMandatory'] == "1" && self.cData[index].isMandatory == "1") ? self.removeObj(index) : self.cData[index].isMandatory == "1" ;
                        //self.cData.push(obj);
                   }
               }
           }else{
               self.cData.push(obj);
           }
           
        },
        mand: function(obj){
            const self = this;
           obj['isMandatory'] = "1";
            self.include(obj);
        }

    },
    
    mounted: function(){  
            this.$nextTick(function () {
                $('section:first-child').show();
            })
    }
}
</script>
<style scoped>
input[type=number]{
width:100px;
}
.shadow{
-webkit-box-shadow: -5px 3px 13px -4px rgba(221,221,221,1);
-moz-box-shadow: -5px 3px 13px -4px rgba(0,0,0,0.75);
box-shadow: -5px 3px 13px -4px rgba(221,221,221,1);
}
</style>