import PropTypes from 'prop-types';
import { useState } from 'react';

const SeleccionarEstrellas = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="mb-3">
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <i
            key={star}
            className={`bi ${
              star <= (hover || rating) ? 'bi-star-fill text-warning' : 'bi-star text-secondary'
            }`}
            style={{ fontSize: '1.5rem', cursor: 'pointer', transition: 'color 0.2s' }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          ></i>
        );
      })}
      <span className="ms-2 text-muted">({rating} de 5)</span>
    </div>
  );
};

SeleccionarEstrellas.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
};

export default SeleccionarEstrellas;