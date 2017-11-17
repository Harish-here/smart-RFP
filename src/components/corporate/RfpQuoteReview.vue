<template>
 <div id="Rfp_Quote_Review">
    <header class='fl w100 p10-20'>
      <button @click='back({name:"RfpQuoteList",params:{foo:"rfp",id:$route.params.rid}})' class='btn btn-default btn-sm'><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
      <div class='f22 b6 dib'>{{listData.hotelName}}</div> <span class='dib btn btn-info btn-xs'> View profile</span>
      <ul class='fr p5-10' v-show='listData.hasOwnProperty("quoteStatus") && listData.quoteStatus === "pending"'>
        <li class='fl p5-10'><button id='accept' class='btn btn-primary btn-sm' @click='agree'> <i class="fa fa-check" aria-hidden="true"></i> Agree</button></li>
        <li class='fl p5-10'><button id='decline' class='btn btn-danger btn-sm' @click='disagree'> <i class="fa fa-remove" aria-hidden="true"></i> Disagree</button></li>
      </ul>
      <ul class='fr p5-10' v-show='listData.quoteStatus === "accepted"'>
        <li class='fl p5-10'><button id='accept' class='btn btn-primary btn-sm' disabled> Accepted</button></li>
      </ul>
      <ul class='fr p5-10' v-show='listData.quoteStatus === "declined"'>
        <li class='fl p5-10'><button id='decline' class='btn btn-danger btn-sm' disabled> <i class="fa fa-remove" aria-hidden="true"></i> Declined</button></li>
      </ul>
      <hr>
    </header>
    <section id='basic_detail' class='fl w100 p10-20'>
        <h4 class='fl w100 p5-10'>Basic Details</h4>
        <ul class='fl w50 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>Hotel</div>
                <div class='fl w30 '>{{listData.hotelName}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>City</div>
                <div class='fl w30 '>{{listData.city}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>Address</div>
                <div class='fl w30  f12'>{{listData.address}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>Phone</div>
                <div class='fl w30'>{{listData.primaryPhone}}</div>
            </li>
            
        </ul>
        <ul class='fl w50 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>Checkin</div>
                <div class='fl w30 '>{{listData.checkIn}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30  b6'>Checkout</div>
                <div class='fl w30 '>{{listData.checkOut}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 b6'>Web</div>
                <div class='fl w30 '>{{listData.web}}</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 b6'>Mobile</div>
                <div class='fl w30 '>{{listData.secondaryPhone}}</div>
            </li>
        </ul>
    </section>
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
 </div>
</template>

<script>
import api from '@/api/api'
import axios from 'axios'
export default {
    name: 'RfpQuoteReview',
    data(){
        return{
         listData : null,
         content: null   
        }
    },

    created(){
        const self = this; 
        const t = self.$route.params;
        (api.forProd) ?
                        $.post(api.getQuotesReview,{'rfpId' : t.rid,'hotelId' : t.hid }).done(function(data){
                            console.log(data)
                            self.listData = JSON.parse(data)
                        }) :
                        axios(api.getQuotesReview).then(function(data){
                            self.listData = data.data
                        });

                        axios('http://www.hobse.com/demo/index.php/customer/price/displaytariff/'+t.hid).then(function(data){
                            self.content = data.data
                        });
    },
    
    methods: {
        refresh: function(){
            const self = this;
            const t = self.$route.params;
            (api.forProd) ?
                        $.post(api.getQuotesReview,{'rfpId' : t.rid,'hotelId' : t.hid }).done(function(data){
                            console.log(data)
                            self.listData = JSON.parse(data)
                        }) :
                        axios(api.getQuotesReview).then(function(data){
                            self.listData = data.data
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

        back: function(obj){
            this.$router.push(obj);
        }


    }
}
</script>

<style>
</style>