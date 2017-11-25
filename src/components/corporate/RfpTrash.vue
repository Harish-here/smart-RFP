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
             <th>RFP Name</th><th>Locations</th> <th>Rooms / Year</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='i in listData.rfp'>
                <td class='w30'>{{i.rfp}}</td>
                <td class='w30'>{{ (i.hasOwnProperty('location') && i.location.length > 0) ? i.location.map((x)=> x.label).join(',') : 'No location Selected'}}</td>
                <td class='w30'>{{i.roomsYear}}</td>
                <td class=' w20'>
                    <button @click='sendTo(i)' class='btn btn-info btn-xs'>Move to draft</button>
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