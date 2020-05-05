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
import { reqBaseCategoryList } from "@/api";
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
    console.log(this.$store.state);
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less" scoped>
</style>
