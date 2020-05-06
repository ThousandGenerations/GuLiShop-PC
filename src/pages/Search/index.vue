fanp<template>
  <div class="menu">
    <TypeNav />
    <p>params 参数: keyword={{$route.params.keyword}}</p>
    <p>query 参数: keywordName={{$route.query.categoryName}}</p>
    <p>query 参数: keyword1={{$route.query.category1Id}}</p>
    <p>query 参数: keyword2={{$route.query.category2Id}}</p>
    <p>query 参数: keyword3={{$route.query.category3Id}}</p>
  </div>
</template>

<script>
export default {
  name: "Search"
  // props: ["keyword3", "keyword4"]
};
</script>

<style lang="less" scoped>
.menu {
  box-sizing: border-box;
  @color: #ea4a36;
  @cBorder: #e4e4e4;
  width: 1200px;
  height: 100%;
  // background: pink;
  margin: 0 auto;
  position: relative;
}
</style>
