//管理订单相关数据的vuex模块
import {
    reqTradeInfo,
    reqPayInfo
} from '@/api'

const state = {
    tradeInfo: {}, // 交易信息数据
    payInfo: {}, // 支付信息
}
const mutations = {
    RECEIVE_TRADE_INFO(state, {
        tradeInfo
    }) {
        state.tradeInfo = tradeInfo //把交易信息数据保存在state中
    },
    RECEIVE_PAY_INFO(state, payInfo) {
        state.payInfo = payInfo
    }
}
const actions = {
    //获取交易信息的异步action
    async getTradeInfo({
        commit
    }) {
        const result = await reqTradeInfo()
        if (result.code === 200) {
            const tradeInfo = result.data
            commit('RECEIVE_TRADE_INFO', {
                tradeInfo
            })
        }
    },
    //获取支付信息的异步action
    async getPayInfo({
        commit
    }, orderId) {
        const result = await reqPayInfo(orderId)
        if (result.code === 200) {
            //成功保存数据
            const payInfo = result.data
            commit('RECEIVE_PAY_INFO', payInfo)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}