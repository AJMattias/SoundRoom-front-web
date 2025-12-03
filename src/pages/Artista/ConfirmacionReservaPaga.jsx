import { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci"
import { IoIosCalendar, IoIosTime, IoMdCheckmarkCircleOutline, IoMdMusicalNotes } from "react-icons/io"
import { MdOutlineAttachMoney } from "react-icons/md"
import { useParams } from 'react-router-dom';
import { RoomService } from "../../services/SalaDeEnsayoService";
import { ReservasService } from "../../services/ReservasServices";

const ConfirmacionReservaPaga = () => {

    const [sala, setSala] = useState(null)
    const [reserva, setReserva] = useState(null)
    const [reservadate, setReservadate] = useState()
    const [loading, setLoading] = useState(true)

    //obtener de param el id de reserva y sala
    const { idSala, idReserva } = useParams();

    const getSala = async (idSala) => {
        const response = await RoomService.getRoomBd(idSala);
        const data = response;
        setSala(data);
        console.log('sala data en confirmacion: ', data)
    }

    const getReserva = async (idSala) => {
        const response = await ReservasService.getReserva(idSala);
        const data = response;
        setReserva(data);
        setReservadate(data.date.toLocaleDateString('es-AR'));
        console.log('reserva data en confirmacion: ', data)
        console.log('fecha reserva: ', reservadate);
    
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Esperar a que ambas peticiones se completen
                await Promise.all([
                    getSala(idSala),
                    getReserva(idReserva)
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idSala, idReserva]);

    useEffect(() => {
        if (sala && reserva) {
            setLoading(false);
        }
    }, [sala, reserva]);
    

  return (
        <>
        {(
        loading) ? (
            <div className="flex flex-col w-100 items-center justify-center min-h-screen">
                <span>Cargando detalles de la reserva...</span>
            </div>
        ) : (
        
            <><div className="mx-auto d-flex col col-10 rounded-3 justify-content-center align-items-center min-h-screen">
                      <div className=" rounded-3 w-100 mx-2 mt-3 pt-3">
                          <div className="d-flex col-12 justify-content-around align-items-center">
                              <div className="">
                                  <div className="d-flex justify-content-center mb-3">
                                      <IoMdCheckmarkCircleOutline
                                          size={50}
                                          color="green" />
                                  </div>
                                  <h3 className="d-flex justify-content-center mb-3">Reserva Confirmada</h3>
                                  <h5 className="d-flex justify-content-center mb-3">Tu reserva fue registrada con exito</h5>
                              </div>
                          </div>
                      </div>
                  </div><div className="mx-auto mt-4 d-flex col col-10 bg-white border-1 border-secondary rounded-3 justify-content-center align-items-center min-h-screen">
                          {/* Contenedor Padre (MODIFICADO: Se agrega flex-column) */}
                          <div className="d-flex flex-column col-12 justify-content-around align-items-center pb-3">

                              <h5 className="col-10 mt-4">Detalles de la reserva</h5>

                              <div className="row justify-content-between align-items-center col-10 mb-3">
                                  <div className="d-flex bg-body-tertiary rounded-3 align-items-center col-5 p-3 me-2 rounded">

                                      {/* Icono de la Fecha */}
                                      <IoIosCalendar size={35} className="text-warning me-3" />

                                      {/* Contenedor del texto (Etiqueta + Valor) */}
                                      <div className="d-flex flex-column justify-content-center">
                                          <span className="fw-bold">Fecha</span>
                                          <span className="text-muted">{reservadate}</span>
                                      </div>
                                  </div>
                                  <div className="d-flex bg-body-tertiary rounded-3 align-items-center col-5 p-3 me-2 rounded">

                                      {/* Icono de la Fecha */}
                                      <IoIosTime size={35} className="text-warning me-3" />

                                      {/* Contenedor del texto (Etiqueta + Valor) */}
                                      <div className="d-flex flex-column justify-content-center">
                                          <span className="fw-bold">Horario</span>
                                          <span className="text-muted">{reserva.hsStart} - {reserva.hsEnd}</span>
                                      </div>
                                  </div>
                              </div>

                              <div
                                  className="d-flex col-10 align-items-center border border-2 border-warning-subtle rounded-3 col-5 p-3 me-2"
                                  style={{ backgroundColor: '#C997000A' }} // ¡CORRECTO: Se añadió el # !
                              >
                                  <MdOutlineAttachMoney size={35} className="text-warning me-3" />
                                  <span className="fw-bold">Total Pagado: ${reserva.totalPrice}</span>
                              </div>

                              <hr className="col-10 mt-4" />

                              <div className="d-flex flex-column col border border-bg-secondary  rounded-top-3 col-10">

                                  <div className="d-flex bg-body-secondary col-12 rounded-top-3 px-3 py-2 align-items-center">
                                      <IoMdMusicalNotes size={35} className="text-warning me-3 mt-2" />

                                      <div className="d-flex flex-column justify-content-center">
                                          <span className="fw-bold">{sala.nameSalaEnsayo}</span>
                                          <span className="text-muted"> <CiLocationOn size={20} />{sala.calleDireccion}</span>
                                      </div>
                                  </div>

                                  <div className="d-flex flex-column bg-body-white col-12 px-3 py-2">
                                      <span className="">{sala.descripcion}</span>
                                      <span className="mt-2 fw-bold"> Comodidades</span>
                                      {sala.comodidades && sala.comodidades.length > 0 ? (
                                          <div className="d-flex flex-wrap gap-2 pb-3 pt-2">
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

                              </div>

                              <div className="d-flex gap-4 justify-content-center col-10 align-items-center mt-3">
                                  <button className="btn btn-outline-warning mt-3 text-dark">Descargar</button>
                                  <button className="btn btn-outline-warning mt-3 text-dark">Cancelar</button>
                              </div>

                          </div>
                      </div></>    
        )}
    </>
  )
}

export default ConfirmacionReservaPaga
