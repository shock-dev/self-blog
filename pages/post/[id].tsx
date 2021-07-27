import React from 'react';
import { useSelector } from 'react-redux';
import PostsApi from '../../api/posts';
import UsersApi from '../../api/users';
import withAuthSS from '../../hocs/withAuth';
import Comments from '../../components/Comments';
import { IPost } from '../../types/post';
import { setComments } from '../../store/comments/actions';
import { selectCommentsData } from '../../store/comments/selectors';
import PostFull from '../../components/PostFull';
import Reminder from '../../components/Reminder';
import ContentLayout from '../../layouts/ContentLayout';
import { IUser } from '../../types/user';

interface PostProps {
  post: IPost
  auth: boolean
  lastUsers: IUser[]
}

const PostPage = ({
  post,
  auth,
  lastUsers
}: PostProps) => {
  const comments = useSelector(selectCommentsData);
  const pageTitle = post.title.replaceAll('`', '');

  return (
    <ContentLayout
      title={pageTitle}
      auth={auth}
      lastUsers={lastUsers}
    >
      <PostFull
        key={post._id}
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
        <Reminder text="оставлять комментарии" styles={{ margin: '0 0 20px' }} />
      )}
    </ContentLayout>
  );
};

export const getServerSideProps = withAuthSS(async ({ params, store }) => {
  try {
    const { data: post } = await PostsApi.getOne(params.id);
    const { data: lastUsers } = await UsersApi.getLatest();

    if (post.comments.length) {
      store.dispatch(setComments(post.comments));
    }

    return {
      props: {
        post,
        lastUsers
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
