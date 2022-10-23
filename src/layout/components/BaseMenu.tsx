import { renderIcon } from '@/utils'
import { NMenu } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'

const BaseMenu = defineComponent({
  name: 'BaseMenu',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const rootRoute = $computed(() =>
      router.getRoutes().find((route) => route.name === 'root')
    )

    const menuOptions = $computed(() => {
      const routesList = toRaw(rootRoute)!.children

      function travel(routes: RouteRecordRaw[], layer: number): any[] {
        return routes.map((route) => {
          route.children && (route.children = travel(route.children, layer + 1))

          return {
            label: route.meta?.title,
            icon: renderIcon(route.meta?.icon as Component),
            key: route.name,
            children: route.children
          }
        })
      }
      return travel(routesList, 1)
    })

    // 菜单
    let activeMenu = $ref('')
    const handleMenuItem = (key: string) => {
      activeMenu = key
      router.push({ name: key })
    }

    watchEffect(() => {
      activeMenu = route.name as string
    })

    return () => (
      <NMenu
        indent={16}
        collapsedWidth={64}
        options={menuOptions}
        value={activeMenu}
        onUpdateValue={handleMenuItem}
      />
    )
  }
})

export default BaseMenu
