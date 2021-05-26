import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import PostsApi from '../../api/posts';
import withAuthSS from '../../hocs/withAuth';
import Post from '../../components/Post';
import Comments from '../../components/Comments';
import { IPost } from '../../types/post';
import { setComments } from '../../store/comments/action';
import { useSelector } from 'react-redux';
import { selectCommentsData } from '../../store/comments/selectors';

interface PostProps {
  post: IPost
}

const PostPage = ({ post }: PostProps) => {
  const comments = useSelector(selectCommentsData);

  return (
    <MainLayout title={post.title}>
      <Post
        key={post._id}
        id={post._id}
        title={post.title}
        description={post.description}
        imageUrl={post.imageUrl}
        views={post.views}
        user={post.user}
      />
      {comments && (
        <Comments count={post.comments.length}>
          {comments.map((comment) =>
            <Comments.Item
              key={comment._id}
              text={comment.text}
              user={comment.user}
            />
          )}
        </Comments>
      )}
      <Comments.Form />
    </MainLayout>
  );
};

export const getServerSideProps = withAuthSS(async ({ params, store }) => {
  try {
    const { data }: { data: IPost } = await PostsApi.getOne(params.id);

    if (data.comments.length) {
      store.dispatch(setComments(data.comments));
    }

    return {
      props: {
        post: data
      }
    };
  } catch (e) {
    return {
      props: {
        post: {}
      }
    };
  }
});

export default PostPage;
