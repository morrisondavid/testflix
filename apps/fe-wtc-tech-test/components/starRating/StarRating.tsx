import React from 'react';
import { getFormattedRating, logger } from '../../utils';
import { ErrorMessages } from '../../constants';
import {
  StarIcon,
  StarBorderIcon,
  StarHalfIcon,
} from '@mono-nx-test-with-nextjs/ui';

import './StarRating.css';

export interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const stars = [];

  if (rating === -1) {
    logger.warn(ErrorMessages.INVALID_RATING);
  }

  let starRating = getFormattedRating(rating);

  for (let i = 0; i < 5; i++) {
    if (starRating > 0.5) {
      stars.push(<StarIcon key={i} />);
    } else if (starRating === 0.5) {
      stars.push(<StarHalfIcon key={i} />);
    } else {
      stars.push(<StarBorderIcon key={i} />);
    }
    starRating--;
  }

  return (
    <div className="rating-container">
      <span>{`(${rating})`}</span>
      <div className="rating-container__stars">{stars}</div>
    </div>
  );
};

export default StarRating;
