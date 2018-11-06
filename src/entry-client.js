import createApp from './app'

let { app, router } = createApp()

router.onReady(() => {
  app.$mount('#app')
})
