import { ReactNode } from 'react';
import s from './Wrapper.module.scss';
import Header from '../../components/Header';
import { IUser } from '../../types/user';
import cn from 'classnames';
import Footer from '../../components/Footer';

interface WrapperProps {
  children: ReactNode
  me: IUser
}

const Wrapper = ({
  children,
  me
}: WrapperProps) => {
  return (
    <div className={s.wrapper}>
      <Header me={me} />
      <div className={cn('container', s.page)}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Wrapper;
