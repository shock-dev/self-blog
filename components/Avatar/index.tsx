import React, { CSSProperties } from 'react';
import styles from './Avatar.module.scss';
import cn from 'classnames';

interface AvatarProps {
  url?: string
  width?: number
  height?: number
  type?: 'circle' | 'square'
  additionalStyles?: CSSProperties
  username: string
}

const Avatar = ({
  url,
  username,
  width = 240,
  height = 240,
  type = 'square',
  additionalStyles = {}
}: AvatarProps) => {
  // FIXME: Можно улучшить, попробовать без svg

  const avatarStyles = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${type === 'circle' ? '50%' : '4px'}`,
    ...additionalStyles
  };

  if (!url) {
    const firstLetter = username?.charAt(0).toUpperCase();

    return (
      <div
        className={cn(styles.wrapper, styles.svg)}
        style={avatarStyles}
      >
        <svg className={styles.svg} viewBox="0 0 56 32">
          <text fill="#fff" className={styles.letter} x="6.16" y="11">{firstLetter}</text>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={styles.wrapper}
      style={avatarStyles}
    >
      <img
        className={styles.avatar}
        src={url}
        alt={`Аватарка ${username}`}
        title={`Аватарка ${username}`}
      />
    </div>
  );
};

export default Avatar;
