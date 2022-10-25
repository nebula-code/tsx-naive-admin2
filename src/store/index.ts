import type { App } from 'vue'
import { createPinia } from 'pinia'
export { useConfigStore } from './modules/config'
export { useTagsViewStore, type View } from './modules/tagsView'

export function setupStore(app: App<Element>) {
  app.use(createPinia())
}
