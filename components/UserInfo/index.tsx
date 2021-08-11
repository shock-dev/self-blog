import styles from './UserInfo.module.scss';

interface UserInfoProps {
  bio?: string
  email: string
  birthday: string
  postCount: number
  gender: string
  registerDate: string
}

const UserInfo = ({
  bio = '',
  email,
  birthday,
  postCount,
  gender,
  registerDate
}: UserInfoProps) => {
  return (
    <div className={styles.info}>
      <div className={styles.header}>
        <h4 className={styles.fullname}>
          Основная информация
        </h4>
        {!!bio.length && (
          <p className={styles.desc}>
            {bio}
          </p>
        )}
      </div>
      <div className={styles.section}>
        <div className={styles.row}>
          <div className={styles.col}>
            Email:
          </div>
          <div className={styles.col}>
            <a href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            Дата рождения:
          </div>
          <div className={styles.col}>
            {birthday}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            Пол:
          </div>
          <div className={styles.col}>
            {gender === 'male' ? (
              <img
                src="/images/male.svg"
                alt="Мужской"
                title="Мужской"
                width={16}
              />
            ) : (
              <img
                src="/images/female.svg"
                alt="Женский"
                title="Женский"
                width={16}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.sectionTitle}>
        <span>
          Статистика
        </span>
        <span className={styles.line} />
      </div>
      <div className={styles.section}>
        <div className={styles.row}>
          <div className={styles.col}>
            Дата регистрации:
          </div>
          <div className={styles.col}>
            {registerDate}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            Написано постов:
          </div>
          <div className={styles.col}>
            {postCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
