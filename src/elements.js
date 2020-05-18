/* 
element-ui的相关配置
*/
import Vue from 'vue'
/* 完整引入 */
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)

/* 按需引入 */
import {
  Pagination,
  MessageBox,
  Message,
  Button
} from 'element-ui'

// 注册全局组件
Vue.component(Pagination.name, Pagination) // <el-pagination>
Vue.component(Button.name, Button) // <el-button>

/* 
UI组件库的2种组件
1. 标签组件: 通过写其对应的组件标签来使用(在使用前必须先注册)   如: Pagination
2. 函数/对象组件: 执行函数或调用对象的方法来显示特定UI效果  如: MessageBox/Message
*/
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message