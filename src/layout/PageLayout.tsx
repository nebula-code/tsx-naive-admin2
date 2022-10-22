import TipIcon from '@/components/TipIcon'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NH2,
  NAvatar,
  NSpace,
  NDropdown
} from 'naive-ui'
import { GithubOutlined } from '@vicons/antd'
import { RouterView } from 'vue-router'
import TheLogo from './components/TheLogo'
import styles from './style/PageLayout.module.css'

const PageLayout = defineComponent({
  name: 'PageLayout',
  setup() {
    const goHref = () => {
      window.open(`https://www.baidu.com`)
    }

    // const dropOptions = [
    //   {
    //     label: '用户资料',
    //     key: 'profile',
    //     icon: renderIcon(UserIcon)
    //   },
    //   {
    //     label: '编辑用户资料',
    //     key: 'editProfile',
    //     icon: renderIcon(EditIcon)
    //   },
    //   {
    //     label: '退出登录',
    //     key: 'logout',
    //     icon: renderIcon(LogoutIcon)
    //   }
    // ]

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
        >
          <TheLogo
            style={{
              width: '240px',
              borderRight: '1px solid var(--n-border-color)',
              borderBottom: '1px solid var(--n-border-color)'
            }}
          />

          <div>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
            <NH2>1</NH2>
          </div>
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
                <TipIcon
                  title="GitHub"
                  iconComp={GithubOutlined}
                  onClickIcon={goHref}
                />
                <TipIcon
                  title="GitHub"
                  iconComp={GithubOutlined}
                />
                <TipIcon
                  title="GitHub"
                  iconComp={GithubOutlined}
                />
                <TipIcon
                  title="GitHub"
                  iconComp={GithubOutlined}
                />
                <TipIcon
                  title="GitHub"
                  iconComp={GithubOutlined}
                />
              </div>

              <NDropdown options={[]}>
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
            <RouterView />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    )
  }
})

export default PageLayout
