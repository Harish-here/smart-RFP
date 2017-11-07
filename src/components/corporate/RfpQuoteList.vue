<template>
 <div id="Rfp_Quote_List">
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>{{listData.rfpName}}</div> <div class='f18 b6 dib'> - Quotes Received</div>
      <hr>
    </header>
    <section id='quote_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>Hotel Name</th> <th>Place</th> <th>Status</th> <th class='center'>Rooms / Year</th> <th class='center'>Min Price</th> <th class='center'>Max Price</th> <th class='center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='i in listData.hotels' :key='i.hotelId'>
            <td>{{i.hotel}}</td>
            <td>{{i.location}}</td>
            <td class='green b6'>Approved</td>
            <td class='center'>{{i.roomPerMonth}}</td>
            <td class='center'>{{i.minPrice}}</td>
            <td class='center'>{{i.maxPrice}}</td>
            <td class='center'>
              <button class='btn btn-default btn-xs' title='Shorlist this quote'>Shorlist it</button> 
              <button class='btn btn-info btn-xs'>View Details</button> 
              <button class='btn btn-default btn-xs' title='move this quote to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
            </td>
            </tr>
            <tr><!-- dummy -->
              <td>infoNix weblabs</td>
              <td>Bussiness</td>
              <td class='orange b6'>Pending</td>
              <td class='center'>22</td>
              <td class='center'>10</td>
              <td class='center'>18</td>
              <td class='center'>
                <button class='btn btn-default btn-xs'>Shorlist it</button> 
                <button class='btn btn-info btn-xs'>View Details</button>
                <button class='btn btn-default btn-xs' title='move this quote to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
    </section>
 </div>
</template>

<script>
import axios from 'axios'
import api from '@/api/api'
export default {
    name: 'RfpQuoteList',
    data(){
        return{
            listData: []
        }
    },
    created(){
        const self =this;
      axios(api.getQuotes).then(function(data){
        self.listData = data.data ;
        console.log(data.data)
      });
    },
    methods: {

    }
}
</script>

<style>
</style>