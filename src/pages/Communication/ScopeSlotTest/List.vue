<template>
  <ul>
    <!-- 
      问题: 当前组件不能决定列表的每页要显示的内容结构, 应该由父组件来决定
    -->
    <!-- 遍历数据 -->
    <li v-for="(item,index) in data" :key="index">
      <!-- 由父组件传递内容结构进来 -->
      <!-- 
        使用插槽的方式,slot的属性会自动传递给父组件
        将item(也就是每一行(li)的数据还有当前每个li的下标传递给父组件)
      -->
      <slot :row="item" :$index="index"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  props: {
    data: Array //props接收todos的数据
  }
};
</script>