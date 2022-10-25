import { NDropdown, NSpace, NTag } from 'naive-ui'
import { useContextMenu } from './hooks/useContextMenu'
import { useTagsView } from './hooks/useTagsView'

const TagsView = defineComponent({
  name: 'TagsView',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const {
      visitedViews,
      refresh,
      delTag,
      clickTag,
      delRightTags,
      delOtherTags,
      delAllTags
    } = $(useTagsView())

    const {
      handleContextmenu,
      handleSelect,
      handleClickoutside,
      dropMenus,
      showDrop,
      x,
      y
    } = $(
      useContextMenu({
        refresh,
        delTag,
        delRightTags,
        delOtherTags,
        delAllTags
      })
    )

    return () => (
      <NSpace size={'small'}>
        {visitedViews.map((i) => (
          <NTag
            closable={!i.affix}
            type={i.fullPath === route.fullPath ? 'success' : 'default'}
            style={{ cursor: 'pointer' }}
            onClose={() => delTag(i)}
          >
            <span
              onClick={() => clickTag(i)}
              onContextmenu={(e) => handleContextmenu(e, i)}
            >
              {i.title}
            </span>
          </NTag>
        ))}
        <NDropdown
          placement="bottom-start"
          trigger="manual"
          show={showDrop}
          x={x}
          y={y}
          options={dropMenus}
          onSelect={handleSelect}
          onClickoutside={handleClickoutside}
        />
      </NSpace>
    )
  }
})

export default TagsView
