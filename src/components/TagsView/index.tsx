import { NSpace, NTag } from 'naive-ui'
import { useTagsView, type TagView } from './hooks/useTagsView'

const TagsView = defineComponent({
  name: 'TagsView',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { visitedList: visitedTagViews, delTag } = $(useTagsView())

    const handleCloseTag = (tag: TagView) => {
      delTag(toRaw(tag))
    }
    const handleClickTag = (tag: TagView) => {
      router.push(toRaw(tag))
    }

    return () => (
      <NSpace size={'small'}>
        {visitedTagViews.map((i) => (
          <NTag
            closable={!i.affix}
            type={i.fullPath === route.fullPath ? 'success' : 'default'}
            style={{ cursor: 'pointer' }}
            onClose={() => handleCloseTag(i)}
          >
            <span onClick={() => handleClickTag(i)}>{i.title}</span>
          </NTag>
        ))}
      </NSpace>
    )
  }
})

export default TagsView
