import { StarIcon } from '@heroicons/react/outline';
import { StarIcon as FilledStar } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const UPDATE_USER_RATING = gql`
  mutation UPDATE_USER_RATING(
    $courseId: ID!
    $userRating: Int!
    $ratingCount: Int!
  ) {
    updateCourse(
      data: { rating: $userRating, ratingCount: $ratingCount }
      where: { id: $courseId }
    ) {
      id
    }
  }
`;

function UserRating({ courseId, currentRating, ratingCount }) {
  const [userRating, setUserRating] = useState(0);
  const [submitRating, { loading }] = useMutation(UPDATE_USER_RATING, {
    variables: {
      courseId: courseId,
      ratingCount: ratingCount === 0 || !ratingCount ? 1 : ratingCount + 1,
      userRating:
        ratingCount === 0 || !ratingCount
          ? userRating
          : Math.ceil((currentRating + userRating) / ratingCount),
    },
    update: (cache) => {
      cache.evict({ fieldName: 'course' });
    },
  });
  function handleClick(e) {
    setUserRating(parseInt(e.target.getAttribute('id')));
  }
  console.log(userRating);

  useEffect(() => {
    if (userRating) {
      submitRating();
    }
  }, [userRating]);

  return (
    <div className="flex flex-row">
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= userRating) {
          return (
            <FilledStar
              id={i}
              onClick={handleClick}
              width="30px"
              height="30px"
              key={i}
              className="cursor-pointer"
            />
          );
        } else {
          return (
            <StarIcon
              id={i}
              onClick={handleClick}
              width="30px"
              height="30px"
              key={i}
              className="cursor-pointer"
            />
          );
        }
      })}
    </div>
  );
}

export default UserRating;
