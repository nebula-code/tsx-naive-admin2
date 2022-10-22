import { NDrawer, NDrawerContent } from 'naive-ui'
import type { PropType } from 'vue'

const GlobalDraw = defineComponent({
  name: 'GlobalDraw',
  props: {
    showDraw: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props) {
    return () => (
      <NDrawer
        show={props.showDraw}
        width={330}
        placement={'right'}
      >
        <NDrawerContent title="编辑设置"></NDrawerContent>
      </NDrawer>
    )
  }
})

export default GlobalDraw
