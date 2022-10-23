import { KeepAlive, Suspense, Transition, type VNode } from 'vue'
import { RouterView } from 'vue-router'

const AppMain = defineComponent({
  name: 'AppMain',
  setup() {
    return () => (
      <RouterView>
        {{
          default: ({ Component }: { Component: VNode }) => (
            <Transition
              mode="out-in"
              name="fade"
            >
              <KeepAlive>
                <Suspense>
                  {{
                    default: () => h(Component),
                    fallback: () => '正在加载。。。'
                  }}
                </Suspense>
              </KeepAlive>
            </Transition>
          )
        }}
      </RouterView>
    )
  }
})

export default AppMain
