<template>
 <div id="Rfp_Draft" class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>RFP - Saved</div>
      <span class='badge badge-primary mr-bt-5' v-if='filter.hasOwnProperty("label")'><b>{{filter.label}}</b> <span @click='filter = {};filterChildren="";' class='p2-4 cursor f14'>x</span></span>
          <select v-if='listGroup.length !== 0' v-model='filterChildren' class='br-none' style='font-size:11px;width:100px;'>
            <option value=''>All</option>
            <option v-for='i in listGroup' :value='i' :key='i'>{{i}}</option>
            <!-- <option value='d'>klklk</option> -->
          </select>
          <span class='fr p2-4 mr-bt-5'>
            <button class='btn btn-default btn-sm' @click='refreshList'><i class='fa fa-refresh'></i></button>
          </span>
          <div class='btn-group fr center p2-4'>
              <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style='width:150px'>
                {{ (filter.hasOwnProperty("label")) ? filter.label : "Group By" }} <span class="caret"></span>
              </button>
              <ul class='dropdown-menu' style='min-width:140px;'>
                <li v-for='i in groupingList' @click='filter = i;filterChildren="";' :key='i.prop'><a href='#'>{{i.label}}</a></li>
              </ul>
          </div>
      <hr>
    </header>
    <section id='List_space' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th class='w20'>RFP Name</th>
             <th class='w30'>Locations</th>
             <th class='w10 center'>Due Date</th>
             <th class='w15 center'>Rooms / Year</th>
             <th class='w30 center' v-if="$store.state.permission!= 0">Actions</th>
            </tr>
          </thead>
          <tbody v-if='listData.hasOwnProperty("rfp") && listData.rfp.length > 0 && !filter.hasOwnProperty("label")'>
            <tr v-for='i in listData.rfp' :key='i.rfpId'>
                <td class='w20'>{{i.rfp}}</td>
                <td class='w30'>{{ (i.hasOwnProperty('location') && i.location.length > 0 ) ? i.location.map((x)=> x.label).join(',') : 'No location Selected'}}</td>
                <td class='w20 center'>{{i.dueDate}}</td>
                <td class='w15 center'>{{i.roomsYear}}</td>
                <td class='w20 center' v-if="$store.state.permission!= 0">
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
          <tbody v-if='listDatacomp.hasOwnProperty("rfp") && listDatacomp.rfp.length > 0 && listDatacomp.rfp[0].hasOwnProperty("groupName")' v-for='i in listDatacomp.rfp' :key='i.groupName'> 
                    <tr>
                      <td class='bg-gray b6' colspan='2'>{{i.groupName}}</td>
                      <td class='bg-gray ' colspan='3'>Total - <span class='badge badge-info'>{{i.list.length}}</span></td>
                    </tr>
                    <tr  v-for='y in i.list' :key='y.id'>
                      <td class='w20'>{{y.rfp}}</td>
                      <td class='w30'>{{ (y.hasOwnProperty('location') && y.location.length > 0 ) ? y.location.map((x)=> x.label).join(',') : 'No location Selected'}}</td>
                      <td class='w10 center'>{{y.dueDate}}</td>
                      <td class='w10 center'>{{y.roomsYear}}</td>
                      <td class='w30 center' v-if="$store.state.permission!= 0">
                          <button @click='go({rfpId:y.rfpId,rfpName:y.rfp})' class='btn btn-ghost btn-xs'>Forward to hotels</button>
                          <button @click='back({path:"/"+$store.state.path+"/corprate/questionview/"+y.rfpId})' class='btn btn-ghost btn-xs'>View</button>
                          <button @click='trash(y.rfpId)' class='btn btn-default btn-xs' title='move this RFP to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
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
    name: 'RfpDraft',
    data(){
        return{
            listData: [],
            filter:{
              prop:'dueDate',
              label:'Due Date'
            },
            groupingList:[
              {prop:'dueDate',label:'Due Date'},
              {prop:'roomsYear',label:'Rooms / Year'},
            ],
            filterChildren:'',
        }
    },
    created(){
        const self = this;
        self.$store.commit('showProgress');
        axios(api.getDraftList).then(function(data){
            self.listData = data.data;
        });
    },

    computed: {
      listDatacomp(){
        const self = this;
            if(self.filter.hasOwnProperty('label') && self.filterChildren.toString().length === 0 && self.listData.hasOwnProperty('rfp')){
                    return { rfp : self.listData.rfp.map(x => x[self.filter.prop]).filter((val,pos,arr) => arr.indexOf(val) == pos ).map(
                        function(val,ind,arr){
                            return  {
                                groupName : val,
                                list : self.listData.rfp.filter(x => x[self.filter.prop] === val),
                            }
                        }
                        
                        )}
                }else if(self.filterChildren.toString().length > 0 && self.listData.hasOwnProperty('rfp')){
                    return { rfp : self.listData.rfp.map(x => x[self.filter.prop]).filter((val,pos,arr) => arr.indexOf(val) == pos ).map(
                            function(val,ind,arr){
                                return {
                                    groupName : val,
                                    list : self.listData.rfp.filter(x => x[self.filter.prop] === val),
                                }
                            }
                          ).filter(c => c.groupName == self.filterChildren)
                     }
                }else{
                    return self.listData
                } 
      },
      listGroup(){
        const self = this;
          if(self.filter.hasOwnProperty('label') && self.listData.hasOwnProperty('rfp')){
           return self.listData.rfp.map(x => x[self.filter.prop]).filter((val,pos,arr) => arr.indexOf(val) == pos )
          }else{
            return []
          } 
      },
    } ,

    methods: {
        go: function(obj){
            const self = this;
            self.$store.commit('setRfp',obj);
            self.$store.commit('submitRfpCat',{arr:[""],status:"1"});
        },
        back: function(obj){
            this.$router.push(obj);
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
      },
      refreshList: function(){
        axios(api.getDraftList).then(function(data){
            self.listData = data.data;
        });
      }
    }
}
</script>

<style>
</style>