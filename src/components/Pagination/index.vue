<template>
  <div class="pagination">
    <!-- 当前页码如果为1的时候,这个页码不能点击 -->
    <button :disabled="myCurrentPage===1" @click="setCurrentPage(myCurrentPage - 1)">上一页</button>
    <!-- 当前起始页(start)大于1的时候才能显示,如果压根没有数据,不能显示的 -->
    <button v-if="startEnd.start > 1" @click="setCurrentPage(1)">1</button>
    <!-- start要大于2才显示 -->
    <button disabled v-if="startEnd.start > 2">···</button>
    <!-- 连续页码[start,end] -->
    <button
      v-for="(num,index) in startEnd.end"
      :key="index"
      v-if="num>=startEnd.start"
      :class="{active:num === myCurrentPage}"
      @click="setCurrentPage(num)"
    >{{num}}</button>
    <!-- 
  v-for 和 v-if配合使用
  v-for的优先级要高于v-if,先执行v-for的遍历,每遍历一个在进行if判断
    -->
    <button disabled v-if="startEnd.end < totalPages-1">···</button>
    <!-- 只有在end小于totalPages的时候应该显示  -->
    <button v-if="startEnd.end<totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
    <button :disabled="myCurrentPage===totalPages" @click="setCurrentPage(myCurrentPage+1)">下一页</button>
    <button style="margin-left: 30px" disabled>共 {{total}} 条</button>
  </div>
</template>


<script>
export default {
  name: "Pagination",
  props: {
    //定义props接收数据
    currentPage: {
      //当前页码
      type: Number, //类型
      defalut: 1 //默认值
    },
    pageSize: {
      //每页显示商品的数量
      type: Number, //类型
      defalut: 10 //默认值
    },
    total: {
      //总数量
      type: Number,
      defalut: 0
    },
    showPageNo: {
      //页码中显示的连续页码数量,最好是奇数.   例如:1 2 [3] 4 5
      type: Number,
      defalut: 5
    }
  },
  data() {
    return {
      //定义一个值 将外部传入的当前页码作为当前组件的当前页码初始值
      myCurrentPage: this.currentPage
    };
  },
  methods: {
    /* 
      定义方法(设置跳转新的页码)
    */
    setCurrentPage(currentPage) {
      if (currentPage === this.myCurrentPage) return;
      //应该是更新自己data里面的数据,而不是去更新父组件里面的数据
      this.myCurrentPage = currentPage;
      //分发自定义事件::实际上就是通知父组件当前页码
      this.$emit("currentChange", currentPage);
    }
  },
  watch: {
    //监视属性
    //当父组件改变了其对应的当前页码数据时,此回调函数就会自动调用
    //因为什么? 当父组件改变了页码的时候,并没有通知到子组件,子组件也不会触发更新页码的函数setCurrentPage,所以不会有最新的数据
    currentPage(value) {
      //更新内部的当前页码
      this.myCurrentPage = value;
    }
  },
  computed: {
    /* 
        计算属性中求他们这几个算法 
            总页数: 定义 totalPages 
            依赖数据:total(总数量)和pageSize(每页显示商品数量)
    */
    totalPages() {
      //求总页数  就是商品总数量/每页显示商品的数量
      const { total, pageSize } = this; //将组件实例对象中的total和pageSize解构出来
      return Math.ceil(total / pageSize); // 向上取整
      // 为什么要向上取整?
      // 1.假设总数量是 10 ,每页商品数量是3  求总页数就是 10/3 = 3.333 但是你不可能只显示3页,就算最后一页只有一个商品,也算一页,所以要向上取整
    },
    /* 
      计算连续页码start(开始页)和end(结束页) 例如 1 ... 2[3]4 ...
      思路:
        定义一个对象,里面存储{start:2,end:4}
        statr最小值应该是1  [1] 2 3 ,不能小于1
        end最大值应该是totalPages  
      依赖数据:
        myCurrentPage(定义的当前页码的初始值) / showPageNo(当前连续页码数) / totalPages(上面计算出来的总页数)
    */
    startEnd() {
      //先定义准备好start和end
      let start, end;
      //取出依赖数据
      const { myCurrentPage, showPageNo, totalPages } = this; //都在组件的实例对象里面
      //计算start(起始页)
      /* 
        举例:
            myCurrentPage, showPageNo, totalPages
          2(当前默认初始页) 3(连续页码)    8(总页码)   现在我们想要的就是      1[2]3   //2应该在中间位置
          所以当前的算法应该就是 
          起始页(start):
              初始页 - 向下取整 ( 连续页码 / 2 )  // 2 - 3/2 = 1 (起始页)
      */
      start = myCurrentPage - Math.floor(showPageNo / 2);
      //现在还遇到一个新问题:
      // 举例:
      /* 
          myCurrentPage, showPageNo, totalPages
                2           5            8         当前应该显示的是  1 [2] 3 4 5 
          按照上面算法 2(初始页) - 5(连续页) / 2 = 0  算出来是0 ,但是我们是没有第0页的,所以这种情况,我们还需要修正起始页的值
          假如算出来是0,或者小于0,就让起始页的值为1
       */

      if (start < 1) {
        //如果start的值小于1 (0以下)
        start = 1; //就将start的值改为1
      }
      //计算end(末尾页)
      /* 
         myCurrentPage, showPageNo, totalPages
                4           5            8         当前应该显示的是  2 3 [4] 5 6
        现在的算法应该是:
        末尾页 = 起始页(4-2 = 2) + 5(连续页) - 1 == 6 (末尾页)  
      */
      end = start + showPageNo - 1; //2 + 5 - 1 == 6
      /* 
        问题:
         myCurrentPage, showPageNo, totalPages
              7             5          8        当前应该显示的是   4 5 6 [7] 8
        按照之前的算法:
        末尾页 = 起始页(7 - 2 = 5) + 5(连续页) - 1 == 9  但是现在末尾页最大是8 所以应该修正算法
        当>8的时候 = 8 
        又有新问题来了 start 的其实质现在有不对了 
        新算法,根据连续页码来修正起始值 
        末尾页(8) - 连续页(5) + 1 (就是说连续显示5页,就应该减去 4 ,因为45678   4==>8 只有4页)
      */
      if (end > totalPages) {
        end = totalPages;
        start = totalPages - showPageNo + 1;

        /* 
          新问题又来了:
           myCurrentPage, showPageNo, totalPages
              3              5            4           应该显示的是 1 2 [3] 4
          末尾页 (3 + 5 - 1 ) > 4 修正为 4      
          当末尾页 > totalPages的时候,修正为totalPages
          那么就应该修正起始页
          4(totalPages) - 5(showPageNo) + 1 = 0  //很明显 0 是不对的
          所以还是要判断 如果起始页为0的话,修正起始页
        */
        if (start < 1) {
          start = 1;
        }
      }
      //返回起始页和末尾页
      return { start, end };
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
