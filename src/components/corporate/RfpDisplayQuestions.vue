<template>
 <div id='questionCorp' class='h-100'>
    <ul  id='tab_v_head' class='fl w25 p5-10 b6 f12 al-left'>
        <li class='p20-40 tb' v-for='(i,index) in qData.quesCategory' @click='show(index)' :id='"tabc_"+index' :class='{"tb-v--active":(index === 0) ? true:false}' :key='i.questionCategoryId' >{{i.questionCategory}}</li>
    </ul>
    <div id='content' class='fl w75'>
        <div class='fl w100'>
            <ul class='fr w40 b6 p5-10 mr-67 '>
                <li  class='fr w10 dbNo'> <button class='btn btn-default btn-xs' type='button'><i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </button>
                </li>
                
                <li class='fr w40 center p5-10'>Mandatory <br>
                    <span> <input @click='addAnsM(allM)' type="checkbox" :disabled='man' v-model='vman'></span>
                </li>   
                <li class='fr w40 center p5-10'>Include <br>
                    <span> <input @click='addAns(all)' type="checkbox" :disabled='inc' v-model='vinc'></span>
                </li>
            </ul> 
        </div> 
        <section v-for='(y,index_1) in qData.quesCategory' :key='y.questionCategoryId' class='fl w100 f12 y-flow' :class='{"dbNo":index_1 !== 0}' :id='"body_"+index_1'>
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
    <!-- check questions -->
    <div class='pab p10-20 card' style='bottom:30px;right:30px;border-radius:5px;border:1px solid #fff;z-index:1000;background-color:#fff;'>
      <span class='fl p2-4 bl b6'>Total questions added - {{cData.length}}</span>
      <button data-toggle='modal' data-target='#myModal2' class='fr btn btn-ghost btn-xs' @click='getHotel' :disabled='cData.length === 0'>Check Hotels for this</button>
    </div>
    <div class="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
                <div class="modal-dialog" role="document">
                      <div class="modal-content">

                        <div class="modal-header fl w100">
                          <button type="button" class="close pab" data-dismiss="modal" aria-label="Close" style='right:0;top:2px;'><span class='f22' aria-hidden="true">&times;</span></button>
                          <!--<div class='btn btn-info btn-xs center fr' style='margin-right:10px;'>Proccess</div> -->
                          <h4>Hotels <small>Matches for your questions</small></h4>
                        </div>

                        <div class="modal-body fl w100">
                          <ul class='fl w100' v-if='hotelList.length > 0'>
                              <li class='p5-10' v-for='i in hotelList' :key='i.id' style='margin-bottom:8px;border:1px solid #f3f3f3'>
                                  <span class='f14 b6 p5-10 w70' style="color:#4285f4;">{{i.name}}</span>
                                  <span class='p5-10 fr'>Star - {{i.star}}</span>
                              </li>
                          </ul>
                          <div class='fl w100 p10-20 gray center' v-else>
                              No Matching hotels
                          </div>    
                          
                        </div>

                      </div><!-- modal-content -->
                </div><!-- modal-dialog -->
	 </div>
 </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
import api from '@/api/api'
export default {
    name: 'RfpDisplayQuestions',
    props: ['quesData','sub','nxt','draft','incList','manList'],
    data() {
        return {
            cData: [],
            mData: [],
            qData: [],
            all: null,
            allM: null,
            inc: false,
            man: false,
            vman: false,
            vinc: false,
            hotelList:[]
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
             
             self.mData = temp;
             self.qData = temp2;
             self.all = [].concat.apply([],temp.quesCategory.map(x => x.ques.map( y => y)));
             self.allM = [].concat.apply([],temp2.quesCategory.map(x => x.ques.map( y => y)));
             
        
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
                    // c
              
            });
        }
       
    },
    
    computed : {
        sample() {
            return this.sub
        },
        total(){
            return { ques : this.cData.map(function(x){
               return x.questionId
            })
            }
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
             self.mData = [];
             self.qData = [];
             self.vman = false;
             self.vmin = false;
             self.mData = temp;
             self.qData = temp2;
             self.all = [];
             self.allM = [];
             self.all = [].concat.apply([],temp.quesCategory.map(x => x.ques.map( y => y)));
             
             self.allM = [].concat.apply([],temp2.quesCategory.map(x => x.ques.map( y => y)));
            //  console.log(self.allM);
            });
        }else{ self.$store.commit('showProgress')
            $.get(api.getQuesH,{questionCategoryParent : self.nxt}).done(function(data){
      //get q obj
    //   console.log(data)
            // self.qData = data;
             
            var temp = JSON.parse(JSON.stringify(data));
               temp.quesCategory.forEach(element => {
                   element.ques.forEach(c => {
                       c.isMandatory = "0"
                   })
               });
              
             var temp2 = JSON.parse(JSON.stringify(data));
               temp2.quesCategory.forEach(element => {
                   element.ques.forEach(c => {
                       c.isMandatory = "1"
                   })
               }); 
            //    console.log(temp2.quesCategory); 
              self.mData = [];
             self.qData = [];
             self.mData = temp;
             self.qData = temp2;
             self.vman = false;
             self.vinc = false;
             self.all = [];
             self.allM = [];
             self.all = [].concat.apply([],temp.quesCategory.map(x => x.ques.map( y => y)));
            console.log(self.all)
             self.allM = [].concat.apply([],temp2.quesCategory.map(x => x.ques.map( y => y)));
            //  console.log(self.allM)
            });
        }
        },
        'draft': function(){
            const self = this;
            if(self.draft){
                self.submitAsDraft();
            }
            
        },
        'incList': function(){
            const self = this;
            self.qData
        }
    },

    methods: {
        submitAnswers: function(){//sub mitting the parent cat alone
            const self = this;
            
            (self.cData.length > 0) ? 
            (function(){
            self.$store.commit('submitRfpCat',{arr:self.cData,status:"0"});
            self.all = [];
            self.allM = [];
            self.cData = []; 
            self.inc= false;
            self.man= false;
            self.vman = false;
             self.vinc = false;
            self.$emit('parentDone');
            }
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
                    for(var i in x.answer){
                    delete x.answer[i].answer;
                    }
                }
                
            });
            // console.log(self.cData)
            if(self.cData.length > 0) {
                if(confirm('Are you sure you want finish the RFP')){
                 self.$store.commit('submitRfpCat',{arr:self.cData,status:"1"});
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
            self.cData = [];
            self.vman = false;
             self.vinc = false;
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
            //    var arr = _.filter(self.cData,{'questionId' : obj.questionId});
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
        },
        getHotel: function(){
            const self = this;
            $.post(api.getHotel,{ rfpId:self.$store.state.rfp.rfpId,ques: self.total.ques}).done(function(data){
               self.hotelList = JSON.parse(data)
            });
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