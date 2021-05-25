import { GetServerSidePropsContext } from 'next';
import Cookies from 'nookies';
import axios from '../core/axios';

const withNotAuthSS = (callback = undefined) => {
  return async (context: GetServerSidePropsContext) => {
    try {
      const cookie = Cookies.get(context);

      if (!cookie.authToken) {
        return {
          props: {}
        };
      }

      const data = await axios.get('/auth/me', {
        headers: {
          cookie: `authToken=${cookie.authToken}`
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
            ...((await callback(context)).props || {})
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
  };
};

export default withNotAuthSS;
