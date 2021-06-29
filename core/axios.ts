import axios from 'axios';
import Cookies from 'js-cookie';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('specify NEXT_PUBLIC_API_URL in .env.local');
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get('authToken')}`
  }
});

export default instance;
