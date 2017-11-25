// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import api from '@/api/api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    hotel: {
      mode: 'create',
      nextScreen:7,
      list:null,
    },
    rfp: {
      rfpId: null,
      rfpName: null,
      travelAgencyMasterId: null,
      status: "0",
      refRfpId: "0",
      ques: []
    },
    alt: false,
    label:'some thing Happened',
    path:''
  },
  mutations: {
    changeHotelMode (state,mode){
        state.hotel.mode = mode;
    },
    setNextScreen (state,screen){
      state.hotel.nextScreen = screen;
    },
    submitRfpCat(state,objArr){
      state.rfp.ques = objArr.arr;//getting the ques array of obj 
      state.rfp.status = objArr.status;
      $.post(api.saveRfp,state.rfp).done(function(data){
        if(objArr.status ==  "1"){
          state.hotel.list = JSON.parse(data) 
          router.push({path:"/"+state.path+"/corprate/preview"});

        }else{
         // console.log(data);
        }
      });
      
    },
    setRfp(state,obj){
      var s = state.rfp;
      s.rfpId = obj.rfpId;
      s.rfpName = obj.rfpName;
      console.log(s);
    },
    flushRfp(state){
      state.rfp.ques = null;
      state.rfp.refRfpId = null;
      state.rfp.refRfpName = null;
    },
    sendRfp(state,hotel){
      var obj = {
        "rfpId": state.rfp.rfpId,
        "hotels": hotel 
      }
      $.post(api.sendRfp,obj).done(function(data){
        router.push({path:"/"+state.path+"/corprate"})
      });
    },
    showAlert(state,str){
      state.label = str;
      state.alt = true;
      setTimeout(function(){
        state.alt = false;
        state.label = "";
      },3000);
      
    },
    showProgress: function(state){
      if(api.forProd){
        setProgress(2);
      }
    },
    setPath(state,pat){
      state.path = pat;
    }

  }
})

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
