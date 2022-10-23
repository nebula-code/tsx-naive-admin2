import { useTagsViewStore } from '@/store'
import type { Component } from 'vue'
import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router'

export interface TagView {
  affix?: boolean
  fullPath: string
  icon?: Component
  name: string
  title: string
}

export function useTagsView() {
  const route = useRoute()
  const router = useRouter()
  // const tagsViewStore = useTagsViewStore()
  // const { visitedTags } = $(storeToRefs(tagsViewStore))

  const visitedTagNames = $ref<Set<RouteLocationNormalizedLoaded['name']>>(
    new Set()
  )
  let visitedTagViews = $ref<TagView[]>([])

  // affixTags
  const affixTags = $computed(() =>
    router.getRoutes().filter((i) => i.meta.affix)
  )

  // init tags
  const initTags = () => {
    affixTags.forEach((route) => {
      visitedTagNames.add(route.name)
      visitedTagViews.push({
        ...route.meta,
        fullPath: route.path,
        name: route.name
      } as TagView)
    })
  }

  // addTag
  const addTag = (route: RouteLocationNormalizedLoaded) => {
    if (!visitedTagNames.has(route.name)) {
      visitedTagNames.add(route.name)
      visitedTagViews.push({
        ...route.meta,
        fullPath: route.path,
        name: route.name
      } as TagView)
    }
  }

  // delTag
  const delTag = (tagView: TagView) => {
    visitedTagNames.delete(tagView.name)
    visitedTagViews = visitedTagViews.filter(
      (view) => view.name !== tagView.name
    )
    // toLastTag
    toLastTag()
  }

  // toLastTag
  const toLastTag = () => {
    router.push(toRaw(visitedTagViews[visitedTagViews.length - 1]))
  }

  watch(route, () => {
    addTag(route)
  })

  onMounted(() => {
    initTags()
    addTag(route)
  })

  return $$({
    visitedList: visitedTagViews,
    delTag
  })
}
