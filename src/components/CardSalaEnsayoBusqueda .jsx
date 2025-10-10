/* eslint-disable react/prop-types */

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CardSalaEnsayoBusqueda =({sala}) =>{

    const navigate = useNavigate()

    const handleCardClick = (id) => {
        navigate(`/sala/${id}`);
      }

    console.log('sala card: ', sala)
    console.log('url imagen sala en card: ', sala.imagenUrl)
      return (
        <div 
        className="card shadow pt-3 mx-2 h-100"
        onClick={() => console.log(`Sala seleccionada: ${sala.id}`)}
        //onClick={handleCardClick(sala.id)} 
        style={{cursor: 'pointer' }}
        >
            {/* Imagen de la sala - puedes usar una imagen por defecto o de la API */}
            <img 
                src={sala.imagenes[0].url || "https://via.placeholder.com/300x200/FFC107/FFFFFF?text=Sala+Ensayo"} 
                className="card-img-top px-3" 
                alt={`Sala ${sala.nameSalaEnsayo}`}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            
            <div className="card-body d-flex flex-column">
                {/* Título y calificación */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{sala.nameSalaEnsayo}</h5>
                    
                    {/* Calificación - puedes agregar este campo a tu API si no existe */}
                    <div className="d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span className="fw-bold">{sala.calificacion || "4.5"}</span>
                    </div>
                </div>
                
                {/* Ubicación */}
                <p className="card-text text-muted flex-grow-1">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {sala.calleDireccion}
                </p>
                
                {/* Precio y botón */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fw-bold text-black fs-5">
                        ${sala.precioHora}/hs
                    </span>
                    <button className="btn btn-warning btn-sm px-3">
                        Alquilar
                    </button>
                </div>
            </div>
        </div>
    );
}
export default CardSalaEnsayoBusqueda

    CardSalaEnsayoBusqueda.propTypes = {
    sala: PropTypes.shape({
        imagenUrl: PropTypes.string,
        nameSalaEnsayo: PropTypes.string,
        calificacion: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        calleDireccion: PropTypes.string,
        precioHora: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
};

