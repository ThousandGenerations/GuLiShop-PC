<template>
  <div class="like">
    <div class="top_like">
      <i>猜你喜欢</i>
      <div class="change">
        <a href="javascript:;">
          <span>换一换</span>
          <i class="iconfont icon-shuaxin" style="color: #ea4a36;"></i>
        </a>
      </div>
    </div>
    <ul>
      <li>
        <a href="javascript:;阳光美包新款单肩包女包时尚子母包四件套女">
          <i>
            <img src="./images/home/like_01.png" alt />
          </i>
          <div class="item">
            <span>阳光美包新款单肩包女包时尚子母包四件套女</span>
            <em>¥116.00</em>
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <i>
            <img src="./images/home/like_03.png" alt />
          </i>
          <div class="item">
            <span>阳光美包新款单肩包女包时尚子母包四件套女</span>
            <em>¥116.00</em>
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <i>
            <img src="./images/home/like_02.png" alt />
          </i>
          <div class="item">
            <span>阳光美包新款单肩包女包时尚子母包四件套女</span>
            <em>¥116.00</em>
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <i>
            <img src="./images/home/like_03.png" alt />
          </i>
          <div class="item">
            <span>阳光美包新款单肩包女包时尚子母包四件套女</span>
            <em>¥116.00</em>
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <i>
            <img src="./images/home/like_01.png" alt />
          </i>
          <div class="item">
            <span>阳光美包新款单肩包女包时尚子母包四件套女</span>
            <em>¥116.00</em>
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <i>
            <img src="./images/home/like_02.png" alt />
          </i>
          <div class="item">
            <span>阳光美包新款单肩包女包时尚子母包四件套女</span>
            <em>¥116.00</em>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: ""
};
</script>

<style lang="less" scoped>
.like {
  width: 1200px;
  height: 316px;
  // background: pink;
  margin: 0 auto;

  .top_like {
    width: 100%;
    height: 66px;
    // background: deeppink;

    & > i {
      display: block;
      font-size: 20px;
      float: left;
      padding-top: 35px;
      font-weight: 700;
    }

    .change {
      height: 24px;
      float: right;
      padding-top: 40px;

      a {
        text-decoration: none;

        span {
          font-size: 12px;
          margin-right: 6px;
        }

        &:hover {
          color: rgb(79, 76, 212);
        }
      }
    }
  }

  ul {
    width: 100%;
    height: 250px;
    border: 1px solid #ea4a36;
    // background: deeppink;

    li {
      width: 200px;
      height: 100%;
      float: left;
      box-sizing: border-box;

      a {
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-decoration: none;

        i {
          // text-align: center;
          display: block;
          overflow: hidden;

          img {
            display: block;
            margin: 0 auto;
            transition: all 1s;
          }

          &:hover img {
            transform: scale(1.2);
          }
        }
      }

      .item {
        width: 138px;
        margin-left: 40px;
        // margin-right: -20px;
        border-right: 1px solid #e4e4e4;

        span {
          margin-top: 10px;
          display: block;
          // padding-right: 5px;
          color: #000;
        }

        em {
          color: #ea4a36;
          font-size: 20px;
          font-weight: 700;
          display: block;
          padding: 10px 0;
        }
      }
    }
  }
}
</style>
