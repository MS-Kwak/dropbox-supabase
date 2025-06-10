import styles from './page.module.css';
import UI from './ui';

export const metadata = {
  title: 'Dropbox Clone',
  description: 'A simple Dropbox clone built with Next.js',
};

export default function Home() {
  return (
    <div className={styles.Home}>
      <UI />
    </div>
  );
}
