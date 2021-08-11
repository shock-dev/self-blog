import axios from 'axios';
import nookies from 'nookies';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('specify NEXT_PUBLIC_API_URL in .env.local');
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${nookies.get().authToken}`
  }
});

export default instance;
