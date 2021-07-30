import axios from '../core/axios';

class SearchApi {
  getUsersAndPosts = async (q: string) => {
    const { data } = await axios.get(`/search?q=${q}`);
    return data;
  }
}

export default new SearchApi();
