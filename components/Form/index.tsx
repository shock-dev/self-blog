import { FormEvent, ReactNode } from 'react';
import styles from './Form.module.scss';
import Field from './Field';
import Footer from './Footer';

interface FormProps {
  title: string
  onSubmit: (e: FormEvent<HTMLFormElement>) => any
  children: ReactNode
}

const Form = ({
  title,
  onSubmit,
  children
}: FormProps) => {
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className={styles.form}
    >
      <h2 className={styles.title}>
        {title}
      </h2>
      <div>
        {children}
      </div>
    </form>
  );
};

Form.Field = Field;
Form.Footer = Footer;

export default Form;
