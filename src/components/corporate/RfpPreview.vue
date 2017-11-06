<template>
<div id='RfpPreview'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>RFP - Preview</div>
      <ul class='fr p5-10'>
        <li class='di p5-10 f14'><button class='btn btn-default btn-xs'> <i class="fa fa-file-text-o" aria-hidden="true"></i> Next</button></li>
        <li class='di p5-10 f14'><button class='btn btn-default btn-xs'> <i class="fa fa-download" aria-hidden="true"></i> Go Back to Edit</button></li>
        <li class='di p5-10 f14'><button id='shrink' class='btn btn-default btn-xs' @click='expand' data-active='no'>Expand All</button></li>
        </ul>
      <hr>
    </header>
    <section id='preview_space' class='fl w100 p5-10'>
      <div v-show='true' id='question_set_' class='p5-10'>
        <h4 class='fl w50 b6'>RFP Details <span class='cursor b6 btn btn-default btn-xs' @click='open("")'> - </span></h4>
        <div class='fl w30 p5-10'>
            <router-link to='./send'><button class='btn btn-info btn-sm'>Move to select Hotel</button></router-link>
        </div>
        <ul id='acc_' class='fl w70'>
            <li>
                <div class='fl w50'>Company </div>
                <div class='fl w50 b6'>infoNix weblabs</div>
            </li>
        </ul>
         
      </div>
      <div v-for='i in listData.quesCategory' :id='"question_set_"+i.questionCategoryId' class='p5-10'>
        <h4 class='fl w70 b6 accordian' >{{i.questionCategory}} <span class='cursor b6 btn btn-default btn-xs' @click='open(i.questionCategoryId)'> + </span></h4>
        <ul :id='"acc_"+i.questionCategoryId' class='fl w70 body dbNo'>
            <li v-for='j in i.ques' class='fl w100 p5-10'>
                <div class='fl w70 pl-25'>{{j.questionText}}</div>
                <div class='fl w30'>infoNix weblabs</div>
            </li>
        </ul>
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
        axios(api.getQues).then(function(data){
            self.listData = data.data
        })
    },
    methods: {
        open : function(id){
        $('section#preview_space ul').addClass('dbNo');
        $('#acc_'+id).removeClass('dbNo');
        $('#acc_'+id).addClass('dbi');
        $('section#preview_space h4>span').html('+');
        $('#question_set_'+id+' h4>span').html('-');
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
      }
    }
}

</script>

<style>


</style>