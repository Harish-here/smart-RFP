<template>
<div id='preview' class='p10-20'>
    <header class='fl w100 p10-20'>
    <button @click='go' class='di btn btn-default btn-sm'><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
      <div class='roboto b3 dib p5-10'>{{ (listData.hasOwnProperty('rfp')) ? listData.rfp.label : "RFP Name"}} <a :href='"http://www.hobse.com/demo/index.php/admin/rfp/contract?rfpId="+rfp' target='_blank'><i title='Get this as report'  class="fa fa-download cursor" aria-hidden="true"></i></a>
      </div>
      <ul class='fr' v-if='listData.hasOwnProperty("basic")'>
        <li class='p5-10 f14 fr' v-if='showAccept  && !showDecline'><button id='decline' class='btn btn-default btn-sm' @click='decline'>Decline</button></li>
        <li class='p5-10 f14 fr' v-if='showAccept && !showDecline'><button id='accept' class='btn btn-info btn-sm' @click='showSlab = true'>Accept</button></li>
        <li class='p5-10 f14 fr' v-if='!showAccept && !showDecline'><button class='btn btn-success btn-sm opa' disabled>Accepted</button></li>
        <li class='p5-10 f14 fr' v-if='showDecline'><button class='btn btn-danger btn-sm opa' disabled>Declined</button></li>
        <li v-show='showSlab' class='p10-20 f14 fr'>
            <select v-model='slabId'>
                <option value='1' selected disabled>Price slab</option>
                <option v-if='slabData.length > 0' v-for='i in slabData' :value='i.value' :key='i.value'>{{ i.label}}</option>
            </select>
        </li>
        <li v-show='showSlab' class=' p5-10 f14 fr'>
            <button class='btn btn-primary btn-sm' @click='assign'>Assign Slab</button>
        </li>
        <li class='di p5-10 f14 fr dbNo'><button id='shrink' class='btn btn-default btn-xs' @click='expand' data-active='no'>Expand All</button></li>
      </ul>
      <hr>
    </header>
    <section id='preview_space' class='fl w100 p5-10'>
        <div v-show='true' id='question_set_' class='fl w60 p5-10'>
            <h4 class='fl w50 b5'>RFP Details</h4>
            <div v-if='listData.hasOwnProperty("basic") && listData.basic.length > 0' id='basic_ques' key='basic details'>
                <ul  v-for='(i,z) in listData.basic' :key='z' id='acc_' class='fl w100'>
                    <li v-for='j in i.ques' :key='j.bqText'>
                        <div class='fl w50 p5-10'>{{j.bqText}}</div>
                        <div class='fl w50 b5 p5-10'>{{ ( j.answerId.length === 0) ? j.answer : j.answerId.map(x => x.label).join(', ')}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class='fl w40 p5-10 bg-high blue'>
            <h4>Company Details</h4>
            <ul>
                <li v-for='(k,i) in company' class='p5-10' :key='i'>{{ k }}</li>
            </ul>
        </div>
    </section>
    <!-- main RFP -->
      <section data-active='no' v-if='listData.hasOwnProperty("rfpQues") && listData.rfpQues.length > 0 ' v-for='i in listData.rfpQues'  class='fl w100 p5-10' :id='"par_"+i.questionCategoryParentId' :key='i.questionCategoryParentId'>
            <h4 class='fl w100 b5 f16  p5-10' >{{i.questionCategoryParent}} <span @click='open(i.questionCategoryParentId)' v-show='i.quesCategory.length > 0' class='cursor b5 btn btn-default btn-xs'> + </span></h4>
                <div v-if='i.hasOwnProperty("quesCategory") && i.quesCategory.length > 0' class='fl w100 p5-10 dbNo' :id='"ques_"+i.questionCategoryParentId'>
                    <table class='table table-striped w80' v-if='i.quesCategory.length > 0' v-for='j in i.quesCategory' :key='j.questionCategoryId'>
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
</template>

<script>
import axios from 'axios'
import api from '@/api/api'
export default {
    name: 'review',
    data(){
        return {
            listData: [],
            slabId: null,
            slabData: [],
            showSlab: false,
            rfp:''
        }
    },
    created(){
        const self =this;
        self.$store.commit('showProgress');
        self.rfp = self.$route.params.rid;
        (api.forProd) ?
        $.post(api.getHotelPre,{rfpId: self.$route.params.rid,hotelId: ''}).done(function(data){
            self.listData = JSON.parse(data); //getting the preview of that rfp
        }) :
        axios(api.getHotelPre).then(function(data){
            self.listData = data.data
          
        });

        axios(api.getSlab).then(function(data){//get slab
            self.slabData = data.data
        });
      
    },

    computed : {
        rfp(){
            const self = this;
            if(self.listData.hasOwnProperty('rfp')) {
                return self.listData.rfp
            }else{
                return {label:'Bussiness Meet RFP',value:'sample'}
            }      
        },

        company(){
            const self = this;
            if(self.listData.hasOwnProperty('company')) {
                return self.listData.company;
            }else{
                return {
                        travelAgencyMasterId: "3",
                        travelAgencyMaster: "s1",
                        email: "hotel2@gmail.com",
                        phone: "435345",
                        mobile: "54354"
                }  
            }
        },
        showAccept(){
            const self = this;
            if(self.listData.hasOwnProperty('status') && (self.listData.status == 'accepted' || self.listData.status == 'quoted' || self.listData.status == 'shortlisted') ){
                return false
            }else{
                if(self.$route.params.stat !== 'con'){
                    return true;
                }else{
                    return false;
                }
                
            }
        },
        showDecline(){
            const self = this;
            if(self.listData.hasOwnProperty('status') && self.listData.status == 'declined'){
                return true;
            }else{
                 return false;
            }  
        }
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

        getPdf: function(){
            
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
      assign : function(){
          const self =this;
          if(confirm('selected slab will be sent as quote to this RFP')){
              self.$store.commit('showProgress');
            $.post(api.setSlab,{slabId:self.slabId,hotelId:'',rfpId:self.$route.params.rid}).done(function(data){
                
                self.showSlab = false;
                $('#accept').attr('disabled','disabled').removeClass('btn-primary').addClass('btn-success').html('Accepted');
                $('#decline').hide();
            });
          }
      },
      decline: function(){
          const self = this;
          if(confirm("Are you sure, you want to Decline this RFP ?")){
              self.$store.commit('showProgress');
              $.post(api.rfpDecline,{rfpId: self.$route.params.rid}).done(function(data){
                  self.showSlab = false;
                  $('#decline').attr('disabled','disabled').html('Declined');
                  $('#accept').hide();
              });
          }
      },
      go: function(){
          const self = this;
          if(self.$route.params.stat === 'not'){
              this.$router.push({path:"/"+self.$store.state.path+"/hotel"});
          }else{
              this.$router.push({path:"/"+self.$store.state.path+"/hotel/engaged"})
          }
          
      }
    }
}

</script>

<style>


</style>