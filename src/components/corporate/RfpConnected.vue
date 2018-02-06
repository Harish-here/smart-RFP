<template>
  <div id="Rfp_Connected" class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP - contracted</div>
      <!-- <span class='badge badge-primary' v-if='filter.hasOwnProperty("label")'><b>{{filter.label}}</b> <span @click='filter = {};filterChildren="";' class='p2-4 cursor f14'>x</span></span>
          <select v-if='listGroup.length !== 0' v-model='filterChildren' class='br-none' style='font-size:11px;width:100px;'>
            <option value=''>All</option>
            <option v-for='i in listGroup' :value='i' :key='i'>{{i}}</option>
            
          </select> -->
          <span class='fr p2-4'>
            <button class='btn btn-default btn-sm' @click='refreshList'><i class='fa fa-refresh'></i></button>
          </span>
         <!-- <div class='btn-group fr center p2-4'>
              <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style='width:150px'>
                {{ (filter.hasOwnProperty("label")) ? filter.label : "Group By" }} <span class="caret"></span>
              </button>
              <ul class='dropdown-menu' style='min-width:140px;'>
                <li v-for='i in groupingList' @click='filter = i;filterChildren="";' :key='i.prop'><a href='#'>{{i.label}}</a></li>
                
              </ul>
          </div>  -->
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
          <tbody  v-if='listData !== null && listData.length > 0  '>
            <tr
             v-for='i in listData' :key='i.rfp.value'>
              <td>{{i.hotel.label}}</td>
              <td>{{i.rfp.label}}</td>
              <td>{{ i.location.map((x)=> x.label).join(',')}}</td>
              <td class='center'>{{i.roomsYear}}</td>
              <td class='green b6 center'>Connected</td>
              <td class='center'><button @click='back({path:"/"+$store.state.path+"/corprate/quotereview/"+i.rfp.value+"/"+i.hotel.value+"/c"})' class='btn btn-ghost btn-xs'>View Details</button></td>    
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
            listData:null,
            filter: {
              label: 'Rooms / Year',
              prop:'roomsYear',
            },
            filterChildren:'',
            groupingList:[
              {prop:'roomsYear',label:'Rooms / Year'},
            ]
        }
    },

    created(){
        const self = this;
        self.$store.commit('showProgress');
        axios(api.getConnected).then(function(data){
            self.listData = data.data;
            
        });
    },

    methods: {
         back: function(obj){
            this.$router.push(obj);
        },
        refreshList: function(){
            axios(api.getConnected).then(function(data){
              self.listData = data.data;
              
          });
        }
    }
}
</script>

<style>
</style>