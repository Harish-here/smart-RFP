<template>
<div id='RfpPreview' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>{{ (listData.hasOwnProperty('rfp')) ? listData.rfp.label : "RFP" }} - Preview</div>
      <ul class='di fr p5-10 dbNo'>
        <li class='p5-10 f14' v-show='false'><button class='btn btn-default btn-xs'> <i class="fa fa-file-text-o" aria-hidden="true"></i> Next</button></li>
        <li class='p5-10 f14' v-show='false'><button class='btn btn-default btn-xs'> <i class="fa fa-download" aria-hidden="true"></i> Go Back to Edit</button></li>
        <li class='p5-10 f14'><button id='shrink' class='btn btn-default btn-xs' @click='expand' data-active='no'>Expand All</button></li>
      </ul>
      <hr>
    </header>
    <section id='preview_space' class='fl w100 h-full p5-10 y-flow'>
        <div v-show='true' id='question_set_' class='p5-10'>
            <h4 class='fl w50 b5'>RFP Details</h4>
            <div class='fl w30 p5-10'>
                <button @click='go' class='btn btn-info btn-sm'> Select Hotels <i class="fa fa-chevron-right" aria-hidden="true"></i></button>
            </div>
            <div v-if='listData.hasOwnProperty("basic") && listData.basic.length > 0' id='basic_ques' key='basic detaisl'>
                <ul  v-for='i in listData.basic'  id='acc_' class='fl w70'>
                    <li v-for='j in i.ques'>
                        <div class='fl w50 p5-10'>{{j.bqText}}</div>
                        <div class='fl w50 b5 p5-10'>{{ ( j.answerId.length === 0) ? j.answer : j.answerId.map(x => x.label).join(',') }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
      
      <!-- main RFP -->
      <section data-active='no' v-if='listData.hasOwnProperty("rfpQues") && listData.rfpQues.length > 0 ' v-for='i in listData.rfpQues'  class='fl w100 p5-10' :id='"par_"+i.questionCategoryParentId'>
            <h4 class='fl w100 b5 accordian p5-10' >{{i.questionCategoryParent}} <span @click='open(i.questionCategoryParentId)' v-show='i.quesCategory.length > 0' class='cursor b6 btn btn-default btn-xs'> + </span></h4>
                <div v-if='i.hasOwnProperty("quesCategory") && i.quesCategory.length > 0' class='fl w100 p5-10 dbNo' :id='"ques_"+i.questionCategoryParentId'>
                    <div v-if='i.quesCategory.length > 0' v-for='j in i.quesCategory'>    
                        <h5 class='fl w100 b5 p5-10'>{{ j.questionCategory }}</h5>
                        <ul v-if='j.ques.length > 0' :id='"acc_"+j.questionCategoryId' class='fl w100 body'>
                            <li v-for='y in j.ques' class='fl w80 p5-10'>
                                <div class='fl w70 pl-25'>{{y.questionText}}</div>
                                <div class='fl w30 b5' v-if='y.questionSubTypeId === "8"'> {{ (y.answer.length > 0) ? y.answer.map((x) => { return x.answer }).join(', ') : "NA" }}</div>
                                <div class='fl w30 b5' v-else>{{( y.answer.length  === 1) ? y.answer[0].answer : (y.answer.length ===0) ? 'NA': y.answer}}</div>
                            </li>
                        </ul>
                        <ul class='fl w100 body p5-10' v-else>
                            <li class='fl w100 pl-25 red b5'>No question were included in this subcategory</li>
                        </ul>
                    </div>
                </div>
                <div class='fl w50 pl-25 red b5' v-else>
                    No Questions included in this Category
                </div>
                
      </section>


</div>
</template>

<script>
import axios from 'axios'
import api from '@/api/api'
export default {
    name: 'RfpPreview',
    data(){
        return {
            listData : []
        }
    },
    created(){
        const self =this;
        self.$store.commit('showProgress');
        (api.forProd) ?
                $.post(api.getPreview,{'rfpId': self.$store.state.rfp.rfpId}).done(function(data){
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
      go : function(){
          const self = this;
          self.$store.commit('showProgress')
          self.$router.push({path:"/"+self.$store.state.path+"/corprate/send"})
      }
    }
}

</script>

<style>


</style>