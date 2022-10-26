import { useTagsViewStore } from '@/store'
import { KeepAlive, Suspense, Transition, type VNode } from 'vue'
import { RouterView } from 'vue-router'

const AppMain = defineComponent({
  name: 'AppMain',
  props: {
    show: Boolean
  },
  setup(props) {
    const { cachedViews } = $(storeToRefs(useTagsViewStore()))

    return () => (
      <>
        {props.show && (
          <RouterView>
            {{
              default: ({ Component }: { Component: VNode }) => (
                <Transition
                  mode="out-in"
                  name="fade"
                >
                  <KeepAlive>
                    {h(Component)}
                    {/* <Suspense>
                      {{
                        default: h(Component),
                        fallback: () => '正在加载。。。'
                      }}
                    </Suspense> */}
                  </KeepAlive>
                </Transition>
              )
            }}
          </RouterView>
        )}
      </>
    )
  }
})

export default AppMain
