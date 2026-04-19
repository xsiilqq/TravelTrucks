import { Review } from '@/types/camper';
import RatingStars from '../RatingStars/RatingStars';

type Props = {
  reviews: Review[];
};

export default function CamperReviews({ reviews }: Props) {
  return (
    <section>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <h3>{review.reviewer_name}</h3>
            <RatingStars rating={review.reviewer_rating} />
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}