
const ReservasCard = (reservas) => {
    if(reservas.length === 0) {
     return <div>Aun no tienes reservas.</div>
    }
    return (
        reservas.map((reserva, r)=>{
            <div
            key={r}
            className="border border-1 border-warning rounded-3 p-2 shadow mb-3"
            // style={{cursor: "pointer"}} 
            // onClick={() => console.log("reserva de user:", reserva.idUser._id)}
            >
                {/* div card */}
                <div
                    className="d-flex justify-content-between align-items-center"
                >
                    {/* imagen card */}
                    <div className="col-2">
                    <img src={reserva.idRoom.imagenes[0].url} alt={reserva.idRoom.imagenes[0].titulo} />
                    </div>
                    {/* info card */}
                    <div className="col-8">
                        <h4>{reserva.idRoom.nameSalaEnsayo}</h4>
                        <p className="mt-2">Fecha: {new Date(reserva.fecha).toLocaleDateString()}</p>
                        <p className="mt-2">Hora: {reserva.horaInicio} - {reserva.horaFin}</p>
                        <h5 className="mt-0">Reservado por: {reserva.idUser.name} {reserva.idUser.lastName}</h5>
                        <p className="mt-2">${reserva.totalPrice}</p>
                    </div>
                    {/* estado reserva */}
                    {/* <div className="col-2 text-end">
                        <span className={`badge ${reserva.estado === 'confirmada' ? 'bg-success' : reserva.estado === 'pendiente' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                            {reserva.estado}
                        </span>
                    </div> */}
                </div>
            </div>
        })
    )
}

export default ReservasCard