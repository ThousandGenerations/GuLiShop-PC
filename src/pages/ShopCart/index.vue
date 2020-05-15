<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item) in cartList" :key="item.id">
          <li class="cart-list-con1">
            <!-- 单选框==> 判断其isCheced是不是===1 ===1就选中 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked === 1"
              @change="checkCartItem(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <!-- 点击传item和-1(减商品数量) -->
            <a href="javascript:void(0)" class="mins" @click="changeItemNum(item, -1)">-</a>
            <input
              autocomplete="off"
              type="text"
              value="1"
              minnum="1"
              class="itxt"
              :value="item.skuNum"
              @change="changeItemNum(item,$event.target.value*1 - item.skuNum)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeItemNum(item, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.cartPrice * item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click.prevent="deleteCartItem(item)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click.prevent="deleteAllItem">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{totalCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ShopCart",
  computed: {
    ...mapState({
      cartList: state => state.shopCart.cartList
    }),
    ...mapGetters(["totalCount", "totalPrice"]),
    isAllChecked: {
      get() {
        return this.cartList.every(item => item.isChecked === 1); //所有元素都满足返回true
      },
      async set(value) {
        try {
          const result = await this.$store.dispatch("checkAllCartItem", value);
          //请求成功重新获取数据列表
          this.$store.dispatch("getCartList");
        } catch (error) {
          alert(error.message);
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch("getCartList");
  },
  methods: {
    async changeItemNum(item, numChange) {
      try {
        //如果修改数量后结果小于1 直接结束
        if (item.skuNum + numChange < 1) return;
        //分发异步action
        await this.$store.dispatch("addToCart3", {
          skuId: item.skuId,
          skuNum: numChange
        });
        //成功之后重新发送请求显示最新数据
        this.$store.dispatch("getCartList");
      } catch (error) {
        //异步请求失败了
        alert(error.message);
      }
    },
    /* 
      改变指定购物项的勾选状态
      */
    async checkCartItem(item) {
      // 准备skuId, isChecked
      const skuId = item.skuId;
      const isChecked = item.isChecked === 1 ? 0 : 1;
      try {
        // 分发一个异步action
        await this.$store.dispatch("checkCartItem", { skuId, isChecked });
        // 异步请求操作成功了
        this.$store.dispatch("getCartList");
      } catch (error) {
        // 异步请求操作失败了
        alert(error.message);
      }
    },
    //删除购物车中的商品
    async deleteCartItem(item) {
      //准备skuId
      const skuId = item.skuId;
      console.log(skuId);
      try {
        //分发异步action
        await this.$store.dispatch("deleteCartItem", skuId);
        //成功刷新页面
        this.$store.dispatch("getCartList");
      } catch (error) {
        alert(error.message);
      }
    },
    async deleteAllItem() {
      // console.log(this.cartList);
      // const arr =
      // const arr = [];
      // this.cartList.forEach(item => {
      //   const skuid = item.skuId;
      //   arr.push(skuId);
      // });
      try {
        const result = await this.$store.dispatch("deleteAllCartItem");
        //请求成功重新获取数据列表
        this.$store.dispatch("getCartList");
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>