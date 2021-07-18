import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const UserPage = () => {
  const router = useRouter();
  const { user } = router.query;

  return (
    <>
      <main className={styles.main}>{user}</main>
    </>
  );
};

export default UserPage;
