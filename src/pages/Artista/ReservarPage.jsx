/* eslint-disable no-unused-vars */
import { useState, useEffect} from "react"
import Alerta from "../../components/Alerta"
import {RoomService} from "../../services/SalaDeEnsayoService"
import { useNavigate, useParams } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner"
import PromedioEstrellas from "../../components/PromedioEstrellas"
import Calendar from "../../components/Calendar"
import { MdAttachMoney, MdOutlineKeyboardArrowDown } from "react-icons/md";
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { SlCalender, SlClock } from "react-icons/sl"


const ReservarPage =() => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [sala, setSala] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const horariosIniciales = [
        { hora: '00:00', disabled: false, selected: false },
        { hora: '01:00', disabled: false, selected: false },
        { hora: '02:00', disabled: false, selected: false },
        { hora: '03:00', disabled: false, selected: false },
        { hora: '04:00', disabled: false, selected: false },
        { hora: '05:00', disabled: false, selected: false },
        { hora: '06:00', disabled: false, selected: false },
        { hora: '07:00', disabled: false, selected: false },
        { hora: '08:00', disabled: false, selected: false },
        { hora: '09:00', disabled: false, selected: false },
        { hora: '10:00', disabled: false, selected: false },
        { hora: '11:00', disabled: false, selected: false },
        { hora: '12:00', disabled: false, selected: false },
        { hora: '13:00', disabled: false, selected: false },
        { hora: '14:00', disabled: false, selected: false },
        { hora: '15:00', disabled: false, selected: false },
        { hora: '16:00', disabled: false, selected: false },
        { hora: '17:00', disabled: false, selected: false },
        { hora: '18:00', disabled: false, selected: false },
        { hora: '19:00', disabled: false, selected: false },
        { hora: '20:00', disabled: false, selected: false },
        { hora: '21:00', disabled: false, selected: false },
        { hora: '22:00', disabled: false, selected: false },
        { hora: '23:00', disabled: false, selected: false }
    ];

    const [pasoActual, setPasoActual] = useState('elegir dia')
    const [fechaElegida, setFechaElegida] = useState(null)
    const [fecha, setFecha] = useState('')
    const [rangoHorario, setRangoHorario] = useState({ inicio: null, fin: null })
    const [stepHorario, setStepHorario] = useState(0)

    const [horarios, setHorarios] = useState(horariosIniciales)

    const [precio, setPrecio] = useState(0)

    const status= 'active'

    const handleHorarioChange = (index) => {

        // //guardar el horario seleccionado en rango horario
        // console.log('Horario seleccionado: ', horarios[index], horarios[index].hora)
        // if (stepHorario === 0) {
        //     setRangoHorario({ ...rangoHorario, inicio: horarios[index].hora, fin: '-' })
        //     horarios[index].enabled = 'disabled'
        //     console.log('horarios[index] inicio: ', horarios[index])
        //     setStepHorario(1)
        // } else if (stepHorario !== 0) {
        //     setRangoHorario({ ...rangoHorario, fin: horarios[index].hora })
        //     horarios[index].enabled = 'disabled'
        //     console.log('horarios[index] fin: ', horarios[index])
        //     setStepHorario(0)
        // }

        // //cambiar el estado de enabled
        // const updatedHorarios = horarios.map((hora, i) => {
        //     if (i === index) {
        //         return { ...hora, enabled: hora.enabled === 'active' ? 'inactive' : 'active' };
        //     }
        // })
        // Si el horario está deshabilitado, no hacer nada
        if (horarios[index].disabled) return;

        setHorarios(prevHorarios => {
            const nuevosHorarios = [...prevHorarios];
            
            if (stepHorario === 0) {
                // Primer click - seleccionar inicio
                // CORRECCIÓN: Resetear todas las selecciones anteriores antes de nueva selección
                const horariosReseteados = nuevosHorarios.map(h => ({ ...h, selected: false }));
                horariosReseteados[index] = { ...horariosReseteados[index], selected: true };
                
                setRangoHorario({ inicio: horariosReseteados[index].hora, fin: null });
                setStepHorario(1);
                
                return horariosReseteados;
            } else {
                // Segundo click - seleccionar fin
                const horaInicio = rangoHorario.inicio;
                const horaFin = nuevosHorarios[index].hora;
                const hsInicio = parseInt(horaInicio.split(':')[0], 10);
                const hsFin = parseInt(horaFin.split(':')[0], 10);
                if(hsFin === hsInicio){
                    // Si el usuario selecciona la misma hora, no hacer nada
                    setError('El rango de horas no puede ser el mismo. Por favor, selecciona un rango válido.');
                    return nuevosHorarios;
                }
                if(hsFin < hsInicio){
                    // Si el usuario selecciona una hora anterior al inicio, mostrar error
                    setError('La hora de fin no puede ser anterior a la hora de inicio. Por favor, selecciona un rango válido.');
                    return nuevosHorarios;
                }
                const inicioIndex = nuevosHorarios.findIndex(h => h.hora === horaInicio);
                const finIndex = index;
                
                // CORRECCIÓN: Seleccionar todos los horarios en el rango
                const horariosActualizados = nuevosHorarios.map((h, i) => ({
                    ...h,
                    selected: i >= Math.min(inicioIndex, finIndex) && i <= Math.max(inicioIndex, finIndex)
                }));
                
                setRangoHorario({ inicio: horaInicio, fin: horaFin });
                setStepHorario(0);
                setPrecio((finIndex - inicioIndex) * sala.precioHora);
                
                return horariosActualizados;
            }
        });
    }

    const resetHorarios = () => {
        setHorarios(horariosIniciales);
        setRangoHorario({ inicio: null, fin: null });
        setStepHorario(0);
    }


    const irAPaso = (paso)=>{
        setPasoActual(paso)
        console.log('paso posterior: ', paso)
    }

    const setFechaF = (date) => {
        setFechaElegida(date)
        const fecha = date
        console.log('date: ', fecha)
        const string = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        console.log('Fecha elegida:', string)
        setFecha(string)
    }

    const getSalaData = async()  => {
       try {
            setLoading(true)
            setError('')
            console.log('paso: ', pasoActual)
            
            const response = await RoomService.getRoomBd(id);
            
            // Si la respuesta indica error (como tu objeto de error)
            if (response && response.error === 'NOT_FOUND') {
                setError('La sala que buscas no existe o ha sido eliminada.')
                return
            }
            
            // Si response es null, undefined o vacío
            if (!response) {
                setError('No se pudo cargar la información de la sala.')
                return
            }
            
            setSala(response)
            
        } catch (error) {
            console.error('Error detallado:', error)
            
            // Manejar diferentes tipos de error
            if (error.response?.status === 404) {
                setError('La sala no existe.')
            } else if (error.code === 404 || error.error === 'NOT_FOUND') {
                setError('Sala no encontrada.')
            } else if (error.message?.includes('Network') || error.message?.includes('network')) {
                setError('Error de conexión. Verifica tu internet.')
            } else {
                setError('Error al cargar la sala. Intenta nuevamente.')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
       if (!id) {
            setError('ID de sala no proporcionado')
            setLoading(false)
            return
        }
        
        getSalaData()
    }, [])

    return (
        <div className="mx-auto flex flex-col col-10 bg-white rounded-3 items-center justify-center min-h-screen">
            {error && <Alerta tipo="error" mensaje={error} />}
            <div className=" rounded-3 w-100 mx-2 mt-3 pt-3">
                {/* header sala */}
                {loading && (

                    <div className="align-content-around">
                        <LoadingSpinner />
                    </div>
                )}
                {error && (
                    <div className="align-content-around">
                        <Alerta tipo="error" mensaje={error} onClose={()=> setError('')}/>
                    </div>
                )}
                {!loading  && sala && (
                    <div
                    className=" mx-3 mt-1 pt-1 align-content-start"
                    >
                        {/* card-resumen */}
                        <div className="flex d-flex mb-3" style={{maxWidth: '540px'}}>
                            <div className="mx-3 my-3">
                                <img 
                                src={sala.imagenes[0]?.url || "https://via.placeholder.com/300x200/FFC107/FFFFFF?text=Sala+Ensayo"} 
                                className="img-fluid rounded-start"
                                alt={`Imagen de la sala ${sala.nameSalaEnsayo}`}
                                style={{ height: '150px', width: '250px', objectFit: 'cover' }}
                            />
                            </div>
                            <div className="card-body my-3">
                                <h5 className="card-title mb-2">Sala: {sala.nameSalaEnsayo}</h5>
                                <h6 className="card-subtitle text-muted">Direccion: {sala.calleDireccion}</h6>
                                <h6 className="card-subtitle text-muted">Precio: {sala.precioHora}/hs</h6>
                                <div className="flex d-flex align-content-center gap-1"><h6>{sala.promedio||0}</h6><PromedioEstrellas averageRating={sala.promedioCalificacion || 0} /></div>
                            </div>
                        </div>
                        
                        {/* Aquí puedes agregar el formulario o componente de reserva */}

                    </div>
                )}
            </div>

            {rangoHorario.inicio && rangoHorario.fin && fecha && (
                <div>
                    <div className="mx-3 mt-1 pt-1 px-3 align-content-center">
                    <h5>Reservando:</h5>
                    <p className="fw-semibold"> <SlCalender /> Dia: {fecha}</p>
                    <p className="fw-semibold"> <SlClock /> Rango de reserva: {rangoHorario.inicio} a {rangoHorario.fin}</p>
                    <p className="fw-semibold"> <MdAttachMoney /> Precio de la reserva: ${precio}</p>
                </div>

                <div className="flex- d-flex row">
                    <div className="col-1"></div>
                    <hr className="col-10"/>
                </div>
                </div>
            )}
        
            {pasoActual === 'elegir dia' && (
                <div className=" mx-3 mt-1 pt-1 px-3 align-content-center">

                    <div 
                    className="flex d-flex">
                        <h5 className="">Elegir dia</h5>
                        <div className="mx-2">
                            <MdOutlineKeyboardArrowDown/>
                        </div>

                        
                    </div>
                    <div className="">
                         <ReactCalendar 
                            onChange={(date) =>{
                                setFechaF(date)
                                irAPaso('elegir horario')
                            }}
                            minDate={new Date()}// Puedes ajustar maxDate según tus necesidades
                        />
                    </div>
                </div>
            )}

            {pasoActual === 'elegir horario' && (
            <div className="mx-3 mt-1 pt-1 px-3 align-content-center col-12">
                <div className="flex d-flex">
                    <h5 className="">Elegir Horario</h5>
                    <div className="mx-2">
                        <MdOutlineKeyboardArrowDown/>
                    </div>
                </div>
                
               
                 <div className="d-flex flex-wrap justify-content-start gap-2 mt-3 px-1">
                    {horarios.map((hora, index) => (
                        <div  
                            key={index}
                            className={`rounded-3 py-2 px-3 btn btn-sm text-center ${
                                hora.selected 
                                    ? 'btn-warning text-white' 
                                    : hora.disabled 
                                        ? 'btn-secondary text-dark' 
                                        : 'btn-outline-warning text-dark'
                            }`}
                            onClick={() => handleHorarioChange(index)}
                            style={{ 
                                flex: '0 0 auto',
                                cursor: hora.disabled ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {hora.hora}
                        </div>    
                    ))}
                </div>
                
                {/* Botones de navegación */}
                <div className="d-flex justify-content-between mt-4 mx-5 mb-4">
                    <button 
                        className="btn btn-secondary"
                        onClick={() => irAPaso('elegir dia')}
                    >
                        Atrás
                    </button>
                    <button 
                        className="btn btn-warning"
                        onClick={() => irAPaso('pago')}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        )}

        </div>

    )

}

export default ReservarPage