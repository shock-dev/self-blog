import { GetServerSidePropsContext } from 'next';
import Cookies from 'nookies';
import axios from '../core/axios';

const withAuthSS = (callback = undefined) => {
  return async (context: GetServerSidePropsContext) => {
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

      const { data: { data: user } } = await axios.get('/api/users/me', {
        headers: {
          cookie: `authToken=${cookie.authToken}`
        }
      });

      if (callback) {
        return {
          props: {
            user,
            ...((await callback(context, user)).props || {})
          }
        };
      }

      return {
        props: {
          user
        }
      };
    } catch (e) {
      return {
        redirect: {
          permanent: false,
          destination: '/login'
        }
      };
    }
  };
};

export default withAuthSS;
