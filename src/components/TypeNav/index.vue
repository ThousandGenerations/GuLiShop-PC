<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideCategorys" @mouseenter="showCategorys">
        <h2 class="all">全部商品分类</h2>
        <transition name="move">
          <!-- 一旦有transition标签, vue会在显示/隐藏的过程中向div指定特定类名 -->
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{item_on: index===currentIndex}"
                @mouseenter="showSubCategorys(index)"
              >
                <h3>
                  <a
                    href="javascript:"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                  <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`)">{{c1.categoryName}}</a> -->
                  <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a
                          href="javascript:"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                        <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`)">{{c2.categoryName}}</a> -->
                        <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                          <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`)">{{c3.categoryName}}</a> -->
                          <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -2,
      isShowFirst: false
    };
  },
  methods: {
    /* 
      在搜索页移入显示和移出隐藏封装函数
    */

    //隐藏分类列表函数
    hideCategorys() {
      //和之前的逻辑一样 当完全移出(也就是 currentIndex === -2)的时候 就是隐藏
      this.currentIndex = -2; //给data 里 currentIndex数据赋值-2代表隐藏
      //判断路由路径 !== '/'
      if (this.$route.path !== "/") {
        this.isShowFirst = false; //就隐藏
      }
    },

    //显示分类列表函数
    showCategorys() {
      //移入显示就是之前逻辑
      this.currentIndex = -1;
      this.isShowFirst = true;
    },
    /* 
      思路:
      之前的想法是,鼠标移入(包括移入商品列表)之后显示,鼠标离开大的 div(包括商品列表)之后隐藏(改变下结构,使商品列表的 div 和菜单 div 被同一个 div 包括),切换类名的方式显示隐藏三级菜单
          设置初始值(没有移入的时候),设置为-1,移入之后currentIndex变成对应的 div 的下标 ,这样做固然可以,但带来的问题就是快速移动造成的卡顿现象
      现在是利用 lodash 的函数节流模式延迟时间再进行切换类名,带来的问题就是鼠标已经离开大的 div 但是这个时候,延迟时间还没到,就还是会执行之前节流要生效的函数(也局势移入事件),所以我们现在的思路是
          初始值currentIndex设置为-2 (完全没移入的时候),当移入包含商品列表和菜单的 div 时,值变成-1,离开变成 -2
          当currentIndex这个值为-2 的时候 return 不去执行下面的更新下标操作,就可以解决

          变成-1 才能改变菜单下标index的值,-2的之后不能改变
    */
    showSubCategorys: throttle(function(index) {
      if (this.currentIndex === -2) return;
      //更新需要显示的分类下标
      this.currentIndex = index;
      // console.log(this.currentIndex);
    }, 100),

    //点击分类项的时候,跳转到搜索页面,并且传参数
    //思路:
    /* 
            1.首先想到的是路由对象 router-link,但是很多标hu签,就会产生很多的路由对象,效率太低
            2.其次想到编程式导航,给 a 标签绑定click 事件进行跳转,想到事件委派,但是一级菜单和二级菜单一级三级菜单对应的参数是不一样的,所以想到了标签属性传参数
                首先是给所有要进行跳转的标签对应的父标签绑定事件,利用事件委派 event.target 确定要点击的 a 标签
                指定标签属性,利用标签属性传递参数
                之后进行跳转
        */
    toSearch(event) {
      // console.log(event.target.dataset); //查看标签自定义属性(利用事件对象中的 target(目标元素)的 dataset)
      // 利用解构赋值的方式把自定义属性所有可能有的属性结构出来
      const {
        categoryname,
        category1id,
        category2id,
        category3id
      } = event.target.dataset;
      //判断应该存在的分类项 存在是有值的 不存在是 undefined 为假
      if (categoryname) {
        //指定 categoryname 的 a 属性才进入判断
        //准备 query 参数对象
        const query = { categoryName: categoryname };
        //判断点击的a 标签 id 是1 || 2 || 3 为真说明就是点击 id
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //准备参数完毕,现在利用编程式路由 对象的形式携带参数进行跳转
        // this.$router.push({
        //   name: "search", //使用 name 和 query 参数配合
        //   query //利用对象简写传入 query 参数 query 的属性值已经在上面定义好了

        // });

        //用户点击分类列表传递 query 参数 点击搜索按钮传递 params 参数
        //这个时候,假如两个都有数据就要同时传递

        //定义路由跳转的 location 对象
        const location = {
          name: "search",
          query
        };

        //获取 params 参数对象
        const { keyword } = this.$route.params;
        //根据分类搜索时,也要携带关键字搜索 params 参数,当然,前提是 keyword 有值
        if (keyword) {
          //判断是否有值,如果有值,将值添加到 location 对象中
          location.params = { keyword }; //解构赋值写法 相当于 keyword:keyword
        }

        // 跳转到search
        // 如果当前在Search, 使用replace(), 否则使用push
        if (this.$route.name === "search") {
          this.$router.replace(location);
        } else {
          this.$router.push(location);
        }

        //跳转之后隐藏以及列表 正好调用之前定义的方法 hideCategorys
        this.hideCategorys();
      }
    }
  },

  computed: {
    // vuex多模块
    ...mapState({
      //计算属性值由 vuex 内部调用次回调函数(传入总的 state)得到返回值作为属性值
      //state:store的总状态
      categoryList: state => state.home.baseCategoryList
    })
  },
  created() {
    this.isShowFirst = this.$route.path === "/";
  },
  mounted() {
    //通过异步 action 获取数据到 vuex 的 atate 中
    // this.$store.dispatch("getBaseCategoryList");
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      /* 显示的过渡样式 */
      &.move-enter-active {
        transition: all 0.5s;
      }
      /* 隐藏时的样式 */
      &.move-enter {
        opacity: 0;
        height: 0;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 555px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
