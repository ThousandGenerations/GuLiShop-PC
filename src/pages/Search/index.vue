<template>
  <div>
    <h2>params参数: keyword={{$route.params.keyword}}</h2>
    <h2>query参数: keyword2={{$route.query.keyword2}}</h2>
    <h2>params参数 => props: keyword3={{keyword3}}</h2>
    <h2>query参数 => props: keyword4={{keyword4}}</h2>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ["keyword3", "keyword4"]
};
</script>

<style lang="less" scoped>
</style>
