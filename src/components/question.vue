<template>
 <div id='question' class='h-75'>
    <ul  id='tab_v_head' class='fl w25 p5-10 b6 f12 al-left'>
        <span v-for='i in qData.quesCategory'>
        <li class='p20-40 tb'>{{i.questionCategory}}</li>
        </span>
        <li class='p20-40 tb tb-v--active'>Payment</li>
      </ul>
    <div v-for='j in qData.quesCategory' class='fr w75 f16 y-flow'>
     <span v-for='i in j.ques'>
            <span v-if='i.questionSubTypeId === "7"'>
                <div class=' fl w60 p10-20'>
                {{i.questionText}} ?
                </div>
                <div class='fl w40 p10-20'>
                <span class='di  pl-25' v-for='j in i.concatAns'>
                    <input  type='radio' name='yorn' :value='j.answerId'> {{j.answerText}}
                </span>
                </div>
            </span>
            <span v-else-if='i.questionSubTypeId === "1" || i.questionSubTypeId === "2" || i.questionSubTypeId === "3" || i.questionSubTypeId === "4" ||  i.questionSubTypeId === "6" '>
                <div class=' fl w60 p10-20'>
                {{i.questionText}} 
                </div>
                <div class='fl w40 p10-20'>
                    <span class='pl-25'>
                        <input type='text'>
                    </span>
                </div>
            </span>
            <span v-else-if='i.questionSubTypeId === "9"'>
                <div class=' fl w60 p10-20'>
                {{i.questionText}} 
                </div>
                <div class='fl w40 p10-20'>
                    <span class='di  pl-25' v-for='j in i.concatAns'>
                    <input  type='radio' :name='j+"ans"' :value='j.answerId'> {{j.answerText}}
                </span>
                </div>
            </span>
            <span v-else>
                <div class=' fl w100 p10-20'>
                {{i.questionText}} 
                </div>
                <ul class='fl w100 p20-40'>
                    <li v-for='j in i.concatAns' class='fl w33 p10-20'>
                        <input type='checkbox'> {{j.answerText}}
                    </li>
                </ul>
            </span>
      </span>
    </div>
 </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'question',
    props: ['quesData'],
    data() {
        return {
            qData: [],
            aData: [],
            cData: []
        }
    },
    method: {
        addAnswer: () => {

        }
    },
    created(){
        const self = this;
        axios("https://api.myjson.com/bins/l9br3").then(function(data){
            self.qData = data.data
           for(var j of self.qData.quesCategory){
               for(var i of j.ques){
                   i['answers'] = [];
                   self.cData.push(i)
               }
           }
           
        });
        
    }
}
</script>
<style scoped>
input[type=number]{
width:100px;
}
</style>