import { useConfigStore } from '@/store/modules/config'
import {
  NDivider,
  NDrawer,
  NDrawerContent,
  NSelect,
  NSpace,
  NSwitch
} from 'naive-ui'
import type { PropType } from 'vue'

const DescSetting = defineComponent({
  name: 'DescSetting',
  props: {
    title: String as PropType<string>
  },
  setup(props, { slots }) {
    return () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '16px'
        }}
      >
        <span>{props.title}</span>
        {slots.default!()}
      </div>
    )
  }
})

const collapseOptions = [
  { label: '竖线', value: 'bar' },
  { label: '圆角', value: 'arrow-circle' },
  { label: '自定义', value: 'custom' }
]

const GlobalDraw = defineComponent({
  name: 'GlobalDraw',
  props: {
    showDraw: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props) {
    // configStore
    const configStore = useConfigStore()
    const { isFixHeader, bordered, triggerType, showLogo, showTagsView } = $(
      storeToRefs(configStore)
    )

    return () => (
      <NDrawer
        show={props.showDraw}
        width={330}
        placement={'right'}
      >
        <NDrawerContent title="编辑设置">
          <NDivider>配置项</NDivider>
          <NSpace vertical>
            <DescSetting title="显示 Logo">
              <NSwitch v-model:value={showLogo} />
            </DescSetting>
            <DescSetting title="固定头部">
              <NSwitch v-model:value={isFixHeader} />
            </DescSetting>
            <DescSetting title="显示多标签">
              <NSwitch v-model:value={showTagsView} />
            </DescSetting>
            <DescSetting title="显示边框线">
              <NSwitch v-model:value={bordered} />
            </DescSetting>
            <DescSetting title="折叠风格">
              <NSelect
                style={{ width: '50%' }}
                v-model:value={triggerType}
                options={collapseOptions}
              />
            </DescSetting>
          </NSpace>
        </NDrawerContent>
      </NDrawer>
    )
  }
})

export default GlobalDraw
