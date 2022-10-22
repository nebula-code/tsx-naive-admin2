import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PageLayout from '@/layout/PageLayout'
import appRoutes from './modules'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: PageLayout,
      children: appRoutes
    }
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
