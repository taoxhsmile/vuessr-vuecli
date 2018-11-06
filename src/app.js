import Vue from 'vue'
import createRouter from './router'
import App from './App.vue'

// 实例 每次请求都会创建新的实例

export default (context) => {

  const router = createRouter()

  const app = new Vue({
    router,
    components: { App },
    template: '<App/>'
  })
  return { router, app }

}