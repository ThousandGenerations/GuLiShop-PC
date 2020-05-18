<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="name1" :style="{background:'pink'}" />
    <span>{{name1}}</span>
    <!-- 
      理解input上的v-model的本质:
        其实就是动态的value的值和原生的input的事件监听的结合
          `<input :value="name2" @input="name2=$event.target.value">`
    -->
    <br />
    <br />
    <input
      type="text"
      :value="name2"
      @input="name2=$evemt.target.value"
      :style="{background:'pink'}"
    />
    <span>{{name2}}</span>

    <!-- 
      组件的v-model本质:
        动态的value属性与'自定义'input事件监听,记住是自定义
    -->
    <br />
    <br />
    <CustomInput :value="name3" @input="name3=$event" />
    <span>{{name3}}</span>
    <!-- $event说了相当于是事件数据对象,其实就相当于是$emit('input',xxx) -->
    <!-- 本质上和上面是一样的 -->
    <CustomInput v-model="name4" />
    <span>{{name4}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from "./CustomInput.vue";
export default {
  name: "ModelTest",

  data() {
    return {
      name1: "atguigu",
      name2: "xiaoxiao",
      name3: "mingming",
      name4: "huahua"
    };
  },

  components: {
    CustomInput
  }
};
</script>
