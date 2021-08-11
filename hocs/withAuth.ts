import Cookies from 'nookies';
import AuthApi from '../api/auth';
import { GetServerSidePropsContext } from 'next';

const withAuthSS = (callback = undefined) => {
  return async (ctx: GetServerSidePropsContext) => {
    const callbackResult = callback ? await callback(ctx) : undefined;
    const token = Cookies.get(ctx).authToken;

    if (callbackResult?.props?.protect && !token) {
      return {
        redirect: {
          permanent: false,
          destination: '/login?msg=need'
        }
      };
    }

    let me = null;

    if (token) {
      const { data } = await AuthApi.getMe(token);
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
