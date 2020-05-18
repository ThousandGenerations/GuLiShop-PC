<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="gaveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
//引入定义的混合
import { cpMixin } from "./mixins";
export default {
  name: "Son",
  //使用
  mixins: [cpMixin], // 配置mixin

  data() {
    return {
      money: 30000
    };
  },

  methods: {
    xxx() {
      // 可以进行扩展或覆盖mixin中的
    }
  }
};
</script>
