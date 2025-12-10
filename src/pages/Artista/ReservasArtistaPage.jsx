/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import ArtistHomeReservations from '../../components/ArtistHomeReservations'; 
// Importamos la lista base de reservas para hacer el filtro
import { reservas as todasLasReservas } from '../../data/reservas';
import { ReservasService } from "../../services/ReservasServices";


const ReservasPage = () => {
    const [reservas, setReservas] = useState(null)


    // 1. Estado para la pestaña activa
    const [seccionActiva, setSeccionActiva] = useState('Futuras'); 

    // 2. Estado para la lista filtrada y formateada que se pasará como prop
    const [reservasSelected, setReservasSelected] = useState([]);

    /**
     * Función auxiliar para obtener el objeto Date preciso de inicio de la reserva.
     * (Necesaria para la lógica de filtrado entre Futuras/Históricas)
     */
    const getReservaStartDateTime = (reserva) => {
        const datePart = reserva.date.substring(0, 10);
        return new Date(`${datePart}T${reserva.hsStart}:00`); 
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
            const fechaDate = new Date(reserva.date); 
            
            // Usar métodos UTC para obtener la fecha sin ajuste de zona horaria (UTC Fix)
            const year = fechaDate.getUTCFullYear();
            const month = fechaDate.getUTCMonth() + 1; // 0-indexado
            const day = fechaDate.getUTCDate();

            // Formato DD/MM/YYYY con padding
            const fechaFormateada = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

            return {
                ...reserva,
                // 🔑 CLAVE: Agregamos la fecha formateada en una NUEVA propiedad para la UI
                dateDisplay: fechaFormateada, 
            };
        });
    };

    const getMisReservas = async () => {        
        const reservas = await ReservasService.getReservasPorArtista();
        setReservas(reservas);
    }

    // --- LÓGICA DE FILTRADO Y FORMATO (Corre en cada cambio de pestaña) ---
    useEffect(() => {
        const now = new Date(); 
        let filteredList = [];
        getMisReservas();
        filteredList = reservas;


        if (seccionActiva === 'Futuras') {
            // FUTURAS: No canceladas Y (fecha Y hora de inicio) es MAYOR a la actual
            filteredList = todasLasReservas.filter(reserva => {
                const reservaStart = getReservaStartDateTime(reserva);
                return !reserva.canceled && reservaStart > now;
            });

        } else if (seccionActiva === 'Canceladas') {
            // CANCELADAS: La propiedad 'canceled' es true
            filteredList = todasLasReservas.filter(reserva => 
                reserva.canceled === true
            );
            
        } else if (seccionActiva === 'Historicas') {
            // HISTÓRICAS: No canceladas Y (fecha Y hora de inicio) es MENOR a la actual
            filteredList = todasLasReservas.filter(reserva => {
                const reservaStart = getReservaStartDateTime(reserva);
                return !reserva.canceled && reservaStart < now; 
            });
        }
        
        // 🔑 OPTIMIZACIÓN: Aplicamos el formato de fecha SOLO a la lista filtrada (una vez por click)
        const formattedList = parseReservasFechas(filteredList);

        // Actualizamos el estado que se pasa al componente hijo
        setReservasSelected(formattedList);
        
    }, [seccionActiva]); 
    
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

    return (
        <div className="w-90">
            <div className="w-90 d-flex flex-column px-4">
                <div className="mb-4">
                    <h2>Mis Reservas</h2>
                </div>
                
                {/* Pestañas de Filtrado */}
                <div className="d-flex flex-column bg-white border border-2 border-tertiary rounded-3 p-3 mb-3">
                    <div className="row align-items-center">

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
                      <ArtistHomeReservations reservasSelected={reservasSelected} />
                  </div>
                </div>

                {/* --- Renderizado Condicional usando el componente hijo --- */}
            </div>
        </div>
    );
}

export default ReservasPage;
