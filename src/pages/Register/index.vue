<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">
          我有账号，去
          <!-- <a href="login.html" target="_blank">登陆</a> -->
          <router-link to="/login">登陆</router-link>
        </span>
      </h3>

      <ValidationObserver ref="form">
        <form>
          <div class="content">
            <label>手机号:</label>
            <ValidationProvider name="手机号" :rules="{required: true, regex: /^1\d{10}$/}">
              <template slot-scope="{errors, classes}">
                <input type="text" placeholder="请输入你的手机号" v-model="mobile" :class="classes" />
                <span class="error-msg">{{errors[0]}}</span>
              </template>
            </ValidationProvider>
          </div>

          <div class="content">
            <label>验证码:</label>

            <ValidationProvider name="验证码" :rules="{required: true, regex: /^.{4}$/}">
              <template slot-scope="{errors, classes}">
                <input type="text" placeholder="请输入验证码" v-model="code" :class="classes" />
                <!-- http://182.92.128.115 -->
                <img ref="code" src="/api/user/passport/code" alt="code" @click="updateCode" />
                <span class="error-msg">{{ errors[0] }}</span>
              </template>
            </ValidationProvider>
          </div>
          <div class="content">
            <label>登录密码:</label>
            <ValidationProvider name="密码" :rules="{required: true, min: 6, max: 10}">
              <template slot-scope="{ errors, classes }">
                <input type="password" placeholder="请输入你的登录密码" v-model="password" :class="classes" />
                <span class="error-msg">{{ errors[0] }}</span>
              </template>
            </ValidationProvider>
          </div>
          <div class="content">
            <label>确认密码:</label>
            <ValidationProvider name="确认密码" :rules="{required: true, is: password}">
              <template slot-scope="{ errors,classes}">
                <input type="password" placeholder="请输入确认密码" v-model="password2" :class="classes" />
                <span class="error-msg">{{ errors[0] }}</span>
              </template>
            </ValidationProvider>
          </div>
          <div class="controls">
            <ValidationProvider name="协议" :rules="{oneOf: [true]}">
              <template slot-scope="{ errors,classes}">
                <input name="m1" type="checkbox" v-model="isAgree" :class="classes" />
                <span>同意协议并注册《尚品汇用户协议》</span>
                <span class="error-msg">{{errors[0]}}</span>
              </template>
            </ValidationProvider>
          </div>

          <div class="btn">
            <button @click.prevent="register">完成注册</button>
          </div>
        </form>
      </ValidationObserver>

      <!-- 底部 -->
      <div class="copyright">
        <ul>
          <li>关于我们</li>
          <li>联系我们</li>
          <li>联系客服</li>
          <li>商家入驻</li>
          <li>营销中心</li>
          <li>手机尚品汇</li>
          <li>销售联盟</li>
          <li>尚品汇社区</li>
        </ul>
        <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
        <div class="beian">京ICP备19006430号</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      mobile: "", //手机号
      code: "", //一次性图形验证码
      password: "", //密码
      password2: "", //确认密码
      isAgree: false //同意协议
    };
  },
  methods: {
    register() {
      this.$refs.form.validate().then(async success => {
        if (!success) {
          return;
        }

        const { mobile, password, code } = this;

        // 2. 发送注册的请求
        try {
          await this.$store.dispatch("register", {
            mobile,
            password,
            code
          });
          // 3.1. 如果成功了, 跳转到登陆的界面
          this.$router.replace("/login");
          console.log("注册成功");
        } catch (error) {
          // 3.2. 如果失败了, 提示文本
          alert(error.message);
        }
      });
    },
    //刷新验证码
    updateCode() {
      //更新验证码,重新指定src的路径,让浏览器再次发送请求,就可以刷新
      this.$refs.code.src = "/api/user/passport/code";
      //这种方式在移动端无效,必须有值的变化才可以
    }
  }
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
