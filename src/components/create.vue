<template>
  <div class="hello">
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
      <section class='fl w100 p20-40'><!-- start of event info -->
        <h4 class='pl-25'>Event info</h4>
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

      <section class='fl w100 p20-40'>
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
              <span class='p5-10'>
                <button type='submit' class='btn btn-primary btn-sm'>Jan</button>
              </span>
              <button type='button' class='btn btn-default btn-sm' disabled>Feb</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Mar</button>
              <button type='button' class='btn btn-default btn-sm'disabled>Apr</button>
              <button type='submit' class='btn btn-primary btn-sm'>May</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Jun</button>
              <br/>
              <span class='p5-10'>
                <button type='button' class='btn btn-default btn-sm' disabled>JuL</button>
              </span>
              
              <button type='button' class='btn btn-default btn-sm'disabled>Aug</button>
              <button type='submit' class='btn btn-primary btn-sm'>Sep</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Oct</button>
              <button type='button' class='btn btn-default btn-sm' disabled>Nov</button>
              <button type='button' class='btn btn-default btn-sm'disabled>Dec</button>
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

      <section class='fl w100 p20-40'>
        <h4>Event Budget</h4>
      </section>
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
    sumbit: () => {
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

select,input{ height: 30px;width:300px;}
</style>
