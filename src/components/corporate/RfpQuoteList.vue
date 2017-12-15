<template>
 <div id="Rfp_Quote_List" class='p10-20'>
    <header class='fl w100 p5-10'>
      <button @click='back({path:"/"+$store.state.path+"/corprate/"})' class='btn btn-default btn-sm'><i class="fa fa-chevron-left" aria-hidden="true"></i> </button>
      <div class='roboto b3 dib'> Quotes Received</div>
      <br>
      <div class='roboto b3 pl-40 di'>{{ (listData.hasOwnProperty('rfpName')) ? listData.rfpName : "RFP Name"}}</div> 
      
      <ul class='fr w60 p5-10'>
        <li class='fr w20'>
          <button @click='back({path:"/"+$store.state.path+"/corprate/questionview/"+$route.params.id})' class='btn btn-info btn-xs'>Preview RFP</button>
        </li>
        <li class='fr w20 p5-10'>
          <span class='gray b5'>Budget</span> - <b>{{(rfpData.hasOwnProperty('basic')) ? '₹'+rfpData.basic[2].ques[0].answer : "₹ -----"  }}</b>
        </li>
        <li class='fr w20 p5-10'>
          <span class='gray b5'>Rooms</span> - <b>{{(rfpData.hasOwnProperty('basic')) ? rfpData.basic[1].ques[2].answer : " -- "  }}</b>
        </li>
        <li class='fr w40 p5-10'>
        <span class='gray b5'> Date</span> - <b>{{(rfpData.hasOwnProperty('basic')) ? rfpData.basic["0"].ques[1].answer : "From Date"  }} - {{(rfpData.hasOwnProperty('basic')) ? rfpData.basic["0"].ques[2].answer : "To Date"  }}</b>
        </li>
      </ul>
      <hr>
    </header>
    <section id='quote_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th class='w25'>Hotel</th> 
             <th class='w15'>Place</th> 
             <th class='w10'>Status</th> 
             <th class='center w10'>Rooms / Year</th> 
             <th class='center w15'> Price (₹)</th> 
             <th class='w20'>Actions</th>
            </tr>
          </thead>
          <tbody v-if='listData.hasOwnProperty("hotels") && listData.hotels.length > 0'>
            <tr v-for='i in listData.hotels' 
                :key='i.hotelId'
                :class='{opa:(i.status === "declined") ? true:false}'>
            <td class='w25'>{{i.hotel}} <span class='badge badge-info f10' v-show='i.shortlist ==="1"'>Shortlisted</span></td>
            <td class='w15'>{{i.location}}</td>
            <td class='b5 w10' :class='{red:(i.status === "declined") ? true : false,green: (i.status !== "declined") ? true : false}'>{{i.status}}</td>
            <td class='center w10'>{{i.roomsYear}}</td>
            <td class='center w15'>{{i.minPrice}} - {{i.maxPrice}}</td>
            <td class=' w20' v-if='i.status !== "declined"'>
              <button @click='go({path:"/"+$store.state.path+"/corprate/quotereview/"+listData.rfpId+"/"+i.hotelId+"/q"})' class='btn btn-info btn-xs'>View Details</button>
              <button v-show='i.shortlist !== "1"' @click='shortlist(i.hotelId)' class='btn btn-default btn-xs' title='Shorlist this quote'>Shorlist it</button> 
              <button v-show='i.shortlist !== "0"' @click='notShortlist(i.hotelId)' class='btn btn-success btn-xs' title='Unshorlist this quote'>Unshortlist</button>
            </td>
            <td class='red b5 w20' v-else>
              <button @click='go({path:"/"+$store.state.path+"/corprate/quotereview/"+listData.rfpId+"/"+i.hotelId+"/q"})' class='btn btn-info btn-xs'>View Details</button>
            </td>
            </tr>
          </tbody>
          <tbody v-if='listData.hasOwnProperty("hotels") && listData.hotels.length === 0'>
            <tr>
              <td colspan='6' class='center gray'>No Quotes Received for {{ (listData.hasOwnProperty('rfpName')) ? listData.rfpName : "this RFP" }}</td>
            </tr>
          </tbody>
          <tbody v-if='!listData.hasOwnProperty("hotels")'>
            <tr>
              <td colspan='6' class='center gray'>Loading the Quotes for {{ (listData.hasOwnProperty('rfpName')) ? listData.rfpName : "this RFP" }} ...</td>
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
            listData: [],
            rfpData : []
        }
    },
    created(){
        const self =this;
        (api.forProd) ?
                $.post(api.getPreview,{'rfpId': self.$route.params.id}).done(function(data){
                    self.rfpData = JSON.parse(data);
                }) :
                axios(api.getPreview).then(function(data){
                    self.rfpData = data.data;
                    
                }) ;
        self.$store.commit('showProgress');
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
        const self = this; 
        self.$store.commit('showProgress'); 
        (api.forProd) ?
          $.post(api.getQuotes,{'rfpId':self.$route.params.id}).done(function(data){
          self.listData = JSON.parse(data);
            
          }) : 
          axios(api.getQuotes).then(function(data){
            self.listData = data.data ; 
            
          }) ;
      },
      shortlist: function(obj){
        const self = this;
        $.post(api.shortlistQuote,{rfpId:self.$route.params.id,travelAgencyMasterId:'',hotels:[obj]}).done(function(data){
          self.refresh();
          self.$store.commit('showAlert','shortlisted');
        });
      },
      notShortlist: function(obj){
        const self = this;
        $.post(api.UnshortlistQuote,{rfpId:self.$route.params.id,hotels:[obj],travelAgencyMasterId:''}).done(function(data){
          self.refresh();
          self.$store.commit('showAlert','Removed from shortlisted');
        });
      },
      back: function(obj){
            this.$router.push(obj);
        },
        
    }
}
</script>

<style>
</style>