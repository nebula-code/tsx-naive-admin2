import { useRefresh } from '@/hooks'
import type { View } from '@/store'
import type { DropdownOption } from 'naive-ui'

export interface ContextOptions {
  refresh: (view: View) => void
  delTag: (view: View) => void
  delRightTags: (view: View) => void
  delOtherTags: (view: View) => void
  delAllTags: () => void
}

export function useContextMenu(options: ContextOptions) {
  const { refresh, delTag, delRightTags, delOtherTags, delAllTags } = options
  const route = useRoute()
  const router = useRouter()

  let showDrop = $ref(false)
  let x = $ref(0)
  let y = $ref(0)
  let currentView = $ref<View>()

  const dropMenus = [
    {
      label: '刷新页面',
      key: 'refresh',
      handler: (view: View) => refresh(view)
    },
    {
      label: '关闭当前',
      key: 'current',
      handler: (view: View) => delTag(view)
    },
    {
      label: '关闭右侧',
      key: 'right',
      handler: (view: View) => delRightTags(view)
    },
    {
      label: '关闭其它',
      key: 'other',
      handler: (view: View) => delOtherTags(view)
    },
    {
      label: '关闭所有',
      key: 'all',
      handler: () => delAllTags()
    }
  ]

  const handleSelect = async (key: string, option: DropdownOption) => {
    if (option.handler) {
      await (option.handler as Function)(toRaw(currentView))
    }
    showDrop = false
  }

  const handleContextmenu = async (e: MouseEvent, tag: View) => {
    currentView = tag
    e.preventDefault()
    showDrop = false
    await nextTick()
    showDrop = true
    x = e.clientX
    y = e.clientY
  }

  const handleClickoutside = () => {
    showDrop = false
  }

  return $$({
    dropMenus,
    showDrop,
    x,
    y,
    handleSelect,
    handleContextmenu,
    handleClickoutside
  })
}
