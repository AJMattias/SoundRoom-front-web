/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PromedioEstrellas from "./PromedioEstrellas";
import { opiniones as opinionesJ } from "../data/opiniones"
import { useState } from "react";

const OpinionesArtistaCard = () => {
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
          className="bg-white border border-2 border-tertiary rounded-3 p-2 mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => console.log("opinion de user:", opinion.idUser._id)}
        >
          <h4>{opinion.idRoom.nameSalaEnsayo}</h4>
          <PromedioEstrellas averageRating={opinion.estrellas} />
          <p className="mt-2">{opinion.descripcion}</p>
          
        </div>
      ))
    )
    
}

export default OpinionesArtistaCard