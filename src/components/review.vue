<template>
<div id='preview'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Preview</div>
      <ul class='fr p5-10'>
        <li class='di p5-10 f12'><button class='btn btn-default btn-xs'> <i class="fa fa-file-text-o" aria-hidden="true"></i> Default Cover Letter</button></li>
        <li class='di p5-10 f12'><button class='btn btn-default btn-xs'> <i class="fa fa-download" aria-hidden="true"></i> Download PDF</button></li>
        <li class='di p5-10 f16'><button class='btn btn-default btn-sm'>Accept</button></li>
        <li class='di p5-10 f16'><button class='btn btn-default btn-sm'>Decline</button></li>
      </ul>
      <hr>
    </header>
    <section id='preview_space' class='fl w100 p5-10'>
      <div id='question_set' class='p5-10'>
        <h4 class='fl w70 b6'>Default cover Letter +</h4>
        <!--<ul class='fl w70'>
            <li>
                <div class='fl w50'>Whta is </div>
                <div class='fl w50'>infoNix weblabs</div>
            </li>
        </ul> -->
      </div>
      <div id='question_set' class='p5-10'>
        <h4 class='fl w70 b6'>Property Basic -</h4>
        <ul class='fl w70'>
            <li class='fl w100 p5-10'>
                <div class='fl w70 pl-25'>Internal Hotel Reference Code</div>
                <div class='fl w30'>infoNix weblabs</div>
            </li>
            <li class='fl w100 p5-10'>
                <div class='fl w70 pl-25'>Internal Hotel Reference Code</div>
                <div class='fl w30'>infoNix weblabs</div>
            </li>
            <li class='fl w100 p5-10'>
                <div class='fl w70 pl-25'>Internal Hotel Reference Code</div>
                <div class='fl w30'>infoNix weblabs</div>
            </li>
            <li class='fl w100 p5-10'>
                <div class='fl w70 pl-25'>Internal Hotel Reference Code</div>
                <div class='fl w30'>infoNix weblabs</div>
            </li>
        </ul>
      </div>
      <div id='question_set' class='p5-10'>
        <h4 class='fl w70 b6'>Property Location -</h4>
        <ul class='fl w70'>
            <li class='fl w100 p5-10'>
                <div class='fl w70 pl-25'>Internal Hotel Reference Code</div>
                <div class='fl w30'>infoNix weblabs</div>
            </li>
            <li class='fl w100 p5-10'>
                <div class='fl w70 pl-25'>Internal Hotel Reference Code</div>
                <div class='fl w30'>infoNix weblabs</div>
            </li>
            <li class='fl w100 p5-10'>
                <div class='fl w70 pl-25'>Internal Hotel Reference Code</div>
                <div class='fl w30'>infoNix weblabs</div>
            </li>
            <li class='fl w100 p5-10'>
                <div class='fl w70 pl-25'>Internal Hotel Reference Code</div>
                <div class='fl w30'>infoNix weblabs</div>
            </li>
        </ul>
      </div>
      <div id='question_set' class='p5-10'>
        <h4 class='fl w70 b6'>Security & safety +</h4>
        <!--<ul class='fl w70'>
            <li>
                <div class='fl w50'>Whta is </div>
                <div class='fl w50'>infoNix weblabs</div>
            </li>
        </ul> -->
      </div>
        
    </section>


</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'review',
    data(){
        return {
            listData : []
        }
    },
    created(){

    },
    methods: {

    }
}

</script>

<style>


</style>