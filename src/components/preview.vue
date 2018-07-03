<template>
<div id='preview' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP Answers</div>
      <ul class='fr'>
        <!-- <li class='di p5-10 f14 fr '><button id='shrink' class='btn btn-default btn-xs' @click='expand' data-active='no'>Expand All</button></li> -->
      </ul>
      <hr>
    </header>
    <!-- main RFP -->
        <div  v-if='listData.length == 0' >
            <section data-active='no' v-for='i in listData'  class='fl w100 p5-10' :id='"par_"+i.questionCategoryParentId' :key='i.questionCategoryParentId'>
                    <h4 class='fl w100 b5 f16 p5-10' > <span @click='open(i.questionCategoryParentId)' v-show='i.quesCategory.length > 0' class='cursor b5 btn btn-default btn-xs'> + </span> {{i.questionCategoryParent}}</h4>
                        <div v-if='i.hasOwnProperty("quesCategory") && i.quesCategory.length > 0' class='fl w100 p5-10 dbNo' :id='"ques_"+i.questionCategoryParentId'>
                            <table class='table table-striped w80 br-el' v-if='i.quesCategory.length > 0' v-for='j in i.quesCategory' :key='j.questionCategoryId'>
                                <thead>
                                    <tr>    
                                        <th class='w70'>{{ j.questionCategory }}</th><th class='w30'>Your Answers</th>
                                    </tr>
                                </thead>
                                <tbody v-if='j.ques.length > 0' :id='"acc_"+j.questionCategoryId'>
                                    
                                        <tr v-for='y in j.ques' :key='y.questionId'>
                                            <td class='w70 pl-25'>{{y.questionText}}</td>
                                            <td class='b5 w30' v-if='y.questionSubTypeId === "8"'> {{ (y.answer.length > 0) ? y.answer.map((x) => { return x.answer }).join(', '): "Not Answered" }}</td>
                                            <td class='b5 w30' v-else>{{( y.answer.length  === 1) ? y.answer[0].answer : (y.answer.length ===0) ? "Not Answered": y.answer}}</td>
                                        </tr>
                                    
                                </tbody>
                                <tbody  v-else>
                                    <tr>
                                            <td colspan='2' class='pl-25 red b5'>No question were included in this subcategory</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class='fl w50 pl-25 red b5' v-else>
                            No Questions included in this Category
                        </div>
                        
            </section>
        </div>
            <div style='float:left;'>
                <div class='grid' >
                    <!-- main RFP -->
                        <section data-active='no' v-for='i in listData' v-if='i.quesCategory.length > 0' class='br-el mar'  :id='"par_"+i.questionCategoryParentId' :key='i.questionCategoryParentId'>
                                <div class='f16 p5-10 bg-gray center b6' v-if='i.quesCategory.length > 0' >{{i.questionCategoryParent}} <span @click='open(i.questionCategoryParentId)' v-show='i.quesCategory.length > 0' class='dbNo cursor b5 btn btn-default btn-xs'> + </span></div>
                                    <div v-if='i.hasOwnProperty("quesCategory") && i.quesCategory.length > 0' class=' ' :id='"ques_"+i.questionCategoryParentId'>
                                        <table class='table table-striped ' v-if='i.quesCategory.length > 0' v-for='j in i.quesCategory' :key='j.questionCategoryId'>
                                            <thead>
                                                <tr>    
                                                    <th colspan='2'>{{ j.questionCategory }}</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if='j.ques.length > 0' :id='"acc_"+j.questionCategoryId'>
                                                
                                                    <tr v-for='y in j.ques' :key='y.questionId'>
                                                        <td class='w70 pl-25'>{{y.questionText}}</td>
                                                        <td class='b5 w30' v-if='y.questionSubTypeId === "8"'> {{ (y.answer.length > 0) ? y.answer.map((x) => { return x.answer }).join(', ') : (y.mandate == "1") ? "Mandatory" : "Included" }}</td>
                                                        <td class='b5 w30' v-else>{{( y.answer.length  === 1) ? y.answer[0].answer : (y.answer.length ===0) ? (y.mandate == "1") ? "Mandatory" : "Included": y.answer}}</td>
                                                    </tr>
                                                
                                            </tbody>
                                            <tbody  v-else>
                                                <tr class='centering'>
                                                        <td colspan='2' class='pl-25 reds b5'>No question were included in this subcategory</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <aside class='pl-25 red b5 centering' v-else>
                                    <span> No Questions included in this Category</span>
                                    </aside>
                                    
                        </section>
                </div>
            </div>
        

</div>
</template>

<script>
import axios from 'axios'
import api from '@/api/api'
export default {
    name: 'preview',
    data(){
        return {
            listData: [],
            slabId: null,
            slabData: [],
            showSlab: false
        }
    },
    created(){
        const self =this;
        self.$store.commit('showProgress');
        axios(api.getHotelAns).then(function(data){
            self.listData = data.data
    
        }); 
        $(function(){
        $('nav#hotel div').removeClass('act');
        $('nav#hotel div:nth-child(4)').addClass('act');
        });     
    },

    methods: {
        open : function(id){
        if($('section#par_'+id).attr('data-active') === 'no') {
            $('#ques_'+id).removeClass('dbNo')
                $('section#par_'+id).attr('data-active','yes')
                $('#par_'+id+' h4>span').html('-')
        }else{
            $('#ques_'+id).addClass('dbNo')
                $('section#par_'+id).attr('data-active','no')
                $('#par_'+id+' h4>span').html('+');
        }
                
        },
        expand : function(){
            if($('#shrink').data('active') === 'no'){
                $('#preview section h4>span').html('-');
                $('#preview section > div').removeClass('dbNo');
                $('#preview section div').addClass('dbi');
                $('#shrink').data('active','yes');
                $('#shrink').html('Shrink All');
            }else{
                $('#preview section h4>span').html('+');
                $('#preview section > div').removeClass('dbi');
                $('#preview section > div').addClass('dbNo');
                $('#shrink').data('active','no');
                $('#shrink').html('Expand All'); 
            }
      }
    }
}

</script>

<style scoped>

.grid{
    /* display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    grid-auto-rows: minmax(50px,auto);
     */
    /* display:flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: space-around;  */
    columns: 400px;
    column-gap:20px;
}

.grid section{
        -webkit-column-break-inside: avoid;
    break-inside: avoid-column;
    margin-bottom: 1rem;
}
</style>