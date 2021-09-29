import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as Api from '../../services/Api';
import styles from './Cast.module.scss';

const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    Api.fetchCredits(id).then(data => setCast(data.cast));
  }, [id]);

  return (
    <ul className={styles.list}>
      {cast &&
        cast.map(({ id, profile_path, name, character }) => (
          <li key={id}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
              }
              alt={name}
              width="150"
            />
            <h2>{name}</h2>
            <p>{character}</p>
          </li>
        ))}
    </ul>
  );
};

export default Cast;
