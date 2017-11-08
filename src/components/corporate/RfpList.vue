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
            <tr v-for='i in listData.rfp'>
            <td>{{i.rfp}}</td>
            <td><span v-for='j in i.location'>{{j.label}}</span></td>
            <td class='green b6'>Approved</td>
            <td>56</td>
            <td>{{i.noOfHotels}}</td>
            <td>{{i.noOfQuotes}}</td>
            <td><router-link :to='"./quotelist/"+i.rfpId'><button class='btn btn-default btn-xs'>View Details</button></router-link></td>
            </tr>
            <tr><!-- dummy -->
              <td>infoNix weblabs</td>
              <td>Bussiness</td>
              <td class='orange b6'>Pending</td>
              <td>22</td>
              <td>10</td>
              <td>18</td>
              <td><button class='btn btn-default btn-xs'>View Details</button></td>
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
        self.listData = data.data;
      });
    },
    methods: {

    }
}

</script>

<style>


</style>