// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'
import Mint from 'mint-ui';
/*import { Loadmore } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';*/
import 'mint-ui/lib/style.css'

import 'vue2-animate/dist/vue2-animate.min.css'
import vueCookie from 'vue-cookie'
import App from './App'
import router from './router'
import api from './utils/api'
import tools from './utils/tools'
import './utils/filters'
import './utils/directives'
import components from './components'

Vue.config.productionTip = false

/*---安装第三方插件---*/
Vue.use(vueResource);
Vue.use(Mint);
Vue.use(vueCookie);
/*Vue.component(Loadmore.name, Loadmore);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, Picker);*/

/*---安装自定义插件---*/
Vue.use(api);
Vue.use(tools);
Vue.use(components);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
