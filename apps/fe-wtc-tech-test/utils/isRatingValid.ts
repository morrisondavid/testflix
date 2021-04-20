const isRatingValid = (rating: number) => {
  return rating > -1 && rating % 0.5 === 0 && rating <= 5;
};

export default isRatingValid;
