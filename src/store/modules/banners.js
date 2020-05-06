/* 
    vuex 模块化 暂时用于 mock 数据
*/
import {
    reqBanners
} from '@/api'
export default {
    //默认暴露
    state: {
        reqBanners: [],
    },
    mutations: {
        //接收保存轮播数据
        BANNERS(state, reqBanners) {
            state.reqBanners = reqBanners
        }
    },
    actions: {

    },
    getters: {
        //获取 ajax 异步数据 action
        async getBanners({
            commit
        }) {
            //1. 发送请求(异步操作)
            const result = await reqBanners()
            //2. 成功后提交给 mutations 保存数据
            if (result.code === 200) {
                const reqBanners = result.data //只需要调一次 data
                //提交
                commit('BANNERS', reqBanners)
            }
        }
    }
}