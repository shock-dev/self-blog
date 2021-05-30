import React, { CSSProperties } from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
  url: string
  width?: number
  height?: number
  type?: 'circle' | 'square'
  alt: string
  additionalStyles?: CSSProperties
}

const Avatar = ({
  url,
  alt,
  width = 240,
  height = 240,
  type = 'square',
  additionalStyles = {}
}: AvatarProps) => {
  const avatarStyles = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${type === 'circle' ? '50%' : '4px'}`,
    ...additionalStyles
  };

  return (
    <div
      className={styles.wrapper}
      style={avatarStyles}
    >
      <img
        className={styles.avatar}
        src={url}
        alt={alt}
      />
    </div>
  );
};

export default Avatar;
