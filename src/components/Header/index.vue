<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/">
          <img src="./images/Logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            placeholder="请输入关键字搜索"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button class="sui-btn btn-xlarge btn-danger" @click.prevent="search">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      keyword: ""
    };
  },
  mounted() {
    //在 header 组件,通过时间总线对象绑定事件监听来接收消息,然后更新数据
    this.$bus.$on("removeKeyword", () => {
      this.keyword = "";
    });
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
      //新增:如果当前在 search 组件,使用 replace()的方式跳转.如果不是,就是用 push 的方式跳转
      if (this.$route.path.indexOf("/search") === 0) {
        //说明在 search 组件,使用 replace 的方式
        this.$router.replace(location);
      } else {
        this.$router.push(location);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>