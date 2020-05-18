<template>
  <div style="background: #ccc; height: 50px;">
    <h2>input包装组件</h2>
    <!-- 使用原生的input事件分发#emit自定义的input事件,获取input输入框动态的值 -->
    <input type="text" :value="value" @input="$emit('input',$event.target.value)" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "CustomInput",
  props: ["value"] //使用props将value值传递给兄弟组件
};
</script>
