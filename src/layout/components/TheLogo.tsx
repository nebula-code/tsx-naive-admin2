import logoImg from '@/assets/logo.svg'
import { NH1 } from 'naive-ui'
import styles from './style/index.module.css'

export default defineComponent({
  name: 'TheLogo',
  setup() {
    return () => (
      <div class={styles['the-logo']}>
        <img
          class={styles['logo-img']}
          src={logoImg}
          alt="logoImg"
        />
        <NH1 class={styles['logo-title']}>Logo</NH1>
      </div>
    )
  }
})
