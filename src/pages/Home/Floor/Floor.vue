<template>
  <div class="homeUse">
    <div class="top_list">
      <span>家用电器</span>
      <ul class="clearFix">
        <li>
          <a href="javascript:;">热门</a>
        </li>
        <li>
          <a href="javascript:;">大家电</a>
        </li>
        <li>
          <a href="javascript:;">生活电器</a>
        </li>
        <li>
          <a href="javascript:;">厨房电器</a>
        </li>
        <li>
          <a href="javascript:;">应急电器</a>
        </li>
        <li>
          <a href="javascript:;">空气/净水</a>
        </li>
        <li style="border: none;">
          <a href="javascript:;">高端电器</a>
        </li>
      </ul>
    </div>
    <ul>
      <li>
        <dl>
          <dd>节能补贴</dd>
          <dd>4K电视</dd>
          <dd>空气净化器</dd>
          <dd>IH电饭煲</dd>
          <dd>滚筒洗衣机</dd>
          <dd>电热水器</dd>
        </dl>
        <img src="./images/home/floor-1-1.png" alt />
      </li>
      <li>
        <swiper ref="mySwiper2" :options="swiperOption2">
          <swiper-slide>
            <img src="./images/home/floor-1-b01.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="./images/home/floor-1-b02.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="./images/home/floor-1-b03.png" alt />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="pagination"></div>
          <div class="swiper-button-next" slot="pagination"></div>
        </swiper>
        <!-- <div class="swiper-container3">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img src="./images/home/floor-1-b01.png" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="./images/home/floor-1-b02.png" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="./images/home/floor-1-b03.png" alt="">
                            </div>
        </div>-->
        <!-- 如果需要分页器 -->
        <!-- <div class="swiper-pagination"></div> -->

        <!-- 如果需要导航按钮 -->
        <!-- <div class="swiper-button-prev"></div> -->
        <!-- <div class="swiper-button-next"></div> -->

        <!-- 如果需要滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
        <!-- </div> -->
      </li>
      <li>
        <div class="leTv">
          <div class="top">
            <img src="./images/home/floor-1-2.png" alt />
          </div>
          <div class="bottom">
            <img src="./images/home/floor-1-3.png" alt />
          </div>
        </div>
      </li>
      <li>
        <img src="./images/home/floor-1-4.png" alt />
      </li>
      <li>
        <div class="leTv">
          <div class="top">
            <img src="./images/home/floor-1-5.png" alt />
          </div>
          <div class="bottom">
            <img src="./images/home/floor-1-6.png" alt />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      swiperOption2: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        effect: "flip",
        autoplay: {
          delay: 1000,
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
.homeUse {
  width: 1200px;
  height: 426px;
  // background: pink;
  margin: 0 auto;
  overflow: hidden;

  .top_list {
    width: 100%;
    height: 63px;
    border-bottom: 1px solid #ea4a36;
    position: relative;
    overflow: hidden;

    span {
      display: block;
      color: #c81623;
      float: left;
      font-size: 20px;
      position: absolute;
      left: 0;
      bottom: 50%;
      transform: translateY(80%);
      font-weight: 700;
    }

    ul {
      float: right;
      position: absolute;
      right: 0;
      bottom: 50%;
      transform: translateY(50%);

      li {
        width: 70px;
        float: left;
        border-right: 1px solid #717171;
        text-align: center;

        &:nth-child(1) {
          border-right: 1px solid #ea4a36;
          text-indent: 2em;

          a {
            color: #ea4a36;
          }
        }

        a:hover {
          color: rgb(79, 76, 212);
        }
      }
    }
  }

  & > ul {
    width: 100%;
    height: 360px;
    // background: deeppink;

    & > li:nth-of-type(1) {
      float: left;
      width: 209px;
      height: 250px;
      // background: skyblue;

      dl {
        width: 100%;
        height: 111px;
        background: #f7f7f7;
        padding: 15px 12px 15px 10px;
        box-sizing: border-box;

        dd {
          width: 82px;
          height: 26px;
          border-bottom: 1px solid #e4e4e4;
          float: left;
          margin-right: 20px;
          text-align: center;
          line-height: 26px;
          color: #333;

          &:nth-of-type(2),
          &:nth-of-type(4),
          &:nth-of-type(6) {
            margin-right: 0;
          }
        }
      }

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    & > li:nth-of-type(2) {
      width: 330px;
      height: 100%;
      // background: deeppink;
      float: left;
    }

    & > li:nth-of-type(3) {
      width: 220px;
      height: 100%;
      // background: deeppink;
      float: left;
      border-right: 1px solid #e4e4e4;

      .leTv {
        .top,
        .bottom {
          width: 100%;
          height: 180px;
          // background: deeppink;
          border-bottom: 1px solid #e4e4e4;
        }
      }
    }

    & > li:nth-of-type(4) {
      width: 219px;
      height: 100%;
      float: left;
      // box-sizing: border-box;
      border-bottom: 1px solid #e4e4e4;
    }

    & > li:nth-of-type(5) {
      width: 220px;
      height: 100%;
      float: left;
      border-bottom: 1px solid #e4e4e4;
      border-left: 1px solid #e4e4e4;
      box-sizing: border-box;
    }
  }
}
</style>
