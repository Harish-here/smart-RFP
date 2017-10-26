<template>
<div id='received'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Proposals Received</div>
      <ul class='fr p5-10'>
        <li class='di p5-10 f16'><i class="fa fa-pencil" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-trash" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-ellipsis-v" aria-hidden="true"></i></li>
      </ul>
      <hr>
    </header>
    <section id='proposal_list' class='fl w100 p5-10'>
        <table class='table'>
          <thead class='bg-ddd'>
            <tr>
             <th>Hotel Name</th> <th>Place</th> <th>Status</th> <th>Rooms / Year</th> <th>Price</th> <th>Travels / month</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>infoNix weblabs</td>
            <td>chennai</td>
            <td class='green b6'>Approved</td>
            <td>chennai</td>
            <td>12300</td>
            <td>18</td>
            <td><button class='btn btn-default btn-xs'>Check Trip</button></td>
            </tr>
            <tr>
            <td>infoNix weblabs</td>
            <td>Bussiness</td>
            <td class='orange b6'>Pending</td>
            <td>chennai</td>
            <td>12300</td>
            <td>18</td>
            <td><button class='btn btn-default btn-xs'>Check Trip</button></td>
            </tr>
          </tbody>
        </table>
    </section>


</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'received',
    data(){
        return {
            listData : []
        }
    },
    created(){

    },
    methods: {

    }
}

</script>

<style>


</style>