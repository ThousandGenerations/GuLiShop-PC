<template>
  <div>
    <!-- 
      需求: 封装列表List组件
        效果一: 显示TODO列表时, 已完成的TODO为绿色
        效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配
    -->
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <!-- 
      首先先定义组件标签,将todos的数据传递给子组件,通过标签属性的方式,子组件使用props接收
    -->
    <List :data="todos">
      <!-- 
      <template>的标签体内容会传递给子组件的<slot>
      slot-scope:用来指定接收子组件传递过<slot>的标签属性的所有属性数据
        scope的结构:
          {
            row:当前的行数据       //  { id: 1, text: "AAA", isComplete: false }
            $index:当前的li的下标
          }
      -->
      <template slot-scope="scope">
        <!-- 判断isComplete 为true的情况下将color颜色改为green -->
        <!-- 根据表达式的值的 truthiness 来有条件地渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 <template>，将提出它的内容作为条件块。 -->
        <span v-if="scope.row.isComplete" style="color:green">{{scope.row.text}}</span>
        <span v-else>{{scope.row.text}}</span>
      </template>
    </List>
    <!-- 
      问题: 数组的数据并不在父组件中遍历(只有数据源在父组件中 通过props传递给子组件,由子组件遍历显示),所以父组件无法得到具体的某一行的数据, 就无法向子组件List传递特定的列表项内容结构      
      这个时候要想的是所用于插槽 
    -->

    <br />
    <br />

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>

    <List :data="todos">
      <!-- slot-scope接收对象形式的数据 行和下标 -->
      <template slot-scope="{row,$index}">
        <!-- 显示序号(下标加一) -->
        <span>{{$index+1}}</span>
        <!-- 隔行换色  -->
        <span :style="{color:$index%2 === 1 ? 'blue' : 'green'}">{{row.text}}</span>
      </template>
    </List>
    <br />
    <br />
    <br />
    <br />
    <List :data="todos">
      <!-- slot-scope接收对象形式的数据 行和下标 -->
      <template slot-scope="scope">
        <!-- 显示序号(下标加一) -->
        <span>{{scope.$index+1}}</span>
        <!-- 隔行换色  -->
        <span :style="{color:scope.$index%2 === 1 ? 'blue' : 'green'}">{{scope.row.text}}</span>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
import List from "./List";
export default {
  name: "ScopeSlotTest",
  data() {
    return {
      todos: [
        { id: 1, text: "AAA", isComplete: false },
        { id: 2, text: "BBB", isComplete: true },
        { id: 3, text: "CCC", isComplete: true },
        { id: 4, text: "DDD", isComplete: false }
      ]
    };
  },

  components: {
    List
  }
};
</script>
