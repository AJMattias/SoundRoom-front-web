/* eslint-disable react/prop-types */

import PromedioEstrellas from "./PromedioEstrellas";

const OpinionesCard = ({sala, salas }) => {
    // console.log('sala: ', sala)
    //  // Verifica si la sala y sus opiniones existen y si el arreglo no está vacío
    // if (!sala || !sala.opiniones || sala.opiniones.length === 0) {
    //     return <div>Selecciona una sala para ver sus opiniones.</div>;
    // }
    const salasToRender = salas ? salas : sala ? [sala] : [];

    // Si no hay salas o ninguna tiene opiniones
    const noOpiniones = salasToRender.every(
      s => !s.opiniones || s.opiniones.length === 0
    );
    if (noOpiniones) {
      return <div>No hay opiniones disponibles.</div>;
    }

  return (
   
     salasToRender.map((salaItem, i) =>
      salaItem.opiniones?.map((opinion, j) => (
        <div
          key={`${i}-${j}`}
          className="border border-1 border-warning rounded-3 p-2 shadow mb-3"
          style={{ cursor: "pointer" }}
          onClick={() => console.log("opinion de user:", opinion.idUser._id)}
        >
          <h4>{salaItem.nameSalaEnsayo}</h4>
          <PromedioEstrellas averageRating={opinion.estrellas} />
          <p className="mt-2">{opinion.descripcion}</p>
          <h5 className="mt-0">
            {opinion.idUser.name} {opinion.idUser.lastName}
          </h5>
        </div>
      ))
    )
    )
}

export default OpinionesCard