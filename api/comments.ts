import axios from '../core/axios';
import { IAddComment } from '../components/Comments/Form';

class CommentsApi {
  create = async ({ postId, text }: IAddComment) => {
    const { data } = await axios.post(`/posts/${postId}/comment`, { text });
    return data;
  }
}

export default new CommentsApi();
