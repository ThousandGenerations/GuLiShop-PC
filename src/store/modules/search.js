//管理搜索模块的相关数据(vuex)

import {
    reqProductList
} from '@/api'

const state = {
    productList: {}, //得到的是商品列表的数据对象(不是数组)
}
const mutations = {
    //接收保存新的商品列表数据
    RECEIVE_PRODUCT_LIST(state, productList) {
        state.productList = productList //给productList赋值
    }
}
const actions = {
    //发送异步 action 获取商品列表数据
    async getProductList({
        commit
    }, searchParams) { //获取商品列表函数
        const result = await reqProductList(searchParams) //发送请求获取商品列表
        if (result.code === 200) {
            const productList = result.data //得到的数据要 data
            commit('RECEIVE_PRODUCT_LIST', productList) //提交数据
        }
    }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}