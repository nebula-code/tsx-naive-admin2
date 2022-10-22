import { NIcon, NTooltip } from 'naive-ui'
import type { Component, DefineComponent, PropType } from 'vue'

const TipIcon = defineComponent({
  name: 'TipIcon',
  props: {
    title: {
      type: String as PropType<string>,
      default: '提示'
    },
    iconComp: {
      type: Object as PropType<Component>,
      required: true
    }
  },
  emits: ['clickIcon'],
  setup(props, { emit }) {
    return () => (
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        {{
          trigger: () => (
            <NIcon
              size={30}
              style={{ margin: '0 4px', cursor: 'pointer' }}
            >
              {h(props.iconComp as DefineComponent, {
                onClick: () => emit('clickIcon')
              })}
            </NIcon>
          ),
          default: () => props.title
        }}
      </NTooltip>
    )
  }
})

export default TipIcon
