import Image from 'next/image';
import Link from 'next/link';
import styles from './CamperCard.module.css';
import { Camper } from '@/types/camper';

type Props = {
  camper: Camper;
};

function formatLabel(value: string) {
  const map: Record<string, string> = {
    automatic: 'Automatic',
    manual: 'Manual',
    petrol: 'Petrol',
    diesel: 'Diesel',
    hybrid: 'Hybrid',
    electric: 'Electric',
    alcove: 'Alcove',
    panel_van: 'Panel truck',
    integrated: 'Fully integrated',
  };

  return map[value] || value.charAt(0).toUpperCase() + value.slice(1);
}

export default function CamperCard({ camper }: Props) {
  const reviewsCount = camper.totalReviews ?? camper.reviews?.length ?? 0;

  const image =
    camper.coverImage ||
    (Array.isArray(camper.gallery) && camper.gallery.length > 0
      ? typeof camper.gallery[0] === 'string'
        ? camper.gallery[0]
        : camper.gallery[0].thumb || camper.gallery[0].original
      : '/Pic.jpg');

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={camper.name}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.topRow}>
          <h2 className={styles.name}>{camper.name}</h2>
          <p className={styles.price}>€{camper.price}</p>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg className={styles.icon}>
              <use href="/symbol-defs.svg#icon-star" />
            </svg>
            {camper.rating} ({reviewsCount} Reviews)
          </span>

          <span className={styles.metaItem}>
            <svg className={styles.icon}>
              <use href="/symbol-defs.svg#icon-map" />
            </svg>
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.tags}>
          <span className={styles.tag}>
            <svg className={styles.icon}>
              <use href="/symbol-defs.svg#icon-Icons-1" />
            </svg>
            {formatLabel(camper.engine)}
          </span>

          <span className={styles.tag}>
            <svg className={styles.icon}>
              <use href="/symbol-defs.svg#icon-Icons-2" />
            </svg>
            {formatLabel(camper.transmission)}
          </span>

          <span className={styles.tag}>
            <svg className={styles.icon}>
              <use href="/symbol-defs.svg#icon-Icons" />
            </svg>
            {formatLabel(camper.form)}
          </span>
        </div>

        <Link
  href={`/catalog/${camper.id}`}
  target="_blank"
  rel="noopener noreferrer"
  className={styles.button}
>
  Show more
</Link>
      </div>
    </article>
  );
}
