<template>
 <div id="Rfp_Quote_List">
    <header class='fl w100 p10-20'>
    <button @click='back({name:"RfpList"})' class='btn btn-default btn-sm'><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
      <div class='f22 b6 dib p5-10'>{{(listData.hasOwnProperty('rfpName')) ? listData.rfpName : "RFP Name"}}</div> <div class='f18 b6 dib'> - Quotes Received</div>
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
            <td class='green b6'>{{i.status}}</td>
            <td class='center'>{{i.roomPerMonth}}</td>
            <td class='center'>{{i.minPrice}}</td>
            <td class='center'>{{i.maxPrice}}</td>
            <td class='center'>
              <button v-show='i.shortlist !=="1"' @click='shortlist(i.hotelId)' class='btn btn-default btn-xs' title='Shorlist this quote'>Shorlist it</button> 
              <button v-show='i.shortlist !=="0"' @click='notShortlist(i.hotelId)' class='btn btn-success btn-xs' title='Unshorlist this quote'>shortlisted</button>
              <button @click='go({name:"RfpQuoteReview",params:{rid:listData.rfpId,hid:i.hotelId}})' class='btn btn-info btn-xs'>View Details</button>
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
                <button class='btn btn-default btn-xs' >Shorlist it</button> 
                <button class='btn btn-info btn-xs'>View Details</button>
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
       (api.forProd) ?
          $.post(api.getQuotes,{'rfpId':self.$route.params.id}).done(function(data){
            self.listData = JSON.parse(data);
          }) : 
          axios(api.getQuotes).then(function(data){
            self.listData = data.data ;  
          }) ;
    },

    methods: {
      go: function(obj){

        this.$router.push(obj)
      },

      refresh: function(){
        (api.forProd) ?
          $.post(api.getQuotes,{'rfpId':self.$route.params.id}).done(function(data){
            self.listData = JSON.parse(data);
            
          }) : 
          axios(api.getQuotes).then(function(data){
            self.listData = data.data ; 
            console.log('-------') 
          }) ;
      },
      shortlist: function(obj){
        const self = this;
        $.post(api.shortlistQuote,{rfpId:self.$route.params.id,travelAgencyMasterId:'',hotels:[obj]}).done(function(data){
          console.log(data);
          self.refresh();
        });
      },
      notShortlist: function(obj){
        const self = this;
        $.post(api.shortlistQuote,{rfpId:self.$route.params.id,hotels:obj}).done(function(data){
          console.log(data);
          self.refresh();
        });
      },
      back: function(obj){
            this.$router.push(obj);
        }
    }
}
</script>

<style>
</style>