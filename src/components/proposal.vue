<template>
<div id='proposal' class='p10-20'>
    <header class='fl w100 p10-20'>
      <div class='roboto b3 dib'>Proposals</div>
      <ul class='fr p5-10 dbNo'>
        <li class='di p5-10 f16'><i class="fa fa-pencil" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-trash" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-ellipsis-v" aria-hidden="true"></i></li>
      </ul>
      <hr>
    </header>
    <!-- <section v-if='false' id='proposal_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th class='w15'>Company </th>
             <th class='w15'>RFP </th> 
             <th class='w10'>Location</th> 
             <th class='w10 center'>Rooms / Year</th>
             <th class='w10 center'>Due Date</th>
             <th class='w15 center'>RFP status</th>
             <th class='w15 center'>Quote status</th> 
             <th class='w10'>Actions</th>
            </tr>
          </thead>
          <tbody v-if='listData === null'>
            <tr>
              <td colspan='6' class='center gray'>Getting your proposals...</td>
            </tr>
          </tbody>
          <tbody v-if='listData !== null && listData.hasOwnProperty("comp")'>
            <tr v-if='listData.comp.length > 0'
                v-for='i in listData.comp'
                :key='i.rfp.value'
                :class='{opa: i.status === "declined" || i.rfpStatus == "withdrawn"}'>
                <td class='w15'>{{i.company.label}}</td>
                <td class='w15'>{{i.rfp.label}}</td>
                <td class='w15'>{{i.location.map(x => x.label).join(', ')}}</td>
                <td class='w10 center'>{{i.roomsYear}}</td>
                <td class='w10 center'>{{i.dueDate}}</td>
            
                <td class='b6 w10 center' :class='{"red":i.rfpStatus == "closed" || i.rfpStatus == "withdrawn","green":i.rfpStatus != "closed" && i.rfpStatus != "withdrawn"}' >{{i.rfpStatus}}</td>
                <td class='b6 w10 center' :class='{"red":i.status == "declined" || i.status == "rejected","green":i.status != "declined" && i.status != "rejected"}' >{{i.status}}</td>
                <td class='w10'>
                  <button v-if='(i.status !== "declined" && i.status !=="quoted") || i.rfpStatus == "withdrawn"' class='btn btn-info btn-xs' @click='move(i.rfp.value)' key='give quote'>Give Quote</button>
                  <button class='btn btn-ghost btn-xs' key='cant give quote' @click='move(i.rfp.value)' v-else>View Details</button>
                </td>
            </tr>
            <tr v-if='listData.comp.length === 0'>
              <td colspan='6'>No proposal received yet</td>
            </tr>
          </tbody>
        </table>
        
    </section> -->
    <section class='fl w100'>
      <ul class='grid_contanier'>
        <li class='br-el grid-next cursor'
            v-if='listData !== null && listData.hasOwnProperty("comp") && listData.comp.length > 0'
            v-for='i in listData.comp'
            :key='i.rfp.value'
            :class='{opa: i.status === "declined" || i.rfpStatus == "withdrawn"}'
            @click='move(i.rfp.value)'
        >
          <div class='br-btm p5-10 b6 f14' :title='i.rfp.label'>{{ (i.rfp.label.length > 32) ?  i.rfp.label.substring(0,32)+'...' : i.rfp.label  }}</div>
          <div class='grid-middle'>
            <div class='p5-10 centering center'>
              <div>
                <span class='gray f11'>Due Date</span>
                <div class='f14'>{{i.dueDate}}</div>
              </div>
            </div>
            <div class='center centering'>
              <div>
                <span class='f14 b6'>ROOMS</span>
                <div class='f18 b6 brinjal'>{{i.roomsYear}}</div>
                <span class='gray center'>Annually</span>
              </div>
            </div>
          </div>
          <div class='f14 p2-4 center'>{{i.company.label}}</div>
          <div class='bg-gray p2-4'>
            <div class='fl w50'>RFP - <span :class='{"red":i.rfpStatus == "closed" || i.rfpStatus == "withdrawn","green":i.rfpStatus != "closed" && i.rfpStatus != "withdrawn"}'>{{i.rfpStatus}}</span></div>
            <div class='fr w50 al-right'>Quote - <span :class='{"red":i.status == "declined" || i.status == "rejected","green":i.status != "declined" && i.status != "rejected"}'>{{i.status}}</span></div>
          </div>
        </li>  
      </ul>
    </section>


</div>
</template>

<script>
import axios from 'axios'
import api from '@/api/api'
export default {
    name: 'proposal',
    data(){
        return {
            listData : null
        }
    },
    created(){
      const self = this;
      self.$store.commit('showProgress');
        axios(api.getProposal).then(function(data){//getting the list
          self.listData = data.data;  
          $('nav#hotel div').removeClass('act');
          $('nav#hotel div:nth-child(1)').addClass('act');
        });
        
      
    },
    methods: {
      move: function(id){
        const self = this;
        this.$router.push({path:"/"+self.$store.state.path+"/hotel/review/"+id+"/not"});
      }
    }
}

</script>

<style>
.grid_contanier{
  display: grid;
  grid-template-columns:1fr 1fr 1fr 1fr;
  grid-auto-rows: 150px;
  grid-gap: 20px;
}
.grid-next{
  display:grid;
  grid-template-rows: 30px auto 20px 20px;

}
.grid-middle{
  display:grid;
  grid-template-columns: 3fr 2fr;
}
.centering{
  display:flex;
  justify-content: center;
  align-items: center;
}
</style>