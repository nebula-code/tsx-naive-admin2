import settings from '@/setting'

export const useConfigStore = defineStore('config', () => {
  const configSettings = reactive(settings)

  // const changeConfig = (key: keyof SettingConfig, value: ) => {
  //   configSettings[key] = value
  // }

  return {
    ...toRefs(configSettings)
  }
})
