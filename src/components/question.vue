<template>
 <div id='question' class='h-75'>
    <ul  id='tab_v_head' class='fl w25 p5-10 b6 f12 al-left'>
        <span v-for='i in qData.quesCategory'>
        <li class='p20-40 tb' @click='show(i.questionCategoryId)' :id='i.questionCategoryId'>{{i.questionCategory}}</li>
        </span>
        <li class='p20-40 tb tb-v--active'>Payment</li>
    </ul>
    <div id='content'>
        <section style='display:none' v-for='(y,index_1) in qData.quesCategory' class='fr w75 f16 y-flow' :id='"body_"+ y.questionCategoryId'>
            <div v-for='(i,index_2) in y.ques'>
                    <div v-if='i.questionSubTypeId === "7"'>
                        <div class=' fl w60 p10-20'>
                        {{i.questionText}} ?
                        </div>
                        <div class='fl w40 p10-20'>
                            <div class='di  pl-25' v-for='(j,z) in i.concatAns'>
                                <input @click='addAns(j.answerId)' :data-ans='JSON.stringify(j)' :data-que='JSON.stringify(i)'  type='radio' :name='"q_"+i.questionId' :id='"ans_" + j.answerId' :value='j'> {{j.answerText}}
                            </div>
                        </div>
                    </div>
                    <div v-else-if='i.questionSubTypeId === "1" || i.questionSubTypeId === "2" || i.questionSubTypeId === "3" || i.questionSubTypeId === "4" ||  i.questionSubTypeId === "6" '>
                        <div class=' fl w60 p10-20'>
                        {{i.questionText}} 
                        </div>
                        <div class='fl w40 p10-20'>
                            <div class='pl-25'>
                                <input type='text' @input='txtAns(i.questionId)' :id='"ans_" + i.questionId' :data-ans='JSON.stringify({answerId:"",answer:""})' :data-que='JSON.stringify(i)' :name='i.questionText' >
                            </div>
                        </div>
                    </div>
                    <div v-else-if='i.questionSubTypeId === "9"'>
                        <div class=' fl w60 p10-20'>
                        {{i.questionText}} 
                        </div>
                        <div class='fl w40 p10-20'>
                            <div class='di  pl-25' v-for='j in i.concatAns'>
                                <input :id='"ans_"+j.answerId'  type='radio' @click='addAns(j.answerId)' :data-ans='JSON.stringify(j)' :data-que='JSON.stringify(i)' :name='"q_"+i.questionId' :value='j'> {{j.answerText}}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class=' fl w100 p10-20'>
                        {{i.questionText}} 
                        </div>
                        <ul class='fl w100 p20-40'>
                            <li v-for='j in i.concatAns' class='fl w33 p10-20'>
                                <input type='checkbox' @click='addAns(j.answerId)' :id='"ans_" + j.answerId' :value='j' :data-ans='JSON.stringify(j)' :data-que='JSON.stringify(i)' > {{j.answerText}}
                            </li>
                        </ul>
                    </div>
            </div>
            <button type='submit'>Submit</button>
        </section>
    </div>
 </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash/function'
export default {
    name: 'question',
    props: ['quesData'],
    data() {
        return {
            qData: [],
            cData:[],
            sample: 0
        }
    },
    methods: {
        submitAnswers: () => {
            const self = this;console.log('hi')

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
        txtAns: _.debounce(function(id){
            console.log($('#ans_'+id).data('ans'));
            console.log($('#ans_'+id).data('que'));
        },700)
    },
    created(){
        const self = this;
        axios("https://api.myjson.com/bins/l9br3").then(function(data){
            var temp = data.data
           for(var j of temp.quesCategory){
               for(var i of j.ques){
                   i['answers'] = (  i.questionSubTypeId === "1" ||
                                     i.questionSubTypeId === "2" ||
                                     i.questionSubTypeId === "3" || 
                                     i.questionSubTypeId === "4" ||  
                                     i.questionSubTypeId === "6"  ) ? [{answerId:"",answer: ""}] : []; //insert the eanswer property

                   self.cData.push(j)
               }
           }
           self.qData = data.data
        });
        
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
</style>