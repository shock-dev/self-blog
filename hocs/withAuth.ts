import Cookies from 'nookies';
import { SagaStore, wrapper } from '../store';
import { fetchUserInfo } from '../store/auth/actions';
import { GetServerSidePropsContext } from 'next';
import { END } from 'redux-saga';

const withAuthSS = (callback = undefined) => {
  return wrapper.getServerSideProps(async (ctx: GetServerSidePropsContext & { store: SagaStore }) => {
    try {
      const cookie = Cookies.get(ctx);

      if (!cookie.authToken) {
        return {
          redirect: {
            permanent: false,
            destination: '/login'
          }
        };
      }

      ctx.store.dispatch(fetchUserInfo(cookie.authToken));
      ctx.store.dispatch(END);

      await ctx.store.sagaTask.toPromise();

      if (callback) {
        return await callback(ctx);
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
