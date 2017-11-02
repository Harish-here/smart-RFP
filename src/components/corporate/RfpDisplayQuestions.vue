<template>
 <div id='questionCorp' class='h-75'>
    <ul  id='tab_v_head' class='fl w25 p5-10 b6 f12 al-left'>
        <span v-for='i in qData.quesCategory'>
        <li class='p20-40 tb' @click='show(i.questionCategoryId)' :id='i.questionCategoryId'>{{i.questionCategory}}</li>
        </span>
        <li class='p20-40 tb tb-v--active'>Payment</li>
    </ul>
    <div id='content'>
        <ul class='fr w40 b6 f14'>
          <li  class='fr w10 f14'> <button class='btn btn-default btn-xs' type='button'><i class="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
          <!-- dropDown  <ul class="dropdown-menu di">
                <li><a href="#">HTML</a></li>
                <li><a href="#">CSS</a></li>
                <li><a href="#">JavaScript</a></li>
            </ul> -->
          </li>
          <li  class='fr w10 f10'>skip</li>
          <li class='fr w25 center'>Mandatory</li>
          <li class='fr w25 center'>Include</li>
        </ul>
        <section style='display:none' v-for='(y,index_1) in qData.quesCategory' class='fr w75 f16 y-flow' :id='"body_"+ y.questionCategoryId'>
            <div v-for='(i,index_2) in y.ques' class='fl w100'>
                    
                <div class=' fl w60 p10-20'>
                {{i.questionText}} 
                </div>
                <ul class='fl w40 p5-10'>
                    <li class='fl w40 p5-10 center'>
                        <input type='checkbox' id="ans_" value='i' :data-ans='JSON.stringify(i)' :data-que='JSON.stringify(i)' >
                    </li>
                    <li class='fl w40 p5-10 center'>
                        <input type='checkbox' id="ans_" value='i' :data-ans='JSON.stringify(i)' :data-que='JSON.stringify(i)' >
                    </li>
                </ul>
            </div>
           
        </section>
    </div>
    <transition name='slide-fade'>
        <section v-show='quesData' id='answer_view' class='pab h-full z-500  w25 bg-dd top-right-0 p5-10 shadow'>
            <span class='fr' @click='emits'><i class="fa fa-close" aria-hidden="true"></i></span>
            <label class='p10-20 f14 fr w100'>Enter the Question</label>
            <input class='p5-10 fr w100' type='text' placeholder='what is your pet name?'>
            <label class='p10-20 f14 fr w100'>Type of Answer</label>
            <select class='p5-10 fr w100'>
                <option value='single'>Single choice</option>
                <option value='multiple'> Multiple choice</option>
            </select>
            <div class='w100 fr p20-40 center'>
                <button class='btn btn-primary btn-sm'>Add Question</button>
            </div>
        </section>
    </transition>
    
 </div>
</template>
<script>
import axios from 'axios'
//import _ from 'lodash'
export default {
    name: 'RfpDisplayQuestions',
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
        // txtAns: _.debounce(function(id){
        //     console.log($('#ans_'+id).data('ans'));
        //     console.log($('#ans_'+id).data('que'));
        // },700),
        emits: function(){
            this.$emit('close',1)
        }
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
.shadow{
-webkit-box-shadow: -5px 3px 13px -4px rgba(221,221,221,1);
-moz-box-shadow: -5px 3px 13px -4px rgba(0,0,0,0.75);
box-shadow: -5px 3px 13px -4px rgba(221,221,221,1);
}
</style>