<template>
  <div class="flag">
    <swiper ref="mySwiper" class="swiperOne" :options="swiperOption" :style="{overflow:'hidden'}">
      <swiper-slide>
        <img src="./images/home/banner1.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="./images/home/banner2.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="./images/home/banner3.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="./images/home/banner4.jpg" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="pagination"></div>
      <div class="swiper-button-next" slot="pagination"></div>
    </swiper>
    <!-- <div class="swiper-container1 swiperOne" style="overflow: hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="./images/home/banner1.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="./images/home/banner2.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="./images/home/banner3.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="./images/home/banner4.jpg" alt />
          </div>
    </div>-->
    <!-- 如果需要分页器 -->
    <!-- <div class="swiper-pagination"></div> -->

    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>-->

    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
    <!-- </div> -->
    <!-- 右侧列表 250 454-->
    <div class="right_list">
      <h3 class="clearFix">
        <span>尚品汇快报</span>
        <span>更多 &gt</span>
      </h3>
      <h4>
        <p>
          <em>[特惠]</em>备战开学季 全民半价购数码
        </p>
        <p>
          <em>[公告]</em>备战开学季 全民半价购数码
        </p>
        <p>
          <em>[特惠]</em>备战开学季 全民半价购数码
        </p>
        <p>
          <em>[公告]</em>备战开学季 全民半价购数码
        </p>
        <p>
          <em>[特惠]</em>备战开学季 全民半价购数码
        </p>
      </h4>
      <ul class="clearFix">
        <li class="w_61 n_left">
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">话费</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">机票</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">电影票</span>
          </a>
        </li>
        <li class="w_61">
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">游戏</span>
          </a>
        </li>
        <li class="w_61 n_left">
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">彩票</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">加油站</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">酒店</span>
          </a>
        </li>
        <li class="w_61">
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">火车票</span>
          </a>
        </li>
        <li class="w_61 n_left">
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">众筹</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">理财</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">礼品卡</span>
          </a>
        </li>
        <li class="w_61">
          <a href="javascript:;">
            <i class="icon"></i>
            <span class="icon_text">白条</span>
          </a>
        </li>
      </ul>
      <h5 class="adidas">
        <a href="javascript:;"></a>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListContainer",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        effect: "cube",
        autoplay: {
          delay: 2000,
          disableOnInteraction: false // 禁用手动切换之后继续自动轮播
        },
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOption2: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        autoplay: {
          delay: 100,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        },
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOption3: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        autoplay: {
          delay: 500,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        },
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  }
};
</script>

<style lang="less" scoped>
.flag {
  @color: #ea4a36;
  @cBorder: #e4e4e4;
  .swiperOne {
    width: 730px;
    height: 454px;
    //   background: pink;
    position: absolute;
    left: 210px;
    top: 0px;
    margin: 5px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .right_list {
    z-index: 9999;

    width: 250px;
    height: 454px;
    //   background: deeppink;
    float: right;
    margin-top: 5px;
    border: 1px solid @cBorder;
    box-sizing: border-box;
    position: relative;

    h3 {
      border-bottom: 1px solid @cBorder;
      padding: 12px 10px 6px 10px;
      margin: 0px 5px;
      box-sizing: border-box;

      span:first-child {
        float: left;
      }

      span:last-child {
        float: right;
        font-size: 12px;
        font-weight: 400;
      }

      span {
        margin-top: 1px;
      }
    }

    h4 {
      font-weight: 400;
      width: 100%;
      height: 135px;
      padding: 10px 14px;
      box-sizing: border-box;

      p {
        margin-bottom: 10px;

        em {
          font-weight: 700;
        }
      }
    }

    ul {
      border-top: 1px solid @cBorder;
      // border-right: 1px solid @cBorder;
      box-sizing: border-box;

      .w_61 {
        width: 61px;
      }

      .n_left {
        border-left: none;
      }

      li {
        width: 62px;
        height: 66px;
        float: left;
        border-left: 1px solid @cBorder;
        border-bottom: 1px solid @cBorder;
        box-sizing: border-box;
        background: #fff;

        //   margin-left: 1px;
        a {
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;

          .icon {
            display: block;
            width: 100%;
            height: 40px;
            background-image: url(./images/home/icons.png);
          }

          span {
            width: 100%;
            height: 26px;
            line-height: 26px;
            display: block;
            text-align: center;
          }
        }

        &:nth-of-type(1) .icon {
          background-position: -0px -4px;
        }

        &:nth-of-type(2) .icon {
          background-position: -62px -4px;
        }

        &:nth-of-type(3) .icon {
          background-position: -124px -4px;
        }

        &:nth-of-type(4) .icon {
          background-position: -190px -4px;
        }

        &:nth-of-type(5) .icon {
          background-position: -4px -74px;
        }

        &:nth-of-type(6) .icon {
          background-position: -64px -74px;
        }

        &:nth-of-type(7) .icon {
          background-position: -128px -70px;
        }

        &:nth-of-type(8) .icon {
          background-position: -190px -70px;
        }

        &:nth-of-type(9) .icon {
          background-position: -4px -144px;
        }

        &:nth-of-type(10) .icon {
          background-position: -65px -144px;
        }

        &:nth-of-type(11) .icon {
          background-position: -128px -140px;
        }

        &:nth-of-type(12) .icon {
          background-position: -194px -140px;
        }
      }
    }

    .adidas {
      width: 250px;
      height: 75px;
      position: absolute;
      left: 0;
      bottom: 0px;

      a {
        width: 100%;
        height: 100%;
        display: block;
        background-image: url(./images/home/adidas.png) !important;
      }
    }
  }
}
</style>
