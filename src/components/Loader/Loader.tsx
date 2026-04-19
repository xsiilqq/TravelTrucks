import styles from './Loader.module.css';

type Props = {
  label?: string;
};

export default function Loader({ label = 'Loading campers...' }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
    </div>
  );
}
