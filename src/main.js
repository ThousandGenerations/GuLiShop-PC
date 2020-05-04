// 入口 js
import Vue from 'vue'
import App from '@/App'
//引入路由
import router from './router'

Vue.config.productionTip = false //去掉不是生产环境的提示

new Vue({
  render: h => h(App), //将 App 组建的对象界面渲染到页面上
  router, //配置路由器
}).$mount('#app')