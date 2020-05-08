// 入口 js
import Vue from 'vue'
import App from '@/App'
//引入路由
import router from './router'
//引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
//引入store
import store from './store'
//引入TypeNav组件
import TypeNav from '@/components/TypeNav'
//引入 mock 模块 加载一次就能使用接口
import './mock/mockSever'

Vue.config.productionTip = false //去掉不是生产环境的提示
// 注册 swiper 插件
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )
//注册全局组件
Vue.component('TypeNav', TypeNav)



new Vue({
  render: h => h(App), //将 App 组建的对象界面渲染到页面上
  router, //配置路由器
  store, //配置 vuex 的 store 对象,所有组件对象都可以通过$store 属性得到 store 对象
}).$mount('#app')