const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = '18f5f687216163c49b39bf8ad362fd14';

async function ApiService(url) {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrending() {
  return ApiService(`${BASE_URL}/3/trending/all/day?api_key=${API_KEY}`);
}

export function fetchSearch(query) {
  return ApiService(
    `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${query}`,
  );
}

export function fetchDetails(id) {
  return ApiService(`${BASE_URL}/3/movie/${id}?api_key=${API_KEY}`);
}

export function fetchCredits(movieId) {
  return ApiService(
    `${BASE_URL}/3//movie/${movieId}/credits?api_key=${API_KEY}`,
  );
}

export function fetchReviews(movieId) {
  return ApiService(
    `${BASE_URL}/3//movie/${movieId}/reviews?api_key=${API_KEY}`,
  );
}
