/* 
    所有路由的配置的数组
*/
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
export default [{
        path: '/', //url 地址
        component: Home //路由所在文件,因为文件名是 index,所以可以不写,默认就是找 index
    },
    {
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
        path: '/register',
        component: Register,
        meta: {
            isHideFooter: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHideFooter: true
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: Detail,
    },


]