import axios from '../core/axios';
import { LoginFormInputs } from '../pages/login';

class AuthApi {
  login = async (payload: LoginFormInputs) => {
    const { data } = await axios.post(`http://localhost:5000/api/auth/login`, payload);
    return data;
  }

  getMe = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/users/me`);
    return data;
  }
}

export default new AuthApi();
