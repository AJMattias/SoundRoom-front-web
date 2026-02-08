/* eslint-disable no-unused-vars */
import { useState } from "react";

const SalasCard = (room) => {
    const [sala, setSala] = useState(room.sala)
    console.log('sala en card: ', room.sala);
  return (
    <div className="border border-1 border-tertiary rounded rounded-3 bg-body-white p-2 mb-3">
        <div className="row d-flex align-items-center gap-3 justify-content-center">
            <div className="col-10 mt-3">
                <img 
                    src={sala.imagenes[0].url ||"https://placehold.co/600x100" }
                    alt="Sala de ensayo" 
                    className="img-fluid rounded-3"
                    style={{width: "700px", height: "200px", objectFit: "cover"}} />
            </div>
            <div className="col-10">
                <div className=" d-flex">
                     <h5>{sala.nameSalaEnsayo}</h5>
                     {!sala.enabled &&(
                         <div className="badge bg-warning p-2 ms-2 text-black">
                                Pausada
                            </div>
                     )}
                    {sala.enabled ==="habilitado" 
                        ? (
                             <div className="badge bg-warning p-2 ms-2 text-black">
                                Activa
                            </div>
                        )
                        : (
                             <div className="badge bg-warning p-2 ms-2 text-black">
                                Pausada
                            </div>
                    )}
                </div>
                
                <div className="d-flex align-content-start mt-2 gap-2">
                    {/* icono ubicacion */}
                    <i className="bi bi-geo-alt-fill text-warning "></i>
                    <h5 className="fw-semibold">Direccion:</h5>
                    <p className="ms-2">{sala.calleDireccion}</p>
                </div>
                <div className="d-flex gap-2">
                    <h5 className="fw-semibold">Descripcion:</h5>
                    <p >{sala.descripcion}</p>
                </div>
                <div className="d-flex gap-2">
                    <h5>Comodidades: </h5>
                    {sala.comodidades && sala.comodidades.length > 0 ? (
                        <div className="d-flex flex-wrap gap-2">
                            {sala.comodidades.map((comodity, index) => (
                                <span
                                    key={index}
                                    className="badge bg-warning text-dark p-2"
                                >
                                    {comodity}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p>No se han especificado comodidades para esta sala.</p>
                    )}
                </div>
                <div className="d-flex">
                   <h5>Precio: </h5><p className="ms-2"> ${sala.precioHora}/hs</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-warning">Ver detalles</button>
                    <button className="btn btn-sm btn-outline-warning">Pausar</button>

                </div>


            </div>
        </div>
    </div>
  )
}

export default SalasCard