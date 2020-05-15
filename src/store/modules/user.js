/* 
    管理用户数据的 vuex 模块
*/
import {
    getUserTempId,
    getUserInfo,
    saveUserInfo,
    deleteInfo
} from '@/utils'
import {
    reqRegister,
    reqLogin,
    reqLogout,
} from '@/api'
export default {
    state: {
        userInfo: getUserInfo(),
        userTempId: getUserTempId()
    },
    mutations: {
        RECEIVE_USER_INFO(state, {
            userInfo
        }) {
            state.userInfo = userInfo
        },
        DELETE_USER_INFO(state) {
            state.userInfo = {}
        },

    },
    actions: {
        //注册操作异步action
        async register(context, userInfo) {
            const result = await reqRegister(userInfo)
            if (result.code !== 200) {
                throw new Error(result.data || result.message || '注册失败')
            }
        },
        /* 
登陆的异步action
*/
        async login({
            commit
        }, {
            mobile,
            password
        }) {
            const result = await reqLogin(mobile, password)
            if (result.code === 200) { // 登陆成功了
                const userInfo = result.data
                // 将用户信息对象提交给mutation保存到state
                commit('RECEIVE_USER_INFO', {
                    userInfo
                })

                // 将用户信息保存到local中
                saveUserInfo(userInfo)

            } else { // 登陆失败了
                throw new Error(result.data || result.message || '登陆失败')
            }
        },
        //退出登录action
        async logOut({
            commit
        }) {
            const result = await reqLogout()
            if (result.code === 200) { //登出
                //清除vuex中的用户信息
                commit('DELETE_USER_INFO')
                //将userInfo清空
                deleteInfo()
                // const userInfo = result.data
                // commit('DELETE_USER_INFO', {
                //     userInfo
                // })
            } else {
                throw new Error(result.message)
            }
        }
    },
    getters: {},
};