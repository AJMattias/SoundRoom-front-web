/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PromedioEstrellas from "./PromedioEstrellas";
import { opiniones as opinionesJ } from "../data/opiniones"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OpinionesArtistaCard = () => {
  const navigate = useNavigate()
  const [opiniones, setOpiniones] = useState(opinionesJ)
   
  if(opiniones?.length === 0 || opiniones=== undefined){
    return <div 
    className="bg-white border border-2 border-tertiary rounded-3 p-2 shadow mb-1"
    >Aun no hay opiniones sobre mi</div>
  }
  console.log('opiniones: ', opiniones)

  

  return (
     opiniones.map((opinion, j) => (
        <div
          key={j}
          className="d-flex bg-white border border-2 border-tertiary rounded-3 p-2 mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/artista/ver-sala/${opinion.idRoom.id}`)}
        >
           <div 
            style={{width: '100px', height: '100px', overflow: 'hidden'
            }} 
            className="me-3"
            >
            <img 
                src={opinion.idRoom.imagenes[0]?.url || 'https://via.placeholder.com/100'} 
                alt={opinion.idRoom.imagenes[0].titulo || 'imagen perfil sala'} 
                className="img-fluid rounded-3 mt-1"
                style={{height: '100px', objectFit: 'cover', width: '100px',}}
            />
          </div>
          <div>
            <h4>{opinion.idRoom.nameSalaEnsayo}</h4>
            <PromedioEstrellas averageRating={opinion.estrellas} />
            <p className="mt-2">{opinion.descripcion}</p>
          </div>
        </div>
      ))
    )
    
}

export default OpinionesArtistaCard