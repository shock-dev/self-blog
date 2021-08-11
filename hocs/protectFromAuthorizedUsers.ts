import { GetServerSidePropsContext } from 'next';
import Cookies from 'nookies';
import AuthApi from '../api/auth';

/*
* HOC to protect pages from already authorized users
*/
const protectFromAuthorizedUsers = () => async (ctx: GetServerSidePropsContext) => {
  const token = Cookies.get(ctx).authToken;

  // If user doesn't have auth token
  if (!token) {
    return {
      props: {}
    };
  }

  /*
  If user successfully receives the data
  then we redirect to the main page
  */
  try {
    await AuthApi.getMe(token);

    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  } catch (e) {
    Cookies.destroy(ctx, 'authToken');
    return {
      props: {}
    };
  }
};

export default protectFromAuthorizedUsers;
