
import PropTypes from 'prop-types';

const PromedioEstrellas = ({averageRating}) => {
  // Redondea el promedio a un número entero para facilitar la visualización
    //const roundedRating = Math.round(averageRating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        const starClass = i <= averageRating ? 'bi-star-fill text-warning' : 'bi-star';
        stars.push(
            <i key={i} className={`bi ${starClass}`} style={{ fontSize: '1rem' }}></i>
        );
    }

    return (
        <div className="d-flex align-items-center">
            {stars}
        </div>
    );

}
PromedioEstrellas.propTypes = {
    averageRating: PropTypes.number.isRequired,
};
export default PromedioEstrellas