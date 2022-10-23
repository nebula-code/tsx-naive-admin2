import BlankLayout from '@/layout/BlankLayout'
import { AppstoreFilled, DashboardFilled, PieChartFilled } from '@vicons/antd'
import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'dashboard',
  name: 'dashboard',
  redirect: 'workplace',
  component: BlankLayout,
  meta: {
    icon: AppstoreFilled,
    title: '仪表管理'
  },
  children: [
    {
      path: 'workplace',
      name: 'workplace',
      component: () => import('@/views/dashboard/work-place'),
      meta: {
        role: ['*'],
        title: '工作站',
        icon: DashboardFilled
      }
    },
    {
      path: 'monitor',
      name: 'monitor',
      component: () => import('@/views/dashboard/monitor-view'),
      meta: {
        role: ['*'],
        title: '仪表盘',
        icon: PieChartFilled
      }
    }
  ]
} as RouteRecordRaw
