const getFormattedRating = (rating: number) => {
  let formattedRating = 0;

  if (rating >= 5) {
    formattedRating = 5;
  } else if (rating > 4.5) {
    formattedRating = 4.5;
  } else if (rating > 4) {
    formattedRating = 4;
  } else if (rating > 3.5) {
    formattedRating = 3.5;
  } else if (rating > 3) {
    formattedRating = 3;
  } else if (rating > 2.5) {
    formattedRating = 2.5;
  } else if (rating > 2) {
    formattedRating = 2;
  } else if (rating > 1.5) {
    formattedRating = 1.5;
  } else if (rating > 1) {
    formattedRating = 1;
  } else if (rating > 0.5) {
    formattedRating = 0.5;
  } else {
    formattedRating = 0;
  }

  return formattedRating;
};

export default getFormattedRating;
