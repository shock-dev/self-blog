import withAuthSS from '../../hocs/withAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLogout } from '../../store/auth/actions';
import { selectIsAuth } from '../../store/auth/selectors';
import { useRouter } from 'next/router';

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchLogout());
  }, []);

  useEffect(() => {
    router.replace('/login');
  }, [isAuth]);

  return null;
};

export const getServerSideProps = withAuthSS();

export default Logout;
