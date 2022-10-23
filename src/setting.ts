export interface SettingConfig {
  triggerType: boolean | 'bar' | 'arrow-circle'
  bordered: boolean
  isFixHeader: boolean
  showTagsView: boolean
}

const settings: SettingConfig = {
  triggerType: 'bar',
  bordered: true,
  isFixHeader: false,
  showTagsView: false
}

export default settings
