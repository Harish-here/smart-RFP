<template>
  <div id="app">
    <nav class='fl w15 bg-dark h-full white al-left b6 f16'>
      <a href='#' class='p20-40'>RFP's</a>
      <a href='#' class='p20-40 hover'><router-link to='/'>Create RFP</router-link></a>
      <a href='#' class='p20-40'>Drafts</a>
      <a href='#' class='p20-40'><router-link to='/questions'>Trash</router-link></a>
      <a href='#' class='p20-40'><router-link to='/proposal'>Proposal</router-link></a>
      <a href='#' class='p20-40'><router-link to='/review'>Review</router-link></a>
      <a href='#' class='p20-40'><router-link to='/send'>send</router-link></a>
      <a href='#' class='p20-40'><router-link to='/received'>Received</router-link></a>
      <a href='#' class='p20-40'><router-link to='/engaged'>Engaged</router-link></a>
      <a href='#' class='p20-40'><router-link to='/questionsCorp'>Question Corp</router-link></a> 
    </nav>
   
    <div id='main_container' class='h-full'>
        <router-view/>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    switchTab: function(){
      $('nav a').removeClass('hover');
    }
  }
};
</script>

<style src='./assets/basic.css'>


</style>
