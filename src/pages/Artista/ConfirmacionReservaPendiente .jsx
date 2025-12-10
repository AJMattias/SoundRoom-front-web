/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci"
import { IoIosCalendar, IoIosTime, IoMdTime, IoMdMusicalNotes } from "react-icons/io"
import { MdOutlineAttachMoney, MdOutlinePendingActions } from "react-icons/md"
import { useSearchParams, useNavigate } from 'react-router-dom';
import { RoomService } from "../../services/SalaDeEnsayoService";
import { ReservasService } from "../../services/ReservasServices";

const ConfirmacionReservaPendiente = () => {
    const [sala, setSala] = useState(null)
    const [reserva, setReserva] = useState(null)
    const [loading, setLoading] = useState(true)
    const [formattedDate, setFormattedDate] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    // Obtener query params de la URL
    const [searchParams] = useSearchParams();

    const idSala = searchParams.get('idSala');
    const idReserva = searchParams.get('idReserva');
    
    // Obtener parámetros de MercadoPago
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const collectionStatus = searchParams.get('collection_status');
    const externalReference = searchParams.get('external_reference');

    // Verificar si el pago está pendiente
    const isPaymentPending = status === 'pending' || collectionStatus === 'pending';
    const isInProcess = status === 'in_process' || collectionStatus === 'in_process';

    console.log('🔍 Estado del pago:', { status, collectionStatus, isPaymentPending, isInProcess });

    const getSala = async (id) => {
        try {
            const response = await RoomService.getRoomBd(id);
            setSala(response);
            console.log('✅ Sala cargada:', response);
        } catch (error) {
            console.error('❌ Error cargando sala:', error);
            setError('Error al cargar los datos de la sala');
        }
    }

    const getReserva = async (id) => {
        try {
            const response = await ReservasService.getReserva(id);
            setReserva(response);
            
            if (response.date) {
                const date = new Date(response.date);
                const formatted = date.toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                setFormattedDate(formatted);
            }
        } catch (error) {
            console.error('❌ Error cargando reserva:', error);
            setError('Error al cargar los datos de la reserva');
        }
    }

    // Función para verificar estado periódicamente
    const verificarEstadoPeriodicamente = () => {
        if (!paymentId) return;
        
        const interval = setInterval(async () => {
            try {
                console.log('🔄 Verificando estado del pago...');
                // Aquí podrías llamar a tu backend para verificar el estado
                // const estadoActual = await ReservasService.verificarEstadoPago(paymentId);
                
                // Si cambió a approved, redirigir
                // if (estadoActual === 'approved') {
                //     clearInterval(interval);
                //     navigate(`/reservas/pago-exitoso?idSala=${idSala}&idReserva=${idReserva}`);
                // }
            } catch (error) {
                console.error('Error verificando estado:', error);
            }
        }, 30000); // Verificar cada 30 segundos

        return () => clearInterval(interval);
    }

    // Función para reintentar pago
    const handleReintentarPago = () => {
        // Podrías redirigir a una página para generar nueva preferencia
        // o mostrar opciones de pago alternativas
        console.log('Reintentar pago para reserva:', idReserva);
        // navigate(`/reservar/${idSala}?reserva=${idReserva}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            
            if (!idSala || !idReserva) {
                setError('Faltan parámetros en la URL');
                setLoading(false);
                return;
            }

            // Mover estas validaciones dentro del efecto
            const isPaymentPending = status === 'pending' || collectionStatus === 'pending';
            const isInProcess = status === 'in_process' || collectionStatus === 'in_process';

            // Validar que el pago está en estado pendiente
            if (!isPaymentPending && !isInProcess) {
                setError(`Estado de pago inesperado: ${status || collectionStatus}`);
                // Si está aprobado, redirigir a exitoso
                if (status === 'approved' || collectionStatus === 'approved') {
                    navigate(`/reservas/pago-exitoso?idSala=${idSala}&idReserva=${idReserva}`);
                    return;
                }
            }

            try {
                await Promise.all([
                    getSala(idSala),
                    getReserva(idReserva)
                ]);
                
            } catch (error) {
                console.error('💥 Error general:', error);
                setError('Ocurrió un error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Función para verificar estado periódicamente - ahora fuera del fetchData
        const verificarEstadoPeriodicamente = () => {
            if (!paymentId) return;
            
            const interval = setInterval(async () => {
                try {
                    console.log('🔄 Verificando estado del pago...');
                    // Aquí podrías llamar a tu backend para verificar el estado
                    // const estadoActual = await ReservasService.verificarEstadoPago(paymentId);
                    
                    // Si cambió a approved, redirigir
                    // if (estadoActual === 'approved') {
                    //     clearInterval(interval);
                    //     navigate(`/reservas/pago-exitoso?idSala=${idSala}&idReserva=${idReserva}`);
                    // }
                } catch (error) {
                    console.error('Error verificando estado:', error);
                }
            }, 30000); // Verificar cada 30 segundos

            return () => clearInterval(interval);
        };

        // Iniciar verificación periódica si hay paymentId
        const cleanup = paymentId ? verificarEstadoPeriodicamente() : null;

        // Cleanup function
        return () => {
            if (cleanup) cleanup();
        };

    }, [idSala, idReserva, status, collectionStatus, paymentId, navigate]);

    // Mostrar errores
    if (error) {
        return (
            <div className="flex flex-col w-100 items-center justify-center min-h-screen p-4">
                <div className="alert alert-danger w-100 max-w-md" role="alert">
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
            <div className="mx-auto d-flex col col-10 rounded-3 justify-content-center align-items-center min-h-screen">
                <div className="rounded-3 w-100 mx-2 mt-3 pt-3">
                    <div className="d-flex col-12 justify-content-around align-items-center">
                        <div className="text-center">
                            <div className="d-flex justify-content-center mb-3">
                                <MdOutlinePendingActions
                                    size={50}
                                    color="#FFA500" />
                            </div>
                            <h3 className="d-flex justify-content-center mb-3">Pago Pendiente</h3>
                            <h5 className="d-flex justify-content-center mb-3">
                                {isInProcess 
                                    ? "Tu pago está siendo procesado" 
                                    : "Estamos esperando la confirmación de tu pago"}
                            </h5>
                            <p className="text-muted">
                                Te notificaremos por email cuando se complete el proceso.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-4 d-flex col col-10 bg-white border-1 border-secondary rounded-3 justify-content-center align-items-center">
                <div className="d-flex flex-column col-12 justify-content-around align-items-center pb-3">
                    <h5 className="col-10 mt-4">Detalles de la reserva</h5>

                    <div className="row justify-content-between align-items-center col-10 mb-3">
                        <div className="d-flex bg-body-tertiary rounded-3 align-items-center col-5 p-3 me-2">
                            <IoIosCalendar size={35} className="text-warning me-3" />
                            <div className="d-flex flex-column justify-content-center">
                                <span className="fw-bold">Fecha</span>
                                <span className="text-muted">{formattedDate}</span>
                            </div>
                        </div>
                        <div className="d-flex bg-body-tertiary rounded-3 align-items-center col-5 p-3 me-2">
                            <IoIosTime size={35} className="text-warning me-3" />
                            <div className="d-flex flex-column justify-content-center">
                                <span className="fw-bold">Horario</span>
                                <span className="text-muted">{reserva.hsStart} - {reserva.hsEnd}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="d-flex col-10 align-items-center border border-2 border-warning-subtle rounded-3 p-3 mb-3"
                        style={{ backgroundColor: '#C997000A' }}
                    >
                        <MdOutlineAttachMoney size={35} className="text-warning me-3" />
                        <span className="fw-bold">Total a Pagar: ${reserva.totalPrice}</span>
                    </div>

                    {/* Estado del pago */}
                    <div className="alert alert-warning col-10 mb-4">
                        <div className="d-flex align-items-center">
                            <IoMdTime size={24} className="me-2" />
                            <div>
                                <strong>Estado del pago:</strong>
                                <div className="mt-1">
                                    {isInProcess ? (
                                        <span className="badge bg-info">En Proceso</span>
                                    ) : (
                                        <span className="badge bg-warning">Pendiente</span>
                                    )}
                                </div>
                                <small className="d-block mt-2">
                                    {isInProcess 
                                        ? "El banco está procesando tu pago. Esto puede tomar hasta 48 horas."
                                        : "El pago aún no ha sido confirmado. Verifica en tu app bancaria."}
                                </small>
                            </div>
                        </div>
                    </div>

                    <hr className="col-10 mt-2 mb-4" />

                    <div className="d-flex flex-column col border border-bg-secondary rounded-top-3 col-10">
                        <div className="d-flex bg-body-secondary col-12 rounded-top-3 px-3 py-2 align-items-center">
                            <IoMdMusicalNotes size={35} className="text-warning me-3 mt-2" />
                            <div className="d-flex flex-column justify-content-center">
                                <span className="fw-bold">{sala.nameSalaEnsayo}</span>
                                <span className="text-muted"> 
                                    <CiLocationOn size={20} /> {sala.calleDireccion}
                                </span>
                            </div>
                        </div>

                        <div className="d-flex flex-column bg-body-white col-12 px-3 py-2">
                            <span className="">{sala.descripcion}</span>
                            <span className="mt-2 fw-bold">Comodidades</span>
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

                    {/* Acciones específicas para pago pendiente */}
                    <div className="d-flex gap-4 justify-content-center col-10 align-items-center mt-4">
                        <button 
                            className="btn btn-warning text-dark px-4"
                            onClick={handleReintentarPago}
                        >
                            <IoMdTime className="me-2" />
                            Reintentar Pago
                        </button>
                        <button 
                            className="btn btn-outline-secondary px-4"
                            onClick={() => navigate('/mis-reservas')}
                        >
                            Ver Mis Reservas
                        </button>
                    </div>

                    {/* Información adicional */}
                    <div className="col-10 mt-4 p-3 bg-light rounded">
                        <h6 className="fw-bold mb-2">¿Qué significa &quot;Pago Pendiente&quot;?</h6>
                        <ul className="mb-0 ps-3">
                            <li>Tu pago fue iniciado pero no confirmado</li>
                            <li>Puede demorar hasta 48 horas en procesarse</li>
                            <li>Verifica el estado en tu app bancaria</li>
                            <li>Si el pago no se completa, la reserva será cancelada automáticamente</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmacionReservaPendiente