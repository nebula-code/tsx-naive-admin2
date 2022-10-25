import { HomeOutlined } from '@vicons/antd'
import HomeView from '@/views/home/home-view'
import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/',
  name: 'home',
  component: HomeView,
  meta: {
    icon: HomeOutlined,
    title: '首页',
    affix: true,
    noKeepAlive: true
  }
} as RouteRecordRaw
