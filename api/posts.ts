import axios from '../core/axios';

class PostsApi {
  getAll = async () => {
    const { data } = await axios.get('/posts');
    return data;
  }

  getOne = async (id: string) => {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  }

  create = async (payload) => {
    const { data } = await axios.post(`/posts`, payload);
    return data;
  }

  getByUserId = async (id: string) => {
    const { data } = await axios.get(`/posts/${id}/user`);
    return data;
  }
}

export default new PostsApi();
