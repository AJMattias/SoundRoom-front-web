import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// Función para agrupar en chunks de 3
const chunkArray = (array, size) => {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
};

const MisSalasCards = ({ salas }) => {
  const navigate = useNavigate();
  if (!salas || salas.length === 0) return <p>No hay salas disponibles.</p>;

  const chunkedSalas = chunkArray(salas, 3);

  return (
    <div id="carouselSalas" className="carousel slide mt-3" data-bs-ride="carousel">
      <div className="carousel-inner">
        {chunkedSalas.map((grupo, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="d-flex justify-content-center gap-3">
              {grupo.map((sala, subIndex) => (
                <div key={subIndex} className="card shadow-lg" style={{ width: '18rem' }}
                  onClick={()=> navigate("/owner/sala-ensayo/"+sala.id)}>
                  <img
                    src={sala.imagenes[0]?.url}
                    className="card-img-top"
                    alt={sala.nameSalaEnsayo}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title mb-0">{sala.nameSalaEnsayo}</h5>
                    <button className="btn btn-outline-secondary disabled btn-sm text-black mb-0 rounded-3">
                      {sala.enabled ? 'Activa' : 'Pausada'}
                    </button>
                  </div>
                    <p className="card-text">{sala.description}</p>
                    <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-outline-warning btn-sm text-black">Ver</button>
                      <button className="btn btn-outline-warning btn-sm text-black">Calendario</button>
                      <button className="btn btn-outline-warning btn-sm text-black">Pausar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controles del carrusel */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselSalas" data-bs-slide="prev">
        <span style={{ color: 'orange', fontSize: '3rem' }}>&#10094;</span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselSalas" data-bs-slide="next">
        <span style={{ color: 'orange', fontSize: '3rem' }}>&#10095;</span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

MisSalasCards.propTypes = {
  salas: PropTypes.arrayOf(
    PropTypes.shape({
      imagenes: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
      nameSalaEnsayo: PropTypes.string,
      enabled: PropTypes.bool,
    })
  ),
};

export default MisSalasCards;
