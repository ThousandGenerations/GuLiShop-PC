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

      <!-- 遍历 floors 的数据并通过标签属性传递给组件内部(组件内部通过 props 接受) -->
      <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
      <!-- 家用电器结束 -->
      <!-- 家用电器2 -->
      <!-- <Floor /> -->
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
import { mapState } from "vuex";
export default {
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  name: "Home",
  mounted() {
    //在 home 组件获取 state 管理数据
    //分发 action 请求获取 banners 和 floors 的数据到 state 中
    this.$store.dispatch("getBanners");
    this.$store.dispatch("getFloors");
  },
  computed: {
    //计算属性获取 floors 数据
    ...mapState({
      floors: state => state.home.floors
    })
  }
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
