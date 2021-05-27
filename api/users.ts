import axios from '../core/axios';
import { IUser } from '../types/user';

class UsersApi {
  one = async (id: IUser['_id']) => {
    const { data } = await axios.get(`/users/${id}`);
    return data;
  }
}

export default new UsersApi();
