// import PropTypes from 'prop-types';
// import { hours } from '../entities/days';
// import { useState, useEffect, useRef } from 'react'; // <-- AGREGADO useRef

// const DaysCheckbox = ({ days, initialSelectedDays, setDays: updateSelectedDays }) => {
//     const [internalDays, setInternalDays] = useState(() => {
//         return days.map(day => {
//             const existingSelected = initialSelectedDays.find(sDay => sDay.id === day.id);
//             return {
//                 ...day,
//                 selected: !!existingSelected,
//                 hsInicio: existingSelected ? existingSelected.hsInicio : '',
//                 hsFin: existingSelected ? existingSelected.hsFin : ''
//             };
//         });
//     });

//     // Usamos useRef para mantener una referencia al último array de días enviados al padre
//     const lastSentDaysRef = useRef([]); // <-- AGREGADO

//     useEffect(() => {
//         setInternalDays(days.map(day => {
//             const existingSelected = initialSelectedDays.find(sDay => sDay.id === day.id);
//             return {
//                 ...day,
//                 selected: !!existingSelected,
//                 hsInicio: existingSelected ? existingSelected.hsInicio : '',
//                 hsFin: existingSelected ? existingSelected.hsFin : ''
//             };
//         }));
//     }, [days, initialSelectedDays]);

//     // --- INICIO SOLUCIÓN DEL BUCLE ---
//     useEffect(() => {
//         const currentlySelectedDays = internalDays
//             .filter(d => d.selected && d.hsInicio && d.hsFin)
//             .map(({ id, dia, hsInicio, hsFin }) => ({
//                 id,
//                 dia,
//                 hsInicio,
//                 hsFin,
//                 available: true
//             }));

//         // Función de comparación de arrays para evitar re-renders innecesarios
//         const areArraysEqual = (arr1, arr2) => {
//             if (arr1.length !== arr2.length) return false;
//             for (let i = 0; i < arr1.length; i++) {
//                 // Compara cada objeto por sus propiedades clave (id, hsInicio, hsFin)
//                 // Esto es una comparación superficial, pero suficiente para este caso.
//                 if (arr1[i].id !== arr2[i].id ||
//                     arr1[i].hsInicio !== arr2[i].hsInicio ||
//                     arr1[i].hsFin !== arr2[i].hsFin) {
//                     return false;
//                 }
//             }
//             return true;
//         };

//         // Solo llama a updateSelectedDays si el array actual es diferente al último enviado
//         if (!areArraysEqual(currentlySelectedDays, lastSentDaysRef.current)) {
//             updateSelectedDays(currentlySelectedDays);
//             lastSentDaysRef.current = currentlySelectedDays; // Actualiza la referencia
//         }
//     }, [internalDays, updateSelectedDays]); // Dependencias: internalDays y la función de actualización
//     // --- FIN SOLUCIÓN DEL BUCLE ---

//     const toggleDaySelection = (id) => {
//         setInternalDays(prevDays =>
//             prevDays.map(day =>
//                 day.id === id
//                     ? { ...day, selected: !day.selected, hsInicio: '', hsFin: '' }
//                     : day
//             )
//         );
//     };

//     const setDayTime = (id, type, time) => {
//         setInternalDays(prevDays =>
//             prevDays.map(day =>
//                 day.id === id ? { ...day, [type]: time } : day
//             )
//         );
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-4">
//                     <h5>Día</h5>
//                 </div>
//                 <div className="col-md-4">
//                     <h5>Hora de Inicio</h5>
//                 </div>
//                 <div className="col-md-4">
//                     <h5>Hora de Fin</h5>
//                 </div>
//             </div>
//             {internalDays.map((day) => (
//                 <div className="row align-items-center mb-2" key={day.id || day.name}>
//                     <div className="col-md-4">
//                         <div className="form-check">
//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 checked={day.selected}
//                                 onChange={() => toggleDaySelection(day.id)}
//                                 id={`day-${day.dia}`}
//                             />
//                             <label className="form-check-label" htmlFor={`day-${day.dia}`}>
//                                 {day.dia}
//                             </label>
//                         </div>
//                     </div>
//                     <div className="col-md-4">
//                         {day.selected ? (
//                             <select
//                                 className="form-select"
//                                 value={day.hsInicio}
//                                 onChange={(e) => setDayTime(day.id, 'hsInicio', e.target.value)}
//                             >
//                                 <option value="">Seleccionar hora</option>
//                                 {hours.map((hour) => (
//                                     <option key={hour.hour} value={hour.hour}>
//                                         {hour.hour}
//                                     </option>
//                                 ))}
//                             </select>
//                         ) : (
//                             <input type="text" className="form-control" value="-" readOnly />
//                         )}
//                     </div>
//                     <div className="col-md-4">
//                         {day.selected ? (
//                             <select
//                                 className="form-select"
//                                 value={day.hsFin}
//                                 onChange={(e) => setDayTime(day.id, 'hsFin', e.target.value)}
//                             >
//                                 <option value="">Seleccionar hora</option>
//                                 {hours.map((hour) => (
//                                     <option key={hour.hour} value={hour.hour}>
//                                         {hour.hour}
//                                     </option>
//                                 ))}
//                             </select>
//                         ) : (
//                             <input type="text" className="form-control" value="-" readOnly />
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// DaysCheckbox.propTypes = {
//     days: PropTypes.array.isRequired,
//     initialSelectedDays: PropTypes.array,
//     setDays: PropTypes.func.isRequired,
// };

// export default DaysCheckbox;
import PropTypes from 'prop-types';
import { hours } from '../entities/days';
import { useState, useEffect, useRef } from 'react';

const DaysCheckbox = ({ days, initialSelectedDays, setDays: updateSelectedDays }) => {
    // Estado para la gestión interna de los días y su estado de selección/horarios
    // Inicializa internalDays basándose en los días proporcionados y los initialSelectedDays
    const [internalDays, setInternalDays] = useState(() => {
        return days.map(day => {
            // Busca una coincidencia en initialSelectedDays por el nombre del día ('dia')
            const match = initialSelectedDays?.find(sDay => sDay.dia === day.dia);
            return {
                ...day,
                selected: !!match, // Marca como seleccionado si hay una coincidencia
                hsInicio: match?.hsInicio || '', // Establece la hora de inicio si existe, de lo contrario vacía
                hsFin: match?.hsFin || '' // Establece la hora de fin si existe, de lo contrario vacía
            };
        });
    });

    // Ref para mantener un seguimiento del último array de días seleccionados enviado al componente padre
    const lastSentDaysRef = useRef([]);

    // Efecto para resincronizar internalDays cuando la prop initialSelectedDays cambia.
    // Esto es crucial para las actualizaciones cuando los datos de la sala se cargan asincrónicamente en el padre.
    // Este useEffect reemplaza el anterior que tenía un array de dependencias vacío.
    useEffect(() => {
        const newInternalDays = days.map(day => {
            const match = initialSelectedDays?.find(sDay => sDay.dia === day.dia);
            return {
                ...day,
                selected: !!match,
                hsInicio: match?.hsInicio || '',
                hsFin: match?.hsFin || ''
            };
        });

        // Función de comparación profunda para evitar actualizaciones de estado innecesarias y posibles bucles infinitos
        const areCurrentInternalDaysSameAsNew = (current, newArr) => {
            if (current.length !== newArr.length) return false;
            for (let i = 0; i < current.length; i++) {
                if (current[i].selected !== newArr[i].selected ||
                    current[i].hsInicio !== newArr[i].hsInicio ||
                    current[i].hsFin !== newArr[i].hsFin) {
                    return false;
                }
            }
            return true;
        };

        // Solo actualiza el estado si el nuevo array de días es realmente diferente
        if (!areCurrentInternalDaysSameAsNew(internalDays, newInternalDays)) {
            setInternalDays(newInternalDays);
        }
    }, [initialSelectedDays, days]); // Dependencias: initialSelectedDays y days

    // Efecto para enviar los días seleccionados de vuelta al componente padre
    // Este efecto se ejecuta cada vez que internalDays cambia
    useEffect(() => {
        // Filtra los días seleccionados que tienen horas de inicio y fin definidas
        const currentlySelectedDays = internalDays
            .filter(d => d.selected && d.hsInicio && d.hsFin)
            .map(({ id, dia, hsInicio, hsFin }) => ({
                id,
                dia,
                hsInicio,
                hsFin,
                available: true
            }));

        // Función para comparar arrays y evitar re-renders innecesarios en el componente padre
        const areArraysEqual = (arr1, arr2) => {
            if (arr1.length !== arr2.length) return false;
            for (let i = 0; i < arr1.length; i++) {
                // Compara cada objeto por sus propiedades clave (id, hsInicio, hsFin)
                if (arr1[i].id !== arr2[i].id ||
                    arr1[i].hsInicio !== arr2[i].hsInicio ||
                    arr1[i].hsFin !== arr2[i].hsFin) {
                    return false;
                }
            }
            return true;
        };

        // Solo llama a updateSelectedDays si el array actual es diferente al último enviado
        if (!areArraysEqual(currentlySelectedDays, lastSentDaysRef.current)) {
            updateSelectedDays(currentlySelectedDays);
            lastSentDaysRef.current = currentlySelectedDays; // Actualiza la referencia
        }
    }, [internalDays, updateSelectedDays]); // Dependencias: internalDays y la función de actualización

    // Alterna el estado de selección de un día y restablece sus horarios
    const toggleDaySelection = (id) => {
        setInternalDays(prevDays =>
            prevDays.map(day =>
                day.id === id
                    ? { ...day, selected: !day.selected, hsInicio: '', hsFin: '' }
                    : day
            )
        );
    };

    // Establece la hora de inicio o fin para un día específico
    const setDayTime = (id, type, time) => {
        setInternalDays(prevDays =>
            prevDays.map(day =>
                day.id === id ? { ...day, [type]: time } : day
            )
        );
    };

    console.log('horarios: ', internalDays);

    return (
        <div className="container mt-3">
            <div className="row">
                <h4>Horarios:</h4>
                <div className="col-md-4">
                    <h5>Día</h5>
                </div>
                <div className="col-md-4">
                    <h5>Hora de Inicio</h5>
                </div>
                <div className="col-md-4">
                    <h5>Hora de Fin</h5>
                </div>
            </div>
            {internalDays.map((day) => (
                <div className="row align-items-center mb-2" key={day.id || day.name}>
                    <div className="col-md-4">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={day.selected}
                                onChange={() => toggleDaySelection(day.id)}
                                id={`day-${day.dia}`}
                            />
                            <label className="form-check-label" htmlFor={`day-${day.dia}`}>
                                {day.dia}
                            </label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {day.selected ? (
                            <select
                                className="form-select"
                                value={day.hsInicio}
                                onChange={(e) => setDayTime(day.id, 'hsInicio', e.target.value)}
                            >
                                <option value="">Seleccionar hora</option>
                                {hours.map((hour) => (
                                    <option key={hour.hour} value={hour.hour}>
                                        {hour.hour}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input type="text" className="form-control" value="-" readOnly />
                        )}
                    </div>
                    <div className="col-md-4">
                        {day.selected ? (
                            <select
                                className="form-select"
                                value={day.hsFin}
                                onChange={(e) => setDayTime(day.id, 'hsFin', e.target.value)}
                            >
                                <option value="">Seleccionar hora</option>
                                {hours.map((hour) => (
                                    <option key={hour.hour} value={hour.hour}>
                                        {hour.hour}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input type="text" className="form-control" value="-" readOnly />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

DaysCheckbox.propTypes = {
    days: PropTypes.array.isRequired,
    initialSelectedDays: PropTypes.array,
    setDays: PropTypes.func.isRequired,
};

export default DaysCheckbox;