<template>
<div id='RfpQuestionPreview' >
    <header class='fl w100 p10-20'>
      <button @click='back({path:"/"+$store.state.path+"/corprate/quotelist/"+ $route.params.id})' class='di btn btn-default btn-sm'><i class="fa fa-chevron-left" aria-hidden="true"></i> </button>
      <div class='roboto b3 dib p5-10'>{{ (listData.hasOwnProperty('rfp')) ? listData.rfp.label : "RFP" }}</div>
      <ul class='di fr p5-10'>
        <li class='p5-10 f14'><button id='shrink' class='btn btn-default btn-xs' @click='expand' data-active='no'>Expand All</button></li>
      </ul>
      <hr>
    </header>
    <section id='preview_space' class='fl w100 p5-10'>
        <div v-show='true' id='question_set_' class='fl w100 p5-10 '>
            <h4 class='fl w50 b5'>RFP Details</h4>
            <div v-if='listData.hasOwnProperty("basic") && listData.basic.length > 0' id='basic_ques' key='basic detaisl' class='fl br-sh w70'>
                <ul  v-for='(i,index) in listData.basic'  id='acc_' class='fl w100' :key='index'>
                    <li v-for='j in i.ques' :key='j.bqId'>
                        <div class='fl w50 p5-10'>{{j.bqText}}</div>
                        <div class='fl w50 b5 p5-10'>{{ ( j.answerId.length === 0) ? j.answer : j.answerId.map(x => x.label).join(',') }}</div>
                    </li>
                </ul>
            </div>
        </div>
      <div class='fl w100' v-if='listData.hasOwnProperty("rfpQues") && listData.rfpQues.length > 0 '>
          <div class='p5-10 b6 e14'>RFP Questions</div>
            <div class='grid' >
            <!-- main RFP -->
                <section data-active='no' v-for='i in listData.rfpQues' v-if='i.quesCategory.length > 0' class='br-el mar'  :id='"par_"+i.questionCategoryParentId' :key='i.questionCategoryParentId'>
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
                    self.listData = data.data;
                    
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
                $('section[data-active] h4>span').html('-');
                $('section[data-active] >div').removeClass('dbNo');
                $('section[data-active] >div').addClass('dbi');
                $('#shrink').data('active','yes');
                $('#shrink').html('Shrink All');
            }else{
            $('section[data-active] h4>span').html('+');
                $('section[data-active] >div').removeClass('dbi');
                $('section[data-active] >div').addClass('dbNo');
                $('#shrink').data('active','no');
                $('#shrink').html('Expand All'); 
            }
      },
      back : function(obj){
          const self = this;
         //redirect to correct page based on the type @param in url
          switch(self.$route.params.type){
              case 's': self.$router.push({path:"/"+self.$store.state.path+"/corprate/draft"});break;
              case 't' : self.$router.push({path:"/"+self.$store.state.path+"/corprate/trash"});break;
              case 'q' : self.$router.push({path:"/"+self.$store.state.path+"/corprate/quotelist/"+self.$route.params.id});break;
          }
      }
    }
}

</script>

<style>
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