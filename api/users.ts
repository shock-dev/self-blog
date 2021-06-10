import axios from '../core/axios';
import { IUser } from '../types/user';
import { UpdateFormInputs } from '../components/Settings/Profile';

class UsersApi {
  one = async (id: IUser['_id']) => {
    const { data } = await axios.get(`/users/${id}`);
    return data;
  }

  update = async (payload: UpdateFormInputs) => {
    const { data } = await axios.put('/users/', payload);
    return data;
  }

  uploadAvatar = async (formData) => {
    const { data } = await axios.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return data;
  }
}

export default new UsersApi();
