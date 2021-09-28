import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Link,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useParams } from 'react-router';
import * as Api from '../../services/Api';

const Cast = lazy(() => import('../../components/Cast'));
const Reviews = lazy(() => import('../../components/Reviews'));

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { state } = useLocation();
  const { movieId } = useParams();
  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    Api.fetchDetails(movieId).then(setMovie);
  }, [movieId]);

  const handleToBack = () => {
    if (state?.query) {
      history.push({
        pathname: state.backUrl,
        search: `query=${state.query}`,
      });
      return;
    }

    if (!state?.query && state?.backUrl) {
      history.push({
        pathname: state.backUrl,
      });
      return;
    }
    history.push({
      pathname: '/',
    });
  };
  return (
    <>
      <button className={'btn'} onClick={handleToBack}>
        Back
      </button>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>User Score: {movie.vote_average * 10}%</p>
          <div>
            <img
              alt={movie.title ?? movie.name}
              src={`https://image.tmdb.org/t/p/w250/${movie.poster_path}`}
            />
            <div>
              <h2>Overview</h2>
              <p>{movie.overview}</p>

              <h2>Genres</h2>
              <p>{movie.genres.map(genre => `${genre.name} `)}</p>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      backUrl: state?.backUrl || '/',
                      query: state?.query || '',
                    },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      backUrl: state?.backUrl || '/',
                      query: state?.query || '',
                    },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>

            <Suspense fallback={<h1>Loading...</h1>}>
              <Route path={`${path}/cast`}>
                <Cast />
              </Route>
              <Route path={`${path}/reviews`}>
                <Reviews />
              </Route>
            </Suspense>
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
