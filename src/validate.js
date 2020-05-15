/* 
使用vee-validate进行表单验证
*/
import Vue from 'vue'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  localize,
  configure
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh_CN from 'vee-validate/dist/locale/zh_CN.json'
import merge from 'lodash/merge' // 用于合并多个对象

// 配置错误提示文本的样式类名
configure({
  classes: {
    valid: 'is-valid', // 验证合法的类名
    invalid: 'is-invalid', // 验证不合法的类名
  }
})

// 注册所有规则
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

// 将自定义的message与内置的中文message合并
const locale = merge(zh_CN, {
  messages: {
    is: '{_field_}必须与密码相同',
    oneOf: '{_field_}必须同意'
  }
})
// 指定中文提示信息
localize('zh_CN', locale)

// 注册用于校验的组件
Vue.component('ValidationProvider', ValidationProvider) // 用于输入过程中实时校验
Vue.component('ValidationObserver', ValidationObserver) // 用于点击按钮时统一校验

/* 
https://github.com/logaretm/vee-validate 基本使用
https://logaretm.github.io/vee-validate/guide/rules.html#importing-the-rules  注册所有校验规则
https://logaretm.github.io/vee-validate/guide/state.html#css-classes 校验失败的样式类名
https://logaretm.github.io/vee-validate/guide/forms.html#basic-example 提交表单时统一校验
https://logaretm.github.io/vee-validate/guide/localization.html 指定本地(中文)提示信息
*/