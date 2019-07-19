import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
//import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/theme/chalk/index.css'
import '@/icons' // icon
import '@/assets/plugins/iconfont/iconfont.css'
import '@/styles/index.scss' // global css
import './errorLog' // error log
import './permission' // permission control
// import './mock' // simulation data
import * as filters from './filters' // global filters
import utils from '@/utils/util'
import utilsBasic from '@/utils/basic'
import '@/views/components'
import elDragDialog from '@/directive/el-dragDialog'
import echarts from "echarts"; // echarts
import  'echarts/theme/shine.js' //echarts 主题
Vue.prototype.$echarts = echarts;

Vue.prototype.bus = new Vue() //中央事件总线
// register globally
Vue.use(Element, { size: Cookies.get('size') || 'medium' // set element-ui default size
})

elDragDialog.install(Vue);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$utils=utils;
Vue.prototype.$utilsBasic=utilsBasic;
Vue.config.productionTip = false
Vue.config.devtools = true;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
