import PropTypes from 'prop-types';

const OpinionCard = ({ opinion, idUserLogged, puedoActualizar }) => {
  console.log('opinion en OpinionCard: ', opinion);
  return (
    <div
      className="card d-flex flex-row mb-5" // Use d-flex and flex-row for horizontal layout
      style={{ width: '100%', height: '12rem', overflow: 'hidden' }} // Set fixed height and hide overflow
      onClick={() => console.log('navegar a usuario con id y nombre: ', opinion.idUser._id , opinion.idUser.name)}
    >
      {/* Image Column */}
      <div 
        className="col-2 d-flex align-items-center justify-content-center p-2"
        > {/* Smaller column for image */}
        {opinion.idUser.imageId ? (
          <img
            src={opinion.idUser.imageId}
            className="img-fluid rounded-circle" // Make image fluid and circular
            alt={`${opinion.idUser.name}'s profile`}
            style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} // Control image size
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
              ? `${opinion.descripcion.substring(0, 200)}...` 
              : opinion.descripcion}
          </p>
        </div>
        {idUserLogged === opinion.idUser._id && (
          <div>
            <button 
              className="btn btn-sm btn-outline-warning"
              onClick={()=>puedoActualizar(opinion._id)}
              >
              <i className="bi bi-pencil-square"></i>Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

OpinionCard.propTypes = {
  opinion: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    estrellas: PropTypes.number.isRequired,
    idUser: PropTypes.shape({
      _id: PropTypes.string,
      imageId: PropTypes.string,
      name: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      
    }).isRequired,
  }).isRequired,
  idUserLogged: PropTypes.string,
  puedoActualizar: PropTypes.func,
};

export default OpinionCard;