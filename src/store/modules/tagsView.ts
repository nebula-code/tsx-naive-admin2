import type { RouteMeta } from 'vue-router'

export interface View extends RouteMeta {
  path: string
  fullPath: string
  name: string
  viewName?: string
}

export const useTagsViewStore = defineStore('tagsView', () => {
  let visitedViews = $ref<View[]>([])
  let cachedViews = $ref<string[]>([])

  // add
  const addView = (view: View) => {
    addVisitedView(view)
    if (view.viewName) addCachedView(view)
  }
  const addVisitedView = (view: View) => {
    if (visitedViews.some((v) => v.path === view.path)) return
    visitedViews.push(view)
  }
  const addCachedView = (view: View) => {
    if (
      view.noKeepAlive ||
      !view.viewName ||
      cachedViews.includes(view.viewName)
    )
      return
    // 通过组件名称进行缓存，如果没有设置不缓存
    cachedViews.push(view.viewName)
  }

  // del
  const delView = (view: View) => {
    view.viewName && delCachedView(view)
    return delVisitedView(view)
  }
  const delVisitedView = (view: View) => {
    for (const [i, v] of visitedViews.entries()) {
      if (v.path === view.path) {
        visitedViews.splice(i, 1)
        return i
      }
    }
  }
  const delCachedView = (view: View) => {
    const viewIndex = cachedViews.indexOf(view.viewName!)
    viewIndex > -1 && cachedViews.splice(viewIndex, 1)
  }

  // del right views
  const delRightViews = (view: View) => {
    const viewIndex = visitedViews.findIndex((v) => v.path === view.path)
    if (viewIndex === -1) return
    visitedViews.splice(viewIndex + 1)
    cachedViews.splice(viewIndex)
  }

  // del other views
  const delOtherViews = (view: View) => {
    visitedViews = visitedViews.filter((v) => v.affix || v.path === view.path)
    const viewIndex = cachedViews.indexOf(view.name)
    cachedViews =
      viewIndex > -1 ? cachedViews.slice(viewIndex, viewIndex + 1) : []
  }

  // del all views
  const delAllViews = () => {
    visitedViews = visitedViews.filter((v) => v.affix)
    cachedViews = []
  }

  return $$({
    visitedViews,
    cachedViews,
    addView,
    delView,
    delCachedView,
    delRightViews,
    delOtherViews,
    delAllViews
  })
})
