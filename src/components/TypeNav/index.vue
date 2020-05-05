<template>
  <div class="menu">
    <div class="bottom_nav">
      <ul>
        <!-- L22 R26 -->
        <li>
          <a href="javascript:;">服装城</a>
        </li>
        <li>
          <a href="javascript:;">美妆馆</a>
        </li>
        <li>
          <a href="javascript:;">尚品汇超市</a>
        </li>
        <li>
          <a href="javascript:;">全球购</a>
        </li>
        <li>
          <a href="javascript:;">闪购</a>
        </li>
        <li>
          <a href="javascript:;">团购</a>
        </li>
        <li>
          <a href="javascript:;">有趣</a>
        </li>
        <li>
          <a href="javascript:;">秒杀</a>
        </li>
      </ul>
    </div>
    <div class="left_list">
      <!-- 210   460 -->
      <div class="commodity">
        <p>全部商品分类</p>
      </div>
      <div class="sort">
        <div class="all-sort-list2">
          <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
            <h3>
              <a href>{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dt>
                    <a href>{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a href>{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  computed: {
    // vuex多模块
    ...mapState({
      //计算属性值由 vuex 内部调用次回调函数(传入总的 state)得到返回值作为属性值
      //state:store的总状态
      categoryList: state => state.home.baseCategoryList
    })
  },
  mounted() {
    //通过异步 action 获取数据到 vuex 的 atate 中
    this.$store.dispatch("getBaseCategoryList");
  }
};
</script>

<style lang="less" scoped>
.bottom_nav {
  position: absolute;
  left: 0;
  top: -45px;
  width: 1200px;
  height: 45px;
  margin: 0 auto;
  // background: pink;
  float: left;

  ul {
    // width: 210px+26px;
    margin-left: 210px;
    height: 100%;
    // background: skyblue;
    float: left;

    li {
      float: left;
      font-size: 16px;
      margin: 0 26px 0 22px;
      text-align: center;
      line-height: 45px;

      a {
        color: #333;
      }
    }
  }
}

.left_list {
  width: 210px;
  height: 460px;
  background: #fafafa;
  position: absolute;
  left: 0;
  top: -47px;
  font-size: 14px;

  .commodity {
    width: 100%;
    height: 45px;
    background: #ea4a36;

    p {
      color: #fff;
      font-weight: 700;
      text-align: center;
      line-height: 45px;
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

            & > dl {
              border-top: 1px solid #eee;
              padding: 6px 0;
              overflow: hidden;
              zoom: 1;

              &.fore {
                border-top: 0;
              }

              & > dt {
                float: left;
                width: 54px;
                line-height: 22px;
                text-align: right;
                padding: 3px 6px 0 0;
                font-weight: 700;
                font-size: 12px;
              }

              & > dd {
                float: left;
                width: 415px;
                padding: 3px 0 0;
                overflow: hidden;
                font-size: 12px;

                em {
                  float: left;
                  height: 14px;
                  line-height: 14px;
                  padding: 0 8px;
                  margin-top: 5px;
                  border-left: 1px solid #ccc;
                  font-size: 12px;
                }
              }
            }
          }
        }

        &:hover {
          .item-list {
            display: block;
          }
        }
      }
    }
  }
}
</style>
