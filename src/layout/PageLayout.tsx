import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NH2,
  NAvatar,
  NDropdown,
  NButton,
  NEl,
  NIcon
} from 'naive-ui'
import {
  GithubOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@vicons/antd'
import { renderIcon } from '@/utils'
import { useFullscreen } from '@/hooks'
import TipIcon from '@/components/TipIcon'
import GlobalDraw from '@/components/GlobalDraw'
import TheLogo from './components/TheLogo'
import BaseMenu from './components/BaseMenu'
import styles from './style/PageLayout.module.css'
import AppMain from './components/AppMain'
import { useConfigStore } from '@/store/modules/config'
import { Fragment } from 'vue'

enum DropdownKey {
  PROFILE = 'profile',
  EDITSETTING = 'editSetting',
  LOGOUT = 'logout'
}

const PageLayout = defineComponent({
  name: 'PageLayout',
  setup() {
    const goHref = () => {
      window.open(`https://www.baidu.com`)
    }

    const dropOptions = [
      {
        label: '用户资料',
        key: 'profile',
        icon: renderIcon(UserOutlined)
      },
      {
        label: '编辑设置',
        key: 'editSetting',
        icon: renderIcon(SettingOutlined)
      },
      {
        type: 'divider',
        key: 'd1'
      },
      {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogoutOutlined)
      }
    ]

    // globalDraw
    let showDraw = $ref(false)

    const handleSelect = (key: string): void => {
      switch (key) {
        case DropdownKey.PROFILE:
          console.log(DropdownKey.PROFILE)
          break
        case DropdownKey.EDITSETTING:
          console.log(DropdownKey.EDITSETTING)
          showDraw = true
          break
        case DropdownKey.LOGOUT:
          console.log(DropdownKey.LOGOUT)
          break
      }
    }

    // 全屏
    const { isFullscreen, toggle } = $(useFullscreen())

    // collapsed
    let collapsed = $ref(true)

    const toggleCollapsed = () => {
      collapsed = !collapsed
    }

    // configStore
    const configStore = useConfigStore()
    const { isFixHeader, bordered, triggerType, showTagsView } = $(
      storeToRefs(configStore)
    )

    return () => (
      <NLayout
        class={styles['page-layout']}
        hasSider
        position="absolute"
      >
        <NLayoutSider
          width={240}
          class={styles['page-layout-sider']}
          nativeScrollbar={false}
          bordered={bordered}
          showTrigger={triggerType}
          collapseMode="width"
          collapsedWidth={64}
          collapsed={collapsed}
          onExpand={() => (collapsed = false)}
          onCollapse={() => (collapsed = true)}
        >
          <TheLogo
            collapsed={collapsed}
            style={{
              width: collapsed ? '64px' : '240px',
              borderRight: bordered && '1px solid var(--n-border-color)',
              borderBottom: bordered && '1px solid var(--n-border-color)'
            }}
          />

          <BaseMenu />
        </NLayoutSider>

        <NLayout nativeScrollbar={false}>
          <NLayoutHeader
            bordered={bordered}
            style={{ height: showTagsView ? '88px' : '50px' }}
          >
            <div
              class={styles['page-layout-header']}
              style={{ height: '50px' }}
            >
              {!triggerType ? (
                <NEl
                  tag="div"
                  class={styles['left-board']}
                >
                  <NIcon
                    size={22}
                    style={{ marginTop: '4px' }}
                  >
                    {h(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      onClick: toggleCollapsed
                    })}
                  </NIcon>
                </NEl>
              ) : (
                <div></div>
              )}

              <div class={styles['right-board']}>
                <div class={styles['icon-tools']}>
                  {isFullscreen ? (
                    <TipIcon
                      title="退出全屏"
                      iconComp={FullscreenExitOutlined}
                      onClickIcon={toggle}
                    />
                  ) : (
                    <TipIcon
                      title="进入全屏"
                      iconComp={FullscreenOutlined}
                      onClickIcon={toggle}
                    />
                  )}

                  <TipIcon
                    title="GitHub"
                    iconComp={GithubOutlined}
                    onClickIcon={goHref}
                  />
                </div>

                <NDropdown
                  options={dropOptions}
                  showArrow
                  onSelect={handleSelect}
                  trigger={'click'}
                >
                  <NAvatar
                    style={{ cursor: 'pointer' }}
                    round
                    size="medium"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                  />
                </NDropdown>
              </div>
            </div>
            <div class={styles['tag-views']}>111</div>
          </NLayoutHeader>

          <NLayoutContent
            position={isFixHeader ? 'absolute' : 'static'}
            nativeScrollbar={false}
            contentStyle={{ padding: '20px' }}
            style={{ marginTop: isFixHeader ? '88px' : 0 }}
          >
            <NButton onClick={() => (showDraw = true)}>展开</NButton>

            <AppMain />
          </NLayoutContent>
        </NLayout>

        <GlobalDraw v-model:show={showDraw} />
      </NLayout>
    )
  }
})

export default PageLayout
