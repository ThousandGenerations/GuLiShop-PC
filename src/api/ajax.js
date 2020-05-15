/* 
现在的需求是从后台获取到三级菜单列表,就需要发送 ajax 请求,axios 是最好的选择
axios 本身就是对原生 ajax(XHR)进行的封装,现在要对 axios 进行二次封装
需求:
    1. 配置通用的基础路径/api 和超时提醒
    2. 显示请求时候的进度条,请求失败或者请求成功的时候隐藏
    3. 成功的时候返回的不再试 response 而是直接返回响应体的 response.data 数据
    4. 统一处理请求错误,具体请求也可以选择处理或者不处理
*/

//下载 axios 依赖包,并引入
import axios from 'axios'
//下载进度条的包并引入
import NProgress from 'nprogress'
//引入 nprogress的 css
import 'nprogress/nprogress.css'
import store from '@/store'

//配置不显示右上角小圆圈,只显示进度条
// NProgress.configure({
//     showSpinner: true,
// });
// 1. 配置通用的基础路径和超时
//创建一个新的 axios实例,功能和 axios 类似(可以作为函数或者对象发送请求)
const instance = axios.create({
    //指定一个通用的 url /api
    //如果后台服务器允许跨域可以直接写后台服务器域名端口号
    baseURL: '/api', //由代理服务器转发到http://182.92.128.115/api
    timeout: 15000, //指定处理请求的超时时间
})
//配置 axios 请求拦截器,在发送请求的时候显示进度条
instance.interceptors.request.use(config => {
    // console.log('请求拦截器执行了')
    // 2. 显示进度条
    NProgress.start();
    /*  5. 每次请求都携带一个userTempId请求头, 数据值在state中 */
    config.headers.userTempId = store.state.user.userTempId

    /* 6. 每次请求(已登陆)都携带一个token请求头, 数据值在state中 */
    const token = store.state.user.userInfo.token
    if (token) {
        config.headers['token'] = token
    }
    return config //拦截之后再将数据发送给服务器
})

//配置 axios 响应拦截器,在响应成功或者失败的时候先拦截到,然后隐藏掉进度条,再返回数据
instance.interceptors.response.use(
    response => {
        //拿到响应体数据的时候
        // console.log('响应拦截器执行了');
        //不论成功还是失败都要隐藏掉进度条
        NProgress.done(); //隐藏
        // 3 如果成功返回响应体的话,将响应体交给客户端,在这里要做特殊操作,就是本来的 axios 返回的响应体(response)是一整个完成的数据,我们这个时候必须.data 才能获取到真正的响应体数据
        // 所以这个时候我们可以直接拦截到数据返回 response.data 可以简化接下来的操作,很方便
        return response.data; //返回response.data里面的真正数据
    },
    error => {
        //请求体函数的第二个参数(错误)
        //也就是说请求失败的时候返回的错误信息
        // console.log('响应体拦截器失败回调执行了') //打印一下

        //注意一点就是就算响应失败了,我们这个时候也要将进度条隐藏掉
        NProgress.done();

        //可以处理错误,也可以不处理,在这里就简单的 alert 提示一下
        alert(`请求失败:${error.message || '未知错误'}`);

        //返回一个失败的 promise 防止下次执行变成成功的 promise
        return Promise.reject(error)
    })

//向外暴露封装好的instance
export default instance
/* 
    这个时候我们再发送请求的时候就有以下这几种方式:
        instance.get/post('/url');  //对象的形式
        instance('/url').then(result=>{
            const a = result.data //就能获取 真正data中的数据 而不是整个响应体
        })
*/