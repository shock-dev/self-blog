import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <a style={{ display: 'flex' }}>
        <img src="/images/logo.svg" alt="Logo" />
      </a>
    </Link>
  );
};

export default Logo;
