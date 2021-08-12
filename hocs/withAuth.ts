import { GetServerSidePropsContext } from 'next';
import Cookies from 'nookies';
import AuthApi from '../api/auth';

/*
* HOC to get the user's data if he is authorized
* or redirect if page is protected
*/
const withAuth = (callback = undefined) => {
  return async (ctx: GetServerSidePropsContext) => {
    const callbackResult = callback ? await callback(ctx) : undefined;
    const token = Cookies.get(ctx).authToken;

    /*
    * Redirect if page is protected
    * and user doesn't have the token
    */
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

export default withAuth;
