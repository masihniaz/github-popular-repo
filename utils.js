export const isPopular = (stars, forks) => {
  const STARS_WEIGHT = 1;
  const FORKS_WEIGHT = 2;
  const POPULAR_SCORE = 500;
  const score = stars * STARS_WEIGHT + forks * FORKS_WEIGHT;
  return score >= POPULAR_SCORE ? "Yes" : "No";
};

export const debounce = (cb, delay = 1000) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
