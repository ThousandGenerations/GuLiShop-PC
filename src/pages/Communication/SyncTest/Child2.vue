<template>
  <div style="background: #ccc; height: 50px;">
    <span>小明每次花100</span>
    <!-- 
      使用v-model本质上还是分发的自定义事件input事件
    -->
    <button @click="$emit('input',value-100)">花钱</button>
    爸爸还剩 {{value}} 元
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Child2",
  props: ["value"]
};
</script>
