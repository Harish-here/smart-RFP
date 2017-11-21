<template>
<div id='proposal'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Proposals</div>
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
             <th>Company Name</th> <th>RFP Name</th> <th>Rooms / year</th> <th>Location</th> <th>Travels / month</th> <th>Travels / year</th>  <th>status</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if=' listData.hasOwnProperty("comp") && listData.comp.length > 0'
                v-for='i in listData.comp'
                key='list Data'>
                <td class='w15'>{{i.company.label}}</td>
                <td class='w15'>{{i.rfp.label}}</td>
                <td class='w10'>{{i.roomsYear}}</td>
                <td class='w15'>{{i.location.map(x => x.label).join(',')}}</td>
                <td class='w15'>{{i.travelPerMonth}}</td>
                <td class='w10'>{{i.travelPerYear}}</td>
                <td class='b6 red w10'>{{i.status}}</td>
                <td class='w10'>
                  <button v-if='i.status !== "declined"' class='btn btn-default btn-xs' @click='move(i.rfp.value)' key='give quote'>Give Quote</button>
                  <button class='btn btn-default btn-xs' key='cant give quote' disabled v-else>Give Quote</button>
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
    name: 'proposal',
    data(){
        return {
            listData : []
        }
    },
    created(){
      const self = this;
      
        axios(api.getProposal).then(function(data){//getting the list
          self.listData = data.data
        });
      
    },
    methods: {
      move: function(id){
        this.$router.push({name:'review',params:{rid: id,foo:'rfp',stat:'not'}});
      }
    }
}

</script>

<style>


</style>