<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { reqBaseCategoryList } from "@/api";
import { reqBanners } from "@/api";
export default {
  name: "App",
  async mounted() {
    //在 mount 生命周期函数中测试接口请求函数
    //因为接口请求函数的返回值都是 promise,
    //await后面接一个会return new promise的函数并执行它
    //await只能放在async函数里
    //async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来
    // const result = await reqBaseCategoryList();
    // console.log(result);
    // console.log(this.$store.state);

    /* 
      在 App 组件中定义请求执行,因为如果在 TypeNav中请求的话三级列表,跳转到 serach 页面就又会请求再一次加载请求列表
      原因: 因为在 TypeNav 中定义了Ajax请求,然后我们在 home 组件进行引入,又在 search 中引入,相当于是调用了两次 
            当点击跳转的时候,首先 home 中的子组件 TypeNav 会死亡,之后加载 search 中的 TypeNav 组件,就又一次发送了请求
            所以我们现在找一个公共组件 App.vue 当页面加载的时候到页面关闭或者刷新都是活着的 在这里面发送请求会减少向服务器发送请求的次数,增加用户体验的同时,降低了服务器压力

    */

    //测试调用 mock 接口对应的请求函数
    const result = await reqBanners();
    console.log(result);
    //通过 vuex 异步 action 获取数据到 vuex 的 state 中进行管理
    this.$store.dispatch("getBaseCategoryList");
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less" scoped>
</style>
