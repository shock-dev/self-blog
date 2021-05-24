import axios from 'axios';

class PostsApi {
  private api = `${process.env.API_URL}/posts`;

  getAll = async () => {
    const { data } = await axios.get(this.api);
    return data;
  }

  getOne = async (id: string) => {
    const { data } = await axios.get(`${this.api}/${id}`);
    return data;
  }
}

export default new PostsApi();
