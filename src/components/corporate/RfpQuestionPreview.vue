<template>
<div id='RfpQuestionPreview' class='p10-20'>
    <header class='fl w100 p10-20'>
      <button @click='back({path:"/"+$store.state.path+"/corprate/quotelist/"+ $route.params.id})' class='di btn btn-default btn-sm'><i class="fa fa-chevron-left" aria-hidden="true"></i> </button>
      <div class='roboto b3 dib p5-10'>{{ (listData.hasOwnProperty('rfp')) ? listData.rfp.label : "RFP" }}</div>
      <ul class='di fr p5-10'>
        <li class='p5-10 f14'><button id='shrink' class='btn btn-default btn-xs' @click='expand' data-active='no'>Expand All</button></li>
      </ul>
      <hr>
    </header>
    <section id='preview_space' class='fl w100 p5-10'>
        <div v-show='true' id='question_set_' class='p5-10'>
            <h4 class='fl w50 b5'>RFP Details</h4>
            <div v-if='listData.hasOwnProperty("basic") && listData.basic.length > 0' id='basic_ques' key='basic detaisl'>
                <ul  v-for='(i,index) in listData.basic'  id='acc_' class='fl w70' :key='index'>
                    <li v-for='j in i.ques' :key='j.bqId'>
                        <div class='fl w50 p5-10'>{{j.bqText}}</div>
                        <div class='fl w50 b5 p5-10'>{{ ( j.answerId.length === 0) ? j.answer : j.answerId.map(x => x.label).join(',') }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
      
      <!-- main RFP -->
      <section data-active='no' v-if='listData.hasOwnProperty("rfpQues") && listData.rfpQues.length > 0 ' v-for='i in listData.rfpQues'  class='fl w100 p5-10' :id='"par_"+i.questionCategoryParentId' :key='i.questionCategoryParentId'>
            <h4 class='fl w100 b5 accordian p5-10' >{{i.questionCategoryParent}} <span @click='open(i.questionCategoryParentId)' v-show='i.quesCategory.length > 0' class='cursor b5 btn btn-default btn-xs'> + </span></h4>
                <div v-if='i.hasOwnProperty("quesCategory") && i.quesCategory.length > 0' class='fl w100 p5-10 dbNo' :id='"ques_"+i.questionCategoryParentId'>
                    <table class='table table-striped w80' v-if='i.quesCategory.length > 0' v-for='j in i.quesCategory' :key='j.questionCategoryId'>
                        <thead>
                            <tr>    
                                <th colspan='2'>{{ j.questionCategory }}</th>
                            </tr>
                        </thead>
                        <tbody v-if='j.ques.length > 0' :id='"acc_"+j.questionCategoryId'>
                            
                                <tr v-for='y in j.ques' :key='y.questionId'>
                                    <td class=' pl-25'>{{y.questionText}}</td>
                                    <td class='b5' v-if='y.questionSubTypeId === "8"'> {{ (y.answer.length > 0) ? y.answer.map((x) => { return x.answer }).join(', ') : "NA" }}</td>
                                    <td class='b5' v-else>{{( y.answer.length  === 1) ? y.answer[0].answer : (y.answer.length ===0) ? 'Included': y.answer}}</td>
                                </tr>
                             
                        </tbody>
                        <tbody  v-else>
                            <tr>
                                    <td colspan='2' class='pl-25 red b5'>No question were included in this subcategory</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class='pl-25 red b5' v-else>
                    No Questions included in this Category
                </div>
                
      </section>


</div>
</template>

<script>
import axios from 'axios'
import api from '@/api/api'
export default {
    name: 'RfpQuestionPreview',
    data(){
        return {
            listData : []
        }
    },
    created(){
        const self =this;
        const t = self.$route.params;
        self.$store.commit('showProgress');
        (api.forProd) ?
                $.post(api.getPreview,{'rfpId': t.id}).done(function(data){
                    self.listData = JSON.parse(data);
                }) :
                axios(api.getPreview).then(function(data){
                    self.listData = data.data
                }) ;


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
            if($('#shrink').data('active') == 'no'){
                $('section#preview_space h4>span').html('-');
                $('section#preview_space ul').removeClass('dbNo');
                $('section#preview_space ul').addClass('dbi');
                $('#shrink').data('active','yes');
                $('#shrink').html('Shrink All');
            }else{
            $('section#preview_space h4>span').html('+');
                $('section#preview_space ul').removeClass('dbi');
                $('section#preview_space ul').addClass('dbNo');
                $('#shrink').data('active','no');
                $('#shrink').html('Expand All'); 
            }
      },
      back : function(obj){
          const self = this;
          self.$router.push(obj)
      }
    }
}

</script>

<style>


</style>