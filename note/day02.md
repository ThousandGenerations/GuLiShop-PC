## 今日任务
    1). Home组件(静态)
    2). 后台接口与使用postman进行接口测试
    3). ajax进行前后台交互
    4). 使用vuex管理组件状态数据
    5). 分类导航TypeNav组件的交互功能(部分)

## Home组件(静态)
    1).TypeNav: 3级分类导航
    2).ListContainer: 包含轮播列表的容器
    3).TodayRecommend: 今日推荐
    4).Rank: 排行
    5).Like: 猜你喜欢
    6).Floor: 楼层
    7).Brand: 品牌
    注意: 图片/删除暂时不用的结构

## 使用postman测试接口
    1). 启动 ===> 选择登陆==> cancel ===> 进入主界面
    2). 输入url/参数进行请求测试
    3). 注意post请求体参数需要指定为json格式
    4). 保存测试接口 ==> 后面可以反复使用

## 前后台交互ajax
    1). 下载axios / nprogress
    2). 对axios进行二次封装(axios本身就是对原生ajax(xHR)的封装)   面试必说
        1. 配置通用的基础路径和超时: axios.create({baseURL, timeout})
        2. 显示请求进度条
            显示: 准备发请求前显示, 在请求拦截器中执行NProgress.start()
            隐藏: 请求结束隐藏, 在响应拦截器成功/失败回调中NProgress.done()
        3. 成功返回的数据不再是response, 而直接是响应体数据response.data
            响应拦截器成功的回调中: return response.data
        4. 统一处理请求错误, 具体请求也可以选择处理或不处理
            在响应拦截器失败的回调中: alert提示错误信息, return Promise.reject(error)
    3). 测试调用接口请求函数
        1. 出404的错误
            axios请求配置的地址: /api/product/getBaseCategoryList'
            当前发请求所在的地址:　http://localhost:8080/
            最终ajax请求的地址: http://localhost:8080/api/product/getBaseCategoryList (没人处理)
        2. 解决办法1
            配置baseURL: http://182.92.128.115/api     ==> 成功的前提是后台允许ajax跨域
        3. 使用代理服务器转发到目标接口地址 (使用代理解决ajax跨域)
            b

## 使用vuex
    1). 下载vuex
    2). vuex的基本使用
        store对象: state, mutations, actions, getters
        配置store对象: 在vm中配置
    3). vuex多模块编程
        什么时候用? 当vuex管理的数据个数很多时
        好处: 每个功能模块的数据单独管理, 更方便, 更有扩展性
    4). vuex多模块编程的总state结构
        {
            user: {
                userInfo: {}
            },
            home: {
                baseCategoryList: []
            }
        }
    5). vuex与api交互
        异步action: 调用api接口请求函数  ==> 成功之后commit  ===> 调用mutation  ==> 更新状态数据

## TypeNav动态显示分类列表
    1). 在mounted()中分发请求数据的异步action
        this.$store.dispatch('getBaseCategoryList')
    2). 利用mapState()将state中的分类列表映射成计算属性
        mapState(['xxx']): 映射总state的直接属性xxx成为xxx计算属性
        mapState({xxx2: 'xxx'}): 映射总state的直接属性xxx成为xxx2计算属性
        mapState({categoryList: state => state.home.baseCategoryList}): 映射home子模块的baseCategoryList属性成为categoryList计算属性
    3). 模板中显示数据
        
