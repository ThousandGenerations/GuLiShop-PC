<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 
      原生DOM事件监听的两种情况
        1. 在原生的html标签上绑定的dom事件名的监听,例如(onclick|onmouseover/enter)
        2. 在组件标签上绑定DOM事件名的监听,是在会绑定在组件的根标签上
      当用户操作对应的界面时,浏览器就会自动创建并封闭包含相关数据的事件对象,分发对应的时间.从而触发事件监听回调函数调用事件对象event,其实本质就是事件'数据'对象
      event对象内的数据属性:target/offsetX/Y/keyCode
      $event就是浏览器创建的event对象,默认传递给事件监听回调函数的就是它
    -->
    <button @click="test1">测试绑定原生DOM事件监听</button>
    <br />
    <br />
    <button @click="test1($event)">测试默认传递event事件数据对象</button>
    <br />
    <br />
    <Event1 @click.native="test2" />
    <br />
    <br />
    <!-- 这个只要是加了native标签修饰符的就是原生的dom事件了,默认在组件的根标签上添加click事件,利用事件冒泡的机制,点击标签内不同元素会有不同效果 -->

    <!-- 
      vue的自定义事件
      绑定的是vue自定义事件监听
      1. 只能在组件标签上邦定
      2. 事件名是任意的(自定义),可以与原生DOM事件名相同
      自定义事件只能执行 `$emit('自定义的事件名',data)` 进行分发自定义事件,才能触发自定义事件监听回调函数
      $event就是分发自定义事件时候指定传递的data数据
      $event可以是任意类型,也可以不传递
    -->

    <!-- 标签上添加自定义事件,必须在对应组件中使用$emit分发事件 -->
    <Event2 @click="test3" @xxx="test4($event)" />
    <br />
    <br />
    <Event2 @click="test3($event)" @xxx="test4($event)" />
    <!-- 
      以上在标签组件中定义的事件都是自定义事件,vue的自定义事件一般用来实现子组件向父组件通信,功能就相反于是函数类型的props
    -->
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";

export default {
  name: "EventTest",

  components: {
    Event1,
    Event2
  },

  methods: {
    test1(event) {
      //定义形参接收event,不论有没有传递实参$event
      alert(event.target.innerHTML); //证明不论有没有传递$event都可以使用event事件数据对象
    },
    test2() {
      //定义形参接收event,不论有没有传递实参$event
      alert(event.target.innerHTML); //证明不论有没有传递$event都可以使用event事件数据对象
    },
    test3(data) {
      alert("test3---" + data);
    },
    test4(data) {
      alert("test4---" + data.name);
    }
  }
};
</script>
