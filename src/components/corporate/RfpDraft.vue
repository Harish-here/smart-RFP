<template>
 <div id="Rfp_Draft">
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>RFP Drafts</div>
      <hr>
    </header>
    <section id='List_space' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>RFP Name</th><th>Locations</th><th>Status</th><th class='center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='i in listData.rfp'>
                <td class='w20'>{{i.rfp}}</td>
                <td class='w40'>{{ (i.hasOwnProperty('location')) ? i.location.map((x)=> x.label).join(',') : 'No location Selected'}}</td>
                <td class='orange b6 w20'>Pending</td>
                <td class='w20 center'><button class='btn btn-info btn-xs'>Forward to hotels</button></td>
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
        axios(api.getDraftList).then(function(data){
            self.listData = data.data;
        });
    },
    methods: {

    }
}
</script>

<style>
</style>