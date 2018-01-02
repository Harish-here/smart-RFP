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
             <th class='w30'>Locations</th>
             <th class='w20 center'>Due Date</th>
             <th class='w15 center'>Rooms / Year</th>
             <th class='w20 center'>Actions</th>
            </tr>
          </thead>
          <tbody v-if='listData.hasOwnProperty("rfp") && listData.rfp.length > 0'>
            <tr v-for='i in listData.rfp' :key='i.rfpId'>
                <td class='w20'>{{i.rfp}}</td>
                <td class='w30'>{{ (i.hasOwnProperty('location') && i.location.length > 0 ) ? i.location.map((x)=> x.label).join(',') : 'No location Selected'}}</td>
                <td class='w20 center'>{{i.dueDate}}</td>
                <td class='w15 center'>{{i.roomsYear}}</td>
                <td class='w20 center'>
                    <button @click='go({rfpId:i.rfpId,rfpName:i.rfp})' class='btn btn-ghost btn-xs'>Forward to hotels</button>
                    <button @click='trash(i.rfpId)' class='btn btn-default btn-xs' title='move this RFP to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
                </td>
            </tr>
          </tbody>
          <tbody v-if='!listData.hasOwnProperty("rfp")'>
            <tr>
              <td colspan='5' class='center gray'>Getting the RFPs, you saved...</td>
            </tr>
          </tbody>
          <tbody v-if='listData.hasOwnProperty("rfp") && listData.rfp.length === 0'>
            <tr>
              <td colspan='5' class='center gray'>No Saved RFP</td>
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
        },
        trash: function(id){
        const self = this;
        if(confirm('Are you sure to Trash this RFP?')){
          $.post(api.trashRFP,{rfpId:id}).done(function(data){
            axios(api.getDraftList).then(function(data){ 
              self.listData = data.data;
              self.$store.commit('showAlert',"RFP moved to Trash..!");
            });
          });
        }
      }
    }
}
</script>

<style>
</style>