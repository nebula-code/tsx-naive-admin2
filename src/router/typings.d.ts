import type { Component } from 'vue'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string | Component
    title: string
    role?: string[]
    noKeepAlive?: boolean
    affix?: boolean
  }
}
