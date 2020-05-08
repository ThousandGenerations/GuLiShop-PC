<template>
  <div>
    <div class="header_wrap">
      <div class="header">
        <!-- 导航左侧 -->
        <ul class="left_nav">
          <li>尚品汇欢迎您！</li>
          <li>
            请
            <router-link to="/login">登录</router-link>
            <!-- <a href="javascript:;">登录</a> -->
          </li>
          <li>
            <router-link to="/register">免费注册</router-link>
            <!-- <a href="javascript:;">免费注册</a> -->
          </li>
        </ul>
        <ul class="right_nav">
          <li>
            <a href="javascript:;">我的订单</a>
          </li>
          <li>
            <a href="javascript:;">我的购物车</a>
          </li>
          <li>
            <a href="javascript:;">我的尚品汇</a>
          </li>
          <li>
            <a href="javascript:;">尚品汇会员</a>
          </li>
          <li>
            <a href="javascript:;">企业采购</a>
          </li>
          <li>
            <a href="javascript:;">关注尚品汇</a>
          </li>
          <li>
            <a href="javascript:;">合作招商</a>
          </li>
          <li>
            <a href="javascript:;">商家后台</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="logoAndSearch">
      <div class="logoAndSearch_wrap">
        <div class="logo clearFix">
          <h1 class="clearFix">
            <router-link to="/"></router-link>
            <!-- <a href="javascript:;"></a> -->
            尚硅谷
          </h1>
        </div>
        <form action="##" class="search" @from.prevent>
          <input type="text" v-model="keyword" />
          <button type="button" @click="search">搜索</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      keyword: "atguigu"
    };
  },

  methods: {
    search() {
      //编程式路由导航
      //字符串传递参数的形式
      // const keyword = this.keyword;
      // this.$router.push(`/search/${keyword}?keyword2=${keyword.toUpperCase()}`);
      //传递参数为''(空串)的时候,地址栏params的跳转地址会出现错误,判断解决,如果参数为空,就跳转到 search 页面,如果有参数,正常跳转
      // if (keyword === "") {
      //   this.$router.push("/search");
      // } else {
      //   this.$router.push(
      //     `/search/${keyword}?keyword2=${keyword.toUpperCase()}`
      //   );
      // }
      //对象传递参数的形式
      //对象形式传递参数的时候就要给要跳转的路由加上 name 属性,
      // 一旦在路由规则上指定带:号的路径(占位符), 必须指定name属性来标识当前路由
      // 			params只能与name组合使用
      // 			query可以与name或者path组合使用
      // if (keyword === "") {
      //   this.$router.push({
      //     name: "search"
      //   });
      // } else {
      //   this.$router.push({
      //     name: "search",
      //     params: { keyword },
      //     query: { keyword2: keyword.toUpperCase() }
      //   });
      // }

      //对象形式的第二种方式
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: keyword === "" ? undefined : keyword },
      //   query: { keyword2: keyword.toUpperCase() }
      // });

      const keyword = this.keyword;
      const location = {
        name: "search"
      };
      //如果 keyword 有值,指定 params
      if (keyword) {
        location.params = { keyword };
      }
      //携带 query 参数
      const { query } = this.$route;
      location.query = query;

      //跳转到 search
      this.$router.push(location);
    }
  }
};
</script>

<style lang="less" scoped>
.header_wrap {
  width: 100%;
  height: 30px;
  background: #eaeaea;

  .header {
    font-size: 12px;
    width: 1200px;
    height: 100%;
    margin: 0 auto;

    .left_nav {
      float: left;

      li {
        float: left;
        line-height: 30px;

        &:first-child {
          margin-right: 10px;
        }

        &:last-child {
          margin-left: 9px;

          a {
            border-left: 1px solid #b3aeae;
            padding-left: 5px;
          }
        }

        a:hover {
          color: #666666 !important;
        }
      }
    }

    .right_nav {
      float: right;

      li {
        float: left;
        line-height: 30px;
        // box-sizing: border-box;

        a {
          width: 85px;
          padding: 0 14px 0 10px;
          border-right: 1px solid #b3aeae;
        }

        &:last-child > a {
          padding: 0 10px 0 10px;
          border: none;
        }
      }
    }
  }
}
.logoAndSearch {
  border-bottom: 2px solid #ea4a36;

  .logoAndSearch_wrap {
    // position: relative;
    width: 1200px;
    height: 151px;
    // background: pink;
    margin: 0 auto;
    // float: left;

    .logo {
      float: left;

      h1 {
        width: 100%;
        height: 100%;
        font-size: 0;
        float: left;
        // overflow: hidden;

        a {
          display: block;
          width: 175px;
          height: 56px;
          float: left;
          // background: pink;
          background: url("./images/Logo.png") no-repeat;
          margin: 25px 45px;
        }
      }
    }

    .search {
      width: 558px;
      height: 32px;
      // background: pink;
      float: right;
      margin-top: 35px;
      // position: absolute;
      // left: 0;
      // top: 0;

      input {
        float: left;
        width: 490px;
        height: 100%;
        border: 2px solid #ea4a36;
        box-sizing: border-box;
        padding: 0 4px;
      }

      button {
        float: left;
        width: 68px;
        height: 100%;
        background: #ea4a36;
        color: #ffffff;
        text-align: center;
        // border: 2px solid @color;
        // box-sizing: border-box;
      }
    }
  }
}
</style>
