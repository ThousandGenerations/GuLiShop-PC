/* 
将多个组件相同的代码定义在这个模块
*/

export const cpMixin = {
  methods: {
    /* 
    从当前组件取钱的方法, 由父组件来调用
    */
    pullMoney (count) {
      this.money -= count
      // return count
    },

    /* 
    给父亲一定的钱
    */
    gaveMoney (count) {
      this.money -= count
      // 得到父组件对象, 更新其数据
      this.$parent.money += count
    }
  }
} 