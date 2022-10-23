import settings, { ThemeMap } from '@/setting'
import { darkTheme, useOsTheme } from 'naive-ui'

export const useConfigStore = defineStore('config', () => {
  const osTheme = $(useOsTheme())

  const configSettings = reactive({
    ...settings,
    theme: osTheme || settings.theme
  })

  const themeStyle = ref()

  watchEffect(() => {
    switch (configSettings.theme) {
      case ThemeMap.LIGHT:
        themeStyle.value = null
        break
      case ThemeMap.DARK:
        themeStyle.value = darkTheme
        break
      case ThemeMap.MENUDARK:
        themeStyle.value = darkTheme
        break

      default:
        themeStyle.value = null
        break
    }
  })

  return {
    ...toRefs(configSettings),
    themeStyle
  }
})
