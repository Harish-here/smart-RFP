<template>
<div id='engaged' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>Engaged Companies</div>
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
             <th class='w15'>Company Name</th> 
             <th class='w15'>RFP Name</th> 
             <th class='w15'>Location</th> 
             <th class='w10 center'>Rooms / Year</th> 
             <th class='w15 center'>Price Slab</th> 
             <th class='w15'>Actions</th>
            </tr>
          </thead>
          <tbody v-if='listData === null'>
            <tr>
                <td colspan='6' class='gray center'>Loading Engaged companies...</td>
            </tr>
          </tbody>
          <tbody v-if='listData !== null && listData.hasOwnProperty("comp")'>
            <tr v-if='listData.comp.length > 0 '
                v-for='i in listData.comp'>
                <td class='w15'>{{i.company.label}}</td>
                <td class='w15'>{{i.rfp.label}}</td>
                <td class='w15'>{{i.location.map(x => x.label).join(', ')}}</td>
                <td class='w10 center'>{{i.roomsYear}}</td>
                <td class='w15 b6 center'>{{ (i.hasOwnProperty('slab')) ? i.slab.label : 'No Slab'}}</td>
                <td class='w15'>
                    <button class='btn btn-info btn-xs' @click='disconnect(i.rfp.value,"con")'>View Details</button>
                </td>
            </tr>
            <tr v-if='listData.comp.length === 0 '>
                <td colspan='6' class='center gray'> No Engaged Companies</td>
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
            listData : null
        }
    },

    created(){
        const self = this;
        self.$store.commit('showProgress');
        axios(api.getEngaged).then(function(data){
            self.listData = data.data
        })
    },

    methods: {
        disconnect: function(id,s){
            const self = this
            this.$router.push({path:"/"+self.$store.state.path+"/hotel/review/"+id+"/con"})
        }
    }
}

</script>

<style>


</style>