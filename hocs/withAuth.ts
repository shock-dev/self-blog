import Cookies from 'nookies';
import AuthApi from '../api/auth';
import { GetServerSidePropsContext } from 'next';

const withAuthSS = (callback = undefined) => {
  return async (ctx: GetServerSidePropsContext) => {
    const callbackResult = callback ? await callback(ctx) : undefined;
    const authToken = Cookies.get(ctx).authToken;

    if (callbackResult?.props?.protect && !authToken) {
      return {
        redirect: {
          permanent: false,
          destination: '/login?msg=need'
        }
      };
    }

    let me = null;

    if (authToken) {
      const { data } = await AuthApi.getMe(authToken);
      me = data;
    }

    return {
      ...callbackResult,
      props: {
        ...callbackResult?.props,
        me
      }
    };
  };
};

export default withAuthSS;
