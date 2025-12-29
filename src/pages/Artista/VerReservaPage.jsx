/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci"
import { IoIosCalendar, IoIosTime, IoMdCheckmarkCircleOutline, IoMdMusicalNotes } from "react-icons/io"
import { MdOutlineAttachMoney } from "react-icons/md"
import { Navigate, useNavigate, useParams, useSearchParams  } from 'react-router-dom';
import { RoomService } from "../../services/SalaDeEnsayoService";
import { ReservasService } from "../../services/ReservasServices";
import HeaderReservaEstado from "../../components/HeaderReservaEstado";

const ConfirmacionReservaPaga = () => {

    const navigate = useNavigate();

    const [sala, setSala] = useState(null)
    const [reserva, setReserva] = useState(null)
    const [reservadate, setReservadate] = useState()
    const [loading, setLoading] = useState(true)
    const [formattedDate, setFormattedDate] = useState('')
    const [error, setError] = useState('')
    const [reservaEstado, setReservaEstado] = useState('')

    // Obtener query params de la URL (los de Mercado Pago)
    const [searchParams] = useSearchParams();

    const idSala = searchParams.get('idSala');
    const idReserva = searchParams.get('idReserva');
    
    // Obtener todos los parámetros de MercadoPago
    // const collectionId = searchParams.get('collection_id');
    // const collectionStatus = searchParams.get('collection_status');
    // const paymentId = searchParams.get('payment_id');
    // const status = searchParams.get('status');
    // const externalReference = searchParams.get('external_reference');
    // const paymentType = searchParams.get('payment_type');
    // const merchantOrderId = searchParams.get('merchant_order_id');
    // const preferenceId = searchParams.get('preference_id');
    // const siteId = searchParams.get('site_id');
    // const processingMode = searchParams.get('processing_mode');
    // const merchantAccountId = searchParams.get('merchant_account_id');

    // Verificar si el pago fue aprobado
    //const isPaymentApproved = status === 'approved' || collectionStatus === 'approved';

    // Obtener todos los parámetros como objeto
    const allParams = Object.fromEntries(searchParams.entries());
    
    console.log('Parámetros recibidos:', allParams);

    const reservaStatus =(status)=>{
        switch (status) {
            case 'approved':
                setReservaEstado('Aprobado');
                console.log('estado: ', status)
                return 'Aprobada';
            case 'pending':
                setReservaEstado('Pendiente');
                console.log('estado: ', status)
                return 'Pendiente';
            case 'rejected':
                setReservaEstado('Rechazada');
                console.log('estado: ', status)
                return 'Rechazada';
            default:
                break;
        }
    }

    // const getSala = async (id) => {
    //     try {
    //         const response = await RoomService.getRoomBd(id);
    //         setSala(response);
    //         console.log('✅ Sala cargada:', response);
    //     } catch (error) {
    //         console.error('❌ Error cargando sala:', error);
    //         setError('Error al cargar los datos de la sala');
    //     }
    // }

    const getReserva = async (id) => {
         try {
            const response = await ReservasService.getReserva(id);
            setReserva(response);
            
            // Formatear fecha correctamente
            if (response.date) {
                const date = new Date(response.date);
                console.log('Fecha original de la reserva:', response.date);
                const formatted = date.toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                console.log('Fecha formateada:', formatted);
                setFormattedDate(formatted);
                console.log('✅ Reserva cargada. Fecha formateada:', formatted);
            }
            setSala(response.idRoom);
            console.log('✅ Reserva cargada:', response);
            console.log('✅ Sala cargada:', response.idRoom);
            
        } catch (error) {
            console.error('❌ Error cargando reserva:', error);
            setError('Error al cargar los datos de la reserva');
        }
    
    }

     // Verificar estado del pago con el backend
    const verificarEstadoPago = async () => {
        try {
            console.log('🔍 Verificando estado del pago en backend...');
            // Puedes llamar a un endpoint que verifique el estado del pago
            // await ReservasService.verificarPago(idReserva, paymentId);
        } catch (error) {
            console.error('⚠️ Error verificando pago:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            
            // Validar que vengan los parámetros necesarios
            if (!idSala || !idReserva) {
                setError('Faltan parámetros en la URL');
                setLoading(false);
                return;
            }

            try {
                // Ejecutar en paralelo
                await Promise.all([
                    //getSala(idSala),
                    getReserva(idReserva),
                    reservaStatus(status)
                ]);
                
                // Verificar estado del pago
                await verificarEstadoPago();
                
            } catch (error) {
                console.error('💥 Error general:', error);
                setError('Ocurrió un error al cargar los datos');
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

    // Mostrar errores
    if (error) {
        return (
            <div className="flex flex-col w-100 items-center justify-center min-h-screen">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Error</h4>
                    <p>{error}</p>
                    <hr />
                    <p className="mb-0">
                        Por favor, contacta a soporte si el problema persiste.
                    </p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col w-100 items-center justify-center min-h-screen">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <span className="mt-3">Cargando detalles de la reserva...</span>
            </div>
        );
    }

    // Verificar que tengamos los datos necesarios
    if (!sala || !reserva) {
        return (
            <div className="flex flex-col w-100 items-center justify-center min-h-screen">
                <div className="alert alert-warning" role="alert">
                    No se encontraron los datos de la reserva.
                </div>
            </div>
        );
    }
    
   

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
                                  <HeaderReservaEstado estado={reserva.canceled} />
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
                                          <span className="text-muted">{formattedDate}</span>
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

                              <div className="d-flex flex-column col border border-bg-secondary rounded-top-3 col-10">

                                  <div className="d-flex bg-body-secondary col-12 rounded-top-3 px-3 py-2 align-items-center"
                                    onClick={() => navigate('/sala/' + sala.id)}
                                    style={{ cursor: 'pointer' }}
                                    >
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
