import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import Global from './Global.vue'
import vuetify from './plugins/vuetify';
import router from './router'

Vue.prototype.$Global = Global; 

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
