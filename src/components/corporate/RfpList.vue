<template>
<div id='RfpList' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='di roboto b3'>RFP - Published</div> 
      <hr>
    </header>
    <section id='proposal_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th class='w15'>RFP Name</th> 
             <th class='w20'>Cities</th> 
             <th class='w10'>Status</th> 
             <th class='w10'>Rooms / Year</th> 
             <th class='center w10'>No of Hotels</th> 
             <th class='center'>No of Quotes</th> 
             <th class='w20'>Actions</th>
            </tr>
          </thead>
          <tbody v-if='listData.hasOwnProperty("rfp")'>
            <tr v-for='i in listData.rfp' :key='i.rfpId' :class='{"bg-acc":i.connected === "connected"}'>
              <td class='w20'>{{i.rfp}}</td>
              <td class='w20'>{{i.location.map(x => x.label).join(', ')}}</td>
              <td class='b6 w10' :class='{"orange":i.connected === "pending","green":i.connected === "connected"}'>{{i.connected}}</td>
              <td class='center w10'>{{i.roomsYear}}</td>
              <td class='center w10'> <span class='badge badge-primary'>{{i.noOfHotels}} </span></td>
              <td class='center w10'> <span class='badge badge-primary'>{{i.noOfQuotes}}</span> </td>
              <td class='w20'>
                <button @click='go({path:"/"+$store.state.path+"/corprate/quotelist/"+i.rfpId})' class='btn btn-info btn-xs'>View Details</button>
                
                <button  v-if='i.connected !== "connected"' @click='trash(i.rfpId)' class='btn btn-default btn-xs' title='move this RFP to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
              </td>
            </tr>
          </tbody>
          <tbody v-if='!listData.hasOwnProperty("rfp")'>
            <tr>
              <td colspan='7' class='center gray'>Getting your Published RFPs...</td>
            </tr>
          </tbody>
          <tbody v-if='listData.hasOwnProperty("rfp") && listData.rfp.length === 0'>
            <tr>
              <td colspan='7' class='center gray'>No Published RFP's</td>
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
    name: 'RfpList',
    data(){
        return {
            listData : [],
            path:null,
            time:new Date()
        }
    },
    created(){
      const self =this;
      self.$store.commit('showProgress');
      self.time = Math.round(self.time.getTime()/1000);
      axios(api.getPublished).then(function(data){
        self.listData = data.data;
      });

      $('nav#corporate div').removeClass('act');
      $('nav#corporate div:nth-child(1)').addClass('act');
     self.path = self.$route.params.foo;
    },
    methods: {
      trash: function(id){
        const self = this;
        if(confirm('Are you sure to Trash this RFP?')){
          $.post(api.trashRFP,{rfpId:id}).done(function(data){
            axios(api.getPublished).then(function(data){ 
              self.listData = data.data;
              self.$store.commit('showAlert',"RFP moved to Trash..!");
            });
          });
        }
      },
      go: function(obj){
        this.$router.push(obj);
      }
    }
}

</script>

<style>


</style>