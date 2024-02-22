import { create } from 'tailwind-rn'
import styles from '../styles.js'

const { tailwind, getColor } = create(styles(42.26))
export { tailwind, getColor }
