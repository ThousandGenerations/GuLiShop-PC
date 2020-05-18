<template>
  <a href="javascript:" :title="title">
    <!-- 
      不确定向子组件el-button传递什么属性或者绑定什么事件监听的时候 
      v-bind的另一种用法 : v-bind="$attrs" 能将所有父组件传递的属性(排除props) 都传递给子组件
      v-on="$listeners"  能够将所有父组件给我绑定的监听全部都绑定给子组件
    -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
/* 对el-button进行二次封装, 实现使用按钮能有hover的文本提示 */
export default {
  props: ["title"], //通过props传递title属性 让所有标签都有移入之后的文本提示动能
  mounted() {
    console.log("HintButton", this.$attrs, this.$listeners);
  }
};
</script>

<style>
</style>