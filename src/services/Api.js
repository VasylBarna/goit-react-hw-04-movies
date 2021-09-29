const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '18f5f687216163c49b39bf8ad362fd14';

async function ApiService(url) {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrending() {
  return ApiService(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
}

export function fetchSearch(value) {
  return ApiService(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${value}`,
  );
}

export function fetchDetails(id) {
  return ApiService(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
}

export function fetchCredits(id) {
  return ApiService(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
}

export function fetchReviews(id) {
  return ApiService(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
}
