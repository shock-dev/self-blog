import axios from '../core/axios';

class PostsApi {
  getAll = async () => {
    const { data } = await axios.get('/posts');
    return data;
  }

  getOne = async (id: string) => {
    const { data } = await axios.get(`posts/${id}`);
    return data;
  }
}

export default new PostsApi();
