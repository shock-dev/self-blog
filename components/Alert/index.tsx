import {
  transitions,
  positions,
  types
} from 'react-alert';
import styles from './Alert.module.scss';

export const options = {
  position: positions.TOP_CENTER,
  timeout: 2000,
  transition: transitions.SCALE,
  type: types.ERROR
};

export const AlertTemplate = ({ style, message, close }: any) => (
  <div
    className={styles.wrapper}
    style={style}
  >
    <span className={styles.title}>
      Error 😳
    </span>
    <p className={styles.message}>
      {message}
    </p>
    <button
      className={styles.close}
      onClick={close}
    >
      <svg className={styles.svg}>
        <use href="/images/[global].svg#close" />
      </svg>
    </button>
  </div>
);

