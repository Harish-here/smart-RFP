<template>
 <div id="Rfp_Quote_List" class='p10-20'>
    <header class='fl w100 p5-10'>
      <button @click='back({path:"/"+$store.state.path+"/corprate/"})' class='btn btn-default btn-sm'><i class="fa fa-chevron-left" aria-hidden="true"></i> </button>
      <div class='f22 b6 dib'> Quotes Received</div>
      <br>
      <div class='f18 b6 pl-40 di'>{{ (listData.hasOwnProperty('rfpName')) ? listData.rfpName : "RFP Name"}}</div> 
      
      <ul class='fr p5-10'>
        <li class='fr p5-10'>
          <button @click='back({path:"/"+$store.state.path+"/corprate/questionview/"+$route.params.id})' class='btn btn-info btn-xs'>Preview RFP</button>
        </li>
        <li class='fr p5-10'>
          <span class='gray b6'>Budget</span> - <b>{{(rfpData.hasOwnProperty('basic')) ? '₹'+rfpData.basic[2].ques[0].answer : "₹ -----"  }}</b>
        </li>
        <li class='fr p5-10'>
          <span class='gray b6'>Rooms</span> - <b>{{(rfpData.hasOwnProperty('basic')) ? rfpData.basic[1].ques[2].answer : " Number "  }}</b>
        </li>
        <li class='fr p5-10'>
        <span class='gray b6'> Date</span> - <b>{{(rfpData.hasOwnProperty('basic')) ? rfpData.basic["0"].ques[1].answer : "From Date"  }} - {{(rfpData.hasOwnProperty('basic')) ? rfpData.basic["0"].ques[2].answer : "To Date"  }}</b>
        </li>
      </ul>
      <hr>
    </header>
    <section id='quote_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>Hotel</th> <th>Place</th> <th>Status</th> <th class='center'>Rooms / Year</th> <th class='center'> Price (₹)</th> <th class='center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='i in listData.hotels' 
                :key='i.hotelId'
                :class='{opa:(i.status === "declined") ? true:false}'>
            <td class='w25'>{{i.hotel}} <span class='badge badge-info' v-show='i.shortlist ==="1"'>Shortlisted</span></td>
            <td class='w15'>{{i.location}}</td>
            <td class='b6 w10' :class='{red:(i.status === "declined") ? true : false,green: (i.status !== "declined") ? true : false}'>{{i.status}}</td>
            <td class='center w10'>{{i.roomPerMonth}}</td>
            <td class='center w15'>{{i.minPrice}} - {{i.maxPrice}}</td>
            <td class='center w15' v-if='i.status !== "declined"'>
              <button v-show='i.shortlist !== "1"' @click='shortlist(i.hotelId)' class='btn btn-default btn-xs' title='Shorlist this quote'>Shorlist it</button> 
              <button v-show='i.shortlist !== "0"' @click='notShortlist(i.hotelId)' class='btn btn-success btn-xs' title='Unshorlist this quote'>shortlisted</button>
              <button @click='go({path:"/"+$store.state.path+"/corprate/quotereview/"+listData.rfpId+"/"+i.hotelId+"/q"})' class='btn btn-info btn-xs'>View Details</button>
            </td>
            <td class='center red b6' v-else>
              No Actions
            </td>
            </tr>
            <tr><!-- dummy -->
              <td>infoNix weblabs</td>
              <td>Bussiness</td>
              <td class='orange b6'>Pending</td>
              <td class='center'>22</td>
              <td class='center'>10</td>
              <td class='center opa'>
                <button class='btn btn-default btn-xs' disabled>Shorlist it</button> 
                <button class='btn btn-info btn-xs' disabled>View Details</button>
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
            listData: [],
            rfpData : []
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

          (api.forProd) ?
                $.post(api.getPreview,{'rfpId': self.$store.state.rfp.rfpId}).done(function(data){
                    self.rfpData = JSON.parse(data);
                }) :
                axios(api.getPreview).then(function(data){
                    self.rfpData = data.data;
                    console.log(self.rfpData)
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
        $.post(api.shortlistQuote,{rfpId:self.$route.params.id,hotels:obj}).done(function(data){
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