import { NButton } from 'naive-ui'

const HomeView = defineComponent({
  name: 'HomeView',
  setup() {
    let count = $ref(11)
    return () => (
      <div>
        {'home'}
        <NButton onClick={() => count++}>{count}</NButton>
      </div>
    )
  }
})

export default HomeView
