<template>
<div id='engaged'>
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Engaged Companies</div>
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
             <th>Company Name</th> <th>Template</th> <th>Rooms Requested / month</th> <th>Location</th> <th>Rooms Booked / month</th> <th>Price / Hotel</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>infoNix weblabs</td>
                <td>Bussiness</td>
                <td>123</td>
                <td>chennai</td>
                <td>123 (143)</td>
                <td>1800</td>
                <td><button class='btn btn-default btn-xs'>Check Details</button></td>
            </tr>
            <tr>
                <td>infoNix weblabs</td>
                <td>Bussiness</td>
                <td>123</td>
                <td>chennai</td>
                <td>123 (143)</td>
                <td>2500</td>
                <td><button class='btn btn-default btn-xs'>Check Details</button></td>
            </tr>
          </tbody>
        </table>
    </section>


</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'engaged',
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