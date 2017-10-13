<template>
 <div id='display'>
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
    
 </div>
</template>

<script>
export default {
  name: 'display',
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

<style>
</style>