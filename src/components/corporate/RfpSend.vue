<template>
<div id='send'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>RFP - Send</div>
      
      <hr>
    </header>
    <ul id='tab_head' class='fl w100 p5-10 b6 f18 center'>
      <li id='tab1' @click='switchTab("hotel_overall","tab1")' class='fl p10-20 tb tb--active'>Overall Hotel ({{ listData.length }})</li>
      <li id='tab2' @click='switchTab("hotel_included","tab2")' class='fl p10-20 tb'>Included Hotel ({{ listDataInc.length }})</li>
      <li class='fr w15 p5-10'>
            <button class='btn btn-primary' @click='publishRfp'><i class="fa fa-paper-plane" aria-hidden="true"></i> Publish RFP</button>
        </li>
    </ul>
    
    <section  id='hotel_overall' class='fl w100 p5-10'>
        <div v-show='false' id='action_area' class='fl w100 p5-10'>
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
             <th>Hotel Name</th> <th class='center'>Star</th><th class='center'>Location</th> <th class='center' >City</th> <th class='center'>Distance from City</th> <th class='center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='i in listData' :key='i.hotelId'>
            
            <td class='w30'>{{i.hotelName}}</td>
            <td class='w10 center'>{{i.star}}</td>
            <td class='w15 center'>sample</td>
            <td class='w10 center'>{{i.city}}</td>
            <td class='w15 center'>{{i.distanceFromCity}}</td>
            <td class='w10 center'><button :id='"btn-"+i.hotelId' class='btn btn-default btn-xs' @click='addHotel(i)'>Include</button></td>
            </tr>
          </tbody>
        </table>
    </section>
    <section id='hotel_included' class='fl w100 p5-10 dbNo'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>Hotel Name</th> <th class='center'>Star</th><th class='center'>Location</th> <th class='center'>City</th> <th class='center'>Distance From City</th><th class='center'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-if='listDataInc.length > 0' v-for='i in listDataInc' :key='i.hotelId'>
                <td class='w25'>{{i.hotelName}}</td>
                <td class='w10 center'>{{i.star}}</td>
                <td class='w20 center'>{{i.locality}}</td>
                <td class='w15 center'>{{i.city}}</td>
                <td class='w20 center'>{{i.distanceFromCity}}</td>
                <td class='w10 center'><button class='btn btn-primary btn-xs' @click='addHotel(i)'>Remove</button></td>
            </tr>
            <tr key='No data' v-else>
               <td> No Hotel Include</td>
            </tr>
          </tbody>
        </table>
    </section>


</div>
</template>

<script>
import axios from 'axios'
import api from '@/api/api'
import _ from 'lodash'
export default {
    name: 'RfpSend',
    data(){
        return {
            listData : [],
            listDataInc : []
        }
    },
    created(){
        const self =this;
        if(api.forProd){
        
        this.listData = this.$store.state.hotel.list;
        }else{
            axios('https://api.myjson.com/bins/lghmf').then(function(data){
                self.listData = data.data
            });
        }
    },

    computed :{
        hotelIds(){
            return this.listDataInc.map(function(x){
                return x.hotelId.toString()
            });
        }
    },

    methods: {
        switchTab: (id,obj) => {
            $('ul#tab_head li').removeClass('tb--active');
            $('li#'+obj).addClass('tb--active');
            $('section').addClass('dbNo');
            $('section#'+id).removeClass('dbNo');
        },
        addHotel: function(obj){
            const self =this; 
            if(self.listDataInc.length > 0){
                
               var arr = self.listDataInc.findIndex(function(x){
                       return x.hotelId == obj.hotelId
                   });;
                   console.log(arr)
               if(arr > -1){
                   console.log(self.listDataInc.splice(arr,1));
                   var t = $('#btn-'+obj.hotelId);
                   t.removeClass('btn-primary');
                   t.addClass('btn-default');
                   t.html('Include');
               }else{
                   self.listDataInc.push(obj);
                   $('#btn-'+obj.hotelId).removeClass('btn-default').addClass('btn-primary').html('Remove');
               } 
            }else{
              self.listDataInc.push(obj);  
              $('#btn-'+obj.hotelId).removeClass('btn-default').addClass('btn-primary').html('Remove');
            }
        },
        publishRfp: function(){
            const self = this;
            if(self.hotelIds.length > 0){
                if(confirm('RFP will be sent to selected Hotel')){
                self.$store.commit('sendRfp',self.hotelIds);
                self.$router.push('./');
              }
            }else{
                alert('You need to select atleast one hotel to send')
            }
            
            
        }
    }
}

</script>

<style>


</style>