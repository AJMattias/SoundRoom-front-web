import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const ArtistHomeReservations = ({ reservasSelected }) => {

    const navigate = useNavigate()

    // La lista a renderizar es directamente la prop, que ya viene filtrada y formateada
    const reservas = reservasSelected; 
    const dateNow = new Date()
    // --- Renderizado ---
    console.log('reservasSelected: ', reservasSelected)
    
    if (!reservas || reservas.length === 0) {
        return (
            <div className="col-12 bg-white mt-1 border border-2 border-tertiary rounded-3 p-4 text-center text-muted">
                No hay reservas para mostrar en esta sección.
            </div>
        );
    }
    
    if(reservas.length > 0){
        reservas.map((reserva) => {
            //console.log('dateNow dentro del map: ', reserva.date, dateNow)
            reserva.date = new Date(reserva.date)
            console.log('dateNow: ', dateNow, 'reserva date: ', reserva.date)
            // if(reserva.date > dateNow ){
            // }
            console.log('reserva.date', reserva.date, dateNow)
            console.log('reserva pasada menor a datenow: ', reserva.date < dateNow)
            //reserva.date = new Date(reserva.date)
        
        })
    }

    return (
        <div className="col-12 bg-white mt-1 border border-2 border-tertiary rounded-3">
            {/* 🔑 CLAVE 2: Mapeamos directamente la lista 'reservas' (que es la prop) */}
            {reservas.map((reserva, index) => ( 

                <div key={reserva.id || index} // Usamos 'reserva.id' como key si existe
                    className=" col-12 pt-2 ps-2 mt-2 ms-2 mb-2"
                    >
                    <div 
                        className="d-flex align-items-center col-9"
                         onClick={()=> navigate(`/artista/reserva/${reserva.id}`)}>
                        <div 
                            style={{width: '100px', height: '100px', overflow: 'hidden'
                            }} 
                            className="me-3"
                            >
                            <img 
                                src={reserva.idRoom.imagenes[0]?.url || 'https://via.placeholder.com/100'} 
                                alt={reserva.idRoom.nameSalaEnsayo} 
                                className="img-fluid rounded-3"
                                style={{height: '100px', objectFit: 'cover', width: '100px',}}
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100"> 
                            <div className="w-75">
                                <strong className="fs-5">{reserva.idRoom.nameSalaEnsayo}</strong>
                                <div>
                                    {/* Usamos 'dateDisplay' que es la propiedad formateada por el componente padre */}
                                    <p className="mb-0">{reserva.dateDisplay}: {reserva.hsStart}hs - {reserva.hsEnd}hs </p>
                                    <p className="mb-0">{reserva.price}</p>
                                    <p>{reserva.idRoom.calleDireccion}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0 ms-3">
                            {/* El uso de '==' es aceptable aquí si los valores son booleanos o strings */}
                            {reserva.canceled === 'false' && reserva.date < dateNow && (
                                    <div className="bg-warning p-1 rounded-1">Realizada</div>
                            )}
                            {reserva.canceled === 'false' && reserva.date > new Date() &&( 
                                <div className= "d-flex flex-column gap-2">
                                    <div className="bg-warning p-1 rounded-1">Reservado</div>
                                    <div className="btn btn-sm btn-outline-warning">Cancelar</div>
                                </div>
                            )}
                            {reserva.canceled === 'true' &&(
                                <div className="bg-danger p-1 rounded-1">Cancelada</div>
                            )}
                            
                            </div>
                        </div>
                    </div>
                    {index !== reservas.length - 1 && <hr className="my-3" />}
                </div>
            ))}
            
        </div>
    )
}

export default ArtistHomeReservations
