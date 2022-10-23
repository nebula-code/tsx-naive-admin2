import { NConfigProvider } from 'naive-ui'
import { RouterView } from 'vue-router'
import { ThemeMap } from './setting'
import { useConfigStore } from './store/modules/config'

export default defineComponent({
  name: 'App',
  setup() {
    const configStore = useConfigStore()

    return () => (
      <NConfigProvider
        theme={
          configStore.theme === ThemeMap.DARK ? configStore.themeStyle : null
        }
      >
        <RouterView />
      </NConfigProvider>
    )
  }
})
