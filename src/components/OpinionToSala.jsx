import PromedioEstrellas from "./PromedioEstrellas";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import userIcon from "../assets/user.png"


const OpinionToSala = ({ opinions }) => {
  const navigate = useNavigate();

  console.log("opiniones recibidas:", opinions);

  // 3. Verificamos si es un array y si tiene contenido
  if (!opinions || !Array.isArray(opinions) || opinions.length === 0) {
    return (
      <div className="bg-white border border-2 border-tertiary rounded-3 p-2 shadow mb-1">
        Aun no hay opiniones sobre mi
      </div>
    );
  }

  const listaOpiniones = Array.isArray(opinions)
    ? opinions
    : opinions.opiniones;

  return listaOpiniones.map((opinion, j) => (
    <div
        key={j}
        className="d-flex bg-white border border-2 border-tertiary rounded-3 p-2 mb-3"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/owner/ver-artista/${opinion.idUser._id}`)}
    >
      <div
        style={{ width: "100px", height: "100px", overflow: "hidden" }}
        className="me-3"
      >
        <img
            src={userIcon}
            alt={opinion.idUser.imagenes?.[0]?.titulo || "imagen perfil artista"}
            className="img-fluid rounded-3 mt-1"
            style={{ height: "100px", objectFit: "cover", width: "100px" }}
        />
      </div>
      <div>
        <h5>
            {opinion.idUser.name} {opinion.idUser.lastName}
        </h5>
        <PromedioEstrellas averageRating={opinion.estrellas} />
        <p className="mt-2">{opinion.descripcion}</p>
      </div>
    </div>
  ));
};

OpinionToSala.propTypes = {
    opinions: PropTypes.array.isRequired,
};

export default OpinionToSala;
