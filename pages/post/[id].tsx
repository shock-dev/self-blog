import React from 'react';
import PostsApi from '../../api/posts';
import withAuthSS from '../../hocs/withAuth';
import Comments from '../../components/Comments';
import { IPost } from '../../types/post';
import { setComments } from '../../store/comments/actions';
import { useSelector } from 'react-redux';
import { selectCommentsData } from '../../store/comments/selectors';
import MainLayout from '../../layouts/MainLayout';
import PostFull from '../../components/PostFull';
import Reminder from '../../components/Reminder';

interface PostProps {
  post: IPost
  auth: boolean
}

const PostPage = ({
  post,
  auth
}: PostProps) => {
  const comments = useSelector(selectCommentsData);

  return (
    <MainLayout title={post.title}>
      <PostFull
        key={post._id}
        id={post._id}
        title={post.title}
        description={post.description}
        imageUrl={post.imageUrl}
        createdAt={post.createdAt}
        user={post.user}
      />
      {!!comments.length && (
        <Comments count={comments.length}>
          {comments.map((comment) =>
            <Comments.Item
              key={comment._id}
              text={comment.text}
              user={comment.user}
              createdAt={comment.createdAt}
            />
          )}
        </Comments>
      )}
      {auth ? (
        <Comments.Form postId={post._id} />
      ) : (
        <Reminder text="оставлять комментарии" />
      )}
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
