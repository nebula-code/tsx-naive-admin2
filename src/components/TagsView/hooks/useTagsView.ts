import { useTagsViewStore, type View } from '@/store'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const handleView = (route: RouteLocationNormalizedLoaded) => ({
  ...route.meta,
  path: route.path,
  fullPath: route.fullPath,
  name: route.name as string,
  viewName: route.matched[route.matched.length - 1].components?.default.name
})

export function useTagsView() {
  const route = useRoute()
  const router = useRouter()
  const tagsViewStore = useTagsViewStore()
  const { visitedViews } = $(storeToRefs(tagsViewStore))
  const refreshLoad = inject('refresh')

  // affixTags
  const affixTags = $computed(() =>
    router
      .getRoutes()
      .filter((i) => i.meta.affix)
      .map((i) => ({
        ...i.meta,
        path: i.path,
        fullPath: i.path,
        name: i.name as string,
        viewName: i.components?.default.name
      }))
  )

  // init tags
  const initTags = () => {
    affixTags.forEach((tag) => {
      tagsViewStore.addView(tag)
    })
  }

  onMounted(() => {
    initTags()
    addTag(route)
  })

  // add tag
  const addTag = (route: RouteLocationNormalizedLoaded) => {
    tagsViewStore.addView(handleView(route))
  }

  watch(route, () => {
    addTag(route)
  })

  // del tag
  const delTag = (view: View) => {
    const ret = tagsViewStore.delView(toRaw(view))
    toLastTag(ret!)
  }
  // to last tag
  const toLastTag = (i: number) => {
    router.push(visitedViews[i - 1])
  }

  // click current tag
  const clickTag = (view: View) => {
    view = toRaw(view)
    router.push(view.path)
  }

  // refresh
  const refresh = (view: View) => {
    tagsViewStore.delCachedView(view)
    if (view.path === route.path) {
      // eslint-disable-next-line no-extra-semi
      ;(refreshLoad as Function)()
    } else router.push(view.path)
  }

  // del tight tags
  const delRightTags = (view: View) => {
    tagsViewStore.delRightViews(view)
    router.push(view.path)
  }

  // del other tags
  const delOtherTags = (view: View) => {
    tagsViewStore.delOtherViews(view)
    router.push(view.path)
  }

  // del all tags
  const delAllTags = () => {
    tagsViewStore.delAllViews()
    router.push('/')
  }

  return $$({
    visitedViews,
    refresh,
    delTag,
    clickTag,
    delRightTags,
    delOtherTags,
    delAllTags
  })
}
