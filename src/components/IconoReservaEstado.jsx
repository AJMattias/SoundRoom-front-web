import PropTypes from 'prop-types';
import { 
  IoMdCheckmarkCircleOutline, 
  IoMdTime,
  IoMdCloseCircle 
} from 'react-icons/io'

const IconoReservaEstado = ({ estado }) => {
    
    switch(estado) {
        case "Aprobada":
            return (
                <IoMdCheckmarkCircleOutline
                    size={50}
                    color="green"
                    title="Reserva Aprobada"
                />
            );
        case "Pendiente":
            return (
                <IoMdTime
                    size={50}
                    color="#FFA500" // Naranja
                    title="Reserva Pendiente"
                />
            );
        case "Rechazada":
            return (
                <IoMdCloseCircle
                    size={50}
                    color="#dc3545" // Rojo
                    title="Reserva Rechazada"
                />
            );
        default:
            return (
                <IoMdTime
                    size={50}
                    color="#6c757d" // Gris
                    title="Estado Desconocido"
                />
            );
    }
}

IconoReservaEstado.propTypes = {
  estado: PropTypes.string.isRequired,
};

export default IconoReservaEstado;