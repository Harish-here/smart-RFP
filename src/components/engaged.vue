<template>
<div id='engaged'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Engaged Companies</div>
      <ul class='fr p5-10 dbNo'>
        <li class='di p5-10 f16'><i class="fa fa-pencil" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-trash" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-ellipsis-v" aria-hidden="true"></i></li>
      </ul>
      <hr>
    </header>
    <section id='proposal_list' class='fl w100 p5-10'>
        <table class='table w100'>
          <thead class='bg-ddd'>
            <tr>
             <th>Company Name</th> <th>RFP Name</th> <th>Rooms/month</th> <th>Location</th> <th>travels / month</th> <th>Price Slab</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if='listData.hasOwnProperty("comp") && listData.comp.length > 0 '
                v-for='i in listData.comp'>
                <td class='w15'>{{i.company.label}}</td>
                <td class='w15'>{{i.rfp.label}}</td>
                <td class='w10'>{{i.roomsYear}}</td>
                <td class='w15'>{{i.location.map(x => x.label).join(', ')}}</td>
                <td class='w10'>{{i.travelPerMonth}}</td>
                <td class='w10'>{{i.travelPerYear}}</td>
                <td class='w15'>
                    <button class='btn btn-info btn-xs' @click='disconnect(i.rfp.value,"accepted")'>View Details</button>
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
    name: 'engaged',
    data(){
        return {
            listData : []
        }
    },

    created(){
        const self = this;
        axios(api.getEngaged).then(function(data){
            console.log(data.data)
            self.listData = data.data
        })
    },

    methods: {
        disconnect: function(id,s){
            this.$router.push({name:'review',params:{rid:id,stat:s}})
        }
    }
}

</script>

<style>


</style>