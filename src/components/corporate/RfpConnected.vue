<template>
  <div id="Rfp_Connected" class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Connected Hotels</div>
      <hr>
    </header>
    <section id='List_space' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>Hotel Name</th> <th>RFP Name</th><th>Locations</th> <th>Rooms / Year</th> <th>Status</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody  v-if='listData.length !== 0'>
            <tr
             v-for='i in listData'>
            <td>{{i.hotel.label}}</td>
            <td>{{i.rfp.label}}</td>
            <td>{{ i.location.map((x)=> x.label).join(',')}}</td>
            <td>{{i.roomsYear}}</td>
            <td class='green b6'>Approved</td>
            <td><button @click='back({path:"/"+$store.state.path+"/corprate/quotereview/"+i.rfp.value+"/"+i.hotel.value+"/c"})' class='btn btn-info btn-xs'>View Details</button></td>    
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
            listData:[]
        }
    },

    created(){
        const self = this;
        axios(api.getConnected).then(function(data){
            self.listData = data.data;
            console.log(self.listData)
            
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