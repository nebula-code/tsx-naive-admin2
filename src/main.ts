import { createApp } from 'vue'
import { setupStore } from './store'
import { setupRouterGuard, setupRouter } from './router'

import App from './App.vue'

// import './assets/main.css'
import './style/main.css'

function bootstrap() {
  const app = createApp(App)

  // store
  setupStore(app)
  // router guard
  setupRouterGuard()
  // router
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
