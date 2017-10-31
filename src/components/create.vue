<template>
  <div id="create">
    <header class='fl w100 p10-20'>
      <div class='f22 b6 dib'>Basic Information</div>
      <ul class='fr p5-10'>
        <li class='di p5-10'>
          <button class='btn btn-default btn-xs b6'><i class="fa fa-plus" aria-hidden="true"></i> Add Questions</button>
        </li>
        <li class='di p5-10 b6'><button class='btn btn-default btn-xs b6'>Clear all</button></li>
        <li class='di p5-10 f16'><i class="fa fa-pencil" aria-hidden="true"></i></li>
        <li class='di p5-10 f16'><i class="fa fa-trash" aria-hidden="true"></i></li>
      </ul>
      <hr>
    </header>
    <form id='basic_info' v-on:submit.prevent="sumbit">
      <section class='fl w100 p5-10'><!-- start of event info -->
        <h4 class=''>Event info</h4>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>RFP Name</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' class='p5-10' placeholder='Your RFP name'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Due Date</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' class='p5-10'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Start Date</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' class='p5-10'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>End Date</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' class='p5-10'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Location</label>
            </div>
            <div class='fl w50 pl-25'>
              <select name='location'>
                <option>Tamil Nadu</option>
              </select>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Template</label>
            </div>
            <div class='fl w50 pl-25'>
              <button type='submit' class='btn btn-primary btn-sm'>Marketing</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Lesiure Travel</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Bussiness Travel</button>
              <button type='button' class='btn btn-default btn-sm'disabled>Booking Travel</button>
            </div>
        </div>
      </section><!-- End of event info -->

      <section class='fl w100 p5-10'>
        <h4>Event Duration</h4>
          <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>No of Persons Travelling in a month</label>
            </div>
            <div class='fl w50 pl-25'>
              <select name='location'>
                <option>Tamil Nadu</option>
              </select>
            </div>
          </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>No of room Needed in a month</label>
            </div>
            <div class='fl w50 pl-25'>
              <select name='location'>
                <option>Tamil Nadu</option>
              </select>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>No of Rooms in nedded in year</label>
            </div>
            <div class='fl w50 pl-25'>
              <select name='location'>
                <option>Tamil Nadu</option>
              </select>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Month in year</label>
            </div>
            <div class='fl w80 pl-25'>
              <div class='p10-20'>
                <button type='submit' class='btn btn-primary btn-sm'>Jan</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Feb</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Mar</button>
              <button type='button' class='btn btn-default btn-sm'disabled>Apr</button>
              <button type='button' class='btn btn-primary btn-sm'>May</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Jun</button>
              </div>
              <div class='p10-20'>
                <button type='button' class='btn btn-default btn-sm' disabled>JuL</button>
              <button type='button' class='btn btn-default btn-sm'disabled>Aug</button>
              <button type='button' class='btn btn-primary btn-sm'>Sep</button>
              <button type='button' class='btn btn-default btn-sm'>Oct</button>
              <button type='button' class='btn btn-default btn-sm'>Nov</button>
              <button type='button' class='btn btn-default btn-sm'>Dec</button>
              </div>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Approx day in week</label>
            </div>
            <div class='fl w50 pl-25'>
              <button type='submit' class='btn btn-primary btn-xs'>Marketing</button>
              <button type='button' class='btn btn-default btn-xs' disabled>Lesiure Travel</button>
              <button type='button' class='btn btn-default btn-xs' disabled>Bussiness Travel</button>
              <button type='button' class='btn btn-default btn-xs'disabled>Booking Travel</button>
            </div>
        </div>
        
      </section>

      <section class='fl w100 p5-10'>
        <h4>Event Budget</h4>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Type of Room</label>
            </div>
            <div class='fl w50 pl-25'>
              <select name='location'>
                <option>Normal suite</option>
                <option>Presindetal suite</option>
                <option>Extra suite</option>
              </select>
            </div>
          </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Overall Budget</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' class='p5-10' placeholder='Overall Budget'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Budget Per Person</label>
            </div>
            <div class='fl w50 pl-25'>
              <input type='text' class='p5-10' placeholder='Budget Per Person'>
            </div>
        </div>
        <div class='fl w100 p10-20'>
            <div class='fl w20 al-right'>
              <label class='p5-10 b6'>Food & Bevarage</label>
            </div>
            <div class='fl w50 pl-25'>
              <button type='submit' class='btn btn-primary btn-sm'>Inclusive Budget</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Exclusive Budget</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Not Need</button>
            </div>
            <div class='fl w50 pl-25 p10-20'>
              <button type='submit' class='btn btn-primary btn-xs'>Breakfast</button>
              <button type='button' class='btn btn-default btn-xs' disabled>Lunch</button>
              <button type='button' class='btn btn-default btn-xs' disabled>Dinner</button>
            </div>
        </div>
      
      </section>
      <ul class='fl w100 p5-10'>
        <li class='fl w30 center'> <button type='button' class='btn btn-default btn-sm'>Save as Draft</button></li>
        <li class='fl w20 center'><button type='submit' class='btn btn-primary btn-sm'>Next</button></li>
      </ul>
    </form>
  </div>
</template>

<script>
export default {
  name: 'create',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  methods: {
    sumbit: function(){
      console.log('hi')
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

select,input{ height: 30px;width:300px;}
</style>
