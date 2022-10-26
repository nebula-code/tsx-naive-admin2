export { useFullscreen } from '@vueuse/core'

export const useRefresh = () => {
  let show = $ref(true)

  const refresh = async () => {
    show = false
    await nextTick()
    show = true
  }
  return $$({ show, refresh })
}
