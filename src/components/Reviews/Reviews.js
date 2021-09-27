import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as Api from '../../services/Api';

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    Api.fetchReviews(id).then(data => setReviews(data.reviews));
  }, [id]);

  if (reviews && reviews.length > 0) {
    return (
      <ul>
        {reviews.map(({ id, author, details }) => (
          <li key={id}>
            <h2>{author}</h2>
            <p>{details}</p>
          </li>
        ))}
      </ul>
    );
  }
  return <p>No results were found for your request</p>;
};

export default Reviews;
