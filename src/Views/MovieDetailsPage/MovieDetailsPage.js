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
import styles from './MovieDetailsPage.module.scss';

const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "Reviews" */),
);

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { state } = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    Api.fetchDetails(id)
      .then(setMovie)
      .catch(error => console.log(error));
  }, [id]);

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
    <div className={styles.section}>
      <button type="button" className={styles.btn} onClick={handleToBack}>
        back
      </button>
      {movie && (
        <>
          <h1 className={styles.title}>{movie.title}</h1>
          <p>User Score: {movie.vote_average * 10}%</p>
          <div className={styles.section}>
            <img
              alt={movie.title ?? movie.name}
              src={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
              }
            />
            <div className={styles.section}>
              <h2>Overview</h2>
              <p>{movie.overview}</p>

              <h2>Genres</h2>
              <p>{movie.genres.map(genre => `${genre.name} `)}</p>
            </div>
          </div>
          <div className={styles.section}>
            <h2>Additional information</h2>
            <ul className={styles.list}>
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
    </div>
  );
};

export default MovieDetailsPage;
