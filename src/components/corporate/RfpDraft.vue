<template>
 <div id="Rfp_Draft" class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP - Saved</div>
      <hr>
    </header>
    <section id='List_space' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th class='w20'>RFP Name</th>
             <th class='w40'>Locations</th>
             <th class='w20'>Status</th>
             <th class='w20 center'>Actions</th>
            </tr>
          </thead>
          <tbody v-if='listData.hasOwnProperty("rfp") && listData.rfp.length > 0'>
            <tr v-for='i in listData.rfp'>
                <td class='w20'>{{i.rfp}}</td>
                <td class='w40'>{{ (i.hasOwnProperty('location') && i.location.length > 0 ) ? i.location.map((x)=> x.label).join(',') : 'No location Selected'}}</td>
                <td class='orange b6 w20'>Pending</td>
                <td class='w20 center'><button @click='go({rfpId:i.rfpId,rfpName:i.rfp})' class='btn btn-info btn-xs'>Forward to hotels</button></td>
            </tr>
          </tbody>
          <tbody v-if='!listData.hasOwnProperty("rfp")'>
            <tr>
              <td colspan='4' class='center gray'>Getting the RFPs, you saved...</td>
            </tr>
          </tbody>
          <tbody v-if='listData.hasOwnProperty("rfp") && listData.rfp.length === 0'>
            <tr>
              <td colspan='4' class='center gray'>No Saved RFP</td>
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
    name: 'RfpDraft',
    data(){
        return{
            listData: []
        }
    },
    created(){
        const self = this;
        self.$store.commit('showProgress');
        axios(api.getDraftList).then(function(data){
            self.listData = data.data;
        });
    },
    methods: {
        go: function(obj){
            const self = this;
            self.$store.commit('setRfp',obj);
            self.$store.commit('submitRfpCat',{arr:[""],status:"1"});
        }
    }
}
</script>

<style>
</style>