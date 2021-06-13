import axios from '../core/axios';
import { CreatePostFormInputs } from '../components/CreatePostForm';

class PostsApi {
  getAll = async () => {
    const { data } = await axios.get('/posts');
    return data;
  }

  getOne = async (id: string) => {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  }

  create = async (payload: CreatePostFormInputs) => {
    const { data } = await axios.post(`/posts`, payload);
    return data;
  }
}

export default new PostsApi();
