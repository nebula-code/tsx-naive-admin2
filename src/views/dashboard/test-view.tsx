import { NButton } from 'naive-ui'
import { KeepAlive } from 'vue'

const CompA = defineComponent({
  name: 'CompA',
  setup() {
    let count = $ref(0)
    return () => (
      <>
        <p>Current component: A</p>
        <span>count: {count}</span>
        <button onClick={() => count++}>+</button>
      </>
    )
  }
})
const CompB = defineComponent({
  name: 'CompB',
  setup() {
    const msg = $ref('')
    return () => (
      <>
        <p>Current component: B</p>
        <span>Message is: {msg}</span>
        <input v-model={msg}></input>
      </>
    )
  }
})

const TestView = defineComponent({
  name: 'TestView',
  setup() {
    // let count = $ref(0)
    // const current = $ref('')
    const current = $shallowRef(CompA)

    return () => (
      <div>
        {'TestView'}
        {/* <NButton onClick={() => count++}>{count}+++</NButton> */}
        <label>
          <input
            type="radio"
            v-model={current}
            value={CompA}
          />
          A
        </label>
        <label>
          <input
            type="radio"
            v-model={current}
            value={CompB}
          />
          B
        </label>
        <KeepAlive>
          {/* <component :is="current"></component> */}
          {/* <Component is={current}></Component> */}
          {h(current)}
        </KeepAlive>
      </div>
    )
  }
})

export default TestView
