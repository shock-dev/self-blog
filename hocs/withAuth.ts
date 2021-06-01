import { GetServerSidePropsContext } from 'next';
import Cookies from 'nookies';
import axios from '../core/axios';
import { wrapper } from '../store';
import { Store } from 'redux';
import { RootState } from '../store/types';
import { setIsAuth, setUserInfo } from '../store/auth/actions';

const withAuthSS = (callback = undefined) => {
  return wrapper.getServerSideProps(async (context: GetServerSidePropsContext & { store: Store<RootState>; }) => {
    try {
      const cookie = Cookies.get(context);

      if (!cookie.authToken) {
        return {
          redirect: {
            permanent: false,
            destination: '/login'
          }
        };
      }

      const { data: { data: user } } = await axios.get('/auth/me', {
        headers: {
          cookie: `authToken=${cookie.authToken}`
        }
      });

      context.store.dispatch(setUserInfo(user));
      context.store.dispatch(setIsAuth(true));

      if (callback) {
        return await callback(context, user);
      }

      return {
        props: {}
      };
    } catch (e) {
      return {
        redirect: {
          permanent: false,
          destination: '/login'
        }
      };
    }
  });
};

export default withAuthSS;
