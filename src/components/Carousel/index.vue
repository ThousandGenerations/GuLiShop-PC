<template>
  <!-- <div class="swiper-container" id="swiper"> -->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: {
    carouselList: Array
  },
  watch: {
    /* 
      监视属性,监视 carouselList 这个数组的变化,当 carouselList 从[]变成[...]的时候触发函数
      注意:
        1. 默认初始时这个监视属性不调用,当监视属性监视到 carouselList 改变时才会调用
        2. 只要更新了数据, 界面就会自动更新(我们称为数据绑定),但是<vue更新界面是异步的>
            我们更新了数据==>立即同步调用监视属性的回调函数(此时界面还没有更新,列表数据还没有显示)==>异步更新页面
            所以我们就需要在 carouselList 这个监视函数中 增加一个新东西 nextTick()
            nextTick(()=>{}) ==>  他指定的回调函数是在数据更新导致页面更新完成后自动进行调用执行的
    */
    /* 
      封装组件之后会出现一个问题:
          banners 的有轮播效果,floors 的两个组件都没有效果
          原因:
              1. 给标签传入的'属性'是空数组/undefined的时候,组件对象还是会创建,但是如果是用过 v-for遍历一个空数组或者 undefined 来产生多个标签的时候,组件对象是不会创建的
              2. watch 默认的规则是:初始创建显示的时候不会执行,只有在数据改变的时候才会执行
              3. 
                先说 banners 为什么可以有轮播效果?
                    1). 首先 banners 一开始是个空数组,上面说过了,给组件对象传递一个属性的时候,就算是个空数组/undefined,它组件对象该创建还是会创建,并不会影响什么
                        接下来,上面也说过了,初始创建显示的时候,默认情况下并不会去执行watch监视属性(里面的回调函数),当 banners 请求返回结果变成了一个有值得数组的时候
                        这个时候代表的是数据改变了,监视属性就会监视到,进而就回去执行里面的回调函数,从而去创建 Swiper 的实例对象,这也就说明了问什么 banners 的轮播有效果

                    2). 其次说的是 floors ,这个数组一开始也是一个空的数组,并且,他是通过v-for遍历 floors数组 去创建floor 这个组件对象的
                        []==>[{floors1},{2}],这个时候上面说过了,在创建组件对象的时候,他还是一个空数组,自然是遍历不到数据的,当然,也就不会产生组件实例对象,所以这个时候 <Floor/>
                        组件还没有产生
                        当请求返回数据的时候,本来是空的数组,有了两个对象,'楼层 1' 和'楼层 2',这个时候已经创建了 Floor 的组件对象,Floor 的组件对象中又有轮播的组件 Carousel,自然也会同时创建,想当于只要创建了楼层组件对象,就会创建轮播组件对象
                        但是!!!!注意,之前说了,初始化创建的时候,并不会执行监视属性,更不会去创建 Swiper 的组件对象,但是很遗憾,已经错过了,数据已经存在了,不会再改变了,所以就不会再触发监视属性了,自然轮播图效果也不会有

                    3). 解决方法:
                        1. 解决方法很简单,只要是 floor 组件对象创建完成之后,也就是页面更新之后,手动调用一次创建 Swiper 对象
                        2. 初始化 watch 监视属性的时候,就让他先执行一次,这样也可以

                        1==> 在 mounted 生命周期函数中,判断 floors 数组(有数据的时候,就去创建 Swiper 实例对象)
                        2==> 在 给 watch 制定两个配置
                              1. handler:判断如果有数据,延迟创建 Swiper 对象
                              2. inmediate:指定为 true,表示在初始显示之前就会调用一次
                
          解决:
            办法 1: mounted() + watch 回调
              判断floors 是否已经有数据,有的话就立即创建 swiper 对象
              waych 回调:判断如果有数据,演示创建 swiper 对象
            办法 2:watch
              给 watch 制定两个配置
              handler:判断如果有数据,延迟创建 swiper 对象
              immediate:指定为 true,久是在初始显示之前就会调用一次监视属性      
   */
    // 方法二

    carouselList: {
      /* 
        使用 watch监视属性handler方法创建 Swiper
        之后有一个immediate属性,为 true 会在初始化显示的时候立即调用回调函数一次
      */
      handler(value) {
        if (value.length > 0) {
          this.$nextTick(() => {
            //this.$nextTick   在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
            this.initSwiper(); // 延迟回调之后加载,用 this.$next 包裹创建 Swiper 对象可以使 Dom 加载完成之后调用创建对象(延迟加载),获取更新后的 DOM
          });
        }
      },
      immediate: true
    }
  },

  //方法一:

  // mounted() {  //floos 通过mounted生命周期创建的 Swiper
  //   if(this.carouselList.length>0){  //必须判断 数据列表长度>0 说明已经有数据了
  //     this.initSwiper() //这个时候就应该直接创建 Swiper 对象
  //   }
  // },

  methods: {
    // 创建 swiper 实例对象:必须在列表时局显示之后创建才有正常的轮播效果
    //swiper 实例必须在页面加载成功之后再去实例化才能使用,如果页面还没有加载出来,就已经生成了 swiper 的实例,那么这个时候就没有轮播图
    initSwiper() {
      new Swiper(this.$refs.swiper, {
        //使用 this.$refs 唯一标识符标识这个轮播图的区域
        // direction: 'horizontal', // 水平切换, 默认就是这个值

        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
