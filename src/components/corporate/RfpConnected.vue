<template>
  <div id="Rfp_Connected" class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP - contracted</div>
      <hr>
    </header>
    <section id='List_space' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th class='w20'>Hotel Name</th> 
             <th class='w20'>RFP Name</th>
             <th class='w20'>Locations</th> 
             <th class='w15 center'>Rooms / Year</th> 
             <th class='w15 center'>Status</th> 
             <th class='w15 center'>Actions</th>
            </tr>
          </thead>
          <tbody v-if='listData === null'>
            <tr>
              <td colspan='6' class='center gray'>Getting your Connected Hotels...</td>
            </tr>
          </tbody>
          <tbody  v-if='listData !== null && listData.length > 0'>
            <tr
             v-for='i in listData'>
            <td>{{i.hotel.label}}</td>
            <td>{{i.rfp.label}}</td>
            <td>{{ i.location.map((x)=> x.label).join(',')}}</td>
            <td class='center'>{{i.roomsYear}}</td>
            <td class='green b6 center'>Connected</td>
            <td class='center'><button @click='back({path:"/"+$store.state.path+"/corprate/quotereview/"+i.rfp.value+"/"+i.hotel.value+"/c"})' class='btn btn-info btn-xs'>View Details</button></td>    
            </tr>
          </tbody>
          <tbody v-if='listData !== null && listData.length === 0'>
            <tr>
              <td colspan='6' class='center gray'>No Connected Hotel</td>
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
    name: 'RfpConnected',
    data(){
        return{
            listData:null
        }
    },

    created(){
        const self = this;
        self.$store.commit('showProgress');
        axios(api.getConnected).then(function(data){
            self.listData = data.data;
            
        })
    },

    methods: {
         back: function(obj){
            this.$router.push(obj);
        },
    }
}
</script>

<style>
</style>