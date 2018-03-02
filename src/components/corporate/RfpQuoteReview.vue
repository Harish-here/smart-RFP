<template>
 <div id="Rfp_Quote_Review" class='p10-20'>
    <header class='fl w100 p5-10'>
      <button @click='back' class='di btn btn-default btn-sm'><i class="fa fa-chevron-left" aria-hidden="true"></i> </button>
      <div class='di roboto b3 p10-20'>{{ (basicData.hasOwnProperty('hotelName')) ? basicData.hotelName : 'Hotel Name'}}</div> 
      <span class='di btn btn-info btn-xs'> View profile</span>
      <ul class='fr' v-if='basicData.hasOwnProperty("quoteStatus") && basicData.quoteStatus === "pending" && $store.state.permission!= 0'>
        <li class='fl p5-10'><button id='accept' class='btn btn-primary btn-sm' @click='agree'> <i class="fa fa-check" aria-hidden="true"></i> Approve</button></li>
        <li class='fl p5-10'><button id='decline' class='btn btn-danger btn-sm' @click='disagree'> <i class="fa fa-remove" aria-hidden="true"></i> Reject</button></li>
      </ul>
      <ul class='fr p5-10' v-if='basicData.quoteStatus === "accepted"'>
        <li class='fl p5-10'><div id='accept' class='btn btn-primary btn-sm opa'> Accepted</div></li>
      </ul>
      <ul class='fr p5-10' v-if='basicData.quoteStatus === "declined"'>
        <li class='fl p5-10'><div id='decline' class='btn btn-danger btn-sm' disabled> <i class="fa fa-remove" aria-hidden="true"></i> Declined</div></li>
      </ul>
      <hr>
    </header>
    <div class='fl w100 f16 b5 p10-20'>Hotel's Details</div>
    <section id='basic_detail' class='fl w100 p5-10 br-sh'>
        <ul class='fl w50 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b5'>Hotel</div>
                <div class='fl w30 b6 '>{{basicData.hotelName}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b5'>City</div>
                <div class='fl w30 b6'>{{basicData.city}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b5'>Phone</div>
                <div class='fl w30 b6'>{{basicData.primaryPhone}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b5'>Address</div>
                <div class='fl w30 b6'>{{basicData.address}}</div>
            </li>
            
        </ul>
        <ul class='fl w50 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b5'>Checkin</div>
                <div class='fl w30 b6 '>{{basicData.checkIn}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b5'>Checkout</div>
                <div class='fl w30 b6 '>{{basicData.checkOut}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 b5'>Star</div>
                <div class='fl w30 b6 '>{{basicData.starCat}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 b5'>Mobile</div>
                <div class='fl w30 b6'>{{basicData.secondaryPhone}}</div>
            </li>
        </ul>
    </section>
    <div class='fl w100 f16 b5 p10-20'>Hotel's Price </div>
    <section id='room_details' class='fl w100 p10-20' v-html='content' style='font-family:sans-serif !important;font-size:12px !important;'>
        
    </section>
    <section id='amenities' class='fl w100 p10-20 dbNo'>
        <h4 class='fl w100 p5-10'>Amenities</h4>
        <ul class='fl w40 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30 '>turyaa</div>
            </li>
        </ul>s
    </section>
    <!-- RFP thing -->
    <div class='fl w100 f16 b5 p10-20'>Hotel's Response </div>
     <section data-active='no' v-if='listData.hasOwnProperty("rfpQues") && listData.rfpQues.length > 0 ' v-for='i in listData.rfpQues'  class='fl w100 p5-10' :key='i.questionCategoryParentId' :id='"par_"+i.questionCategoryParentId'>
            <h4 class='fl w100 b5 f16 p5-10' >{{i.questionCategoryParent}} <span @click='open(i.questionCategoryParentId)' v-show='i.quesCategory.length > 0' class='cursor b5 btn btn-default btn-xs'> + </span></h4>
                <div v-if='i.hasOwnProperty("quesCategory") && i.quesCategory.length > 0' class='fl w100 dbNo' :id='"ques_"+i.questionCategoryParentId'>
                    <table class='table table-striped w80' v-if='i.quesCategory.length > 0' v-for='j in i.quesCategory' :key='j.questionCategoryId'>
                        <thead>
                            <tr>    
                                <th>{{ j.questionCategory }}</th>
                                <th>Hotel's Answer</th>
                            </tr>
                        </thead>
                        <tbody v-if='j.ques.length > 0' :id='"acc_"+j.questionCategoryId'>
                            
                                <tr v-for='y in j.ques' :key='y.questionId'>
                                    <td class='w70 pl-25'>{{y.questionText}} <span class='red' v-if='y.mandate == "1"'>*</span></td>
                                    <td class='b5 w30' v-if='y.questionSubTypeId === "8"'> {{ (y.answer.length > 0) ? y.answer.map((x) => { return x.answer }).join(', ') : "Not Answered" }}</td>
                                    <td class='b5 w30' v-else>{{( y.answer.length  === 1) ? y.answer[0].answer : (y.answer.length ===0) ? 'Not Answered': y.answer}}</td>
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
import api from '@/api/api'
import axios from 'axios'
export default {
    name: 'RfpQuoteReview',
    data(){
        return{
         basicData : {},
         listData:[],
         content: "<div class='fl w100 center teal'>Loading.... the Hotel quoted price...!</div>"   
        }
    },

    created(){
        const self = this; 
        const t = self.$route.params;
        self.$store.commit('showProgress');
        (api.forProd) ?
                        $.post(api.getQuotesReview,{'rfpId' : t.rid,'hotelId' : t.hid }).done(function(data){
                            setProgress(.5);
                            self.basicData = JSON.parse(data)
                        }) :
                        axios(api.getQuotesReview).then(function(data){
                            self.basicData = data.data
                        });

                        axios('http://www.hobse.com/demo/index.php/customer/price/displaytariff/'+t.hid).then(function(data){
                            self.content = data.data;
                            $(function(){
                                $('#pageHead').hide();
                            })
                        });

        (api.forProd) ?
                $.post(api.getHotelPreCustomer,{'rfpId': t.rid,'hotelId' : t.hid}).done(function(data){
                    self.listData = JSON.parse(data);
                }) :
                axios(api.getPreview).then(function(data){
                    self.listData = data.data
                }) ;                
    },

    computed: {
        rId(){
            return this.$route.params.rid
        }
    },
    
    methods: {
        refresh: function(){
            const self = this;
            const t = self.$route.params;
            self.$store.commit('showProgress');
            (api.forProd) ?
                        $.post(api.getQuotesReview,{'rfpId' : t.rid,'hotelId' : t.hid }).done(function(data){
                            
                            self.basicData = JSON.parse(data)
                        }) :
                        axios(api.getQuotesReview).then(function(data){
                            self.basicData = data.data
                        });
        },
        agree: function(){
            const self =this;
            const t = self.$route.params;
            if(confirm('Are you sure to accept this Proposal?')){
                $.post(api.acceptRfp,{rfpId: t.rid,hotelId:t.hid}).done(function(data){
                //do smthn
                self.refresh();
                self.$store.commit('showAlert','Proposal got Accepted..!');
                
            });
            }
            
        },

        disagree: function(){
            const self =this;
            const t = self.$route.params;
            if(confirm('Are you sure to decline this Proposal?')){
                $.post(api.declineQuote,{rfpId: t.rid,hotelId:t.hid}).done(function(data){
                self.refresh();
                self.$store.commit('showAlert','Proposal got Declined..!');
            });
            }
            
        },

        back: function(){
            const self = this;
            const t = self.$route.params;
            var type = t.ty;
            if(type === 'q'){
                this.$router.push({path:"/"+self.$store.state.path+"/corprate/quotelist/"+self.$route.params.rid});
            }else{
                this.$router.push({path:"/"+self.$store.state.path+"/corprate/connected"});
            }
        },
        open : function(id){
        if($('section#par_'+id).attr('data-active') === 'no') {
            $('#ques_'+id).removeClass('dbNo')
                $('section#par_'+id).attr('data-active','yes')
                $('#par_'+id+' h4 > span').html('-')
        }else{
            $('#ques_'+id).addClass('dbNo')
                $('section#par_'+id).attr('data-active','no')
                $('#par_'+id+' h4 > span').html('+');
        }
                
        }


    }
}
</script>

<style>
</style>