import { CSSProperties, ReactNode, useState } from 'react';
import styles from './Button.module.scss';

enum Palette {
  blue = '#5f8de7',
  green = '#83FFA6',
  red = '#ff5a5a'
}

enum Hovers {
  blue = '#4e69fa',
  green = '#64ef8b',
  red = '#e74444'
}

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  onClick?: () => any
  color?: 'blue' | 'green' | 'red'
  full?: boolean
  outline?: boolean
  around?: boolean
  loading?: boolean
  disabled?: boolean
  withoutHover?: boolean
  customStyles?: CSSProperties
}

const Button = ({
  children,
  onClick,
  color = 'blue',
  type = 'button',
  full = false,
  outline = false,
  around = false,
  loading = false,
  disabled = false,
  withoutHover = false,
  customStyles
}: ButtonProps) => {
  const [BgColor, setBgColor] = useState<string>(outline ? 'transparent' : Palette[color]);
  const [textColor, setTextColor] = useState<string>(outline ? Palette[color] : '#fff');

  const buttonStyles: CSSProperties = {
    backgroundColor: BgColor,
    color: textColor,
    width: `${full ? '100%' : 'auto'}`,
    border: `${outline ? `1px solid ${Palette[color]}` : 'none'}`,
    borderRadius: `${around ? '25px' : '4px'}`,
    padding: '10px 20px',
    ...customStyles
  };

  const mouseOverHandler = () => {
    if (disabled || withoutHover) {
      return;
    }

    if (outline) {
      setTextColor('#fff');
      setBgColor(Palette[color]);
      return;
    }

    setBgColor(Hovers[color]);
  };

  const mouseLeaveHandler = () => {
    if (disabled || withoutHover) {
      return;
    }

    if (outline) {
      setTextColor(Palette[color]);
      setBgColor('transparent');
      return;
    }

    setBgColor(Palette[color]);
  };

  if (loading || disabled) {
    buttonStyles.opacity = '.8';
    buttonStyles.userSelect = 'none';
    buttonStyles.cursor = 'default';
  }

  return (
    <button
      type={type}
      className={styles.button}
      style={buttonStyles}
      onClick={onClick}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseLeaveHandler}
      disabled={loading || disabled}
    >
      {loading && (
        <span className={styles.loading} />
      )}
      <span className={styles.text}>
        {children}
      </span>
    </button>
  );
};

export default Button;
