import { FaStar, FaRegStar } from 'react-icons/fa';

type Props = {
  rating: number;
};

export default function RatingStars({ rating }: Props) {
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) =>
        index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
      )}
    </div>
  );
}