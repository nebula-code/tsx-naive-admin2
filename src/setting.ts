export type TriggerType = boolean | 'bar' | 'arrow-circle'

export interface SettingConfig {
  triggerType: TriggerType | 'custom'
  bordered: boolean
  isFixHeader: boolean
  showTagsView: boolean
  showLogo: boolean
}

const settings: SettingConfig = {
  triggerType: 'custom',
  bordered: true,
  isFixHeader: true,
  showTagsView: true,
  showLogo: true
}

export default settings
