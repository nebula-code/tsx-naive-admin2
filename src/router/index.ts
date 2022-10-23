import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PageLayout from '@/layout/PageLayout'
import appRoutes from './modules'
import login from './modules/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: PageLayout,
      children: appRoutes
    },
    login
  ]
})

export function setupRouterGuard() {
  router.beforeEach((to, from, next) => {
    console.log('router guard')
    next()
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router)
}
