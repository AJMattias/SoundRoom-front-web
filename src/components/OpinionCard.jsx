import PropTypes from 'prop-types';

const OpinionCard = ({ opinion }) => {
  return (
    <div
      className="card d-flex flex-row mb-5" // Use d-flex and flex-row for horizontal layout
      style={{ width: '25rem', height: '8rem', overflow: 'hidden' }} // Set fixed height and hide overflow
      onClick={() => console.log('navegar a usuario con id y nombre: ', opinion.idUser._id , opinion.idUser.name)}
    >
      {/* Image Column */}
      <div 
        className="col-4 d-flex align-items-center justify-content-center p-2"
        > {/* Smaller column for image */}
        {opinion.idUser.imageId ? (
          <img
            src={opinion.idUser.imageId}
            className="img-fluid rounded-circle" // Make image fluid and circular
            alt={`${opinion.idUser.name}'s profile`}
            style={{ maxWidth: '80px', maxHeight: '80px', objectFit: 'cover' }} // Control image size
          />
        ) : (
          <i className="bi bi-person-circle text-warning display-4"></i> // Larger icon
        )}
      </div>

      {/* Content Column */}
      <div className="card-body col-8 d-flex flex-column justify-content-between p-2"> {/* Larger column for content */}
        <div>
          <h5 className="card-title mb-1">{opinion.idUser.name} {opinion.idUser.lastName}</h5>
          <div className='d-flex align-items-center ms-3 gap-1'>
            <p className="text-black fw-bold mb-0">
            {/* Display stars, e.g., using a function or directly */}
            {`${opinion.estrellas}`} 
          </p>
          <i className="bi bi-star-fill text-warning "></i>
          </div>
          <p className="card-text small text-muted">
            {/* Truncate description if it's too long to fit */}
            {opinion.descripcion.length > 80 
              ? `${opinion.descripcion.substring(0, 77)}...` 
              : opinion.descripcion}
          </p>
        </div>
      </div>
    </div>
  );
};

OpinionCard.propTypes = {
  opinion: PropTypes.shape({
    descripcion: PropTypes.string.isRequired,
    estrellas: PropTypes.number.isRequired,
    idUser: PropTypes.shape({
      _id: PropTypes.string,
      imageId: PropTypes.string,
      name: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OpinionCard;