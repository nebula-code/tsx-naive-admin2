import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NH2,
  NAvatar,
  NDropdown,
  NButton
} from 'naive-ui'
import {
  GithubOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined
} from '@vicons/antd'
import { RouterView } from 'vue-router'
import { renderIcon } from '@/utils'
import { useFullscreen } from '@/hooks'
import TipIcon from '@/components/TipIcon'
import GlobalDraw from '@/components/GlobalDraw'
import TheLogo from './components/TheLogo'
import BaseMenu from './components/BaseMenu'
import styles from './style/PageLayout.module.css'
import AppMain from './components/AppMain'

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
          bordered
          showTrigger
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
              borderRight: '1px solid var(--n-border-color)',
              borderBottom: '1px solid var(--n-border-color)'
            }}
          />

          <BaseMenu />
        </NLayoutSider>

        <NLayout nativeScrollbar={false}>
          <NLayoutHeader
            bordered
            style={{ height: '50px' }}
            class={styles['page-layout-header']}
          >
            <div class={styles['left-board']}>1</div>
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
          </NLayoutHeader>
          <NLayoutContent
            position={'absolute'}
            nativeScrollbar={false}
            contentStyle={{ padding: '20px' }}
            style={{ marginTop: '50px' }}
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
