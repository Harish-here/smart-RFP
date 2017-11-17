<template>
<div id='RfpList'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>RFP - Published</div>
      <hr>
    </header>
    <section id='proposal_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>RFP Name</th> <th>Place</th> <th>Status</th> <th>Rooms / Year</th> <th>No of Hotels</th> <th>No of Quotes</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='i in listData.rfp' :key='i.rfpId'>
            <td>{{i.rfp}}</td>
            <td><span v-for='j in i.location'>{{j.label}}</span></td>
            <td class='green b6'>{{i.connected}}</td>
            <td>56</td>
            <td>{{i.noOfHotels}}</td>
            <td>{{i.noOfQuotes}}</td>
            <td>
            <router-link :to='"./corprate/quotelist/"+i.rfpId'><button class='btn btn-default btn-xs'>View Details</button>
            </router-link>
            <button @click='trash(i.rfpId)' class='btn btn-default btn-xs' title='move this quote to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
            </td>
            </tr>
            <tr><!-- dummy -->
              <td>infoNix weblabs</td>
              <td>Bussiness</td>
              <td class='orange b6'>Pending</td>
              <td>22</td>
              <td>10</td>
              <td>18</td>
              <td><button class='btn btn-default btn-xs'>View Details</button>
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
      }
    }
}

</script>

<style>


</style>