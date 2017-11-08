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
      ques: null
    }
  },
  mutations: {
    changeHotelMode (state,mode){
        state.hotel.mode = mode;
    },
    setNextScreen (state,screen){
      state.hotel.nextScreen = screen;
    },
    submitRfpCat(state,objArr,status){
      state.rfp.ques = objArr;
      state.rfp.status = status;
      $.post(api.saveRfp,state.rfp).done(function(data){
        (status ==  "1") ? state.hotel.list = JSON.parse(data) : console.log(data);
      });
    },
    setRfp(state,obj){
      var s = state.rfp;
      s.rfpId = obj.rfpId;
      s.rfpName = obj.rfpName;
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
        console.log(data)
      });
    },
    getHotel(state){
      var hot = JSON.parse(JSON.stringify(state.rfp));
      hot['status'] = "1";
      hot['ques'] = [];
      console.log(hot);
      $.post(api.getHotel,hot).done(function(data){
        (api.forProd) ? 
        state.hotel.list = JSON.parse(data) :
        console.log(data);
      });
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
