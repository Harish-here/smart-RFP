<template>
<div id='send'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Proposals</div>
      <ul class='fr p5-10'>
        <li class='di p5-10 f16'><i class="fa fa-pencil" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-trash" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-ellipsis-v" aria-hidden="true"></i></li>
      </ul>
      <hr>
    </header>
    <ul id='tab_head' class='fl w100 p5-10 b6 f18 center'>
      <li id='tab1' @click='switchTab("hotel_overall","tab1")' class='fl p10-20 tb tb--active'>Overall Hotel</li>
      <li id='tab2' @click='switchTab("hotel_included","tab2")' class='fl p10-20 tb'>Included Hotel</li>
    </ul>
    
    <section id='hotel_overall' class='fl w100 p5-10'>
        <div id='action_area' class='fl w100 p5-10'>
            <ul class='fl w100 p5-10 b6 f16'>
                <li class='fl w20 p5-10'>Manual</li>
                <li class='fl w20 p5-10 tb-v--active'>Connected Hotel</li>
                <li class='fl w20 p5-10'>Favourite Hotel</li>
                <li class='fl w20 p5-10'><button class='btn btn-default btn-sm'> ADD ALL </button></li>
            </ul>
            <ul class='fl w100 p5-10'>
                <li class='fl w40 p5-10'> <input class='w100 p5-10' type='text' placeholder='Enter the name of the hotel'></li>
                <li class='fl w25 p5-10'>
                <select class='w100 p5-10'>
                <option value='null'>City</option>
                </select>
                </li>
                <li class='fl w25 p5-10'>
                <select class='w100 p5-10'>
                <option value='null'>State</option>
                </select>
                </li>
                <li class='fl w10 p5-10'> <button class='btn btn-default btn-sm'><i class="fa fa-search" aria-hidden="true"></i> Search </button></li>
            </ul>
        </div>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th><input type='checkbox'></th><th>Hotel Name</th> <th>Star</th> <th>Area</th> <th>Location</th> <th>Proposals Matched</th> <th>Near By</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td><input type='checkbox'></td>
            <td>infoNix weblabs</td>
            <td>Bussiness</td>
            <td>123</td>
            <td>chennai</td>
            <td>123 (143)</td>
            <td>18</td>
            <td><button class='btn btn-default btn-xs'>Give Quote</button></td>
            </tr>
            <tr>
            <td><input type='checkbox'></td>
            <td>infoNix weblabs</td>
            <td>Bussiness</td>
            <td>123</td>
            <td>chennai</td>
            <td>123 (143)</td>
            <td>18</td>
            <td><button class='btn btn-default btn-xs'>Give Quote</button></td>
            </tr>
          </tbody>
        </table>
    </section>
    <section id='hotel_included' class='fl w100 p5-10 dbNo'>
        <div class='fr w15 p5-10'>
            <button class='btn btn-primary'><i class="fa fa-paper-plane" aria-hidden="true"></i> Send</button>
        </div>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>Hotel Name</th> <th>Star</th> <th>Area</th> <th>Location</th> <th>Proposals Matched</th> <th>Near By</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>infoNix weblabs</td>
            <td>Bussiness</td>
            <td>123</td>
            <td>chennai</td>
            <td>123 (143)</td>
            <td>18</td>
            <td><button class='btn btn-default btn-xs'>Give Quote</button></td>
            </tr>
            <tr>
            <td>infoNix weblabs</td>
            <td>Bussiness</td>
            <td>123</td>
            <td>chennai</td>
            <td>123 (143)</td>
            <td>18</td>
            <td><button class='btn btn-default btn-xs'>Give Quote</button></td>
            </tr>
          </tbody>
        </table>
    </section>


</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'send',
    data(){
        return {
            listData : []
        }
    },
    created(){

    },
    methods: {
        switchTab: (id,obj) => {
            $('ul#tab_head li').removeClass('tb--active');
            $('li#'+obj).addClass('tb--active');
            $('section').hide();
            $('section#'+id).show();
        }
    }
}

</script>

<style>


</style>