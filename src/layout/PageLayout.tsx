import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NAvatar,
  NDropdown,
  NEl,
  NIcon,
  NConfigProvider
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
import { useFullscreen, useRefresh } from '@/hooks'
import TipIcon from '@/components/TipIcon'
import GlobalDraw from '@/components/GlobalDraw'
import TheLogo from './components/TheLogo'
import BaseMenu from './components/BaseMenu'
import styles from './style/PageLayout.module.css'
import AppMain from './components/AppMain'
import { useConfigStore } from '@/store'
import Breadcrumb from '@/components/Breadcrumb'
import { config, ThemeMap } from '@/setting'
import TagsView from '@/components/TagsView'

enum DropdownKey {
  PROFILE = 'profile',
  EDITSETTING = 'editSetting',
  LOGOUT = 'logout'
}

const PageLayout = defineComponent({
  name: 'PageLayout',
  setup() {
    const router = useRouter()
    const { show, refresh } = $(useRefresh())
    provide('refresh', refresh)

    const goHref = () => {
      window.open(config.githubUrl)
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
          showDraw = true
          break
        case DropdownKey.LOGOUT:
          router.replace({ name: 'login' })
          break
      }
    }

    // 全屏
    const { isFullscreen, toggle } = $(useFullscreen())

    // collapsed
    let collapsed = $ref(false)

    const toggleCollapsed = () => {
      collapsed = !collapsed
    }

    // configStore
    const configStore = useConfigStore()
    const {
      isFixHeader,
      bordered,
      triggerType,
      showLogo,
      showTagsView,
      showBread,
      showBreadIcon,
      theme
    } = $(storeToRefs(configStore))

    // contentTop
    const contentMarginTop = $computed(() =>
      isFixHeader ? (showTagsView ? '88px' : '50px') : 0
    )
    // bordered
    const borderedStyle = $computed(() =>
      bordered ? '1px solid var(--n-border-color)' : 'none'
    )

    return () => (
      <NLayout
        class={styles['page-layout']}
        hasSider
        position="absolute"
      >
        <NConfigProvider
          theme={
            theme === ThemeMap.MENUDARK || theme === ThemeMap.DARK
              ? configStore.themeStyle
              : null
          }
        >
          <NLayoutSider
            width={240}
            style={{
              marginTop: showLogo ? '50px' : 0,
              height: 'calc(100% - 50px)'
            }}
            nativeScrollbar={false}
            bordered={bordered}
            showTrigger={triggerType === 'custom' ? false : triggerType}
            collapseMode="width"
            collapsedWidth={64}
            collapsed={collapsed}
            onExpand={() => (collapsed = false)}
            onCollapse={() => (collapsed = true)}
          >
            {showLogo && (
              <TheLogo
                collapsed={collapsed}
                style={{
                  width: collapsed ? '64px' : '240px',
                  borderRight: borderedStyle,
                  borderBottom: borderedStyle
                }}
              />
            )}

            <BaseMenu />
          </NLayoutSider>
        </NConfigProvider>

        <NLayout nativeScrollbar={false}>
          <NLayoutHeader
            bordered={bordered}
            style={{
              height: showTagsView ? '88px' : '50px'
            }}
          >
            <div
              class={styles['page-layout-header']}
              style={{
                height: '50px',
                borderBottom: borderedStyle
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {triggerType === 'custom' && (
                  <NEl
                    tag="div"
                    class={styles['left-board']}
                  >
                    <div onClick={toggleCollapsed}>
                      <NIcon
                        size={22}
                        style={{ marginTop: '4px' }}
                      >
                        {collapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )}
                      </NIcon>
                    </div>
                  </NEl>
                )}

                {showBread && (
                  <Breadcrumb
                    showBreadIcon={showBreadIcon}
                    style={{ marginLeft: '3px' }}
                  />
                )}
              </div>

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
            <div class={styles['tag-views']}>
              <TagsView />
            </div>
          </NLayoutHeader>

          <NLayoutContent
            position={isFixHeader ? 'absolute' : 'static'}
            nativeScrollbar={false}
            contentStyle={{ padding: '20px' }}
            style={{ marginTop: contentMarginTop }}
          >
            <AppMain show={show} />
          </NLayoutContent>
        </NLayout>

        <GlobalDraw v-model:show={showDraw} />
      </NLayout>
    )
  }
})

export default PageLayout
