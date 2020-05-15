//包含一些工具函数模块
import {
    v4 as uuidv4
} from 'uuid'

//得到的是当前用户的临时id  
//1 从localStorage
//2 通过UUID库生成

export function getUserTempId() {
    //从localStorage 读取用户临时id,如果有,直接返回
    let userTempId = localStorage.getItem('USER_TEMP_ID_KEY') //之前获取过的情况下
    //如果没有,通过uuid生成一个新的,保存到localStorage,并且返回
    if (!userTempId) {
        userTempId = uuidv4()
        localStorage.setItem('USER_TEMP_ID_KEY', userTempId)
        // console.log(userTempId)
    }
    //返回
    return userTempId
}
//保存用户信息到localStorage
export function saveUserInfo(userInfo) {
    localStorage.setItem('USER_INFO_KEY', JSON.stringify(userInfo))
}

//读取local中保存在用户信息,没有就返回{}
export function getUserInfo() {
    return JSON.parse(localStorage.getItem('USER_INFO_KEY')) || {}
}
//删除info
export function deleteInfo() {
    localStorage.removeItem('USER_INFO_KEY')

}