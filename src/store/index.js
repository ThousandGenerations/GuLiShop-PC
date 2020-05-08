/* 
    vuex 的核心管理对象 store
*/
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

// 声明使用 vuex 插件
Vue.use(Vuex)

// const mutations = {
//     test2(state) {
//         //总 state
//     }
// }

// const actions = {

// }
// const getters = {

// }

//向外暴露 store 对象
export default new Vuex.Store({
    // mutations,
    // actions,
    // getters,
    modules
})