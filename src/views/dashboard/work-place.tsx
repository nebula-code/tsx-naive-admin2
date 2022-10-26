import { NButton } from 'naive-ui'

const WorkPlace = defineComponent({
  name: 'WorkPlace',
  setup() {
    let count = $ref(0)
    return () => (
      <div>
        {'home'}
        <NButton onClick={() => count++}>{count}</NButton>
      </div>
    )
  }
})

export default WorkPlace
