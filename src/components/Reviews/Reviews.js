import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Api from '../../services/Api';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    Api.fetchReviews(id).then(result => setReviews(result.results));
  }, [id]);

  if (reviews && reviews.length > 0) {
    return (
      <ul>
        {reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h2>{author}</h2>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    );
  }
  return <p>No results were found for your request</p>;
};

export default Reviews;
