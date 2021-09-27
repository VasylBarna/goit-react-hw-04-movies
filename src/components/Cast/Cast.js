import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as Api from '../../services/Api';

const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    Api.fetchCredits(id).then(data => setCast(data.cast));
  }, [id]);
  return (
    <ul>
      {cast &&
        cast.map(({ id, profile_path, name, character }) => (
          <li key={id}>
            {profile_path ? (
              <img
                alt={name}
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
              />
            ) : (
              <img alt="Not found" src="" />
            )}
            <h2>{name}</h2>
            <p>{character}</p>
          </li>
        ))}
    </ul>
  );
};

export default Cast;
