<template>
 <div id="Rfp_Trash" class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP - Trashes</div>
      <hr>
    </header>
    <section id='List_space' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th class='w30'>RFP Name</th>
             <th class='w30'>Locations</th> 
             <th class='w20'>Rooms / Year</th>
             <th class='w30 center'>Action</th>
            </tr>
          </thead>
          <tbody v-if='listData === null'>
            <tr>
              <td colspan='4' class='center gray'>Getting Trashed RFPs...</td>
            </tr>
          </tbody>
          <tbody v-if='listData !== null && listData.hasOwnProperty("rfp")'>
            <tr v-if='listData.rfp.length > 0'
                v-for='i in listData.rfp'>
                <td class='w30'>{{i.rfp}}</td>
                <td class='w30'>{{ (i.hasOwnProperty('location') && i.location.length > 0) ? i.location.map((x)=> x.label).join(',') : 'No location Selected'}}</td>
                <td class='w20'>{{i.roomsYear}}</td>
                <td class='w30 center'>
                    <button @click='sendTo(i)' class='btn btn-info btn-xs'>Move to Saved</button>
                </td>
            </tr>
            <tr v-if='listData.rfp.length === 0'>
              <td colspan='4' class='center gray'>No Trashed RFPs</td>
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
    name: 'RfpTrash',
    data(){
        return{
            listData: null
        }
    },
    created(){
        const self = this;
        self.$store.commit('showProgress');
        axios(api.getTrash).then(function(data){
            self.listData = data.data;
        });
      
    },
    methods: {
        sendTo: function(obj){
            const self = this;
            if(confirm('Are you sure to move \"'+obj.rfp+'\" to Draft?')){
                $.post(api.moveTrashToDraft,{'rfpId': obj.rfpId}).done(function(data){
                    axios(api.getTrash).then(function(data){
                        self.listData = data.data;
                        self.$store.commit('showAlert',obj.rfp+' moved to Draft');
                    });
                })
            }
        }
    }
}
</script>

<style>
</style>