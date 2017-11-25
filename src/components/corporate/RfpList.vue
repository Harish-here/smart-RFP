<template>
<div id='RfpList' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='di f22 b6 p10-20'>RFP - Published</div>
      <hr>
    </header>
    <section id='proposal_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>RFP Name</th> <th>Cities</th> <th>Status</th> <th>Rooms / Year</th> <th class='center'>No of Hotels</th> <th class='center'>No of Quotes</th> <th class=''>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='i in listData.rfp' :key='i.rfpId'>
            <td class='w15'>{{i.rfp}}</td>
            <td class='w20'>{{i.location.map(x => x.label).join(', ')}}</td>
            <td class='green b6 w10'>{{i.connected}}</td>
            <td class='center w10'>{{i.roomsYear}}</td>
            <td class='center w10'> <span class='badge badge-primary'>{{i.noOfHotels}} </span></td>
            <td class='center w10'> <span class='badge badge-primary'>{{i.noOfQuotes}}</span> </td>
            <td class='w20'>
            <button @click='go({path:"/"+$store.state.path+"/corprate/quotelist/"+i.rfpId})' class='btn btn-info btn-xs'>View Details</button>
            
            <button  v-if='i.connected !== "connected"' @click='trash(i.rfpId)' class='btn btn-default btn-xs' title='move this quote to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
            </td>
            </tr>
            <tr><!-- dummy -->
              <td class='w20'>infoNix weblabs</td>
              <td class='w25'>Bussiness</td>
              <td class='orange b6'>Pending</td>
              <td class='center w10'>22</td>
              <td class='center w10'><span class='badge badge-primary'>10</span></td>
              <td class='center w10'><span class='badge badge-primary'>18</span></td>
              <td class='w20'>
              <button class='btn btn-info btn-xs'>View Details</button>
              <button  class='btn btn-default btn-xs' title='move this quote to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
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
    name: 'RfpList',
    data(){
        return {
            listData : [],
            path:null
        }
    },
    created(){
      const self =this;
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