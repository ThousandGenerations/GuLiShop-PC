## 今日任务
    1). 利用mock的接口实现动态的ListContainer与Floor组件
    2). 实现Search组件

## mock接口的vuex编码
    home.js: mutation / action
    App.vue: dipatch()

## 使用swiper实现静态页面轮播
    下载swiper: npm install -S swiper
    引入swiper: js/css
    创建并配置swiper对象: 必须在列表显示显示之后创建 ===> 在mounted()中创建

## 解决多个swiper效果冲突的问题
    问题: 针对某个swiper界面创建一个swiper对象, 它会影响了其它界面的swiper界面
    原因: new Swiper ('.swiper-container'), 类名选择器匹配了页面中所有的swiper界面, 都产生了效果
    解决: 使用ref技术: 通过ref标识swiper的根div, new Swiper (this.$refs.swiper)

## 解决swiper动态页面轮播的bug
    问题: 异步动态获取数据 + 直接在mounted中创建Swiper对象  ===> 没有轮播效果
    原因: swiper对象创建得太早
    解决: 使swiper对象在列表数据显示之后创建
        办法1: 使用延迟定时器延迟一定的时间才创建  ==> 不合适, 因为请求获取的时间是不定的
        办法2: watch + $nextTick()
            通过watch能知道banners有数据了(变化了)
            通过 $nextTick(callback)知道界面也更新了
            那我们就可以在callback中创建swiper对象

    理解更新数据/调用监听回调/更新界面的流程
        我们更新了数据 ==> 立即同步调用监视的回调函数(界面还没有更新, 列表数据还没有显示)  ==> 异步更新界面
    理解nextTick()
        // nextTick()需要在数据更新之后界面更新前调用
        // 指定的回调函数什么时候执行: 这次数据更新导致的界面更新完成后立即执行
        Vue.nextTick(callback)
        vm.$nextTick(callback)

## Floor动态组件
    组件:  
        分发异步action: this.$strore.dispatch('getFloors')
        从state中读取数据: mapState({floors: state => state.home.floors})
        在模板中显示数据
    vuex: 
        action =>先调用接口请求函数 ==> 成功后提交mutation ==>　mutation ==> 更新状态数据
    api: 
        reqFloors()

## 查看动态数据
    利用Vue开发调试工具 ==> 组件中的数据(props/data/computed/vuex)
    利用vuex开发调试工具 ==> vuex管理的数据(state/getters)
    利用network ==> 查看请求(响应数据/url/method/params/query)

## 定义可复用的轮播组件
    抽取轮播的模板部分
    抽取轮播的JS部分
    声明接收轮播的数组数据属性: carouselList

## 解决Floor组件中轮播有问题的bug
    问题: banners的轮播可以, 但2个Floor的轮播都没有效果
    原因: 
        基础理解: 给组件标签传入的属性值是空数组/undefined, 组件对象会创建
                 如果是通过v-for遍历一个空数组或undefined来产生多个标签, 组件对象不会创建
        watch默认: 初始创建显示不会执行, 只有在数据变化后才会执行
        得到结果: 
            banners对应的<Carousel>有更新显示 ==> 会调用watch的回调创建swiper对象 
            floors所对应的所有<Carousel>都没有更新显示 ==> 不会调用watch的回调, 没有创建swiper对象
        详细过程:
            <Carousel :carouselList="banners"/>
            <Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
                <Carousel :carouselList="floor.carouselList"/>
            数据变化: 
                banners: [] ==> [{}, {}, {}, {}]
                floors: [] ==> [{carouselList: [{}, {}]}, {carouselList: [{}, {}, {}]}]
            ListContainer中的: <Carousel :carouselList="banners"/>
                []: 初始显示时创建Carousel组件对象, 默认不会调用watch的回调, 也就不会创建Swiper对象
                [...]: Carousel组件对象调用watch的回调 => 更新显示 => 会创建一个Swiper对象
            Home中的<Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
                []: Floor组件对象没有创建, 内部的Carousel组件对象也就没有创建
                [...]: 创建多个Floor组件对象, 内部就会创建Carousel组件对象 ==> 会不会执行watch的回调呢?
        解决:
            办法1: mounted() + watch回调
                mounted()中: 判断如果已经有数据了, 立即创建swiper对象
                watch回调: 判断如果有数据, 延迟创建swiper对象
            办法2: watch
                给watch指定2个配置
                handler: 判断如果有数据, 延迟创建swiper对象
                immediate: 指定为true, 表示在初始显示之前就会调用一次
        
