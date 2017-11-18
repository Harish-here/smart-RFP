<template>
<div id='RfpList'>
    <header class='fl w100 p10-20'>
      <div class='di f22 b6 p10-20'>RFP - Published</div>
      <hr>
    </header>
    <section id='proposal_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>RFP Name</th> <th>Cities</th> <th>Status</th> <th>Rooms / Year</th> <th class='center'>No of Hotels</th> <th class='center'>No of Quotes</th> <th class='center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='i in listData.rfp' :key='i.rfpId'>
            <td class='w20'>{{i.rfp}}</td>
            <td class='w25'><span v-for='j in i.location'>{{j.label}}</span></td>
            <td class='green b6 w10'>{{i.connected}}</td>
            <td class='center w10'>56</td>
            <td class='center w10'> <span class='badge badge-primary'>{{i.noOfHotels}} </span></td>
            <td class='center w10'> <span class='badge badge-primary'>{{i.noOfQuotes}}</span> </td>
            <td class='center w15'>
            <button @click='go({name:"RfpQuoteList",params:{foo:"rfp",id:i.rfpId}})' class='btn btn-info btn-xs'>View Details</button>
            
            <button  v-if='i.connected !== "connected"' @click='trash(i.rfpId)' class='btn btn-danger btn-xs' title='move this quote to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
            </td>
            </tr>
            <tr><!-- dummy -->
              <td class='w20'>infoNix weblabs</td>
              <td class='w25'>Bussiness</td>
              <td class='orange b6'>Pending</td>
              <td class='center w10'>22</td>
              <td class='center w10'><span class='badge badge-primary'>10</span></td>
              <td class='center w10'><span class='badge badge-primary'>18</span></td>
              <td class='center w15'>
              <button class='btn btn-info btn-xs'>View Details</button>
              <button  class='btn btn-danger btn-xs' title='move this quote to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
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
            listData : []
        }
    },
    created(){
      const self =this;
      axios(api.getPublished).then(function(data){
        console.log(data.data)
        self.listData = data.data;
      });
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