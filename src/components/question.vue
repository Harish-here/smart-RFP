<template>
 <div id='question' class='h-75 y-flow'>
    <div v-for='i in data' class='fl w100 f16'>
        <div v-if='i.questionSubTypeId === "0"'>
            <div class=' fl w60 p10-20'>
              {{i.questionText}} ?
            </div>
            <div class='fl w40 p10-20'>
               <span class='di  pl-25' v-for='j in i.concatAns'>
                <input  type='radio' name='yorn' :value='j.answerId'> {{j.answerText}}
               </span>
            </div>
        </div>
        <div v-else-if='i.questionSubTypeId === "1"'>
            <div class=' fl w60 p10-20'>
              {{i.questionText}} 
            </div>
            <div class='fl w40 p10-20'>
                <span class='pl-25'>
                    <input type='number'>
                </span>
            </div>
        </div>
        <div v-else-if='i.questionSubTypeId === "2"'>
            <div class=' fl w60 p10-20'>
              {{i.questionText}} ?
            </div>
            <div class='fl w40 p10-20'>
                <span class='di  pl-25' v-for='j in i.concatAns'>
                <input  type='radio' name='ans' :value='j.answerId'> {{j.answerText}}
               </span>
            </div>
        </div>
        <div v-else>
            <div class=' fl w100 p10-20'>
              {{i.questionText}} ?
            </div>
            <ul class='fl w100 p20-40'>
                <li v-for='j in i.concatAns' class='fl w25 p10-20'>
                    <input type='checkbox'> {{j.answerText}}
                </li>
            </ul>
        </div>
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
            data : []
        }
    },
    created(){
        const self = this;
        axios('https://api.myjson.com/bins/dmkgp').then(function(data){
            self.data = data.data.ques;
        });
        
    }
}
</script>
<style scoped>
input[type=number]{
width:100px;
}
</style>