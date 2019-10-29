import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast/index'
Vue.config.productionTip = false
//安装自定义的toast插件
Vue.use(toast)
//添加事件总线对象
Vue.prototype.$bus=new Vue()

//解决移动端300ms延迟
FastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyLoad)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
