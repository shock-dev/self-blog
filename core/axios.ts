import axios from 'axios';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('specify NEXT_PUBLIC_API_URL in .env.local');
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});

export default instance;
