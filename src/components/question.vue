<template>
 <div id='question' class='h-60'>
    <ul  id='tab_v_head' class='fl w25 b6 f12 al-left'>
        <li v-for='(i,index) in qData.quesCategory' class='p20-40 tb' @click='show(index)' :id='"tabc_"+index' :key='i.questionCategoryId' :class='{"tb-v--active":index === 0}'>{{i.questionCategory}}</li>
       <!-- <li class='p20-40 tb tb-v--active'>Payment</li> -->
    </ul>
   <!-- <pre>{{ cData }}</pre> -->
    <div id='content'>
        <section  v-for='(y,index_1) in qData.quesCategory' class='fr w75 f12 y-flow'  :class='{"dbNo":index_1 !== 0}' :id='"body_"+index_1' :key='y.questionCategoryId'>       
            <div id='Next_btn' class='fl w100 center'>
              <ul>
                <li class='di p10-20' v-if='(qData.quesCategory.length) != (index_1 + 1)'>
                    <button :id='index_1' class='btn btn-primary btn-sm' @click='show(index_1 + 1)'>Next</button>
                </li>
                <li class='di p10-20' v-else> <button class='btn btn-primary btn-sm' @click='submitAnswers'>save and Continue to next category</button></li>
              </ul>
            </div>
            <div v-for='(i,index_2) in y.ques' :key='i.questionId'>
                    <div v-if='i.questionSubTypeId === "7"'>
                        <div class=' fl w60 p10-20'>
                        {{i.questionText}} ?
                        </div>
                        <div class='fl w40 p10-20'>
                            <div class='di  pl-25' v-for='(j,z) in i.concatAns' :key='j.answerId'>
                                <input v-model='i.answer' :value='[j]'  type='radio' :name='i.questionText' :id='"ans_" + i.questionId'> {{j.answer}}
                            </div>
                        </div>
                    </div>
                    <div v-else-if='i.questionSubTypeId === "1" || i.questionSubTypeId === "2" || i.questionSubTypeId === "3" || i.questionSubTypeId === "4" ||  i.questionSubTypeId === "6" '>
                        <div class=' fl w60 p10-20'>
                        {{i.questionText}} 
                        </div>
                        <div class='fl w40 p10-20'>
                            <div class='pl-25'>
                                <input type='text' 
                                       v-model='i.answer[0].answer'
                                       :id='"ans_" + i.questionId' 
                                       :name='i.questionText'
                                        
                                        > <!-- v-model='sample[index_1].ques[index_2].answer.answer' @input='txtAns(i.questionId)' -->
                            </div>
                        </div>
                    </div>
                    <div v-else-if='i.questionSubTypeId === "9"'>
                        <div class=' fl w60 p10-20'>
                        {{i.questionText}} 
                        </div>
                        <div class='fl w40 p10-20'>
                            <div class='di  pl-25' v-for='j in i.concatAns' :key='j.answerId'>
                                <input v-model='i.answer' type='radio'  :name='i.questionText' :value='[j]'> {{j.answer}}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class=' fl w100 p10-20'>
                        {{i.questionText}} 
                        </div>
                        <ul class='fl w100 p20-40'>
                            <li v-for='j in i.concatAns' class='fl w33 p10-20' :key='j.answerId'>
                                <input type='checkbox' v-model='i.answer' :value='j' > {{j.answer}}
                            </li>
                        </ul>
                    </div>
            </div>
        </section>
    </div>
 </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
import api from '@/api/api'

export default {
    name: 'question',
    props: ['quesData','current','nxt'],
    data() {
        return {
            cData:[],
            san:null
        }
    },

    created(){
        const self =this;
      self.cData = self.qData;
      
    },

    computed : {
        qData(){
            return this.quesData
        },
        sample(){
            const self = this
           //var arr = [...self.quesData.quesCategory];
           return self.nxt
        },
        sam(){
            return this.current
        }
    },

    watch : {
        'sample': function(){
            const self = this;
           if(self.sample){
               self.cData = [];
               self.cData = self.qData;
            //    console.log(self.cData)
            //    console.log(this.ques)
           }
        },
        'qData': function(){
            // console.log('ne')
            const self = this;
            console.log(self.qData)
        },
        'sam' : function(){
            console.log(self.current)
        }
    },

    methods: {
        submitAnswers: function(){
            const self = this;
            self.$store.commit('showProgress');
           
            var temp = [].concat.apply([],self.qData.quesCategory.map(function(t){
                return t.ques.filter(function(y){
                    if(y.questionSubTypeId == "1" || y.questionSubTypeId == "2" || y.questionSubTypeId == "3" || y.questionSubTypeId == "4" || y.questionSubTypeId == "6"){
                        if(y.answer[0].answer != null){
                            return true
                        }else{
                            return false
                        }
                    }else{
                        if(y.answer.length > 0){
                            return true
                        }else{
                            return false
                        }
                    }
                })
            }));
            //console.log(temp);
            $.post(api.sendQuesH,{ans: temp}).done(function(data){
                //self.$store.commit('changeHotelMode','edit');
                self.$emit('finish',self.next);
            });

        },
        addAns: function(id){
            const self= this;
            let ansObj,quesObj,isThere =false,isId9 = false;
                ansObj = $('#ans_'+id).data('ans');
                quesObj = $('#ans_'+id).data('que');
                //delete the unneccessary
                delete quesObj.questionText;
                delete quesObj.isMandatory;
                delete quesObj.answer;
                if(quesObj.hasOwnProperty('concatAns')) {
                    delete quesObj.concatAns;
                } 
                var qId = quesObj.questionId;
                var qsubId = quesObj.questionSubTypeId;
                if(qsubId === "1" || qsubId === "2" || qsubId === "3" || qsubId === "4" ||  qsubId === "6"){
                    ansObj['answer'] = $('#ans_'+id).val();
                     
                }
                quesObj['answer'] = [ansObj];
            if(self.cData.length > 0){ 
               var arr = _.filter(self.cData,{'questionId' : qId});
                if(arr.length == 0){
                    //questionObj not present
                    self.cData.push(quesObj);
                }else{//questionObj present
                     var index = _.findIndex(self.cData,{'questionId' : qId});
                     if(qsubId == "8"){
                         var arr2 = _.filter(self.cData[index].answer,ansObj);
                        ( arr2.length == 0 ) ? 
                        self.cData[index].answer.push(ansObj) ://add the new answer  
                        self.cData[index].answer.splice(_.findIndex(self.cData[index].answer.ansObj),1); //remmove the naswer if he unchecked; 
                     }
                     else{
                         self.cData[index].answer = [];
                         self.cData[index].answer.push(ansObj);
                     }
                }        
            }
            else{
                
                self.cData.push(quesObj);
            }
        },
        show: function(id){
            $('div#content section').addClass('dbNo');
            $('div#content section#body_'+id).removeClass('dbNo');
            $('#tab_v_head li').removeClass('tb-v--active');
            $('li#tabc_'+id).addClass('tb-v--active');
        },
        txtAns: _.debounce(function(id){
            this.addAns(id);
        },700)
    },

}
</script>
<style scoped>
input[type=number]{
width:100px;
}
</style>