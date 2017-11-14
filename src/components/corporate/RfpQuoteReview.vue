<template>
 <div id="Rfp_Quote_Review">
    <header class='fl w100 p10-20'>
      <button @click='back({name:"RfpQuoteList",params:{foo:"rfp",id:$route.params.rid}})' class='btn btn-default btn-sm'><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
      <div class='f22 b6 dib'>--rfp name --  - hotel name --</div> <span class='dib btn btn-info btn-xs'> View profile</span>
      <ul class='fr p5-10'>
        <li class='fl p5-10'><button id='accept' class='btn btn-primary btn-sm' @click='agree'> <i class="fa fa-check" aria-hidden="true"></i> Agree</button></li>
        <li class='fl p5-10'><button id='decline' class='btn btn-danger btn-sm' @click='disagree'> <i class="fa fa-remove" aria-hidden="true"></i> Disagree</button></li>
        </ul>
      <hr>
    </header>
    <section id='basic_detail' class='fl w100 p10-20'>
        <h4 class='fl w100 p5-10'>Basic Details</h4>
        <ul class='fl w40 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            
        </ul>
        <ul class='fl w40 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
        </ul>
    </section>
    <section id='room_details' class='fl w100 p10-20'>
        <h4 class='fl w100 p5-10'>Room Details</h4>
        <ul class='fl w40 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            
        </ul>
        <ul class='fl w40 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
        </ul>
    </section>
    <section id='amenities' class='fl w100 p10-20'>
        <h4 class='fl w100 p5-10'>Amenities</h4>
        <ul class='fl w40 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            
        </ul>
        <ul class='fl w40 p5-10'>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
            </li>
            <li class='fl w100 p10-20'>
                <div class='fl w30 center b6'>Hotel Name</div>
                <div class='fl w30 center'>turyaa</div>
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
         listData : []   
        }
    },

    created(){
        const self = this; 
        const t = self.$route.params;
        (api.forProd) ?
                        $.post(api.getQuotesReview,{'rfpId' : t.rid,'hotelId' : t.hid }).done(function(data){
                            console.log(data)
                        }) :
                        axios(api.getQuotesReview).then(function(data){
                            console.log(data.data);
                        });
    },
    
    methods: {
        agree: function(){
            const self =this;
            const t = self.$route.params;
            if(confirm('Are you sure to accept this Proposal?')){
                $.post(api.acceptRfp,{rfpId: t.rid,hotelId:t.hid}).done(function(data){
                //do smthn
                
                $('#accept').removeClass('btn-primary').addClass('btn-success').attr('disabled','disabled').html('Accepted');
                $('#decline').removeClass('dbi').addClass('dbNo');
            });
            }
            
        },

        disagree: function(){
            const self =this;
            const t = self.$route.params;
            if(confirm('Are you sure to decline this Proposal?')){
                $.post(api.declineQuote,{rfpId: t.rid,hotelId:t.hid}).done(function(data){
                    console.log(data);
                $('#decline').attr('disabled','disabled').html('Declined');
                $('#accept').removeClass('dbi').addClass('dbNo');
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