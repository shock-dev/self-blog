import React, { useState } from 'react';
import PostsApi from '../../api/posts';
import UsersApi from '../../api/users';
import withAuthSS from '../../hocs/withAuth';
import Comments from '../../components/Comments';
import { IPost } from '../../types/post';
import PostFull from '../../components/PostFull';
import Reminder from '../../components/Reminder';
import ContentLayout from '../../layouts/ContentLayout';
import { IUser } from '../../types/user';
import { IComment } from '../../types/comment';

interface PostProps {
  post: IPost
  auth: boolean
  lastUsers: IUser[]
  comments: IComment[]
}

const PostPage = ({
  post,
  auth,
  lastUsers,
  comments: allComments
}: PostProps) => {
  const [comments, setComments] = useState(allComments);
  const pageTitle = post.title.replaceAll('`', '');

  const addCommentHandler = (comment: IComment) => {
    setComments((prev) => [...prev, comment]);
  };

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
        <Comments.Form
          postId={post._id}
          onAdd={addCommentHandler}
        />
      ) : (
        <Reminder text="оставлять комментарии" styles={{ margin: '0 0 20px' }} />
      )}
    </ContentLayout>
  );
};

export const getServerSideProps = withAuthSS(async ({ params }) => {
  try {
    const { data: post } = await PostsApi.getOne(params.id);
    const { data: lastUsers } = await UsersApi.getLatest();

    return {
      props: {
        comments: post.comments,
        lastUsers,
        post
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
