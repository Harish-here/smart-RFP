<template>
 <div id='questionCorp' class='h-100'>
    <ul  id='tab_v_head' class='fl w25 p5-10 b6 f12 al-left'>
        <li class='p20-40 tb' v-for='(i,index) in qData.quesCategory' @click='show(index)' :id='index' :key='index' :class='{"tb-v--active":index === 0}'>{{i.questionCategory}}</li>
    </ul>
    <div id='content' class='fl w75'>
        <div class='fl w100'>
            <ul class='fr w40 b6 p5-10 mr-67 '>
                <li  class='fr w10 dbNo'> <button class='btn btn-default btn-xs' type='button'><i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </button>
                </li>
                <li  class='fr w10 f10 dbNo'>skip</li>
                <li class='fr w40 center p5-10'>Mandatory <br>
                    <span > <input @click='addAnsM(allM)' type="checkbox" :disabled='man'></span>
                </li>   
                <li class='fr w40 center p5-10'>Include <br>
                    <span  > <input @click='addAns(all)' type="checkbox" :disabled='inc'></span>
                </li>
            </ul> 
        </div> 
        <section v-for='(y,index_1) in qData.quesCategory' :key='index_1' class='fl w100 f12 y-flow' :class='{"dbNo":index_1 !== 0}' :id='"body_"+index_1'>
            <div id='Next_btn' class='fl w100 center'>
              <ul>
               <li class='di p10-20' v-if='(qData.quesCategory.length) != (index_1 + 1)'>
                <button :id='index_1' class='btn btn-primary btn-sm' @click='show(index_1 + 1)'>Next</button>
               </li>
               <li class='di p10-20' v-else> <button class='btn btn-primary btn-sm' @click='submitAnswers'>save and Continue to next category</button></li>
              </ul>
            </div>
            <div v-for='(i,index_2) in y.ques' class='fl w100' :key='index_2'>    
                <div class=' fl w60 p10-20'>
                {{i.questionText}} 
                </div>
                <ul class='fl w40 p5-10'>
                    <li class='fl w40 p5-10 center'>
                       <!-- {{ (i.isMandatory = "0") == "0" ? null: null}} -->
                        <input type='checkbox' v-model='cData' :value='mData.quesCategory[index_1].ques[index_2]'  :disabled='cData.findIndex(x => x.questionId == mData.quesCategory[index_1].ques[index_2].questionId && x.isMandatory == "1") >= 0' >
                    <!-- @click='include(i)' -->
                    </li>
                     
                    <li class='fl w40 p5-10 center'>
                        <input type='checkbox' v-model='cData' :value='JSON.parse(JSON.stringify(i))'>
                     <!-- @click='mand(i)' -->
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
    props: ['quesData','sub','nxt','draft'],
    data() {
        return {
            cData: [],
            mData: [],
            qData: [],
            all: null,
            allM: null,
            inc: false,
            man: false,
        }
    },

    created(){
        const self = this;
        if(api.forProd){
            self.$store.commit('showProgress')
             $.post(api.getQues,{questionCategoryParent : "1"}).done(function(data){
            //get q obj
            var temp = JSON.parse(data);
               temp.quesCategory.forEach(element => {
                   element.ques.forEach(c => {
                       c.isMandatory = "0"
                   })
               });
             var temp2 = JSON.parse(data);
               temp2.quesCategory.forEach(element => {
                   element.ques.forEach(c => {
                       c.isMandatory = "1"
                   })
               });  
             
             self.mData = temp
             self.qData = temp2;
             self.all = [].concat.apply([],temp.quesCategory.map(x => x.ques.map( y => y)));
             self.allM = [].concat.apply([],temp2.quesCategory.map(x => x.ques.map( y => y)));
             $(function(){
                
                    $('ul#tab_v_head li').removeClass('tb-v--active');
                    $('ul#tab_v_head li:first-child').addClass('tb-v--active');
                    $('#content section#body_0').css('display','inline');
                
            });
        
            });
        }else{
            self.$store.commit('showProgress')
            $.get(api.getQues,{questionCategoryParent : "1"}).done(function(data){
            //get q obj\
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
             self.qData = temp2;
             self.mData = temp;
            
            
             self.all = [].concat.apply([],temp.quesCategory.map(x => x.ques.map( y => y)));
             self.allM = [].concat.apply([],temp2.quesCategory.map(x => x.ques.map( y => y)));
               // console.log(self.mData)
                $(function(){
                    
                        $('ul#tab_v_head li').removeClass('tb-v--active');
                        $('ul#tab_v_head li:first-child').addClass('tb-v--active');
                        $('#content  section#body_0').css('display','block');
                });
              
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
            const self = this;
           if(api.forProd){ self.$store.commit('showProgress')
             $.post(api.getQues,{questionCategoryParent : self.nxt}).done(function(data){
      //get q obj
             self.qData = JSON.parse(data);
            });
        }else{ self.$store.commit('showProgress')
            $.get(api.getQues,{questionCategoryParent : self.nxt}).done(function(data){
      //get q obj
    //   console.log(data)
             self.qData = data;
            });
        }
        },
        'draft': function(){
            const self = this;
            if(self.draft){
                self.submitAsDraft();
            }
            
        }
    },

    methods: {
        submitAnswers: function(){//sub mitting the parent cat alone
            const self = this;
            
            (self.cData.length > 0) ? 
            (function(){
            self.$store.commit('submitRfpCat',{arr:self.cData,status:"0"}) 
            self.$emit('parentDone')}
            )()
            : alert('You should include atleast one question') ;
            
        },
        submitAnswersFinal: function(){//finishing the rfp
            const self = this;
            self.cData.map(function(x){
                delete x.questionText
                delete x.groupQuestionId
                if(x.hasOwnProperty('concatAns')) delete x.concatAns;
                if(x.hasOwnProperty('answer')){
                    for(var i in obj.answer){
                    delete obj.answer[i].answer;
                    }
                }
                
            });
            // console.log(self.cData)
            if(self.cData.length > 0) {
                if(confirm('Are you sure you want finish the RFP')){
                 self.$store.commit('submitRfpCat',{arr:self.cData,status:"1"})
                 
                }   
             }
            else{
                alert('You should include atleast one question') 
                }
        },
        submitAsDraft: function(){
            const self = this;
            (self.cData.length > 0) ? 
            (function(){
            self.$store.commit('submitRfpCat',{arr:self.cData,status:"0|"}); 
           // self.$emit('parentDone')
            }
            )()
            : alert('You should include atleast one question') ;
        },
        addAnsM: function(obj){
            const self = this;
            self.inc = true;
            if(self.cData.length === self.all.length ){
                self.cData = [];
                 self.inc = false;
            }else{
               self.cData = [];
               self.cData = obj; 
            }
            
        },
        addAns: function(obj){
            const self = this;
           self.man = true;
            if(self.cData.length === self.all.length){
                self.cData = [];
                self.man = false;
            }else{
               self.cData = [];
               self.cData = obj; 
            }
            
        },
        show: function(id){
            $('div#content section').addClass('dbNo');
            $('div#content section#body_'+id).removeClass('dbNo');
            $('#tab_v_head li').removeClass('tb-v--active');
            $('li#tabc_'+id).addClass('tb-v--active');
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
        include: function(objs){
           const self = this;
           var obj = self.remove(JSON.parse(JSON.stringify(objs)));
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