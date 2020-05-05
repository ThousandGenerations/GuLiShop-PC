<template>
  <div class="menu">
    <TypeNav />
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ["keyword3", "keyword4"]
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
