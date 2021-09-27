const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = '984b98e1-77aa-4447-8901-a3905fdcb1a7';

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
  return ApiService(`${BASE_URL}/3//movie/${id}?api_key=${API_KEY}`);
}

export function fetchCredits(id) {
  return ApiService(`${BASE_URL}/3//movie/${id}/credits?api_key=${API_KEY}`);
}

export function fetchReviews(id) {
  return ApiService(`${BASE_URL}/3//movie/${id}/reviews?api_key=${API_KEY}`);
}
