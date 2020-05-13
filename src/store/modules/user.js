/* 
    管理用户数据的 vuex 模块
*/
import {
    getUserTempId
} from '@/utils'
export default {
    state: {
        userInfo: {},
        userTempId: getUserTempId()
    },
    mutations: {},
    actions: {},
    getters: {},
}