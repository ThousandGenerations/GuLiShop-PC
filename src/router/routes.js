/* 
    所有路由的配置的数组
*/
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
export default [{
        path: '/', //url 地址
        component: Home //路由所在文件,因为文件名是 index,所以可以不写,默认就是找 index
    },
    { //search组件相关路由
        name: 'search', // 是当前路由的标识名称
        path: '/search/:keyword?',
        component: Search,
        // 将params参数和query参数映射成属性传入路由组件(通过 props 传参)
        // 将params参数和query参数映射成属性传入路由组件
        props: route => ({
            keyword3: route.params.keyword,
            keyword4: route.query.keyword2
        })


    },
    {
        //注册组件相关路由
        path: '/register',
        component: Register,
        meta: {
            isHideFooter: true
        }
    },
    { //加入购物车组件相关路由
        path: '/addcartsuccess',
        component: AddCartSuccess,
    },
    { //商品详情页相关路由
        name: 'detail',
        path: '/detail/:skuId',
        component: Detail,
    },
    { //购物车相关路由
        path: '/shopcart',
        component: ShopCart
    },
    { //登录组件
        path: '/login',
        component: Login,
        meta: {
            isHideFooter: true
        }
    },


]