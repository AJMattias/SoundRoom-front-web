import PropTypes from "prop-types";
import IconoReservaEstado from "./IconoReservaEstado";

const HeaderReservaEstado = ({ estado }) => {
    let texto = "";
    if (estado === "Aprobada") {
            texto = "Tu reserva fue registrada con exito";
    } else if (estado === "Pendiente") {
            texto = "Tu reserva esta pendiente de aprobacion";
    } else if (estado === "Rechazada") {
         texto = "Tu reserva fue rechazada";
    }

    if(estado === "true"){
        texto = "Reserva cancelada";
    }else if( estado ==="false"){
        texto = "Reserva Confirmada"
    }

    return (
        <div className="d-flex flex-column align-items-center col-12 mb-3">
            <IconoReservaEstado estado={estado} />
            <h3 className="d-flex justify-content-center mb-3">Reserva {estado}</h3>
            <h5 className="d-flex justify-content-center mb-3">{texto}</h5>
        </div>
    );
};

HeaderReservaEstado.propTypes = {
  estado: PropTypes.string.isRequired,
};

export default HeaderReservaEstado;
