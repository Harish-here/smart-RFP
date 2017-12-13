<template>
<div id='send' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP - Send</div>
      <hr>
    </header>
    <ul id='tab_head' class='fl w100 p5-10 b6 f18 center'>
      <li id='tab1' @click='switchTab("hotel_overall","tab1")' class='fl p10-20 tb tb--active'>Overall Hotels ({{ numOfhotels }})</li>
      <li id='tab2' @click='switchTab("hotel_included","tab2")' class='fl p10-20 tb'>Included Hotels ({{ listDataInc.length }})</li>
      <li class='fr w15 p5-10'>
            <button class='btn btn-primary' @click='publishRfp'><i class="fa fa-paper-plane" aria-hidden="true"></i> Publish RFP</button>
        </li>
    </ul>
    <div id='hotel_area'>
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
                <th>Hotel Name</th> <th class='center'>Star</th><th class='center'>Locality</th> <th class='center'>Distance from City (KM)</th> <th class='center'>Actions</th>
                </tr>
            </thead>
            <tbody v-if='listData.length !== undefined && listData.length > 0'
                    v-for='j in listData'>
                <tr>
                    <td colspan='6' class='f16 b6 center bg-gray'>{{j.city}}</td>
                </tr>
                <tr  v-for='i in j.hotels' 
                    :key='i.hotelId'>
                    <td class='w30'>{{i.hotelName}} 
                        <span v-if='i.status === "Favourite"' title='Favorite Hotel'><i class="fa fa-heart red" aria-hidden="true"></i></span>
                        <span v-else-if='i.status === "Not Connected"' title='Connected Hotel'><i class="fa fa-link blue" aria-hidden="true"></i></span>
                    </td>
                    <td class='w10 center'>{{i.star}}</td>
                    <td class='w15 center'>{{i.locality}}</td>
                    <td class='w20 center'>{{i.distanceFromCity}}</td>
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
                
            </tbody>
            </table>
        </section>
    </div>


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
        self.listData = this.$store.state.hotel.list;
        }else{
            axios('https://api.myjson.com/bins/11c8c7').then(function(data){
                self.listData = data.data
            });
        }
    },

    computed :{
        hotelIds(){
            return this.listDataInc.map(function(x){
                return x.hotelId.toString()
            });
        },
        numOfhotels(){
            const self = this;
            if(self.listData.length > 0){
               return self.listData.map(function(x){
                  return  x.hotels.length
                }).reduce((c,d) => c+d) 
                // .reduce(function(tot,num){
                //     return tot + num
                // });
            }else{
                return 0 ;
            }
        }
    },

    methods: {
        switchTab: (id,obj) => {
            $('ul#tab_head li').removeClass('tb--active');
            $('li#'+obj).addClass('tb--active');
            if(id === "hotel_overall"){
             $('#hotel_area section#hotel_included').addClass('dbNo');
            $('#hotel_area  section#'+id).removeClass('dbNo');
            }else{
            $('#hotel_area  section#hotel_overall').addClass('dbNo');
            $('#hotel_area  section#'+id).removeClass('dbNo');
            }
            
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
                        self.$store.commit('showProgress')
                        self.$store.commit('sendRfp',self.hotelIds);
                        self.$store.commit('showAlert','RFP successfully sent to Hotels..!')
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