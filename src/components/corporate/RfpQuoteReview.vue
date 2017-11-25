<template>
 <div id="Rfp_Quote_Review" class='p10-20'>
    <header class='fl w100 p5-10'>
      <button @click='back' class='di btn btn-default btn-sm'><i class="fa fa-chevron-left" aria-hidden="true"></i> </button>
      <div class='di f22 b6 p10-20'>{{ (basicData.hasOwnProperty('hotelName')) ? basicData.hotelName : 'Hotel Name'}}</div> 
      <span class='di btn btn-info btn-xs'> View profile</span>
      <ul class='fr p5-10' v-if='basicData.hasOwnProperty("quoteStatus") && basicData.quoteStatus === "pending"'>
        <li class='fl p5-10'><button id='accept' class='btn btn-primary btn-sm' @click='agree'> <i class="fa fa-check" aria-hidden="true"></i> Approve</button></li>
        <li class='fl p5-10'><button id='decline' class='btn btn-danger btn-sm' @click='disagree'> <i class="fa fa-remove" aria-hidden="true"></i> Reject</button></li>
      </ul>
      <ul class='fr p5-10' v-if='basicData.quoteStatus === "accepted"'>
        <li class='fl p5-10'><button id='accept' class='btn btn-primary btn-sm opa' disabled> Accepted</button></li>
      </ul>
      <ul class='fr p5-10' v-if='basicData.quoteStatus === "declined"'>
        <li class='fl p5-10'><button id='decline' class='btn btn-danger btn-sm' disabled> <i class="fa fa-remove" aria-hidden="true"></i> Declined</button></li>
      </ul>
      <hr>
    </header>
    <section id='basic_detail' class='fl w100 p5-10'>
        <h4 class='fl w100 p5-10 b6 f16 u'>Hotel's Details</h4>
        <ul class='fl w50 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>Hotel</div>
                <div class='fl w30 '>{{basicData.hotelName}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>City</div>
                <div class='fl w30 '>{{basicData.city}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>Address</div>
                <div class='fl w30  f12'>{{basicData.address}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>Phone</div>
                <div class='fl w30'>{{basicData.primaryPhone}}</div>
            </li>
            
        </ul>
        <ul class='fl w50 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>Checkin</div>
                <div class='fl w30 '>{{basicData.checkIn}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>Checkout</div>
                <div class='fl w30 '>{{basicData.checkOut}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 b6'>Web</div>
                <div class='fl w30 '>{{basicData.web}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 b6'>Mobile</div>
                <div class='fl w30 '>{{basicData.secondaryPhone}}</div>
            </li>
        </ul>
    </section>
    <div class='fl w100 f16 b6 p10-20 u'>Hotel's Price </div>
    <section id='room_details' class='fl w100 p10-20' v-html='content'>
        
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
    <div class='fl w100 f16 b6 p10-20 u'>Hotel's Response </div>
     <section data-active='no' v-if='listData.hasOwnProperty("rfpQues") && listData.rfpQues.length > 0 ' v-for='i in listData.rfpQues'  class='fl w100 p5-10' :id='"par_"+i.questionCategoryParentId'>
            <h4 class='fl w100 b6 accordian p5-10' >{{i.questionCategoryParent}} <span @click='open(i.questionCategoryParentId)' v-show='i.quesCategory.length > 0' class='cursor b6 btn btn-default btn-xs'> + </span></h4>
                <div v-if='i.hasOwnProperty("quesCategory") && i.quesCategory.length > 0' class='fl w100 dbNo' :id='"ques_"+i.questionCategoryParentId'>
                    <div v-if='i.quesCategory.length > 0' v-for='j in i.quesCategory'>    
                        <h5 class='fl w100 b6 p5-10'>{{ j.questionCategory }}</h5>
                        <ul v-if='j.ques.length > 0' :id='"acc_"+j.questionCategoryId' class='fl w100 body'>
                            <li v-for='y in j.ques' class='fl w80 p5-10'>
                               <div class='fl w70 pl-25'>{{y.questionText}}</div>
                                <div class='fl w30 b6' v-if='y.questionSubTypeId === "8"'> {{ (y.answer.length > 0) ? y.answer.map((x) => { return x.answer }).join(', ') : "NA" }}</div>
                                <div class='fl w30 b6' v-else>{{( y.answer.length  === 1) ? y.answer[0].answer : (y.answer.length ===0) ? 'NA': y.answer}}</div>
                            </li>
                        </ul>
                        <ul class='fl w100 body p5-10' v-else>
                            <li class='fl w100 pl-25 red b6'>No question were included in this subcategory</li>
                        </ul>
                    </div>
                </div>
                <div class='fl w50 pl-25 red b6' v-else>
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
         content: "<div class='fl w100 center blue'>Loading.... the Hotel quoted price...!</div>"   
        }
    },

    created(){
        const self = this; 
        const t = self.$route.params;

        (api.forProd) ?
                        $.post(api.getQuotesReview,{'rfpId' : t.rid,'hotelId' : t.hid }).done(function(data){
                            setProgress(3);
                            self.basicData = JSON.parse(data)
                        }) :
                        axios(api.getQuotesReview).then(function(data){
                            self.basicData = data.data
                        });

                        axios('http://www.hobse.com/demo/index.php/customer/price/displaytariff/'+t.hid).then(function(data){
                            self.content = data.data
                        });

        (api.forProd) ?
                $.post(api.getHotelPre,{'rfpId': t.rid}).done(function(data){
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