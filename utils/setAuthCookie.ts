import Cookies from 'nookies';

/*
* Helper for setting auth cookie
* Using in login and register pages
*/
const setAuthCookie = (cookie: string): void => {
  Cookies.set(null, 'authToken', cookie, {
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
};

export default setAuthCookie;
