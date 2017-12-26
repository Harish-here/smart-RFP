<template>
<div id='proposal' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>Proposals</div>
      <ul class='fr p5-10 dbNo'>
        <li class='di p5-10 f16'><i class="fa fa-pencil" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-trash" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-ellipsis-v" aria-hidden="true"></i></li>
      </ul>
      <hr>
    </header>
    <section id='proposal_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th class='w15'>Company </th>
             <th class='w15'>RFP </th> 
             <th class='w15'>Location</th> 
             <th class='w10 center'>Rooms / Year</th> <!-- <th>Travels / month</th> <th>Travels / year</th> -->  
             <th class='w15 center'>RFP status</th>
             <th class='w15 center'>Quote status</th> 
             <th class='w15'>Actions</th>
            </tr>
          </thead>
          <tbody v-if='listData === null'>
            <tr>
              <td colspan='6' class='center gray'>Getting your proposals...</td>
            </tr>
          </tbody>
          <tbody v-if='listData !== null && listData.hasOwnProperty("comp")'>
            <tr v-if='listData.comp.length > 0'
                v-for='i in listData.comp'
                :key='i.rfp.value'
                :class='{opa: (i.status === "declined") ? true : false}'>
                <td class='w15'>{{i.company.label}}</td>
                <td class='w15'>{{i.rfp.label}}</td>
                <td class='w15'>{{i.location.map(x => x.label).join(', ')}}</td>
                <td class='w10 center'>{{i.roomsYear}}</td>
              <!--  <td class='w15'>{{i.travelPerMonth}}</td>
                <td class='w10'>{{i.travelPerYear}}</td> -->
                <td class='b6 w10 center' :class='{"red":i.rfpStatus == "closed" || i.rfpStatus == "cancelled","green":i.rfpStatus != "closed" && i.rfpStatus != "cancelled"}' >{{i.rfpStatus}}</td>
                <td class='b6 w10 center' :class='{"red":i.status == "declined" || i.status == "rejected","green":i.status != "declined" && i.status != "rejected"}' >{{i.status}}</td>
                <td class='w10'>
                  <button v-if='i.status !== "declined" && i.status !=="quoted"' class='btn btn-info btn-xs' @click='move(i.rfp.value)' key='give quote'>Give Quote</button>
                  <button class='btn btn-default btn-xs' key='cant give quote' @click='move(i.rfp.value)' v-else>View Details</button>
                </td>
            </tr>
            <tr v-if='listData.comp.length === 0'>
              <td colspan='6'>No proposal received yet</td>
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
    name: 'proposal',
    data(){
        return {
            listData : null
        }
    },
    created(){
      const self = this;
      self.$store.commit('showProgress');
        axios(api.getProposal).then(function(data){//getting the list
          self.listData = data.data;  
          $('nav#hotel div').removeClass('act');
        $('nav#hotel div:nth-child(1)').addClass('act');
        });
        
      
    },
    methods: {
      move: function(id){
        const self = this;
        this.$router.push({path:"/"+self.$store.state.path+"/hotel/review/"+id+"/not"});
      }
    }
}

</script>

<style>


</style>