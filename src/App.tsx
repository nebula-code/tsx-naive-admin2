import { darkTheme, NConfigProvider } from 'naive-ui'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <NConfigProvider theme={null}>
        <RouterView />
      </NConfigProvider>
    )
  }
})
