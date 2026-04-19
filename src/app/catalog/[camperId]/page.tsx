import { notFound } from 'next/navigation';
import { getCamperById, getCamperReviews } from '@/lib/api';
import { Camper, Review } from '@/types/camper';
import CamperGallery from '@/components/CamperGallery/CamperGallery';
import BookingForm from '@/components/BookingForm/BookingForm';
import styles from './page.module.css';

type Props = {
  params: Promise<{ camperId: string }>;
};

type CamperFeature = {
  key: string;
  label: string;
};

function formatLabel(value: string) {
  if (!value) return '';

  const map: Record<string, string> = {
    automatic: 'Automatic',
    manual: 'Manual',
    petrol: 'Petrol',
    diesel: 'Diesel',
    hybrid: 'Hybrid',
    electric: 'Electric',
    alcove: 'Alcove',
    panelTruck: 'Panel truck',
    panel_van: 'Panel truck',
    fullyIntegrated: 'Fully integrated',
    integrated: 'Fully integrated',
    semiIntegrated: 'Semi Integrated',
  };

  return map[value] || value.charAt(0).toUpperCase() + value.slice(1);
}

function getVehicleFeatures(camper: Camper): CamperFeature[] {
  const amenities = camper.amenities ?? [];

  return [
    camper.transmission
      ? {
          key: 'transmission',
          label: formatLabel(camper.transmission),
        }
      : null,
    amenities.includes('ac')
      ? {
          key: 'ac',
          label: 'AC',
        }
      : null,
    camper.engine
      ? {
          key: 'engine',
          label: formatLabel(camper.engine),
        }
      : null,
    amenities.includes('kitchen')
      ? {
          key: 'kitchen',
          label: 'Kitchen',
        }
      : null,
    amenities.includes('radio')
      ? {
          key: 'radio',
          label: 'Radio',
        }
      : null,
    camper.form
      ? {
          key: 'form',
          label: formatLabel(camper.form),
        }
      : null,
  ].filter((feature): feature is CamperFeature => feature !== null);
}

function getVehicleSpecs(camper: Camper) {
  return [
    { label: 'Form', value: formatLabel(camper.form) },
    { label: 'Length', value: camper.length ?? '' },
    { label: 'Width', value: camper.width ?? '' },
    { label: 'Height', value: camper.height ?? '' },
    { label: 'Tank', value: camper.tank ?? '' },
    { label: 'Consumption', value: camper.consumption ?? '' },
  ].filter((item) => item.value);
}

export default async function CamperDetailsPage({ params }: Props) {
  const { camperId } = await params;

  let camper: Camper;
  let reviews: Review[] = [];

  try {
    const [camperData, reviewsData] = await Promise.all([
      getCamperById(camperId),
      getCamperReviews(camperId).catch(() => []),
    ]);

    camper = camperData;
    reviews = Array.isArray(reviewsData) ? reviewsData : [];
  } catch {
    notFound();
  }

  if (!camper) {
    notFound();
  }

  const gallery: Camper['gallery'] = Array.isArray(camper.gallery) ? camper.gallery : [];
  const vehicleFeatures = getVehicleFeatures(camper);
  const vehicleSpecs = getVehicleSpecs(camper);
  const reviewsCount = camper.totalReviews ?? reviews.length;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.topGrid}>
          <div className={styles.leftColumn}>
            <CamperGallery gallery={gallery} camperName={camper.name} />
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.infoCard}>
              <h1 className={styles.title}>{camper.name}</h1>

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

              <p className={styles.price}>€{camper.price}</p>
              <p className={styles.description}>{camper.description}</p>
            </div>

            <div className={styles.detailsCard}>
              <h2 className={styles.detailsTitle}>Vehicle details</h2>

              <div className={styles.featureTags}>
                {vehicleFeatures.map((feature) => (
                  <span key={feature.key} className={styles.tag}>
                    {feature.label}
                  </span>
                ))}
              </div>

              {vehicleSpecs.length > 0 && (
                <ul className={styles.specs}>
                  {vehicleSpecs.map((spec) => (
                    <li key={spec.label}>
                      <span>{spec.label}</span>
                      <span>{spec.value}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section className={styles.bottomSection}>
          <h2 className={styles.bottomTitle}>Reviews</h2>

          <div className={styles.bottomGrid}>
            <ul className={styles.reviewList}>
              {reviews.length > 0 ? (
                reviews.map((review: Review, index: number) => (
                  <li key={index} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>
                        {review.reviewer_name?.charAt(0)}
                      </div>

                      <div>
                        <p className={styles.reviewName}>
                          {review.reviewer_name}
                        </p>

                        <div className={styles.stars}>
                          {Array.from({ length: 5 }, (_, starIndex: number) => (
                            <svg
                              key={starIndex}
                              className={
                                starIndex < review.reviewer_rating
                                  ? styles.starActive
                                  : styles.starInactive
                              }
                            >
                              <use href="/symbol-defs.svg#icon-star" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className={styles.reviewText}>{review.comment}</p>
                  </li>
                ))
              ) : (
                <li className={styles.reviewCard}>
                  <p className={styles.reviewText}>No reviews yet.</p>
                </li>
              )}
            </ul>

            <BookingForm />
          </div>
        </section>
      </div>
    </main>
  );
}
