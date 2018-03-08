<template>
<div id='RfpList' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='di roboto b3'>RFP - Published</div>
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
                <!-- <li @click='filter = {label:"Due Date",prop:"dueDate"};filterChildren="";'><a href='#'>Due Date</a></li> -->
                <!-- <li @click='filter = {label:"Status",prop:"status"};filterChildren="";'><a href='#'>Status</a></li>
                <li @click='filter = {label:"Journey Date",prop:"checkin"};filterChildren="";'><a href='#'>Journey Date</a></li> -->
              </ul>
          </div> 
      <hr>
    </header>
    <section id='proposal_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th class='w15'>RFP Name</th> 
             <th class='w20'>Cities</th> 
             <th class='w10'>Status</th> 
             <th class='w10 center'>Rooms / Year</th>
             <th class='w10 center'>Due Date</th> 
             <th class='center w10'>No of Hotels</th> 
             <th class='center w10'>No of Quotes</th> 
             <th class='w15'>Actions</th>
            </tr>
          </thead>
          <tbody v-if='listData.hasOwnProperty("rfp") && !filter.hasOwnProperty("label")'>
            <tr v-for='i in listData.rfp' :key='i.rfpId' :class='{"bg-acc":i.connected === "connected","opa": i.connected === "expired"}'>
              <td class='w15'>{{i.rfp}}</td>
              <td class='w20'>{{i.location.map(x => x.label).join(', ')}}</td>
              <td class='b6 w10' :class='{"orange":i.connected === "pending","green":i.connected === "connected"}'>{{i.connected}}</td>
              <td class='center w10'>{{i.roomsYear}}</td>
              <td class='center w10'>{{i.dueDate}}</td>
              <td class='center w10'> <span class='badge badge-primary'>{{i.noOfHotels}} </span></td>
              <td class='center w10'> <span class='badge badge-primary'>{{i.noOfQuotes}}</span> </td>
              <td class='w15'>
                <button @click='go({path:"/"+$store.state.path+"/corprate/quotelist/"+i.rfpId})' class='btn btn-ghost btn-xs'>View Details</button>
                
                <button  v-if='$store.state.permission!= 0 && i.connected !== "connected"' @click='trash(i.rfpId)' class='btn btn-default btn-xs' title='move this RFP to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
              </td>
            </tr>
          </tbody>
          <tbody v-if='!listData.hasOwnProperty("rfp")'>
            <tr>
              <td colspan='7' class='center gray'>Getting your Published RFPs...</td>
            </tr>
          </tbody>
          <tbody v-if='listData.hasOwnProperty("rfp") && listData.rfp.length === 0'>
            <tr>
              <td colspan='7' class='center gray'>No Published RFP's</td>
            </tr>
          </tbody>
          <tbody v-if='listDatacomp.hasOwnProperty("rfp") && listDatacomp.rfp.length > 0 && listDatacomp.rfp[0].hasOwnProperty("groupName")' v-for='i in listDatacomp.rfp' :key='i.groupName'> 
                    <tr>
                      <td class='bg-gray b6' colspan='4'>{{i.groupName}}</td>
                      <td class='bg-gray' colspan='4'>Total - <span class='badge badge-info'>{{i.list.length}}</span></td>
                    </tr>
                    <tr  v-for='y in i.list' :key='y.id' :class='{"opa": y.connected === "expired"}'>
                      <td class='w15'>{{y.rfp}}</td>
                      <td class='w20'>{{y.location.map(x => x.label).join(', ')}}</td>
                      <td class='w10 b6 ' :class='{"orange":y.connected === "pending","green":y.connected === "connected"}'>{{y.connected}}</td>
                      <td class='center w10'>{{y.roomsYear}}</td>
                      <td class='center w10'>{{y.dueDate}}</td>
                      <td class='center w10'> <span class='badge badge-primary'>{{y.noOfHotels}} </span></td>
                      <td class='center w10'> <span class='badge badge-primary'>{{y.noOfQuotes}}</span> </td>
                      <td class='w15'>
                        <button @click='go({path:"/"+$store.state.path+"/corprate/quotelist/"+y.rfpId})' class='btn btn-ghost btn-xs'>View Details</button>
                        
                        <button  v-if='$store.state.permission!= 0 && y.connected !== "connected"' @click='trash(y.rfpId)' class='btn btn-default btn-xs' title='move this RFP to trash'><i class="fa fa-trash" aria-hidden="true"></i></button>
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
    name: 'RfpList',
    data(){
        return {
            listData : [],
            path:null,
            time:new Date(),
            filter:{
              prop: "dueDate",
              label: "Due Date"
            },
            filterChildren: '',
            groupingList: [
              {prop:'connected',label:'Status'},
              {prop:'dueDate',label:'Due Date'},
              {prop:'roomsYear',label:'Rooms / Year'},
              
            ]
        }
    },
    created(){
      const self =this;
      self.$store.commit('showProgress');
      self.time = Math.round(self.time.getTime()/1000);
      axios(api.getPublished).then(function(data){
        self.listData = data.data;
      });

      $('nav#corporate div').removeClass('act');
      $('nav#corporate div:nth-child(1)').addClass('act');
     self.path = self.$route.params.foo;
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
    },

    methods: {
      trash: function(id){
        const self = this;
        if(confirm('Are you sure to Trash this RFP?')){
          $.post(api.trashRFP,{rfpId:id}).done(function(data){
            axios(api.getPublished).then(function(data){ 
              self.listData = data.data;
              self.$store.commit('showAlert',"RFP moved to Trash..!");
            });
          });
        }
      },
      go: function(obj){
        this.$router.push(obj);
      },
      refreshList: function(){
        const self = this
        axios(api.getPublished).then(function(data){
        self.listData = data.data;
        });
      }
    }
}

</script>

<style>


</style>