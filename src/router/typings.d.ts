import type { Component } from 'vue'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    icon: string | Component
    title: string
    role?: string[]
    keepAlive?: boolean
    affix?: boolean
  }
}
