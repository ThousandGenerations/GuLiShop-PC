<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 当用于点击了菜单名字的时候显示点击的菜单名字 -->
            <li class="with-x" v-if="options.categoryName">{{options.categoryName}}</li>
            <!-- 当关键词有数据的时候显示关键词数据 -->
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <!-- 删除标签绑定@click -->
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 当对应的属性名有数据是显示 品牌:格式    "ID:品牌名称" -->
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}
              <!-- 删除标签绑定@click -->
              <i @click="removetrademark">×</i>
            </li>
            <!-- 当对应的属性名有数据是显示 商品属性的数组: ["属性ID:属性值:属性名"] -->
            <!-- 因为对应的是个props数组,可能是多个,遍历显示 -->
            <li class="with-x" v-for="(prop,index) in options.props" :key="index">
              {{prop}}
              <!-- 删除标签绑定@click(传入对应下标) -->
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>
        <!-- selector -->
        <!-- 通过标签属性,向子组件传递数据,子组件 props 接收 -->
        <SearchSelector :setTrademark="setTrademark" :addProp="addProp" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActive('1')}" @click="setOrder('1')">
                  <a href="jacascript:;">
                    综合
                    <i class="iconfont" :class="orderIcon" v-if="isActive('1')"></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active:isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:;">
                    价格
                    <i class="iconfont" :class="orderIcon" v-if="isActive('2')"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <!-- 遍历数据从后台获取 goodList -->
              <li class="yui3-u-1-5" v-for="goods in productList.goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link to="/detail">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <router-link to="/detail">
                    <div class="price">
                      <strong>
                        <em>¥&nbsp;</em>
                        <i>{{goods.price}}</i>
                      </strong>
                    </div>
                  </router-link>
                  <div class="attr">
                    <a href="javascript:;">{{goods.title}}</a>
                  </div>
                  <div class="commit" @click="toDetail">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 
            引入分页组件(组件已经在全局注册),组件通过props接受属性
            通过属性传值
            currentPage:当前页码
            pageSize:每页商品数量
            :total="productList.total" 总数量
            :showPageNo="3" 连续显示数量
             @currentChange="handlCurrentChange" 自定义事件,定义的是当前点击的页码
          -->
          <Pagination
            :currentPage="options.pageNo"
            :pageSize="options.pageSize"
            :total="productList.total"
            :showPageNo="3"
            @currentChange="handlCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"; //引入mapState
import SearchSelector from "./SearchSelector/SearchSelector";
//引入详情组件
import Detail from "@/pages/Detail";
export default {
  name: "Search",
  components: {
    SearchSelector,
    Detail
  },
  data() {
    return {
      /* 
        响应式数据对象
            现在options就是一个响应式的数据对象,当对象中的属性值发生改变的时候,视图就会发生改变==>响应式
            但是:
            添加属性:
              在options对象中直接添加新属性的时候,这个时候,新添加的属性不是响应式的数据
            错误方式:this.options.a = 'xxx' =>不是响应式,不会自动更新界面
            原因:vue内部给响应式属性进行劫持操作(没有对象的setter监视)
            正确方式:
                使用vue语法 $set
                vm.#set(target,key,value)
                Vue.set(target,key,value)
                为响应式对象添加一个属性,确保新属性也是响应式的,并且能够触发试图更新
            删除属性:
              错误方式:
                  直接删除: delete this.options.xxx ==> 不会自动更新视图界面
              原因:
                  vue内部给响应式属性添加的setter,只能监视属性值的改变,不能监视属性的删除操作
              正确方式:
                  vm.$delete(target,value)
                  Vue.delete(target,key)
                删除属性,同时更新界面
      */
      /* 
        排序:
          order数据的结构
          组成:orderFlag:orderType
          例子:
          综合:
            1:desc(orderFlag:orderType)
            1:asc
          价格:
            2:desc
            2:asc
        思路:
          哪个排序项选中?
            根据当前order中的orderFlag来确定 1就是综合 2就是价格
          根据哪个排序项进行什么方式排序?
            哪个排序项? 根据当前order中的orderFlag来确定  
            什么方式排序? 根据当前order中的orderType来确定  desc降序 asc升序 
          点击切换排序项和排序方式
            点击当前排序项:切换排序方式后进行搜索  desc的话换成asc  asc的话换成desc
            点击不是当前排序项的话:切换成其他的排序项,排序方式为降序  //判断orderFlag
     */

      //定义所有 search 的请求参数的数据配置对象
      options: {
        category1Id: "", // 一级分类ID
        category2Id: "", // 二级分类ID
        category3Id: "", // 三级分类ID
        categoryName: "", // 分类的名称
        keyword: "", // 关键字keyword
        trademark: "", // 品牌:格式    "ID:品牌名称"
        props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        order: "1:asc", // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
        pageNo: 1, // 当前页码
        pageSize: 10 // 每页数量
      }
    };
  },
  //定义初始化异步更新 data 中的数据
  beforeMount() {
    this.updateOptions();
  },
  //定义初始异步更新的代码
  mounted() {
    //在初始化搜索组件的时候,异步更新
    // console.log("1111");
    this.$store.dispatch("getProductList", this.options);
  },

  //定义一个方法来管理,当query 和 params 发生改变的时候更新 options 里面对应的数据
  methods: {
    //定义编程式路由跳转到详情
    toDetail() {
      this.$router.push("/Detail");
    },
    //异步获取指定页码的分页商品数据
    // 默认指定为第一页
    //定义一个函数形参默认值 ,不传就是第一页
    getProductList(pageNo = 1) {
      //更新options里面的数据
      this.options.pageNo = pageNo;
      //再请求获取最新数据
      this.$store.dispatch("getProductList", this.options);
    },
    //自定义事件的方法
    handlCurrentChange(currentPage) {
      //更新options里面的数据pageNo
      (this.options.pageNo = currentPage),
        //重新请求获取指定页码的数据显示
        this.$store.dispatch("getProductList", this.options);
    },
    //点击切换升降序
    setOrder(flag) {
      //flag = 0/1
      //思路:
      //需要得到的是之前的orderFlag和之前的orderType,然后根据flag的值修改
      let [orderFlag, orderType] = this.options.order.split(":");
      // console.log(orderFlag,orderType)
      //点击当前排序项的时候修改数据
      //判断如果当前点击的是同一个选项修改他的箭头(升降序),如果不是就切换当前选项,修改为降序
      if (flag === orderFlag) {
        orderType = orderType === "desc" ? "asc" : "desc";
      } else {
        //点击的不是当前选项
        orderFlag = flag; //切换orderFlag为当前传入的flag的值
        orderType = "desc"; //修改为降序
      }
      //将新order的值传给options,重新发送请求
      this.options.order = orderFlag + ":" + orderType;
      //重新发送请求,刷新页面
      // console.log(orderFlag, orderType);
      // this.$store.dispatch("getProductList", this.options);
      this.getProductList();
    },

    //当前点击的排序项(综合/价格)
    //判断传入的值orderFlag的排序项是不是当前项
    isActive(orderFlag) {
      return this.options.order.indexOf(orderFlag) !== -1;
    },

    //移除关键字
    removeKeyword() {
      //将配置对象关键字置为空
      this.options.keyword = "";
      //重新发送请求,获取最新数据
      // this.$store.dispatch("getProductList", this.options);
      //重置跳转到当前路由,不再携带 params 参数,只携带原来的 query 参数
      this.$router.replace({
        name: "search",
        query: this.$route.query
      });
      //通知 header 组件也删除输入的关键字
      //在 search,通过实践总线对象分发事件
      this.$bus.$emit("removeKeyword");
    },
    //移除品牌搜索条件
    removetrademark() {
      //重置数据
      this.$delete(this.options, "trademark");
      //请求数据
      this.getProductList();
    },
    //移除 props 数据
    removeProp(index) {
      //删除对应的 props
      this.options.props.splice(index, 1);
      //重新请求数据显示
      // this.$store.dispatch("getProductList", this.options);
      this.getProductList();
    },
    removeCategory() {
      //重置分类的条件数据
      this.options.categoryName = ""; //将名字置为空
      this.options.category1Id = ""; //将一级 id 置为空
      this.options.category2Id = ""; //将二级 id 置为空
      this.options.category3Id = ""; //将三级 id 置为空
      //重新获取数据

      // this.$store.dispatch("getProductList", this.options); //这样不行
      //重新跳转到当前路由,不再携带 query 参数,只携带原本的 params 参数
      this.$router.replace(this.$route.path); //$route.path 不带 query 参数,但是带有 params 参数(如果存在)
    },
    updateOptions() {
      //根据 query 和 params 参数更新options
      const {
        //利用解构赋值,将$route 里面的 query 参数的值结构出来
        categoryName,
        category1Id,
        category2Id,
        category3Id
      } = this.$route.query;
      //同样利用接狗赋值,将$route 的关键字 params 参数解构出来
      const { keyword } = this.$route.params;
      //取到 params 和 query 的参数值之后,添加到 data 中定义的 options 对象里面
      this.options = {
        ...this.options, //扩展运算符,除了咱们要修改的属性,其他属性也一并添加进来 ,方便函数复用
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword
      };
    },
    //定义 添加一个属性条件的方法 (子组件的方法)
    addProp(attrId, value, attrName) {
      //组装 prop
      const prop = `${attrId}:${value}:${attrName}`; //最后应该组装成后台需要的格式
      //这个属性条件只应该存在一次.所以应该判断现在有没有属性条件,如果已经添加过了,就需要直接结束,不执行下面的代码
      if (this.options.props.indexOf(prop) !== -1) return; //就说名这个数组里面已经有了对应的属性条件,直接 return
      //向 options 的 props 的数组后面添加一个属性条件,使用 push 方法
      this.options.props.push(prop);
      //重新发送请求获取最新数据
      // this.$store.dispatch("getProductList", this.options);
      this.getProductList();
    },
    //设置新的品牌条件数据,这里用的是子组件传递的数据,定义的是子组件的方法,数据源在这里,方法就要定义在这里
    setTrademark(trademark) {
      //更新 options 里面的trademark
      this.options.trademark = trademark;
      //重新发送请求,获取最新数据的列表显示
      this.getProductList();
      // this.$store.dispatch("getProductList", this.options);
    }
  },
  //只是这样定义了方法还是不够的,相同路由重复点击不更新数据，应该定义监视属性,监视到路由发生跳转时,参数发生变化的时候更新options的数据,还要更新页面重新请求数据
  watch: {
    //当路由跳转时只有路由传参数发生变化的时候
    $route() {
      this.updateOptions();
      //请求数据,再次调用接口
      this.$store.dispatch("getProductList", this.options);
    }
  },
  //定义计算属性,获取到 vuex 管理的数据(每次 state 状态发生改变的时候触发计算属性重新计算值,改变 dom 等)
  computed: {
    ...mapState({
      //接收 state中的productList数据并且使用 mapState辅助函数 展开在计算属性中
      productList: state => state.search.productList
    }),
    //向上还是向下的箭头显示,通过计算属性计算
    orderIcon() {
      return this.options.order.split(":")[1] === "desc"
        ? "icon-icondown"
        : "icon-iconup";
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }

    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;

      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }

      .hot-list {
        padding: 15px;

        ul {
          display: flex;

          li {
            width: 25%;
            height: 100%;

            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }

              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }

              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }

              .price {
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>