import settings, { type SettingConfig } from '@/setting'

export const useConfigStore = defineStore('config', () => {
  const congfigSettings = reactive(settings)

  const changeConfig = (key: keyof SettingConfig, value: boolean) => {
    congfigSettings[key] = value
  }

  return {
    ...toRefs(congfigSettings),
    changeConfig
  }
})
