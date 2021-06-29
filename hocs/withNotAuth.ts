import { GetServerSidePropsContext } from 'next';
import Cookies from 'nookies';
import axios from '../core/axios';
import { SagaStore, wrapper } from '../store';
import { logoutSuccess } from '../store/auth/actions';

const withNotAuthSS = (callback = undefined) => {
  return wrapper.getServerSideProps(async (ctx: GetServerSidePropsContext & { store: SagaStore }) => {
    const cookie = Cookies.get(ctx);

    if (!cookie.authToken) {
      ctx.store.dispatch(logoutSuccess());

      return {
        props: {}
      };
    }

    try {
      const { data: { data } } = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${cookie.authToken}`
        }
      });

      if (data) {
        return {
          redirect: {
            permanent: false,
            destination: '/'
          }
        };
      }

      if (callback) {
        return {
          props: {
            ...((await callback(ctx)).props || {})
          }
        };
      }

      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      };
    } catch (e) {
      return {
        props: {}
      };
    }
  });
};

export default withNotAuthSS;
