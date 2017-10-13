<template>
  <div id="app">
    <nav class='fl w15 bg-dark h-full white al-left b6 f16'>
      <a href='#' class='p20-40'>RFP's</a>
      <a href='#' class='p20-40 hover'>Create RFP</a>
      <a href='#' class='p20-40'>Drafts</a>
      <a href='#' class='p20-40'>Trash</a>
    </nav>
   
    <div id='main_container' class='h-full'>
      <router-view/>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style src='./assets/basic.css'>


</style>
