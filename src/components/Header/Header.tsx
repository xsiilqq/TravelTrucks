'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
  <div className={styles.container}>
    
    <div className={styles.logo}>
      <span className={styles.logoBlack}>Travel</span>
      <span className={styles.logoGreen}>Trucks</span>
    </div>

    <nav className={styles.nav}>
      <Link
        href="/"
        className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
      >
        Home
      </Link>

      <Link
        href="/catalog"
        className={`${styles.link} ${
          pathname.startsWith('/catalog') ? styles.active : ''
        }`}
      >
        Catalog
      </Link>
    </nav>

  </div>
</header>
  );
}