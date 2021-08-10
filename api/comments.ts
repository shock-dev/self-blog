import axios from '../core/axios';

class CommentsApi {
  create = async ({ postId, text }) => {
    const { data } = await axios.post(`/posts/${postId}/comment`, { text });
    return data;
  }
}

export default new CommentsApi();
