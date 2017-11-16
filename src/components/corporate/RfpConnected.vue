<template>
  <div id="Rfp_Connected">
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Connected Hotels</div>
      <hr>
    </header>
    <section id='List_space' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>Hotel Name</th> <th>RFP Name</th><th>Locations</th> <th>Rooms / Month</th> <th>Rooms / year</th> <th>Travel / Month</th> <th>Travel / year</th> <th>Status</th>
            </tr>
          </thead>
          <tbody  v-if='listData.length !== 0'>
            <tr
             v-for='i in listData'>
            <td>{{i.hotel.label}}</td>
            <td>{{i.rfp.label}}</td>
            <td>{{ i.location.map((x)=> x.label).join(',')}}</td>
            <td>{{i.roomsMonth}}</td>
            <td>{{i.roomsYear}}</td>
            <td>{{i.travelPerMonth}}</td>
            <td>{{i.travelPerYear}}</td>
            <td class='green b6'>Approved</td>    
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
            
        })
    },

    methods: {

    }
}
</script>

<style>
</style>