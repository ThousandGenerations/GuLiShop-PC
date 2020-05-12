/* 
    模块化管理
        用来管理商品数据的 vuex 模块
*/
import {
    reqProduct,
    reqAddToCart
} from '@/api' //引入 api 下面的 index 文件 就是保存整个接口请求函数的文件

const state = {
    detailInfo: {}, //当前商品详情信息对象
}
const mutations = {
    //接收保存新的商品详情信息
    RECEIVE_DETAIL_INFO(state, detailInfo) {
        state.detailInfo = detailInfo
    }
}
const actions = {
    //获取商品详情信息数据的异步action
    async getDetailInfo({
        commit
    }, skuId) {
        const result = await reqProduct(skuId)
        if (result.code === 200) {
            const detailInfo = result.data
            commit('RECEIVE_DETAIL_INFO', detailInfo)
        }
    },

    //添加到商品到购物车的异步action
    async addToCart({
        commit
    }, {
        skuId,
        skuNum,
        callback
    }) {
        const result = await reqAddToCart(skuId, skuNum)
        if (result.code === 200) { //成功
            // const detailInfo = result.data
            console.log('添加到购物车成功')
            callback()
            // commit('RECEIVE_DETAIL_INFO', detailInfo)
        } else {
            console.log('失败')
            callback('失败') //失败了就要传递错误信息
        }
    },
    async addToCart2({
        commit
    }, {
        skuId,
        skuNum,
        callback
    }) {
        const result = await reqAddToCart(skuId, skuNum)
        if (result.code === 200) { //成功
            // const detailInfo = result.data
            // console.log('添加到购物车成功')
            // callback()
            return ''
            // commit('RECEIVE_DETAIL_INFO', detailInfo)
        } else {
            // console.log('失败')
            // callback('失败') //失败了就要传递错误信息
            return '添加到购物车失败'
        }
    },
    async addToCart3({
        commit
    }, {
        skuId,
        skuNum,
    }) {
        const result = await reqAddToCart(skuId, skuNum)
        if (result.code === 200) { //成功
            // const detailInfo = result.data
            // console.log('添加到购物车成功')
            // callback()
            // return ''
            // commit('RECEIVE_DETAIL_INFO', detailInfo)
        } else {
            // console.log('失败')
            // callback('失败') //失败了就要传递错误信息
            // return '添加到购物车失败'
            throw new Error('失败')
        }
    }
}
const getters = {
    //包含3级分类名称数据的对象
    categoryView(state) {
        const categoryView = state.detailInfo.categoryView //初始时是undefined,后来就有值了
        return categoryView || {} //保存返回的是一个空对象或者带数据的对象
    },
    //商品信息
    skuInfo(state) {
        const skuInfo = state.detailInfo.skuInfo
        return skuInfo || {}
    },
    //图片列表
    skuImageList(state) {
        const skuInfo = state.detailInfo.skuInfo
        return skuInfo ? skuInfo.skuImageList : []
    },
    spuSaleAttrList(state) {
        const spuSaleAttrList = state.detailInfo.spuSaleAttrList
        return spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}