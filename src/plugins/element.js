import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
    // 进行全局挂载： 为了方便使用Message 组件弹窗，将这个挂载到全局的实例上
Vue.prototype.$message = Message