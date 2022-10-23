export type TriggerType = boolean | 'bar' | 'arrow-circle'
export type Theme = 'light' | 'dark' | 'menuDark'

export interface SettingConfig {
  triggerType: TriggerType | 'custom'
  bordered: boolean
  isFixHeader: boolean
  showTagsView: boolean
  showLogo: boolean
  showBread: boolean
  showBreadIcon: boolean
  theme: Theme
}

export enum ThemeMap {
  DARK = 'dark',
  LIGHT = 'light',
  MENUDARK = 'menuDark'
}

const settings: SettingConfig = {
  triggerType: 'custom',
  bordered: true,
  isFixHeader: true,
  showTagsView: true,
  showLogo: true,
  showBread: true,
  showBreadIcon: true,
  theme: ThemeMap.MENUDARK
}

export default settings
