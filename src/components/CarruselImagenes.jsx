import PropTypes from 'prop-types';

const CarruselImagenes = ({images}) => {
    console.log('carrusel imagenes: ', images)
    const imagenes =images || []
    return (
    <div className="container">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        {/* Indicadores del carrusel */}
        <div className="carousel-indicators">
          {imagenes.map((image, index) => (
            <button
              key={image._id || image.id || index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Elementos internos del carrusel */}
        <div className="carousel-inner">
          {imagenes.map((image, index) => (
            <div key={image.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img 
                src={image.url} 
                className="d-block w-100 rounded-lg shadow-lg" 
                alt={image.titulo || image.descripcion}
                style={{ height: '400px', objectFit: 'cover' }} />
              <div className="carousel-caption d-none d-md-block bg-black bg-opacity-50 p-3 rounded-md">
                <h5 className="text-white text-lg font-bold">{image.titulo}</h5>
                <p className="text-white text-sm">{image.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de control (anterior/siguiente) */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  )
}

CarruselImagenes.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
};

export default CarruselImagenes