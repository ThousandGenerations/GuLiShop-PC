<template>
  <!-- 今日推荐 -->
  <ul class="recommendedToday">
    <li>
      <div class="day">
        <a href="###">
          <img src="./images/home/clock.png" alt />
          <span>今日推荐</span>
        </a>
      </div>
    </li>
    <li>
      <a href="###">
        <img src="./images/home/today01.png" alt />
      </a>
    </li>
    <li>
      <a href="###">
        <img src="./images/home/today02.png" alt />
      </a>
    </li>
    <li>
      <a href="###">
        <img src="./images/home/today03.png" alt />
      </a>
    </li>
    <li>
      <a href="###">
        <img src="./images/home/today04.png" alt />
      </a>
    </li>
  </ul>
  <!-- 今日推荐结束 -->
</template>

<script>
export default {
  name: ""
};
</script>

<style lang="less" scoped>
.recommendedToday {
  width: 1200px;
  height: 165px;
  // background: pink;
  margin: 10px auto 0px;
  display: flex;

  li:first-child {
    width: 200px;
    background: #5c5251;
    padding: 30px 0;
    margin-right: 1px;
    text-align: center;

    a {
      display: block;
    }

    span {
      display: block;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
      margin: 5px;
    }
  }

  li {
    align-items: center;
  }
}
</style>
