import { useTagsViewStore } from '@/store'
import { KeepAlive, Suspense, Transition, type VNode } from 'vue'
import { RouterView } from 'vue-router'

const AppMain = defineComponent({
  name: 'AppMain',
  setup() {
    const { cachedViews } = $(storeToRefs(useTagsViewStore()))

    return () => (
      <RouterView>
        {{
          default: ({ Component }: { Component: VNode }) => (
            <Transition
              mode="out-in"
              name="fade"
            >
              <KeepAlive include={cachedViews}>
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
