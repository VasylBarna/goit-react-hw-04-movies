import { useState, useEffect } from 'react';
import { useLocation, useHistory, Link, useRouteMatch } from 'react-router-dom';
import * as Api from '../../services/Api';
import queryString from 'query-string';
import styles from './MoviesPage.module.scss';

const MoviesPage = () => {
  const [requestSearch, setRequestSearch] = useState([]);
  const location = useLocation();
  const value = queryString.parse(location.search)?.query || '';
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.elements.searching.value.trim() === '') {
      return alert('WOW');
    }
    history.push({
      ...location,
      search: `query=${event.target.elements.searching.value}`,
    });
  };

  useEffect(() => {
    if (value === '') {
      return;
    }

    Api.fetchSearch(value)
      .then(({ results }) => {
        setRequestSearch(results);
      })
      .catch(error => console.log(error));
  }, [value]);

  return (
    <div className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="searching"
          type="text"
          placeholder="Enter the title of the movie"
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
      {requestSearch && requestSearch.length > 0 && (
        <ul className={styles.section}>
          {requestSearch.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: {
                    backUrl: location,
                  },
                }}
              >
                <img
                  src={
                    movie.poster_path !== null
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                  }
                  alt={movie.title ?? movie.name}
                  width="280px"
                  height="450px"
                />
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
