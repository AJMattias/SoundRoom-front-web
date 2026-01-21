/* eslint-disable no-unused-vars */
// import PropTypes from 'prop-types';

// // Desestructuramos las props: titulo y onClick
// const Opinar = ({ titulo, onClick }) => {
//   return (
//     <div
//       className="container mt-3 p-2 border border-1 border-tertiary background-secondary rounded-3"
//     >
//       <div className="row">
//         <div className="col-12 text-center">
//           {/* Usamos la prop titulo, o un texto por defecto */}
//           <h4 className=" mb-3">{titulo || "¡Deja tu opinión!"}</h4>
          
//           {/* Asignamos la prop onClick al evento del botón */}
//           <textarea
//             className="form-control mb-3"
//             rows="4"
//             placeholder="Escribe tu opinión aquí..."
//             onChange={}
//           ></textarea>
//           <button 
//             className="btn btn-warning text-dark px-4 py-2"
//             onClick={onClick}
//           >
//             Escribir Opinión
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// Opinar.propTypes = {
//   titulo: PropTypes.string,
//   onClick: PropTypes.func.isRequired,
// };

// export default Opinar;

import PropTypes from 'prop-types';
import SeleccionarEstrellas from './SeleccionarEstrellas';
import Alerta from './Alerta';
import { useState } from 'react';

const Opinar = ({ titulo, onClick, onChange, value, rating, setRating, showError, setShowError, puedoOpinar, puedoActualizarOpinion , actualizar}) => {
  const [alertaMensaje, setAlertaMensaje] = useState('');
  return (
    <div className="container mt-4 p-2 border border-1 border-tertiary background-secondary rounded-3">
      <div className="row">
        <div className="col-12 text-center ps-4 pe-4">
          <h4 className=" mt-3 mb-3">{titulo || "¡Deja tu opinión!"}</h4>
          {showError &&<Alerta mensaje={alertaMensaje} onClose={() => setShowError(false)}></Alerta>}
          <SeleccionarEstrellas rating={rating} setRating={setRating} />
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Escribe tu opinión aquí..."
            maxLength={400}
            value={value} // El valor viene del padre
            onChange={(e) => onChange(e.target.value)} // Pasamos solo el texto al padre
          ></textarea>
          
          {puedoOpinar == true && puedoActualizarOpinion == false &&(
            <button 
            className="btn btn-warning text-dark px-4 py-2"
            onClick={onClick}
          >
            Enviar Opinión
          </button>
          )}
          
          {puedoOpinar == false && puedoActualizarOpinion == true &&(
            <button 
            className="btn btn-warning text-dark px-4 py-2"
            onClick={actualizar}
          >
            Actualizar Opinión
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

Opinar.propTypes = {
  titulo: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  actualizar: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  showError: PropTypes.bool.isRequired,
  puedoOpinar: PropTypes.bool.isRequired,
  puedoActualizarOpinion: PropTypes.bool.isRequired,
  setShowError: PropTypes.func.isRequired,
};

export default Opinar;