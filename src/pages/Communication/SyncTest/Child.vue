<template>
  <div style="background: #ccc; height: 50px;">
    <span>小明每次花100</span>
    <br />
    <button @click="$emit('update:money',money-100)">花钱</button>
    <br />
    爸爸还剩 {{money}} 元
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Child",
  props: ["money"] //props接收父组件的钱数
};
</script>
