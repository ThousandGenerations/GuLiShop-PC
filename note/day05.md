## 今日任务: 实现Search组件
    1). Search静态组件(包含子SearchSelector子组件)
    2). Search组件动态显示
    3). 搜索条件参数的理解和准备
    4). 根据分类和关键字进行搜索
    5). 根据品牌进行搜索
    6). 根据商品属性进行搜索
    7). 排序搜索
    8). 自定义分页组件

## Search静态组件(包含子SearchSelector子组件)

## Search组件动态显示
    api: reqProductList()
    vuex: search.js ==> state/mutations/actions/getters 
    组件: 
        dispatch()
        mapState()
        模板

## 搜索条件参数的理解和准备
    category1Id: '', // 一级分类ID
    category2Id: '', // 二级分类ID
    category3Id: '', // 三级分类ID
    categoryName: '', // 分类名称
    keyword: '', // 关键字
    trademark: '', // 品牌  "ID:品牌名称"
    props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
    order: '1:desc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
    pageNo: 1, // 当前页码
    pageSize: 10, // 每页数量
	
## 根据分类和关键字进行搜索
	分类: query参数: categoryName / category1Id / category2Id / category3Id
	关键字: params参数: keyword

    在beMount(): 根据query和params参数来更新options
    在mounted(): 根据options发请求获取数据

    问题: 如果当前已经在Search了, 再通过点击搜索/点击分类来跳转到Search, 没有重新搜索?
    原因: 从A路由跳转到A路由, A路由组件对象不会重新创建  ==> 不会重新执行初始化生命周期回调
    解决: 监视$route的变化(A => A, $router是重新产生), 根据query&params更新options, 再请求
        监视路由参数变化: 监视$route就可以

    根据分类和搜索关键字进行搜索

    删除分类条件
        1. 重置options中的分类属性数据
        2. 重新请求获取数据
    删除关键字条件
        1. 重置options中的搜索属性数据
        2. 重新请求获取数据
    
    问题: 删除分类或关键字条件后, 地址栏还有条件参数?
    原因: 删除条件时, 并没有修改路由参数数据
    解决: 重新跳转到当前搜索界面, 并指定正确的参数
         删除分类: 不再携带query参数, 只携带原本的params参数
         删除关键字: 不再携带params参数, 只携带原本的query参数

    问题: 删除关键字条件, 输入框中的关键字没有同步删除
    原因: 删除条件时, 并没有去操作Header中的输入框数据
    解决: 使用全局事件总线实现Search组件与Header组件的通信
        1. 给Vue原型对象指定事件总线对象(vm对象)
        2. 在Search, 通过事件总线对象来分发事件
        3. 在Header, 通过事件总线对象绑定事件监听来接收消息, 从而可以更新数据

    问题: 在search界面多次重复又跳转Search后, 点击回退不能一次回到Home
    原因: 从search跳转到search时, 使用的是push
    解决: 使用replace代替push

    问题: 点击搜索按钮时页面跳转了, 地址栏路径不太对
    原因: 自动提交了表单
    解决: 用.prevent阻止事件的默认行为(提交表单)

## 根据品牌进行搜索
    子组件: 绑定监听, 让父组件去更新options中trademark属性值, 值由子组件来交给父组件 (子向父通信)
    父组件: 更新trademark的函数: 更新trademark ("ID:品牌名称"), 重新获取商品列表

## 根据商品属性进行搜索
    子组件: 绑定监听, 让父组件去更新options中props属性值, 值由子组件来交给父组件 (子向父通信)
    父组件: 更新props的函数: 向props数组中添加一个新元素, 重新获取商品列表
            1). 有可能不需要添加: 如果已经添加过了
            2). 一个prop的结构: "属性ID:属性值:属性名"
