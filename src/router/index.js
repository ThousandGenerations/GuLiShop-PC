/* 
    路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

//声明使用 vue 插件
Vue.use(VueRouter);

/* 解决编程式路由导航点击多次跳转同一个路由地址的时候报错的问题
      为什么会出现这个问题?
      因为在 vue3.1.0版本之后,对编程式导航做了调整,对 push 和 replace做出了调整,原本是没有返回值的,在新版本中调整为 push或者 replace 的时候会返回一个 promise 对象,
      如果没有通过 promise 来制定成功或者失败的回调函数,而且内不会判断如果要跳转的路径和参数都没有变化,就会抛出一个失败的 promise

      解决的办法:
      1. 在跳转时指定一个成功或者失败的回调函数,通过 catch 处理错误
        但是这种方式需要我们没次跳转时候都制定一个可能并没有什么用的回调函数,所以应该使用更加优秀的解决方法
      2. 修正 Vue 原型上的 push 和 replace 方法

      声明式的路由跳转时候为什么没有这个问题?
        是因为默认传入了成功的空回调函数
 */

/* 
   解决方法 2 :修正 Vue 原型上的 push 和 replace 方法
*/
//缓存原型上本来的 push 方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
//重新指定原型上的 push 方法//三个参数, 跳转的路径等信息 成功 promise 失败 promise
VueRouter.prototype.push = function (location, onComplete, onAbort) {
    // console.log('push()', location, onComplete, onAbort)
    //此时 this 指向的是路由器实例对象 $router 
    //如果调用 push,传递了成功或者失败的回调函数
    if (onComplete || onAbort) { //如果已经制定了成功或者失败的 promise 那么就不需要做处理
        //让刚才保存的(原来 vue的) push 方法来处理就行了
        originPush.call(this, location, onComplete, onAbort) //不需要返回,因为执行的结果返回值是 undefined 有没有返回值都一样
    } else {
        //如果调用了 push 但是没有传递成功或者失败的 promise,需要 catch 处理
        //使用 call 方法指定 $router这个实例对象的this来调用函数
        return originPush.call(this, location).catch(e => {
            console.log('catch error') //上面不需要传递另外两个参数,因为本来就是没有指定参数才进到 else 里面
            //这个时候需要返回一个新的状态为 pending 的 promise 对象,这样做是没了中断 promise 链条,后面成功的回调函数就不会被调用
            return new Promise(() => {

            })
        })
    }
}
// replace同理
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
    if (onComplete || onAbort) {
        originReplace.call(this, location, onComplete, onAbort)
    } else {
        return originReplace.call(this, location).catch(e => {
            console.log('catch error2')
            return new Promise(() => {

            })
        })
    }
}

const router = new VueRouter({
    mode: 'history', // 不带#的模式
    routes, // 配置所有路由
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        } // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
    }
})

/* // 注册全局前置守卫
router.beforeEach((to, from, next) => { // 在即将跳转到目标前回调
  console.log('beforeEach()', to, from)

  //放行
  next()
})

// 注册全局后置守卫
router.afterEach((to, from) => { // 已经跳转到目标路由才调用
  console.log('afterEach()')
}) */

// 所有需要进行登陆检查的路由路径的数组
const checkPaths = ['/trade', '/pay', '/center'] // 所有以它开头的路径都需要检查

/* a.只有登陆了, 才能查看交易/支付/个人中心界面 */
router.beforeEach((to, from, next) => { // 在即将跳转到目标前回调
    const targetPath = to.path // 有可能是/paysuccess  /center/myorder

    // 如果目标路由是需要进行登陆检查的
    // const isCheckPath = !!checkPaths.find(path => targetPath.indexOf(path)===0)
    const isCheckPath = checkPaths.some(path => targetPath.indexOf(path) === 0)

    if (isCheckPath) {
        // 如果已经登陆了, 放行
        if (store.state.user.userInfo.name) {
            next()
        } else { // 如果没有登陆, 强制自动跳转到登陆页面
            next('/login?redirect=' + targetPath)
        }
    } else { // 如果目标路由不需要进行登陆检查, 直接放行
        next()
    }
})

export default router