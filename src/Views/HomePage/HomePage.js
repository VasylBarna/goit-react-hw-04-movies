import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Api from '../../services/Api';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    Api.fetchTrending()
      .then(data => setTrending(data.results))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <h1 className={styles.section}>Most Trending Movies Today</h1>
      <ul className={styles.list}>
        {trending &&
          trending.map(({ id, name, title, poster_path }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: { backUrl: pathname },
                }}
              >
                <img
                  src={
                    poster_path !== null
                      ? `https://image.tmdb.org/t/p/w500${poster_path}`
                      : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                  }
                  alt={title ?? name}
                  width="320px"
                  height="480px"
                />
                {title || name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
