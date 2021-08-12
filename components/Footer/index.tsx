import s from './Footer.module.scss';
import Logo from '../Logo';
import SocialNetworkList from '../SocialNetworkList';

const Footer = () => {
  return (
    <div className={s.wrapper}>
      <footer className={s.footer}>
        <div className="container">
          <div className={s.inner}>
            <SocialNetworkList />
            <div className={s.logo}>
              <Logo />
            </div>
            <p className={s.author}>© 2021, Andrey Shock</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
