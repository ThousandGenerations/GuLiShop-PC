<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoney1(100)">找小明借钱100</button>
    <br />
    <button @click="borrowMoney2(150)">找小红借钱150</button>
    <br />
    <button @click="borrowMoney3(200)">找所有孩子借钱200</button>
    <br />

    <br />
    <!-- 给标签组件定义ref属性 可以使用this.$refs获取到组件对象 -->
    <Son ref="son" />

    <br />
    <Daughter ref="daughter" />
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000
    };
  },

  methods: {
    // 找小明借钱
    borrowMoney1(count) {
      //首先使用$refs得到son组件对象
      const son = this.$refs.son;
      //更新小明组件内部数据
      // 方法1
      //直接调用组件对象内部的monry更新组件内部的钱数
      // son.money -= count;

      // 方法2
      //调用子组件内部方法更新钱数
      son.pullMoney(count);
      //增加自身钱数(更新自身数据)
      this.money += count;
    },
    // 找小红借钱
    borrowMoney2(count) {
      //首先使用$refs得到son组件对象
      const daughter = this.$refs.daughter;
      //更新小明组件内部数据
      // 方法1
      //直接调用组件对象内部的monry更新组件内部的钱数
      // daughter.money -= count;

      // 方法2
      //调用子组件内部方法更新钱数
      daughter.pullMoney(count);
      //增加自身钱数(更新自身数据)
      this.money += count;
    },
    //找所有孩子借钱
    borrowMoney3(count) {
      //找到所有子组件对象的数据,遍历每个孩子借钱就可以了

      //使用children方法可以找到所有直接子组件(保存为数组的形式),调用方法
      this.children.forEach(child => {
        child.pullMoney -= count;
        this.money += money;
      });
    }
  },

  components: {
    Son,
    Daughter
  }
};
</script>

<style>
</style>
