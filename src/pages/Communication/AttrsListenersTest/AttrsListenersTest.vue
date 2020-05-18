<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <MyComponent xxx="abc" yyy='cba' :zzz="123" @input="test" @aaa="test2"></MyComponent>
    <br>

    <HintButton title="添加" type="primary" icon="el-icon-plus" size="mini" @click="add" @xxx="test"></HintButton>
    <!-- 
      @dblclick="add2"
          绑定是自定义事件监听, 而el-button内部并没处理(没有绑定对应的原生监听, 没有分发自定义事件)
          双击时, 不会有响应
      @dblclick.native="add2"
          绑定的是原生的DOM事件监听, 最终是给组件的根标签<a>绑定的原生监听
          当双击a内部的<button>能响应, 因为事件有冒泡
    -->
    <HintButton title="添加" type="primary" icon="el-icon-plus" size="mini" @dblclick.native="add2"></HintButton>
    <HintButton title="修改" type="info" icon="el-icon-edit" size="mini" @click="update"></HintButton>
    <HintButton title="删除" type="danger" icon="el-icon-delete" size="small" @click="remove"></HintButton>
<!-- 
    <a href="javascript:" title="添加">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="add"></el-button>
    </a>

    <a href="javascript:" title="修改">
      <el-button type="info" icon="el-icon-edit" size="mini" @click="update"></el-button>
    </a>

    <a href="javascript:" title="删除">
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="remove"></el-button>
    </a>
 -->
  </div>
</template>

<script type="text/ecmascript-6">
  import MyComponent from './MyComponent'
  import HintButton from './HintButton'
  export default {
    name: 'AttrsListenersTest',

    methods: {
      add () {
        alert('add()')
      },
      add2 () {
        alert('双击添加')
      },
      update () {
        alert('update()')
      },
      remove () {
        alert('remove()')
      },

      test () {
      },
      test2 () {
      }
    },

    components: {
      MyComponent,
      HintButton
    }
  }
</script>
