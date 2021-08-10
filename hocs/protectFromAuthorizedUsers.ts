import { GetServerSidePropsContext } from 'next';
import Cookies from 'nookies';
import axios from '../core/axios';

/*
* HOC to protect pages from already authorized users
*/
const protectFromAuthorizedUsers = () => async (ctx: GetServerSidePropsContext) => {
  const cookie = Cookies.get(ctx);

  // If user doesn't have auth token
  if (!cookie.authToken) {
    return {
      props: {}
    };
  }

  // User has a token but we need to verify it
  const { data: { data } } = await axios.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${cookie.authToken}`
    }
  });

  // If we get user's data then user authorized
  if (data) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }

  return {
    props: {}
  };
};

export default protectFromAuthorizedUsers;
