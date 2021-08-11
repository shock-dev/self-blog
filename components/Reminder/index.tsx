import { CSSProperties } from 'react';
import s from './Reminder.module.scss';
import Link from 'next/link';

interface ReminderProps {
  text: string
  styles?: CSSProperties
}

const Reminder = ({
  text,
  styles = {}
}: ReminderProps) => {
  return (
    <p className={s.alert} style={styles}>
      <Link href="/login">
        <a className={s.link}>
          Войдите в систему
        </a>
      </Link> чтобы {text}
    </p>
  );
};

export default Reminder;
