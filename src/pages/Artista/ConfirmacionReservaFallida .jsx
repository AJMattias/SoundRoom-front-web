/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci"
import { 
  IoIosCalendar, 
  IoIosTime, 
  IoMdCloseCircle, 
  IoMdMusicalNotes,
  IoMdAlert,
  IoMdCard,
  IoMdHome
} from "react-icons/io"
import { MdOutlineAttachMoney, MdOutlineSupportAgent } from "react-icons/md"
import { FaCreditCard, FaExclamationTriangle, FaRedo } from "react-icons/fa"
import { useSearchParams, useNavigate } from 'react-router-dom';
import { RoomService } from "../../services/SalaDeEnsayoService";
import { ReservasService } from "../../services/ReservasServices";

const ConfirmacionReservaFallida = () => {
    const [sala, setSala] = useState(null)
    const [reserva, setReserva] = useState(null)
    const [loading, setLoading] = useState(true)
    const [formattedDate, setFormattedDate] = useState('')
    const navigate = useNavigate();

    // Obtener TODOS los query params
    const [searchParams] = useSearchParams();
    
    // Tus parámetros
    const idSala = searchParams.get('idSala');
    const idReserva = searchParams.get('idReserva');
    
    // Parámetros de MercadoPago
    const collectionId = searchParams.get('collection_id');
    const collectionStatus = searchParams.get('collection_status');
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const externalReference = searchParams.get('external_reference');
    const paymentType = searchParams.get('payment_type');
    const merchantOrderId = searchParams.get('merchant_order_id');
    const preferenceId = searchParams.get('preference_id');
    const siteId = searchParams.get('site_id');
    const processingMode = searchParams.get('processing_mode');
    const merchantAccountId = searchParams.get('merchant_account_id');

    // Función para obtener motivo específico del rechazo
    const getMotivoDetallado = () => {
        if (paymentType === 'credit_card') {
            return "El pago con tarjeta de crédito fue rechazado. Verifica los datos de tu tarjeta, fecha de vencimiento y código de seguridad.";
        }
        if (paymentType === 'debit_card') {
            return "El pago con tarjeta de débito fue rechazado. Asegúrate de tener fondos suficientes.";
        }
        if (paymentType === 'account_money') {
            return "El pago con cuenta de MercadoPago fue rechazado. Verifica que tienes saldo suficiente.";
        }
        if (paymentType === 'ticket') {
            return "El pago en efectivo no fue completado. Debes acercarte al punto de pago seleccionado.";
        }
        return "El pago fue rechazado. Puede deberse a fondos insuficientes, datos incorrectos o límites de la tarjeta.";
    };

    // Función para obtener el tipo de pago en español
    const getTipoPagoTexto = () => {
        switch(paymentType) {
            case 'credit_card': return 'Tarjeta de Crédito';
            case 'debit_card': return 'Tarjeta de Débito';
            case 'account_money': return 'Cuenta MercadoPago';
            case 'ticket': return 'Pago en Efectivo';
            case 'atm': return 'Cajero Automático';
            case 'bank_transfer': return 'Transferencia Bancaria';
            default: return paymentType?.replace('_', ' ') || 'Método no especificado';
        }
    };

    // Función para obtener mensaje según estado
    const getMensajeEstado = () => {
        if (status === 'rejected' || collectionStatus === 'rejected') {
            return "Pago Rechazado";
        }
        if (status === 'cancelled' || collectionStatus === 'cancelled') {
            return "Pago Cancelado";
        }
        if (status === 'refunded' || collectionStatus === 'refunded') {
            return "Pago Reembolsado";
        }
        if (status === 'charged_back' || collectionStatus === 'charged_back') {
            return "Contracargo Aplicado";
        }
        return "Pago Fallido";
    };

    // Función para obtener color según estado
    const getColorEstado = () => {
        if (status === 'rejected') return '#dc3545';
        if (status === 'cancelled') return '#6c757d';
        if (status === 'refunded') return '#17a2b8';
        if (status === 'charged_back') return '#fd7e14';
        return '#dc3545';
    };

    // Función para consejos específicos por tipo de pago
    const getConsejosPorTipoPago = () => {
        const consejos = [];
        
        if (paymentType === 'credit_card') {
            consejos.push('Verifica que la tarjeta no esté bloqueada o vencida');
            consejos.push('Confirma que el código de seguridad (CVV) es correcto');
            consejos.push('Contacta a tu banco para autorizar la transacción');
            consejos.push('Verifica que no hayas excedido el límite de la tarjeta');
        } else if (paymentType === 'debit_card') {
            consejos.push('Asegúrate de tener fondos suficientes en la cuenta');
            consejos.push('Verifica que la tarjeta esté habilitada para compras online');
            consejos.push('Confirma que los datos de la tarjeta sean correctos');
        } else if (paymentType === 'account_money') {
            consejos.push('Verifica el saldo en tu cuenta de MercadoPago');
            consejos.push('Asegúrate de tener tu cuenta verificada');
            consejos.push('Revisa que no haya restricciones en tu cuenta');
        } else if (paymentType === 'ticket') {
            consejos.push('Debes acercarte al punto de pago seleccionado');
            consejos.push('El cupón de pago tiene una fecha de vencimiento');
            consejos.push('Guarda el número de operación para referencia');
        }
        
        consejos.push('Intenta con otro método de pago si el problema persiste');
        consejos.push('Contacta a soporte si necesitas ayuda adicional');
        
        return consejos;
    };

    const getSala = async (id) => {
        try {
            const response = await RoomService.getRoomBd(id);
            setSala(response);
        } catch (error) {
            console.error('❌ Error cargando sala:', error);
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
        }
    }

    // Función para reintentar pago
    const handleReintentarPago = () => {
        // Aquí iría la lógica para generar nueva preferencia
        console.log('Reintentando pago para reserva:', idReserva);
        // En producción: navigate(`/reservar/${idSala}?reserva=${idReserva}&reintentar=true`);
        navigate(`/artista/reservar/${idSala}?reserva=${idReserva}`);
    }

    // Función para contactar soporte
    const handleContactarSoporte = () => {
        const asunto = `Problema con pago - Reserva ${idReserva}`;
        const cuerpo = `ID de transacción: ${paymentId}\nID de reserva: ${idReserva}\nEstado: ${status}\nTipo de pago: ${paymentType}`;
        window.location.href = `mailto:soporte@soundroom.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            
            if (!idSala || !idReserva) {
                console.error('Faltan parámetros:', { idSala, idReserva });
                setLoading(false);
                return;
            }

            try {
                await Promise.all([
                    getSala(idSala),
                    getReserva(idReserva)
                ]);
            } catch (error) {
                console.error('💥 Error general:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idSala, idReserva]);

    if (loading) {
        return (
            <div className="flex flex-col w-100 items-center justify-center min-h-screen">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <span className="mt-3">Cargando detalles...</span>
            </div>
        );
    }

    return (
        <>
            {/* Encabezado con estado */}
            <div className="mx-auto d-flex col col-10 rounded-3 justify-content-center align-items-center min-h-screen">
                <div className="rounded-3 w-100 mx-2 mt-3 pt-3">
                    <div className="d-flex col-12 justify-content-around align-items-center">
                        <div className="text-center">
                            <div className="d-flex justify-content-center mb-3">
                                <IoMdCloseCircle
                                    size={60}
                                    color={getColorEstado()} />
                            </div>
                            <h2 className="d-flex justify-content-center mb-3 fw-bold" style={{ color: getColorEstado() }}>
                                {getMensajeEstado()}
                            </h2>
                            <h5 className="d-flex justify-content-center mb-3 text-muted">
                                Lo sentimos, no pudimos procesar tu pago
                            </h5>
                            <p className="text-muted">
                                Tu reserva <strong>no ha sido confirmada</strong>. Te sugerimos reintentar el pago.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="mx-auto mt-4 d-flex col col-10 bg-white border-1 border-secondary rounded-3 justify-content-center align-items-center">
                <div className="d-flex flex-column col-12 justify-content-around align-items-center pb-3">
                    
                    {/* Alerta principal */}
                    <div className="col-10 mb-4">
                        <div className="alert alert-danger border-danger rounded-3 p-4" role="alert">
                            <div className="d-flex align-items-center">
                                <FaExclamationTriangle size={30} className="me-3" />
                                <div>
                                    <h5 className="alert-heading mb-2">Pago no procesado</h5>
                                    <p className="mb-1">{getMotivoDetallado()}</p>
                                    <small className="opacity-75">
                                        ID de transacción: <code>{paymentId || 'No disponible'}</code>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detalles de la reserva */}
                    <h5 className="col-10 mt-2 mb-3">Detalles de la reserva</h5>

                    <div className="row justify-content-between align-items-center col-10 mb-3">
                        <div className="d-flex bg-body-tertiary rounded-3 align-items-center col-md-5 p-3 me-md-2 mb-3 mb-md-0">
                            <IoIosCalendar size={35} className="text-danger me-3" />
                            <div className="d-flex flex-column justify-content-center">
                                <span className="fw-bold">Fecha reserva</span>
                                <span className="text-muted">{formattedDate || 'No disponible'}</span>
                            </div>
                        </div>
                        <div className="d-flex bg-body-tertiary rounded-3 align-items-center col-md-5 p-3">
                            <IoIosTime size={35} className="text-danger me-3" />
                            <div className="d-flex flex-column justify-content-center">
                                <span className="fw-bold">Horario</span>
                                <span className="text-muted">
                                    {reserva?.hsStart || '--:--'} - {reserva?.hsEnd || '--:--'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Monto */}
                    <div
                        className="d-flex col-10 align-items-center border border-2 border-danger-subtle rounded-3 p-3 mb-4"
                        style={{ backgroundColor: '#dc35451A' }}
                    >
                        <MdOutlineAttachMoney size={35} className="text-danger me-3" />
                        <div>
                            <span className="fw-bold">Monto no procesado: </span>
                            <span className="fs-5 fw-bold text-danger">
                                ${reserva?.totalPrice || '0'}
                            </span>
                        </div>
                    </div>

                    {/* Información detallada de la transacción */}
                    <div className="col-10 mb-4">
                        <div className="card border-danger">
                            <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                                <h6 className="mb-0">
                                    <FaExclamationTriangle className="me-2" />
                                    Detalles de la transacción
                                </h6>
                                <span className="badge bg-light text-danger">
                                    {getTipoPagoTexto()}
                                </span>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <small className="text-muted">ID de Transacción</small>
                                        <p className="mb-0">
                                            <code className="bg-light p-1 rounded">
                                                {paymentId || 'No disponible'}
                                            </code>
                                        </p>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <small className="text-muted">Estado</small>
                                        <p className="mb-0">
                                            <span className="badge bg-danger">
                                                {status?.toUpperCase() || 'DESCONOCIDO'}
                                            </span>
                                        </p>
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                        <small className="text-muted">ID de Orden</small>
                                        <p className="mb-0">{merchantOrderId || 'No disponible'}</p>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <small className="text-muted">Método</small>
                                        <p className="mb-0">{getTipoPagoTexto()}</p>
                                    </div>
                                    
                                    <div className="col-12 mt-2 pt-2 border-top">
                                        <small className="text-muted">Reserva</small>
                                        <p className="mb-0">
                                            <strong>ID:</strong> {idReserva} | 
                                            <strong> Sala:</strong> {idSala}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="col-10 mt-2 mb-4" />

                    {/* Información de la sala */}
                    {sala && (
                        <div className="d-flex flex-column col border border-bg-secondary rounded-3 col-10 mb-4">
                            <div className="d-flex bg-body-secondary col-12 rounded-top-3 px-3 py-2 align-items-center">
                                <IoMdMusicalNotes size={35} className="text-danger me-3 mt-2" />
                                <div className="d-flex flex-column justify-content-center">
                                    <span className="fw-bold">{sala.nameSalaEnsayo || 'Sala no disponible'}</span>
                                    <span className="text-muted"> 
                                        <CiLocationOn size={20} /> {sala.calleDireccion || 'Dirección no disponible'}
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex flex-column bg-body-white col-12 px-3 py-2">
                                {sala.descripcion && (
                                    <p className="mb-2">{sala.descripcion}</p>
                                )}
                                {sala.comodidades && sala.comodidades.length > 0 && (
                                    <>
                                        <span className="fw-bold">Comodidades</span>
                                        <div className="d-flex flex-wrap gap-2 pb-2 pt-2">
                                            {sala.comodidades.map((comodity, index) => (
                                                <span
                                                    key={index}
                                                    className="badge bg-warning text-dark p-2"
                                                >
                                                    {comodity}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Consejos específicos */}
                    <div className="col-10 mb-4">
                        <div className="card border-warning">
                            <div className="card-header bg-warning text-dark">
                                <h6 className="mb-0">
                                    <IoMdAlert className="me-2" />
                                    ¿Qué puedo hacer?
                                </h6>
                            </div>
                            <div className="card-body">
                                <ul className="mb-0">
                                    {getConsejosPorTipoPago().map((consejo, index) => (
                                        <li key={index} className="mb-2">
                                            <FaCreditCard className="text-warning me-2" />
                                            {consejo}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="d-flex flex-column flex-md-row gap-3 justify-content-center col-10 align-items-center mt-3">
                        <button 
                            className="btn btn-danger px-4 py-3 d-flex align-items-center"
                            onClick={handleReintentarPago}
                        >
                            <FaRedo className="me-2" size={20} />
                            <div>
                                <div className="fw-bold">Reintentar Pago</div>
                                <small className="opacity-75">Usar {getTipoPagoTexto()}</small>
                            </div>
                        </button>
                        
                        <button 
                            className="btn btn-outline-secondary px-4 py-3 d-flex align-items-center"
                            onClick={() => navigate('/artista/buscar')}
                        >
                            <IoMdHome className="me-2" size={20} />
                            <div>
                                <div className="fw-bold">Buscar Otra Sala</div>
                                <small className="opacity-75">Explorar opciones</small>
                            </div>
                        </button>
                        
                        <button 
                            className="btn btn-outline-danger px-4 py-3 d-flex align-items-center"
                            onClick={handleContactarSoporte}
                        >
                            <MdOutlineSupportAgent className="me-2" size={20} />
                            <div>
                                <div className="fw-bold">Contactar Soporte</div>
                                <small className="opacity-75">Necesito ayuda</small>
                            </div>
                        </button>
                    </div>

                    {/* Información adicional */}
                    <div className="col-10 mt-4">
                        <div className="alert alert-info border-info">
                            <div className="d-flex align-items-center">
                                <div className="me-3">ℹ️</div>
                                <div>
                                    <h6 className="alert-heading mb-2">Importante</h6>
                                    <p className="mb-0 small">
                                        • Tu reserva se mantendrá en estado &quot;pendiente&quot; por 30 minutos.<br />
                                        • Si no completas el pago, la reserva será liberada automáticamente.<br />
                                        • Puedes intentar pagar nuevamente hasta que se complete la transacción.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Información de contacto */}
                    <div className="col-10 mt-4 text-center">
                        <small className="text-muted">
                            ¿Necesitas ayuda inmediata?<br />
                            📞 <strong>+54 11 1234-5678</strong> | 
                            ✉️ <strong>soporte@soundroom.com</strong><br />
                            <span className="d-block mt-1">
                                Horario de atención: Lunes a Viernes 9:00 - 18:00
                            </span>
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmacionReservaFallida;