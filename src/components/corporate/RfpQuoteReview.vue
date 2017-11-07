<template>
 <div id="Rfp_Quote_Review">
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>--rfp name --  - hotel name --</div> <span class='dib btn btn-info btn-xs'> View profile</span>
      <ul class='fr p5-10'>
        <li class='di p5-10 f16'><button class='btn btn-primary btn-sm'> <i class="fa fa-check" aria-hidden="true"></i> Agree</button></li>
        <li class='di p5-10 f16'><button class='btn btn-danger btn-sm'> <i class="fa fa-remove" aria-hidden="true"></i> Disagree</button></li>
        </ul>
      <hr>
    </header>
    <section id='basic_detail fl w100 p10-20'>
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
    <section id='room_details p10-20'>
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
    <section id='amenities p10-20'>
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
export default {
    name: 'RfpQuoteReview',
    data(){
        return{
            
        }
    },

    created(){
        console.log(api);
    },
    
    methods: {

    }
}
</script>

<style>
</style>