<template>
  <div>
    <!-- menu -->
    <div class="menu">
      <div class="menu_wrap clearFix">
        <TypeNav />
        <!-- 中间轮播图 -->
        <ListContainer />
      </div>
      <!-- content -->
      <!-- 今日推荐 -->
      <TodayRecommend />
      <!-- 今日推荐结束 -->
      <!--热卖排行 -->
      <Rank />
      <!--热卖排行结束 -->

      <!-- 手机列表 -->
      <!-- 手机列表结束 -->
      <!-- 猜你喜欢部分 -->
      <Like />
      <!-- 猜你喜欢部分结束 -->
      <!-- 家用电器 -->
      <Floor />
      <!-- 家用电器结束 -->
      <!-- 家用电器2 -->
      <Floor />
      <!-- 家用电器2结束 -->
      <!-- 手机品牌 logo -->
      <Brand />
    </div>
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
import Rank from "./Rank/Rank";
import Like from "./Like/Like";
import Floor from "./Floor/Floor";
import Brand from "./Brand/Brand";
export default {
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  name: "Home"
};
</script>

<style lang="less" scoped>
.menu {
  .menu_wrap {
    box-sizing: border-box;
    @color: #ea4a36;
    @cBorder: #e4e4e4;
    width: 1200px;
    height: 100%;
    // background: pink;
    margin: 0 auto;
    position: relative;
  }
}
</style>
