import { NIcon } from 'naive-ui'
import type { Component } from 'vue'

export const renderIcon = (name: Component) => {
  return () =>
    h(NIcon, null, {
      default: () => h(name)
    })
}
