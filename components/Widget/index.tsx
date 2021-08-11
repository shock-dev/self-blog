import { ReactNode } from 'react';
import s from './index.module.scss';

interface WidgetProps {
  title: string
  text?: string
  children?: ReactNode
}

const Widget = ({
  title,
  text = null,
  children = null
}: WidgetProps) => {
  return (
    <div className={s.wrapper}>
      <h6 className={s.title}>
        {title}
      </h6>
      {text && (
        <p className={s.text}>
          {text}
        </p>
      )}
      {children}
    </div>
  );
};

export default Widget;
