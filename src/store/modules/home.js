/* 
    模块化管理
        用来管理首页数据的 vuex 模块
*/
import {
    reqBaseCategoryList,
    reqBanners,
    reqFloors
} from '@/api' //引入 api 下面的 index 文件 就是保存整个接口请求函数的文件

export default {
    state: {
        baseCategoryList: [],
        banners: [],
        floors: [],
    },
    mutations: {
        //接收保存新的分类列表
        RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
            state.baseCategoryList = baseCategoryList
        },
        RECEIVE_BANNERS(state, banners) {
            state.banners = banners
        },
        RECEIVE_FLOORS(state, floors) {
            state.floors = floors
        }
    },
    actions: {
        //获取分类列表的异步 action
        async getBaseCategoryList({
            commit
        }) {
            //1 发送异步请求
            const result = await reqBaseCategoryList()
            //2 成功后提交给 mutation保存数据
            if (result.code === 200) {
                const baseCategoryList = result.data //将返回的数据保存到变量中准备提交
                commit('RECEIVE_BASE_CATEGORY_LIST', baseCategoryList); //提交数据 第一个参数是接收的变量(函数) 第二个数据是数据
            }
        },
        async getBanners({
            commit
        }) {
            // 1 发请求
            const result = await reqBanners()
            // 2 提交到 mutations
            if (result.code === 200) {
                //保存数据
                const banners = result.data
                //提交
                commit('RECEIVE_BANNERS', banners)
            }
        },
        async getFloors({
            commit
        }) {
            // 1 发请求
            const result = await reqFloors()
            // 2 提交到 mutations
            if (result.code === 200) {
                //保存数据
                const floors = result.data
                //提交
                commit('RECEIVE_FLOORS', floors)
            }
        }
    },
    getters: {}, //暂时忽略
}