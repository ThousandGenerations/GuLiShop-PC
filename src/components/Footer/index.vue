<template>
  <div>
    <footer>
      <div class="footer_list">
        <dl>
          <dt>购物指南</dt>
          <dd>购物流程</dd>
          <dd>会员介绍</dd>
          <dd>生活旅行/团购</dd>
          <dd>常见问题</dd>
          <dd>购物指南</dd>
        </dl>
        <dl>
          <dt>配送方式</dt>
          <dd>上门自提</dd>
          <dd>211限时达</dd>
          <dd>配送服务查询</dd>
          <dd>配送费收取标准</dd>
          <dd>海外配送</dd>
        </dl>
        <dl>
          <dt>支付方式</dt>
          <dd>货到付款</dd>
          <dd>在线支付</dd>
          <dd>分期付款</dd>
          <dd>邮局汇款</dd>
          <dd>公司转账</dd>
        </dl>
        <dl>
          <dt>售后服务</dt>
          <dd>售后政策</dd>
          <dd>价格保护</dd>
          <dd>退款说明</dd>
          <dd>返修/退换货</dd>
          <dd>取消订单</dd>
        </dl>
        <dl>
          <dt>de特色服务</dt>
          <dd>夺宝岛</dd>
          <dd>DIY装机</dd>
          <dd>延保服务</dd>
          <dd>尚品汇E卡</dd>
          <dd>尚品汇通信</dd>
        </dl>
        <dl>
          <dt>帮助中心</dt>
          <!-- 120 145 -->
          <dd>
            <img src="./images/wx_cz.jpg" alt />
          </dd>
        </dl>
      </div>
      <ul class="footer_bottom">
        <li>
          <a href="javascript:;">关于我们</a>
        </li>
        <li>
          <a href="javascript:;">联系我们</a>
        </li>
        <li>
          <a href="javascript:;">关于我们</a>
        </li>
        <li>
          <a href="javascript:;">商家入驻</a>
        </li>
        <li>
          <a href="javascript:;">营销中心</a>
        </li>
        <li>
          <a href="javascript:;">友情链接</a>
        </li>
        <li>
          <a href="javascript:;">关于我们</a>
        </li>
        <li>
          <a href="javascript:;">营销中心</a>
        </li>
        <li>
          <a href="javascript:;">友情链接</a>
        </li>
        <li>
          <a href="javascript:;">关于我们</a>
        </li>
      </ul>
      <div class="address">
        <p>地址：北京市昌平区宏福科技园综合楼6层</p>
        <br />
        <p>京ICP备19006430号</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="less" scoped>
footer {
  width: 100%;
  height: 320px;
  background: #eaeaea;

  .footer_list {
    width: 1200px;
    height: 204px;
    margin: 10px auto;
    padding: 20px 0 0 40px;
    border-bottom: 1px solid #e4e1e1;
    box-sizing: border-box;

    dl {
      float: left;
      margin-right: 110px;

      dt {
        font-weight: 700;
        font-size: 14px;
      }

      dd {
        margin-top: 4px;
        // margin-bottom: 2px;
      }
    }
  }

  .footer_bottom {
    width: 1200px;
    // height: 116px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    // text-align: center;
    // float: left;

    li {
      justify-content: center;
      margin-top: 20px;
      // align-self: center;
      // align-items: center;
      width: 72px;
      float: left;
    }
  }

  .address {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;
  }
}
</style>
