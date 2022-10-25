export { useFullscreen } from '@vueuse/core'

export const useRefresh = () => {
  let show = $ref(true)

  const refresh = () => {
    show = false
    nextTick(() => {
      show = true
    })
  }
  return { refresh }
}
