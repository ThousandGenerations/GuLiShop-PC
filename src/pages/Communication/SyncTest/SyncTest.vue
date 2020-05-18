<template>
  <div>
    小明的爸爸现在有{{total}}元
    <br />
    <br />
    <h2>不使用sync修改符</h2>
    <!-- 动态获取total的值(钱数)  使用自定义事件将$emit分发的事件赋值给total-->
    <!-- 
      不使用sync属性修饰符
    -->
    <Child :money="total" @update:money="total=$event" />
    <br />
    <br />
    <h2>使用sync修改符</h2>
    <!-- 直接使用属性修饰符 .sync动态获取钱数 本质上就是绑定了自定义事件 更新钱数 ,就是自定义事件的语法糖 -->
    <child :money.sync="total" />
    <br />
    <br />
    <h2>使用v-model修改符</h2>
    <child2 v-model="total" />
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from "./Child.vue";
import Child2 from "./Child2.vue";
export default {
  name: "SyncTest",

  data() {
    return {
      total: 1000
    };
  },
  components: {
    Child,
    Child2
  }
};
</script>
