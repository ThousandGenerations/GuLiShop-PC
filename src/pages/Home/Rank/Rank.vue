<template>
  <div>
    <div class="ranking">
      <ul>
        <li>
          <a href="javascript:;">
            <i></i>
            <span>热卖排行</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i></i>
            <span>特价排行</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i></i>
            <span>新品排行</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="phone">
      <ul>
        <li>
          <a href="javascript:;">
            <div class="list">
              <i class="8p"></i>
              <span>【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机</span>
              <em>定金：¥100.00</em>
            </div>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <div class="list">
              <i class="8p"></i>
              <span>【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机</span>
              <em>定金：¥100.00</em>
            </div>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <div class="list">
              <i class="8p"></i>
              <span>【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机</span>
              <em>定金：¥100.00</em>
            </div>
          </a>
        </li>
        <li style="margin-right: 0;">
          <a href="javascript:;">
            <div class="list">
              <i class="8p"></i>
              <span>【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机</span>
              <em>定金：¥100.00</em>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: ""
};
</script>

<style lang="less" scoped>
.ranking {
  width: 1200px;
  height: 98px;
  // background: pink;
  margin: 0 auto;

  ul {
    width: 100px * 3;
    height: 100%;
    display: flex;
    margin: 0 auto;

    li {
      width: 33%;
      height: 100%;
      text-align: center;
      font-size: 16px;

      a {
        text-decoration: none;

        i {
          width: 35px;
          height: 35px;
          display: block;
          margin: 15px auto 10px;
          background: url(./images/home/bg0.png) no-repeat;
        }
      }

      &:nth-of-type(1) i {
        background-position: -35px 0;
      }

      &:nth-of-type(1) span {
        color: #ea4a36;
      }

      & > a:hover span {
        color: rgb(79, 76, 212);
      }
    }
  }
}
.phone {
  width: 1200px;
  height: 330px;
  // background: pink;
  margin: 0 auto;

  ul {
    width: 1160px;
    height: 100%;
    // background: deeppink;
    margin: 0 auto;

    li {
      width: 270px;
      height: 100%;
      // background: deepskyblue;
      float: left;
      border: 1px solid #ea4a36;
      margin-right: 24px;

      .list {
        text-indent: 1em;

        i {
          display: block;
          width: 100%;
          height: 234px;
          background: url(./images/home/1.jpg) no-repeat;
          background-size: contain;
          background-position: center;
        }

        span {
          // width: 100%;
          // height: 50px;
          display: block;
          line-height: 2.5em;
          padding: 0 1em;
        }

        em {
          display: block;
          color: #ea4a36;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
