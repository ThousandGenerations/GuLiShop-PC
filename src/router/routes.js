/* 
    所有路由的配置的数组
*/
// import Home from '@/pages/Home'
const Home = () => import('@/pages/Home')
// import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'
export default [{
        path: '/', //url 地址
        component: Home //路由所在文件,因为文件名是 index,所以可以不写,默认就是找 index
    },
    { //search组件相关路由
        name: 'search', // 是当前路由的标识名称
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
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
        //全局路由守卫
        beforeEnter: (to, from, next) => {
            //得到当前路由的标识名称
            //得到要跳转到目的路由的query参数
            const skuNum = to.query.skuNum
            //只有都存在,才放行
            if (skuNum && JSON.parse(localStorage.getItem('SKU_INFO_KEY'))) {
                next()
            } else { //在组件对象创建前强制跳转到首页
                next('/')
            }
        }
    },
    { //商品详情页相关路由
        name: 'detail',
        path: '/detail/:skuId',
        component: Detail,
    },
    { //购物车相关路由
        path: '/shopcart',
        component: ShopCart,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('SKU_INFO_KEY')) {
                next()
            } else {
                next('/')
            }
        }
    },
    { //登录组件
        path: '/login',
        component: Login,
        meta: {
            isHideFooter: true
        }
    },
    {
        //结算组件相关路由
        path: '/trade',
        component: Trade,
        //只能从购物车界面才能跳转到交易界面
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        //支付相关路由
        path: '/pay',
        component: Pay,
        //将query参数映射成props传递给路由组件
        props: route => ({
            orderId: route.query.orderId
        }),
        //只能从交易界面,才能跳转到支付界面
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next('/trade')
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        //只有从支付界面,才能跳转到支付成功的界面
        beforeEnter: (to, from, next) => {
            if (from.path === '/pay') {
                next()
            } else {
                next('/pay')
            }
        }
    },
    {
        path: '/center',
        component: Center,
        //二级路由
        children: [{
                path: 'myorder',
                component: MyOrder
            }, {
                path: 'groupbuy',
                component: GroupBuy,
            },

            {
                path: '',
                redirect: 'myorder'
            }
        ]


    },
    {
        path: '/communication',
        component: () => import('@/pages/Communication/Communication'),
        children: [{
                path: 'event',
                component: () => import('@/pages/Communication/EventTest/EventTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'model',
                component: () => import('@/pages/Communication/ModelTest/ModelTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'sync',
                component: () => import('@/pages/Communication/SyncTest/SyncTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'attrs-listeners',
                component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'children-parent',
                component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'scope-slot',
                component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
                meta: {
                    isHideFooter: true
                },
            }
        ],
    },


]