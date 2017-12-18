<template>
<div id='preview' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP Answers</div>
      <ul class='fr'>
        <li class='di p5-10 f14 fr '><button id='shrink' class='btn btn-default btn-xs' @click='expand' data-active='no'>Expand All</button></li>
      </ul>
      <hr>
    </header>
    <!-- main RFP -->
      <section data-active='no' v-for='i in listData'  class='fl w100 p5-10' :id='"par_"+i.questionCategoryParentId' :key='i.questionCategoryParentId'>
            <h4 class='fl w100 b5 f16 p5-10' >{{i.questionCategoryParent}} <span @click='open(i.questionCategoryParentId)' v-show='i.quesCategory.length > 0' class='cursor b5 btn btn-default btn-xs'> + </span></h4>
                <div v-if='i.hasOwnProperty("quesCategory") && i.quesCategory.length > 0' class='fl w100 p5-10 dbNo' :id='"ques_"+i.questionCategoryParentId'>
                    <table class='table table-striped w80' v-if='i.quesCategory.length > 0' v-for='j in i.quesCategory' :key='j.questionCategoryId'>
                        <thead>
                            <tr>    
                                <th colspan='2'>{{ j.questionCategory }}</th>
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
        // $('nav#hotel div').removeClass('act');
        // $('nav#hotel div:nth-child(3)').addClass('act');     
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
      go: function(){
          const self = this;
          if(self.$route.params.rid === 'not'){
              this.$router.push({name:'proposal',params:{foo:'rfp'}});
          }else{
              this.$router.push({name:'engaged',params:{foo:'rfp'}})
          }
          
      }
    }
}

</script>

<style>


</style>