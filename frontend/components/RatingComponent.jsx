import { StarIcon } from '@heroicons/react/outline';
import { StarIcon as FilledStar } from '@heroicons/react/solid';

function RatingComponent({ points }) {
  return (
    <div className="flex flex-row">
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= points) {
          return <FilledStar width="30px" height="30px" key={i} />;
        } else {
          return <StarIcon width="30px" height="30px" />;
        }
      })}
    </div>
  );
}

export default RatingComponent;
