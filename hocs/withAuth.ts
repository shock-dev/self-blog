import Cookies from 'nookies';
import { SagaStore, wrapper } from '../store';
import { fetchUserInfo } from '../store/auth/actions';
import { GetServerSidePropsContext } from 'next';
import { END } from 'redux-saga';

const withAuthSS = (callback = undefined) => {
  return wrapper.getServerSideProps(async (ctx: GetServerSidePropsContext & { store: SagaStore }) => {
    const callbackResult = callback ? await callback(ctx) : undefined;
    const authToken = Cookies.get(ctx).authToken;

    if (callbackResult?.protect && !authToken) {
      return {
        redirect: {
          permanent: false,
          destination: '/login?msg=need'
        }
      };
    }

    try {
      if (authToken) {
        ctx.store.dispatch(fetchUserInfo(authToken));
        ctx.store.dispatch(END);

        await ctx.store.sagaTask.toPromise();
      }

      return {
        ...callbackResult,
        props: {
          ...callbackResult?.props,
          auth: !!ctx.store.getState().user.data
        }
      };
    } catch (e) {
      return {
        ...callbackResult,
        props: {
          ...callbackResult?.props,
          auth: !!ctx.store.getState().user.data
        }
      };
    }
  });
};

export default withAuthSS;
