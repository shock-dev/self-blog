import axios from 'axios';
import { LoginFormInputs } from '../pages/login';

class AuthApi {
  login = async (payload: LoginFormInputs) => {
    const { data } = await axios.post(`http://localhost:5000/api/auth/login`, payload);
    return data;
  }
}

export default new AuthApi();
