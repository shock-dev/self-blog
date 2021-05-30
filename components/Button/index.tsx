import React, { CSSProperties, useState } from 'react';
import styles from './Button.module.scss';

enum Palette {
  blue = '#657EFF',
  green = '#83FFA6'
}

enum Hovers {
  blue = '#4e69fa',
  green = '#64ef8b'
}

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  onClick?: () => any
  color?: 'blue' | 'green'
  full?: boolean
  outline?: boolean
  around?: boolean
  customStyles?: CSSProperties
}

export default function Button({
  children,
  onClick,
  color = 'blue',
  type = 'button',
  full = false,
  outline = false,
  around = false,
  customStyles
}: ButtonProps) {
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
    if (outline) {
      setTextColor('#fff');
      setBgColor(Palette[color]);
      return;
    }

    setBgColor(Hovers[color]);
  };

  const mouseLeaveHandler = () => {
    if (outline) {
      setTextColor(Palette[color]);
      setBgColor('transparent');
      return;
    }

    setBgColor(Palette[color]);
  };

  return (
    <button
      type={type}
      className={styles.button}
      style={buttonStyles}
      onClick={onClick}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseLeaveHandler}
    >
      {children}
    </button>
  );
}
