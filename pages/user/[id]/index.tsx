import React from 'react';
import withAuthSS from '../../../hocs/withAuth';
import UsersApi from '../../../api/users';
import PostsApi from '../../../api/posts';
import { IUser } from '../../../types/user';
import UserInfo from '../../../components/UserInfo';
import ProfileLayout from '../../../layouts/ProfileLayout';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../store/auth/selectors';
import { IPost } from '../../../types/post';
import PostMini from '../../../components/PostMini';

interface UserPageProps {
  user: IUser
  posts: IPost[]
}

const UserPage = ({
  user,
  posts
}: UserPageProps) => {
  const me = useSelector(selectAuth).data;
  const isMe = me._id === user._id;
  const pageTitle = isMe ? 'Ваш профиль' : `${user.username} (${user.name} ${user.surname})`;

  return (
    <ProfileLayout title={pageTitle} user={user}>
      <UserInfo
        email={user.email}
        birthday={new Date(user.birthday).toLocaleDateString()}
        postCount={user.posts.length}
        gender={user.gender}
        registerDate={new Date(user.createdAt).toLocaleDateString()}
      />
      {posts.map((post) =>
        <PostMini
          key={post._id}
          id={post._id}
          title={post.title}
          description={post.description}
          createdAt={post.createdAt}
          user={user}
          customStyles={{ margin: '20px 0 0' }}
        />
      )}
    </ProfileLayout>
  );
};

export default UserPage;

export const getServerSideProps = withAuthSS(async ({ params }) => {
  try {
    const { data: user } = await UsersApi.one(params.id);
    const { data: posts } = await PostsApi.getByUserId(params.id);
    return {
      props: {
        user,
        posts
      }
    };
  } catch (e) {
    return {
      props: {}
    };
  }
});
