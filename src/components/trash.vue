<template>
<div id='trash' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto dib'>Trashed RFP</div>
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
             <th class='w20'>Company Name</th> 
             <th class='w25'>RFP Name</th> 
             <th class='w15'>Location</th> 
             <th class='w15'>Status</th>
            </tr>
          </thead>
          <tbody v-if='listData === null'>
            <tr>
                <td colspan='4' class='center gray'>Loading the Trashed proposals</td>
            </tr>
          </tbody>
          <tbody v-if='listData !== null && listData.hasOwnProperty("comp")'>
            <tr v-if='listData.comp.length > 0 '
                v-for='i in listData.comp' :key='i.rfp.value'>
                <td class='w20'>{{ i.company.label }}</td>
                <td class='w25'>{{ i.rfp.label }}</td>
                <td class='w15 b6'>{{ (i.hasOwnProperty('location') && i.location.length > 0) ? i.location.map(x => x.label).join(', ') : "No location" }}</td>
                <td class='w15 red b6'>
                   <!-- <button class='btn btn-info btn-xs' @click='disconnect(i.rfp.value,"accepted")'>View Details</button> -->
                   Trashed
                </td>
            </tr>
            <tr v-if='listData.comp.length === 0 '>
                <td colspan='4' class='center gray'>No Trashed Proposals</td>
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
    name: 'trash',
    data(){
        return {
            listData : null
        }
    },

    created(){
        const self = this;
        self.$store.commit('showProgress');
        axios(api.getHotelTrash).then(function(data){
            self.listData = data.data
        });
        $(function(){
        $('nav#hotel div').removeClass('act');
        $('nav#hotel div:nth-child(5)').addClass('act');
        });
        
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