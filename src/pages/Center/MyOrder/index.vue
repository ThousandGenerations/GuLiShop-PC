<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <table class="order-item" v-for="order in orders" :key="order.id">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle">
                {{order.createTime}} 订单编号：{{order.outTradeNo}}
                <span class="pull-right delete">
                  <img src="./images/delete.png" />
                </span>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in order.orderDetailList" :key="item.id">
            <td width="60%">
              <div class="typographic">
                <img :src="item.imgUrl" />
                <a href="#" class="block-text">{{item.skuName}}</a>
                <span>x{{item.skuNum}}</span>
              </div>
            </td>
            <!-- 
              template是vue在编码模板过程中解析, 不会生成真实的DOM标签
              可以利用它来包含多个一般的标签, 并对其进行统一处理, 不会增加真实DOM结构
            -->
            <template v-if="index===0">
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
              >{{order.consignee}}</td>
              <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{order.totalAmount}}</li>
                  <li>{{order.paymentWay==='ONLINE' ? '在线支付' : '货到付款'}}</li>
                </ul>
              </td>
              <td :rowspan="order.orderDetailList.length" width="8%" class="center">
                <a href="#" class="btn">{{order.orderStatus==='PAID' ? '已支付' : '未支付'}}</a>
              </td>
              <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 调用之前定义好的分页组件 利用标签属性传入对应的数据之后就能正常使用分页器 -->
    <Pagination
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      :showPageNo="5"
      @currentChange="getMyOrders"
    />
  </div>
</template>

<script>
export default {
  name: "MyOrder",
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页数量
      orders: [], // 当前页的订单列表
      total: 0 // 订单的总数量
    };
  },
  mounted() {
    this.getMyOrders();
  },
  methods: {
    //当前页码发生改变的时候改变监听的回调函数
    had(page) {
      //实际上这个函数就是在调用 getMyOrders 这个函数 传入对应页码 然后让对应函数去改变当前页码,之后去发送请求 所以可以直接在更新页码的监听中调用这个函数
      this.getMyOrders(page);
    },
    async getMyOrders(page = 1) {
      //更新当前页码
      this.currentPage = page;
      //调用接口请求函数,异步获取数据
      const result = await this.$API.reqMyOrders(page, this.pageSize);
      //成功
      if (result.code === 200) {
        //取出数据
        const { records, total } = result.data;
        //保存数据到data,过滤出订单数量大于0的系列订单
        this.orders = records.filter(item => item.orderDetailList.length > 0);
        this.total = total;
      }
    }
  }
};
</script>

<style lang="less" scoped>
//订单部分
.order-content {
  margin: 0 20px;
  color: #666;

  //标题
  .title {
    margin-bottom: 22px;
    border: 1px solid #ddd;

    h3 {
      padding: 12px 10px;
      font-size: 15px;
      background-color: #f1f1f1;
    }
  }

  //表头
  .chosetype {
    margin-bottom: 15px;
    color: #666;

    table {
      border: 1px solid #e6e6e6;
      border-collapse: separate;
      border-radius: 2px;
      width: 100%;
      max-width: 100%;
      border-spacing: 0;

      th {
        padding: 6px 8px;
        color: #666;
        font-weight: 700;
        vertical-align: bottom;
        background-color: #f4f4f4;
        line-height: 18px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        text-align: left;
      }
    }
  }

  // 表单内容
  .orders {
    font-size: 12px;

    a {
      &:hover {
        color: #4cb9fc;
      }
    }

    table {
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
      border-radius: 2px;
      width: 100%;
      margin-bottom: 18px;
      max-width: 100%;

      th {
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: bottom;
        background-color: #f4f4f4;
        font-size: 12px;
        color: #666;

        .pull-right {
          float: right;
          cursor: pointer;

          img {
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }

      td {
        font-size: 12px;
        color: #666;
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: middle;
        border: 1px solid #e6e6e6;

        &.center {
          text-align: center;
        }

        .typographic {
          img {
            float: left;
            margin-right: 10px;
            width: 100px;
            height: 100px;
          }

          a {
            float: left;
            min-width: 80px;
            max-width: 250px;
            color: #e1251b;

            &.service {
              color: #666;
            }
          }

          span {
            float: left;
            min-width: 80px;
            max-width: 250px;
            text-align: center;
          }
        }
      }
    }
  }

  // 分页
  .choose-order {
    .pagination {
      margin: 38px 0;

      ul {
        font-size: 0;
        display: inline-block;

        li {
          display: inline-block;
          padding: 4px 9px;
          font-size: 14px;
          border: 1px solid #e0e9ee;

          &.prev,
          &.next {
            background-color: #fafafa;
          }

          &.prev {
            border-right-color: #28a3ef;
          }

          &.page {
            border-color: #28a3ef;
            border-left: 0;

            &.actived {
              background-color: #28a3ef;

              a {
                color: #fff;
              }
            }
          }
        }
      }

      div {
        display: inline-block;
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>
