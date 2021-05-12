import axios from 'axios';

class PostsApi {
  getAll = async () => {
    const { data } = await axios.get(`${process.env.API_URL}/api/posts`);
    return data;
  }
}

export default new PostsApi();
