import axios from '../core/axios';
import { LoginFormInputs } from '../pages/login';
import { RegisterFormInputs } from '../pages/register';

class AuthApi {
  login = async (payload: LoginFormInputs) => {
    const { data } = await axios.post(`/auth/login`, payload);
    return data;
  }

  register = async (payload: RegisterFormInputs) => {
    const { data } = await axios.post(`/auth/register`, payload);
    return data;
  }

  getMe = async (token: string) => {
    const { data } = await axios.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  }
}

export default new AuthApi();
