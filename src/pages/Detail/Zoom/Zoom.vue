<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="move" ref="event"></div>
    <div class="mask" ref="mask"></div>
    <div class="big">
      <img :src="bigUrl" ref="big" />
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
export default {
  name: "Zoom",
  props: {
    bigUrl: String,
    imgUrl: String
  },
  methods: {
    move: throttle(function(event) {
      //move函数定义的是最外层的div
      let left = 0;
      let top = 0;

      //取出相关的数据

      //事件的坐标,就是相对于事件源也就是event这个div的左上角
      const { offsetX, offsetY } = event;
      // console.log(offsetX, offsetY);
      //获取mask的宽度,默认是隐藏的 通过计算属性已经算出来了
      const maskWidth = this.maskWidth;
      //思路:使用解构赋值的方法先把offsetX和OffsetY解构出来
      /* 
          1. offset代表的是鼠标距离当前事件对象左上角的坐标
          2. 通过计算属性计算出来mask(遮罩层) 的宽度/高度(宽度和高度是一样的)  他的宽度是大div的一半 
              left的偏移量就是当前大div的偏移量 - 遮罩层/2
          3. 计算出来left  计算top  指定左侧遮罩的样式坐标   指定右侧大图的坐标
      */
      console.log(maskWidth);
      //计算left
      left = offsetX - maskWidth / 2;
      //left值必须在大的div里面 top也一样
      if (left < 0) {
        left = 0;
      } else if (left > maskWidth) {
        left = maskWidth;
      }
      //计算top
      top = offsetY - maskWidth / 2;
      if (top < 0) {
        top = 0;
      } else if (top > maskWidth) {
        top = maskWidth;
      }
      //指定左侧遮罩层的坐标
      //就是求出来的left值和top值
      const maskDiv = this.$refs.mask;
      maskDiv.style.left = left + "px";
      maskDiv.style.top = top + "px";
      // console.log(left, top);
      // console.log(this.$refs.event);

      //指定右侧大图的样式坐标
      const bigImg = this.$refs.big;
      bigImg.style.left = -2 * left + "px";
      bigImg.style.top = -2 * top + "px";
    }, 50)
  },
  mounted() {
    //mask默认是隐藏的
    this.maskWidth = this.$refs.event.clientWidth / 2;
    console.log(this.maskWidth);
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>