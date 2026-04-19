import Link from 'next/link';
import styles from './page.module.css';

export default function Page() {
  return (
    <main className={styles.page}>
    

      <section className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.text}>
            You can find everything you want in our catalog
          </p>

          <Link href="/catalog" className={styles.button}>
            View Now
          </Link>
        </div>
      </section>
    </main>
  );
}