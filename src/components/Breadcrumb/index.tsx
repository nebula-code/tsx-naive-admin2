import { NBreadcrumb, NBreadcrumbItem, NIcon } from 'naive-ui'
import type { Component, PropType } from 'vue'

const Breadcrumb = defineComponent({
  name: 'BaseBreadcrumb',
  props: {
    showBreadIcon: Boolean as PropType<boolean>
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const homeRoute = $computed(() =>
      router.getRoutes().filter((route) => route.name === 'home')
    )

    const breadList = $computed(() =>
      homeRoute
        .concat(
          route.matched.filter((i) => i.name !== 'root' && i.name !== 'home')
        )
        .map((item) => ({
          title: item.meta.title,
          icon: item.meta.icon as Component,
          href: item.path,
          // clickable: !!item.redirect && !!item.children.length
          clickable: item.name === 'home'
        }))
    )

    return () => (
      <NBreadcrumb>
        {breadList.map((bread) => (
          <NBreadcrumbItem
            href={bread.clickable ? bread.href : undefined}
            clickable={bread.clickable}
            key={bread.href}
          >
            {props.showBreadIcon && <NIcon component={bread.icon} />}
            {bread.title}
          </NBreadcrumbItem>
        ))}
      </NBreadcrumb>
    )
  }
})

export default Breadcrumb
