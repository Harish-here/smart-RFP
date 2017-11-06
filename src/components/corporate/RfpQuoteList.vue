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
             <th>Hotel Name</th> <th>Place</th> <th>Status</th> <th>Rooms / Year</th> <th>Min Price</th> <th>Max Price</th> <th class='center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='i in listData.hotels'>
            <td>{{i.hotel}}</td>
            <td>{{i.location}}</td>
            <td class='green b6'>Approved</td>
            <td>{{i.roomPerMonth}}</td>
            <td>{{i.minPrice}}</td>
            <td>{{i.maxPrice}}</td>
            <td class='center'><button class='btn btn-default btn-xs'>Shorlist it</button> <button class='btn btn-info btn-xs'>View Details</button></td>
            </tr>
            <tr><!-- dummy -->
              <td>infoNix weblabs</td>
              <td>Bussiness</td>
              <td class='orange b6'>Pending</td>
              <td>22</td>
              <td>10</td>
              <td>18</td>
              <td class='center'><button class='btn btn-default btn-xs'>Shorlist it</button> <button class='btn btn-info btn-xs'>View Details</button></td>
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