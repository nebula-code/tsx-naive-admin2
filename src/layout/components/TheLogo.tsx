import logoImg from '@/assets/logo.svg'
import { NH1 } from 'naive-ui'
import type { PropType } from 'vue'
import styles from './style/index.module.css'

export default defineComponent({
  name: 'TheLogo',
  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props) {
    return () => (
      <div class={styles['the-logo']}>
        <img
          class={styles['logo-img']}
          src={logoImg}
          alt="logoImg"
        />
        <NH1
          v-show={!props.collapsed}
          class={styles['logo-title']}
        >
          Logo
        </NH1>
      </div>
    )
  }
})
