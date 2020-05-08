/* 
使用 mockjs 来 mock 接口
    备注:当前 mock 不可以使用之前定义的 ajax 文件创建的axios 来发送请求,因为之前已经
    配置 baseURL为/api 现在接口并不是以 api 开头的
    所以我们需要 copy 一份 重新进行配置
*/
//引入 mockjs
import Mock from 'mockjs'

//引入需要 mock 的文件
import banners from './banner.json' //得到的是 js 的数据类型
import floors from './floors.json'


// 模拟返回轮播图接口

Mock.mock('/mock/banners', { //调用 Moke 对象的 mock 方法 第一个参数是 url,第二个参数是配置
    code: 200,
    data: banners,
})

//模拟返回所有楼层接口

Mock.mock('/mock/floors', {
    code: 200,
    data: floors,
})
/*  
    注意:当前模块不需要暴露任何东西,只需要被加载一次之后,mock 接口就可以访问
*/

console.log('mockSever......已经加载')
//在组件中发送请求测试