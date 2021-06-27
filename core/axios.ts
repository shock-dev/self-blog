import axios from 'axios';
import Cookies from 'js-cookie';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('specify NEXT_PUBLIC_API_URL in .env.local');
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    cookie: `authToken=${Cookies.get('authToken')}`
  }
});

export default instance;
