import { CSSProperties } from 'react';
import s from './index.module.scss';

interface SpinnerProps {
  styles?: CSSProperties
}

const Spinner = ({
  styles = {}
}: SpinnerProps) => {
  return (
    <div className={s.ldsRing} style={styles}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
