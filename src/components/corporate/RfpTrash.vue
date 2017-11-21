<template>
 <div id="Rfp_Trash" class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>RFP Trashes</div>
      <hr>
    </header>
    <section id='List_space' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>RFP Name</th><th>Locations</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='i in listData.rfp'>
                <td class='w30'>{{i.rfp}}</td>
                <td class='w30'>{{ (i.hasOwnProperty('location') && i.location.length > 0) ? i.location.map((x)=> x.label).join(',') : 'No location Selected'}}</td>
                <td class='red b6 w20'>Trashed</td>
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
            listData: []
        }
    },
    created(){
        const self = this;
        axios(api.getTrash).then(function(data){
            self.listData = data.data;
        });
    },
    methods: {
    }
}
</script>

<style>
</style>