/* 
由于我们的项目中有很多的接口,每次用到的时候都在不同的组件中调用要麻烦了,所以我们在 api 文件夹下封装一个包含项目中所有接口请求函数的模块
注意:
    每个请求函数的返回值都是 promise
*/
//1 引入我们封装好的(创建的新的 axios 实例),也就是 ajax 文件
import ajax from './ajax';

//下面就是项目中用到的所有请求接口函数
//所有接口都是以 api 开头

/* 
    请求获取三级分类列表 
    url:  /api/product/getBaseCategoryList
*/
// export function reqBaseCategoryList() { //起名风格最好一致
//     //可以返回一个对象形式或者函数形式的请求
//     // 函数调用形式   第一个参数是 url  如果是 get 请求可以写也可以不写.get
//     return ajax.get('/product/getBaseCategoryList')

//     //配置对象形式
//     // return ajax({
//     //     method: 'GET', //发送 get 请求
//     //     url: '/product/getBaseCategoryList', //url请求地址
//     // })
// }
export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')


/* 
    获取请求登录的数据
    url:  /api/user/passport/login
    POST 请求
*/
// POST 请求传参数传入形参
// export function reqLogin(mobile, password) {
//     //返回配置对象形式
//     return ajax({
//         method: 'POST', //请求方式 POST
//         url: '/user/passport/login', // url 请求地址
//         data: { //请求携带的参数
//             mobile,
//             password,
//         }
//     })
//     // 函数形式               //url                //参数(对象简写)
//     // return ajax.post('/user/passport/login'.{mobile,password})
// }