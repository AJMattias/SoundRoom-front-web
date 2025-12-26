// /* eslint-disable no-unused-vars */

// import { useState, useEffect } from 'react';
// import ArtistHomeReservations from '../../components/ArtistHomeReservations'; 
// // Importamos la lista base de reservas para hacer el filtro
// import { reservas as todasLasReservas } from '../../data/reservas';
// import { ReservasService } from "../../services/ReservasServices";


// const ReservasPage = () => {
//     const [reservas, setReservas] = useState(null)


//     // 1. Estado para la pestaña activa
//     const [seccionActiva, setSeccionActiva] = useState('Futuras'); 

//     // 2. Estado para la lista filtrada y formateada que se pasará como prop
//     const [reservasSelected, setReservasSelected] = useState([]);

//     /**
//      * Función auxiliar para obtener el objeto Date preciso de inicio de la reserva.
//      * (Necesaria para la lógica de filtrado entre Futuras/Históricas)
//      */
//     const getReservaStartDateTime = (reserva) => {
//         const datePart = reserva.date.substring(0, 10);
//         return new Date(`${datePart}T${reserva.hsStart}:00`); 
//     };

//     /**
//      * Función para aplicar el formato de fecha con corrección UTC para la visualización.
//      * Crea una nueva propiedad 'dateDisplay' y deja 'date' intacta para el filtrado.
//      */
//     const parseReservasFechas = (listToParse) => {
//         if (!listToParse || listToParse.length === 0) {
//             return [];
//         }
        
//         return listToParse.map((reserva) => {
//             const fechaDate = new Date(reserva.date); 
            
//             // Usar métodos UTC para obtener la fecha sin ajuste de zona horaria (UTC Fix)
//             const year = fechaDate.getUTCFullYear();
//             const month = fechaDate.getUTCMonth() + 1; // 0-indexado
//             const day = fechaDate.getUTCDate();

//             // Formato DD/MM/YYYY con padding
//             const fechaFormateada = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

//             return {
//                 ...reserva,
//                 // 🔑 CLAVE: Agregamos la fecha formateada en una NUEVA propiedad para la UI
//                 dateDisplay: fechaFormateada, 
//             };
//         });
//     };

//     const getMisReservas = async () => {        
//         const reservas = await ReservasService.getReservasPorArtista();
//         setReservas(reservas);
//     }

//     // --- LÓGICA DE FILTRADO Y FORMATO (Corre en cada cambio de pestaña) ---
//     useEffect(() => {
//         const now = new Date(); 
//         let filteredList = [];
//         getMisReservas();
//         filteredList = reservas;


//         if (seccionActiva === 'Futuras') {
//             // FUTURAS: No canceladas Y (fecha Y hora de inicio) es MAYOR a la actual
//             filteredList = todasLasReservas.filter(reserva => {
//                 const reservaStart = getReservaStartDateTime(reserva);
//                 return !reserva.canceled && reservaStart > now;
//             });

//         } else if (seccionActiva === 'Canceladas') {
//             // CANCELADAS: La propiedad 'canceled' es true
//             filteredList = todasLasReservas.filter(reserva => 
//                 reserva.canceled === true
//             );
            
//         } else if (seccionActiva === 'Historicas') {
//             // HISTÓRICAS: No canceladas Y (fecha Y hora de inicio) es MENOR a la actual
//             filteredList = todasLasReservas.filter(reserva => {
//                 const reservaStart = getReservaStartDateTime(reserva);
//                 return !reserva.canceled && reservaStart < now; 
//             });
//         }
        
//         // 🔑 OPTIMIZACIÓN: Aplicamos el formato de fecha SOLO a la lista filtrada (una vez por click)
//         const formattedList = parseReservasFechas(filteredList);

//         // Actualizamos el estado que se pasa al componente hijo
//         setReservasSelected(formattedList);
        
//     }, [seccionActiva]); 
    
//     // --- MANEJADORES DE INTERFAZ ---

//     const handleClick = (seccion) => {
//         setSeccionActiva(seccion);
//     };

//     const getTabClasses = (seccion) => {
//         let classes = 'mb-0 p-1'; 
        
//         if (seccionActiva === seccion) {
//             classes += ' border-bottom border-warning fw-bold text-dark';
//         } else {
//             classes += ' text-muted';
//         }
//         return classes;
//     };
    
//     // --- RENDERIZADO ---

//     return (
//         <div className="w-90">
//             <div className="w-90 d-flex flex-column px-4">
//                 <div className="mb-4">
//                     <h2>Mis Reservas</h2>
//                 </div>
                
//                 {/* Pestañas de Filtrado */}
//                 <div className="d-flex flex-column bg-white border border-2 border-tertiary rounded-3 p-3 mb-3">
//                     <div className="row align-items-center">

//                         {/* FUTURAS */}
//                         <div 
//                             className="col-auto" 
//                             onClick={() => handleClick('Futuras')}
//                             style={{ cursor: 'pointer' }}
//                         >
//                             <p className={getTabClasses('Futuras')}>Futuras</p>
//                         </div>

//                         {/* CANCELADAS */}
//                         <div 
//                             className="col-auto mx-4" 
//                             onClick={() => handleClick('Canceladas')}
//                             style={{ cursor: 'pointer' }}
//                         >
//                             <p className={getTabClasses('Canceladas')}>Canceladas</p>
//                         </div>

//                         {/* HISTORICAS */}
//                         <div 
//                             className="col-auto" 
//                             onClick={() => handleClick('Historicas')}
//                             style={{ cursor: 'pointer' }}
//                         >
//                             <p className={getTabClasses('Historicas')}>Históricas</p>
//                         </div>

//                     </div>
//                   <div>
//                       <ArtistHomeReservations reservasSelected={reservasSelected} />
//                   </div>
//                 </div>

//                 {/* --- Renderizado Condicional usando el componente hijo --- */}
//             </div>
//         </div>
//     );
// }

// export default ReservasPage;


/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import ArtistHomeReservations from '../../components/ArtistHomeReservations'; 
import { ReservasService } from "../../services/ReservasServices";

const ReservasPage = () => {
    const [reservasBackend, setReservasBackend] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 1. Estado para la pestaña activa
    const [seccionActiva, setSeccionActiva] = useState('Futuras'); 

    // 2. Estado para la lista filtrada y formateada que se pasará como prop
    const [reservasSelected, setReservasSelected] = useState([]);

    /**
     * Función auxiliar para obtener el objeto Date preciso de inicio de la reserva.
     * (Necesaria para la lógica de filtrado entre Futuras/Históricas)
     */
    const getReservaStartDateTime = (reserva) => {
        try {
            // Verificar si date es string o Date
            let dateString;
            if (reserva.date instanceof Date) {
                dateString = reserva.date.toISOString().substring(0, 10);
            } else if (typeof reserva.date === 'string') {
                dateString = reserva.date.substring(0, 10);
            } else {
                console.warn('Tipo de fecha no reconocido:', reserva.date);
                return new Date(); // Fecha actual como fallback
            }
            
            // Si no tiene hsStart, usar '00:00' como default
            const horaStart = reserva.hsStart || '00:00';
            return new Date(`${dateString}T${horaStart}:00`); 
        } catch (error) {
            console.error('Error al obtener fecha de inicio:', error, reserva);
            return new Date(); // Fecha actual como fallback
        }
    };

    /**
     * Función para aplicar el formato de fecha con corrección UTC para la visualización.
     * Crea una nueva propiedad 'dateDisplay' y deja 'date' intacta para el filtrado.
     */
    const parseReservasFechas = (listToParse) => {
        if (!listToParse || listToParse.length === 0) {
            return [];
        }
        
        return listToParse.map((reserva) => {
            try {
                let fechaDate;
                
                // Manejar diferentes formatos de fecha
                if (reserva.date instanceof Date) {
                    fechaDate = reserva.date;
                } else if (typeof reserva.date === 'string') {
                    if (reserva.date.includes('T')) {
                        fechaDate = new Date(reserva.date);
                    } else {
                        fechaDate = new Date(reserva.date + 'T00:00:00');
                    }
                } else if (typeof reserva.date === 'number') {
                    fechaDate = new Date(reserva.date);
                } else {
                    console.warn('Tipo de fecha no reconocido:', reserva.date);
                    return {
                        ...reserva,
                        dateDisplay: 'Fecha inválida'
                    };
                }
                
                // Verificar si la fecha es válida
                if (isNaN(fechaDate.getTime())) {
                    console.warn('Fecha inválida:', reserva.date);
                    return {
                        ...reserva,
                        dateDisplay: 'Fecha inválida'
                    };
                }
                
                // Formatear para mostrar
                const year = fechaDate.getFullYear();
                const month = fechaDate.getMonth() + 1;
                const day = fechaDate.getDate();
                const fechaFormateada = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

                return {
                    ...reserva,
                    date: fechaDate, // Mantener como Date para filtrado
                    dateDisplay: fechaFormateada, 
                };
            } catch (error) {
                console.error('Error al parsear fecha:', error, reserva);
                return {
                    ...reserva,
                    dateDisplay: 'Error en fecha'
                };
            }
        });
    };

    // FUNCIÓN ORIGINAL CON AXIOS - LA MANTENEMOS IGUAL
    const getMisReservas = async () => {        
        try {
            setLoading(true);
            const reservas = await ReservasService.getReservasPorArtista();
            
            // Si axios devuelve los datos en .data
            const reservasData = reservas.data || reservas;
            console.log('Reservas obtenidas del backend:', reservasData);
            
            // Parsear las fechas inicialmente
            const reservasParseadas = parseReservasFechas(reservasData || []);
            setReservasBackend(reservasParseadas);
            
        } catch (error) {
            console.error('Error al obtener reservas:', error);
            setReservasBackend([]);
        } finally {
            setLoading(false);
        }
    }

    // Cargar reservas al montar el componente
    useEffect(() => {
        getMisReservas();
    }, []);

    // --- LÓGICA DE FILTRADO Y FORMATO (Corre en cada cambio de pestaña o de reservas) ---
    useEffect(() => {
        if (reservasBackend.length === 0) {
            setReservasSelected([]);
            return;
        }

        const now = new Date(); 
        let filteredList = [];

        if (seccionActiva === 'Futuras') {
            // FUTURAS: No canceladas Y (fecha Y hora de inicio) es MAYOR a la actual
            filteredList = reservasBackend.filter(reserva => {
                try {
                    const reservaStart = getReservaStartDateTime(reserva);
                    const isCanceled = reserva.canceled === true || reserva.estado === 'cancelado';
                    return !isCanceled && reservaStart > now;
                } catch (error) {
                    console.error('Error filtrando reserva futura:', error, reserva);
                    return false;
                }
            });

        } else if (seccionActiva === 'Canceladas') {
            // CANCELADAS: La propiedad 'canceled' es true o estado 'cancelado'
            filteredList = reservasBackend.filter(reserva => 
                reserva.canceled === "true" || reserva.estado === 'cancelado'
            );
            
        } else if (seccionActiva === 'Historicas') {
            // HISTÓRICAS: No canceladas Y (fecha Y hora de inicio) es MENOR a la actual
            filteredList = reservasBackend.filter(reserva => {
                try {
                    const reservaStart = getReservaStartDateTime(reserva);
                    const isCanceled = reserva.canceled === "true" || reserva.estado === 'cancelado';
                    return !isCanceled && reservaStart < now;
                } catch (error) {
                    console.error('Error filtrando reserva histórica:', error, reserva);
                    return false;
                }
            });
        }
        
        console.log(`Reservas ${seccionActiva} filtradas:`, filteredList.length);
        
        // Ordenar por fecha (más reciente primero para futuras, más antiguas primero para históricas)
        filteredList.sort((a, b) => {
            const dateA = getReservaStartDateTime(a);
            const dateB = getReservaStartDateTime(b);
            
            if (seccionActiva === 'Futuras') {
                return dateA - dateB; // Ascendente (próximas primero)
            } else {
                return dateB - dateA; // Descendente (más recientes primero)
            }
        });

        // Actualizamos el estado que se pasa al componente hijo
        setReservasSelected(filteredList);
        
    }, [seccionActiva, reservasBackend]); 
    
    // --- MANEJADORES DE INTERFAZ ---

    const handleClick = (seccion) => {
        setSeccionActiva(seccion);
    };

    const getTabClasses = (seccion) => {
        let classes = 'mb-0 p-1'; 
        
        if (seccionActiva === seccion) {
            classes += ' border-bottom border-warning fw-bold text-dark';
        } else {
            classes += ' text-muted';
        }
        return classes;
    };
    
    // --- RENDERIZADO ---

    if (loading) {
        return (
            <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Cargando reservas...</span>
                </div>
                <span className="ms-3">Cargando reservas...</span>
            </div>
        );
    }

    return (
        <div className="w-100">
            <div className="w-100 d-flex flex-column px-4">
                <div className="mb-4">
                    <h2>Mis Reservas</h2>
                </div>
                
                {/* Pestañas de Filtrado */}
                <div className="d-flex flex-column bg-white border border-2 border-tertiary rounded-3 p-3 mb-3">
                    <div className="row align-items-center mb-3">

                        {/* FUTURAS */}
                        <div 
                            className="col-auto" 
                            onClick={() => handleClick('Futuras')}
                            style={{ cursor: 'pointer' }}
                        >
                            <p className={getTabClasses('Futuras')}>Futuras</p>
                        </div>

                        {/* CANCELADAS */}
                        <div 
                            className="col-auto mx-4" 
                            onClick={() => handleClick('Canceladas')}
                            style={{ cursor: 'pointer' }}
                        >
                            <p className={getTabClasses('Canceladas')}>Canceladas</p>
                        </div>

                        {/* HISTORICAS */}
                        <div 
                            className="col-auto" 
                            onClick={() => handleClick('Historicas')}
                            style={{ cursor: 'pointer' }}
                        >
                            <p className={getTabClasses('Historicas')}>Históricas</p>
                        </div>

                    </div>
                  
                  <div>
                      {reservasSelected.length > 0 ? (
                          <ArtistHomeReservations reservasSelected={reservasSelected} />
                      ) : (
                          <div className="alert alert-info mt-3">
                              No hay reservas {seccionActiva.toLowerCase()}.
                          </div>
                      )}
                  </div>
                </div>

                {/* Botón para refrescar */}
                <div className="mt-3">
                    <button 
                        className="btn btn-outline-warning"
                        onClick={getMisReservas}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Actualizando...
                            </>
                        ) : 'Actualizar reservas'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReservasPage;