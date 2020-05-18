<template>
  <div style="background: #ccc; height: 80px;">
    <h2>Event2组件</h2>
    <!-- 
      下面btn首先绑定的是自定义的click事件,相当于是点击的时候使用$emit触发一个名字叫click的自定义事件,传递atguigu这个数据
    -->
    <button @click="$emit('click','atguigu1')">分发自定义click事件</button>
    <br />
    <!-- 
      下面相当于是btn绑定的原生click事件,点击的时候使用$emit分发'xxx'事件,传递数据
    -->
    <button @click="$emit('xxx',{name:'atguigu2'})">分发自定义xxx事件</button>
  </div>
</template>
