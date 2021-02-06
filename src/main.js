import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import http from './plugins/http'
import MyPlugin from './lib/index.js'

import vuetify from './plugins/vuetify'
import router from './router'
import Global from './Global.vue'

Vue.prototype.$http = http; // 挂载到 Vue 实例上

Vue.prototype.$Global = Global; // 挂载到 Vue 实例上

Vue.config.productionTip = false


Vue.use(MyPlugin)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
