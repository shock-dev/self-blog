import axios from '../core/axios';
import { LoginFormInputs } from '../pages/login';

class AuthApi {
  login = async (payload: LoginFormInputs) => {
    const { data } = await axios.post(`/auth/login`, payload);
    return data;
  }

  getMe = async (token: string) => {
    const { data } = await axios.get(`/auth/me`, {
      headers: {
        cookie: `authToken=${token}`
      }
    });
    return data;
  }

  logout = async () => {
    const { data } = await axios.post(`/auth/logout`);
    return data;
  }
}

export default new AuthApi();
