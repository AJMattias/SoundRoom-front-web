// /* eslint-disable no-unused-vars */
// import { formatFecha, formatFechaAr } from "../utils/dateHelper";
// import Calendar from "./Calendar"
// import { useState } from "react"

// const ArtistCardBusqueda = () => {
//     const [mostrarCalendar, setMostrarCalendar] = useState(false);
//     const [fecha, setFecha] = useState()
//     const [mostrarFecha, setMostrarFecha] = useState()
//     const [value, onChange] = useState(new Date());

//     const handleSelectedDate=(date)=>{
//         console.log('handleDate date: ', date, typeof date)
//         const dateString = formatFecha(date.toLocaleDateString()) 
//         setFecha(dateString)
//         const dateMostrar = formatFechaAr(date.toLocaleDateString()) 
//         console.log('fechaMostrar: ', dateMostrar)
//         setMostrarFecha(dateMostrar)
//         if(dateString && dateMostrar){
//             setMostrarCalendar(false)
//         }
//       }
    
//     return (

//         <div className="container mt-3 p-3 border border-2 border-tertiary rounded bg-white">
            
//             <input 
//                 type="text" placeholder="Buscar salas por nombre"
//                 className="border border-1 rounded-2 col-10 p-2"
//             />
//             <div 
//              className=" col-3 border border-2 rounded-2 p-2 mt-2"
//              onClick={() => setMostrarCalendar(!mostrarCalendar)}
//             >
//                 {mostrarFecha ? mostrarFecha : 'Fecha Desde'} 
//             </div>

//             <div className="d-flex align-items-center mt-2">
//                 <div
//                 className="position-absolute top-100 start-0 z-1">
//                     {mostrarCalendar && (
//                         <Calendar 
//                             onChange={handleSelectedDate}
//                             value={value}
//                             />
//                     )}
//                 </div>
//                 <div >
//                     <button
//                     className="btn btn-warning border border-2 rounded-2">
//                         Buscar
//                     </button>
//                 </div>
//             </div>

//         </div>

//     )
// }

// export default ArtistCardBusqueda

/* eslint-disable no-unused-vars */
import { formatFecha, formatFechaAr } from "../utils/dateHelper";
import Calendar from "./Calendar";
import { useState } from "react";

const ArtistCardBusqueda = () => {
  const [mostrarCalendar, setMostrarCalendar] = useState(false);
  const [fecha, setFecha] = useState();
  const [mostrarFecha, setMostrarFecha] = useState();
  const [value, onChange] = useState(new Date());

  const handleSelectedDate = (date) => {
    const dateString = formatFecha(date.toLocaleDateString());
    setFecha(dateString);
    const dateMostrar = formatFechaAr(date.toLocaleDateString());
    setMostrarFecha(dateMostrar);
    if (dateString && dateMostrar) {
      setMostrarCalendar(false);
    }
  };

  return (
    <div className="container mt-3 p-3 border border-2 border-tertiary rounded bg-white">

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar salas por nombre"
        className="border border-1 rounded-2 col-10 p-2 mb-3"
      />

      {/* Fila: fecha + botón */}
      <div className="d-flex align-items-center gap-2">
        <div
          className="col-3 border border-2 rounded-2 p-2 text-center"
          onClick={() => setMostrarCalendar(!mostrarCalendar)}
          style={{ cursor: "pointer" }}
        >
          {mostrarFecha ? mostrarFecha : "Selecciona una Fecha"}
        </div>

        <button className="btn btn-warning border border-2 rounded-2">
          Buscar
        </button>
      </div>

      {/* Calendario debajo */}
      {mostrarCalendar && (
        <div className="mt-2">
          <Calendar onChange={handleSelectedDate} value={value} />
        </div>
      )}
    </div>
  );
};

export default ArtistCardBusqueda;
