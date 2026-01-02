// /* eslint-disable no-unused-vars */

// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext";
// import ArtistHomeCard from "../../components/ArtistHomeCard";
// import ArtistCardBusqueda from "../../components/ArtistCardBusqueda";
// import ArtistHomeReservations from "../../components/ArtistHomeReservations";
// import { RoomService } from "../../services/SalaDeEnsayoService";
// import OpinionesArtistaCard from "../../components/OpinionToArtistCard";
// import UsersService from "../../services/UsersService";
// import Swal from "sweetalert2";
// import { ReservasService } from "../../services/ReservasServices";

// const ArtistaHomePage = () => {

//   const navigate = useNavigate();
//   const { authState, logout } = useContext(AuthContext);
//   const user = authState.user.user;
//   //console.log("user: ", user, "authState.user.user", authState.user.user);
//   const [userId, setUserId] = useState(user.id);
//   const [reservasTodas, setReservasTodas] = useState()

//   const [opiniones, setOpiniones] = useState([])

//         const getOpinionsToArtista = () =>{
//         const response = RoomService.getOpinionesArtista(user.id)
//         //console.log('response: ', response)
//         setOpiniones(response.json)
//     }

//     const getMisReservas = async () =>{
//         const response = await ReservasService.getReservasPorArtista()
//         //console.log('response reservas artista: ', response)
//         setReservasTodas(response.json)

//     }
//   const parseReservasFechas = (listToParse) => {
//         if (!listToParse || listToParse.length === 0) {
//             return [];
//         }

//         return listToParse.map((reserva) => {
//             //const fechaDate = new Date(reserva.date);
//             const fechaDate = new Date(reserva.date + 'T00:00:00');
//             // Usar métodos UTC para obtener la fecha sin ajuste de zona horaria (UTC Fix)
//             const year = fechaDate.getUTCFullYear();
//             const month = fechaDate.getUTCMonth() + 1; // 0-indexado
//             const day = fechaDate.getUTCDate();
//             //console.log('day reserva: ', day);

//             // Formato DD/MM/YYYY con padding
//             const fechaFormateada = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

//             return {
//                 ...reserva,
//                 // 🔑 CLAVE: Agregamos la fecha formateada en una NUEVA propiedad para la UI
//                 dateDisplay: fechaFormateada,
//             };
//         });
//     };

//     const bajarUser =() =>{
//         const response = UsersService.bajaUser(userId)
//         //console.log('response baja user: ', response)
//         logout()
//         navigate("/")
//     }

//     const handleBajaUser = async (values) => {
//         Swal.fire({
//         title: "¿Estás seguro?",
//         text: `Esta acción dará de baja tu cuenta.`,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#e80000ff",
//         cancelButtonColor: "#d9ff00ff",
//         confirmButtonText: "Sí",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 bajarUser();
//             } else if (result.dismiss === Swal.DismissReason.cancel) {
//                 // Opcional: Aquí puedes poner lógica si el usuario cancela
//                 //console.log("El usuario canceló la acción");
//             }
//         })
//     }

//     useEffect(() => { // ⬅️ La flecha indica el callback de useEffect
//         getOpinionsToArtista();
//         getMisReservas().then(() => {
//             setReservasTodas(parseReservasFechas(reservasTodas))
//         })
//     }, [user]);

//     return (
//     <div className="w-100">
//         <div className="w-100 d-flex flex-column px-4">
//         <div className="mb-4">
//             <h2>Hola {user.name}</h2>
//             {/* icno notificacions */}
//         </div>

//         {/* Contenedor principal de la tarjeta y botones (FLEX COLUMN) */}
//         <div className="d-flex flex-column bg-white border border-2 border-tertiary rounded-3 p-3 mb-3">
//             <div className="">
//             <ArtistHomeCard artista={user} />
//             </div>

//             {/* 2. BOTONERA */}
//             <div className="container col-12 d-flex justify-content-center mt-3 mb-3 gap-3">
//             <button
//                 className="btn btn-warning"
//                 onClick={() => navigate("/artista/editar-perfil/" + user.id)}
//             >
//                 Editar perfil
//             </button>
//             <button
//                 className="btn btn-white border border-secondary"
//                 onClick={() => navigate("/cambiar-contraseñaVN")}
//             >
//                 Cambiar contraseña
//             </button>
//             <button
//                 className="btn btn-warninwhiteg border border-black"
//                 onClick={handleBajaUser}
//                 >
//                 Dar de baja cuenta
//             </button>
//             </div>

//         {/* Buscacardor */}
//         </div >
//             <ArtistCardBusqueda />
//             <strong className="mt-3 fs-5">Proximas Reservas</strong>
//             <ArtistHomeReservations reservasSelected={reservasTodas} />
//             <strong className="mt-3 fs-5">Opiniones sobre mi</strong>
//             <OpinionesArtistaCard opiniones={opiniones} />
//         </div>
//     </div>
//     );
//     };

//     export default ArtistaHomePage;

/* eslint-disable no-unused-vars */

// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext";
// import ArtistHomeCard from "../../components/ArtistHomeCard";
// import ArtistCardBusqueda from "../../components/ArtistCardBusqueda";
// import ArtistHomeReservations from "../../components/ArtistHomeReservations";
// import { RoomService } from "../../services/SalaDeEnsayoService";
// import OpinionesArtistaCard from "../../components/OpinionToArtistCard";
// import UsersService from "../../services/UsersService";
// import Swal from "sweetalert2";
// import { ReservasService } from "../../services/ReservasServices";

// const ArtistaHomePage = () => {
//   const navigate = useNavigate();
//   const { authState, logout } = useContext(AuthContext);
//   const user = authState.user?.user;
//   //console.log("user: ", user);
//   const [userId] = useState(user?.id || "");
//   const [reservasTodas, setReservasTodas] = useState([]);
//   const [opiniones, setOpiniones] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [ reservasFuturas, setReservasFuturas ] = useState([])

//   const getOpinionsToArtista = async () => {
//     try {
//       const response = await RoomService.getOpinionesArtista(user.id);
//       //console.log("response opiniones: ", response);

//       // Asegúrate de que estamos obteniendo los datos correctos
//       if (response && typeof response.json === "function") {
//         const data = await response.json();
//         setOpiniones(data || []);
//       } else {
//         setOpiniones(response || []);
//       }
//     } catch (error) {
//       console.error("Error al obtener opiniones:", error);
//       setOpiniones([]);
//     }
//   };

//   const getMisReservas = async () => {
//     try {
//       //console.log("Obteniendo reservas para artista ID:", user?.id);
//       const response = await ReservasService.getReservasPorArtista();
//       //console.log("Respuesta completa de reservas:", response);

//       // Dependiendo de cómo esté estructurado tu servicio
//       let reservasData;

//       if (response && typeof response.json === "function") {
//         // Si response tiene método json() (fetch API)
//         reservasData = await response.json();
//       } else if (response && response.data) {
//         // Si usa axios u otra librería
//         reservasData = response.data;
//       } else {
//         // Si ya son los datos directamente
//         reservasData = response;
//       }

//       //console.log("Datos de reservas extraídos:", reservasData);

//       // Si es un array, devolverlo
//       if (Array.isArray(reservasData)) {
//         return reservasData;
//       }

//       // Si es un objeto con propiedades, intentar extraer el array
//       if (reservasData && typeof reservasData === "object") {
//         for (const key in reservasData) {
//           if (Array.isArray(reservasData[key])) {
//             return reservasData[key];
//           }
//         }
//       }

//       return [];
//     } catch (error) {
//       console.error("Error al obtener reservas:", error);
//       return [];
//     }
//   };

//   const parseReservasFechas = (listToParse) => {
//     if (!listToParse || listToParse.length === 0) {
//       //console.log("No hay reservas para parsear");
//       return [];
//     }

//     //console.log("Parseando reservas (primer elemento):", listToParse[0]);
//     //console.log(
//     //   "Tipo de fecha del primer elemento:",
//     //   typeof listToParse[0].date,
//     //   listToParse[0].date
//     // );

//     return listToParse.map((reserva) => {
//       try {
//         let fechaDate;
//         let fechaString = "";

//         // Determinar si la fecha es string, objeto Date o timestamp
//         if (reserva.date instanceof Date) {
//           // Ya es un objeto Date
//           fechaDate = reserva.date;
//           fechaString = reserva.date.toISOString();
//         } else if (typeof reserva.date === "string") {
//           // Es un string
//           fechaString = reserva.date;
//           if (reserva.date.includes("T")) {
//             fechaDate = new Date(reserva.date);
//           } else {
//             fechaDate = new Date(reserva.date + "T00:00:00");
//           }
//         } else if (typeof reserva.date === "number") {
//           // Es un timestamp
//           fechaDate = new Date(reserva.date);
//           fechaString = fechaDate.toISOString();
//         } else {
//           // Valor inesperado, usar fecha actual como fallback
//           console.warn(
//             "Tipo de fecha no reconocido:",
//             typeof reserva.date,
//             reserva.date
//           );
//           fechaDate = new Date();
//           fechaString = "Fecha inválida";
//         }

//         // Verificar si la fecha es válida
//         if (isNaN(fechaDate.getTime())) {
//           console.warn("Fecha inválida:", reserva.date);
//           return {
//             ...reserva,
//             date: fechaString, // Mantener la fecha original como string
//             dateDisplay: "Fecha inválida",
//           };
//         }

//         // Formatear la fecha para mostrar
//         const year = fechaDate.getFullYear();
//         const month = fechaDate.getMonth() + 1;
//         const day = fechaDate.getDate();
//         const fechaFormateada = `${day.toString().padStart(2, "0")}/${month
//           .toString()
//           .padStart(2, "0")}/${year}`;

//         // Crear nuevo objeto con la fecha como string para evitar problemas de React
//         return {
//           ...reserva,
//           date: fechaString, // Asegurar que date sea string
//           dateDisplay: fechaFormateada,
//         };
//       } catch (error) {
//         console.error(
//           "Error al parsear fecha:",
//           error,
//           "Fecha original:",
//           reserva.date
//         );
//         return {
//           ...reserva,
//           date: String(reserva.date), // Convertir a string
//           dateDisplay: "Error en fecha",
//         };
//       }
//     });
//   };

//    // CALCULAR RESERVAS FUTURAS CON USEMEMO
//   const reservasFuturas = useMemo(() => {
//     if (!reservasTodas || reservasTodas.length === 0) {
//       return [];
//     }

//     const ahora = new Date();
//     console.log("Fecha actual para filtrado:", ahora);
//     console.log("Total de reservas a filtrar:", reservasTodas.length);

//     const reservasFuturasFiltradas = reservasTodas.filter(reserva => {
//       try {
//         // Crear fecha de reserva combinando date y hsStart
//         const fechaReservaStr = reserva.date.split('T')[0]; // Obtener solo la parte de la fecha
//         const fechaReservaCompleta = new Date(`${fechaReservaStr}T${reserva.hsStart}:00`);
        
//         console.log("Comparando:", {
//           fechaReserva: fechaReservaCompleta,
//           fechaActual: ahora,
//           esFutura: fechaReservaCompleta > ahora
//         });

//         return fechaReservaCompleta > ahora;
//       } catch (error) {
//         console.error("Error al comparar fecha:", error, reserva);
//         return false;
//       }
//     });

//     console.log("Reservas futuras encontradas:", reservasFuturasFiltradas.length);
//     return reservasFuturasFiltradas;
//   }, [reservasTodas]);

//   const bajarUser = async () => {
//     try {
//       const response = await UsersService.bajaUser(userId);
//       //console.log("response baja user: ", response);
//       logout();
//       navigate("/");
//     } catch (error) {
//       console.error("Error al dar de baja:", error);
//       Swal.fire({
//         title: "Error",
//         text: "No se pudo dar de baja la cuenta",
//         icon: "error",
//       });
//     }
//   };

//   const handleBajaUser = () => {
//     Swal.fire({
//       title: "¿Estás seguro?",
//       text: `Esta acción dará de baja tu cuenta.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#e80000ff",
//       cancelButtonColor: "#d9ff00ff",
//       confirmButtonText: "Sí",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         bajarUser();
//       }
//     });
//   };

  

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) {
//         //console.log("No hay usuario, esperando...");
//         return;
//       }

//       setLoading(true);
//       //console.log("Iniciando carga de datos para usuario:", user.id);

//       try {
//         await getOpinionsToArtista();

//         const reservasData = await getMisReservas();
//         //console.log("reservasData obtenidas (sin parsear):", reservasData);

//         if (reservasData && reservasData.length > 0) {
//           //console.log("Parseando", reservasData.length, "reservas");
//           const reservasParseadas = parseReservasFechas(reservasData);
//           //console.log("reservas parseadas finales:", reservasParseadas);
//           setReservasTodas(reservasParseadas);
//         } else {
//           //console.log("No se encontraron reservas o el array está vacío");
//           setReservasTodas([]);
//         }
//          console.log('filtrar reservas futuras', reservasTodas);
//           const dateNow = new Date();
//           console.log('date now: ', dateNow);
//           const reservasArray = reservasTodas;
//           const reservasFuturas = reservasArray.filter(reserva => {
//           const reservaDate = new Date(reserva.date);
//           console.log("Comparando reservaDate:", reservaDate, "con dateNow:", dateNow);
//           return reservaDate > dateNow;
//         });
//       setReservasFuturas(reservasFuturas);
//       } catch (error) {
//         console.error("Error en fetchData:", error);
//         setReservasTodas([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
    
//   }, [user]);

//   if (loading) {
//     return <div className="p-3">Cargando reservas...</div>;
//   }

//   return (
//     <div className="w-100">
//       <div className="w-100 d-flex flex-column px-4">
//         <div className="mb-4">
//           <h2>Hola {user?.name || ""}</h2>
//         </div>

//         <div className="d-flex flex-column bg-white border border-2 border-tertiary rounded-3 p-3 mb-3">
//           <div className="">
//             <ArtistHomeCard artista={user} />
//           </div>

//           <div className="container col-12 d-flex justify-content-center mt-3 mb-3 gap-3">
//             <button
//               className="btn btn-warning"
//               onClick={() => navigate("/artista/editar-perfil/" + user?.id)}
//             >
//               Editar perfil
//             </button>
//             <button
//               className="btn btn-white border border-secondary"
//               onClick={() => navigate("/cambiar-contraseñaVN")}
//             >
//               Cambiar contraseña
//             </button>
//             <button
//               className="btn btn-warninwhiteg border border-black"
//               onClick={handleBajaUser}
//             >
//               Dar de baja cuenta
//             </button>
//           </div>
//         </div>

//         <ArtistCardBusqueda />

//         <strong className="mt-3 fs-5">Próximas Reservas</strong>
//         {reservasTodas && reservasTodas.length > 0 ? (
//           <ArtistHomeReservations reservasSelected={reservasFuturas} />
//         ) : (
//           <div className="alert alert-info mt-2">
//             No tienes reservas próximas.
//           </div>
//         )}

//         <strong className="mt-3 fs-5">Opiniones sobre mi</strong>
//         <OpinionesArtistaCard opiniones={opiniones} />
//       </div>
//     </div>
//   );
// };

// export default ArtistaHomePage;



import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ArtistHomeCard from "../../components/ArtistHomeCard";
import ArtistCardBusqueda from "../../components/ArtistCardBusqueda";
import ArtistHomeReservations from "../../components/ArtistHomeReservations";
import { RoomService } from "../../services/SalaDeEnsayoService";
import OpinionesArtistaCard from "../../components/OpinionToArtistCard";
import UsersService from "../../services/UsersService";
import Swal from "sweetalert2";
import { ReservasService } from "../../services/ReservasServices";

const ArtistaHomePage = () => {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);
  const user = authState.user?.user;
  const [userId] = useState(user?.id || "");
  const [reservasTodas, setReservasTodas] = useState([]);
  const [opiniones, setOpiniones] = useState([]);
  const [loading, setLoading] = useState(true);
  // Eliminamos el estado reservasFuturas y lo calculamos con useMemo

  const getOpinionsToArtista = async () => {
    try {
      const response = await RoomService.getOpinionesArtista(user.id);
      if (response && typeof response.json === "function") {
        const data = await response.json();
        setOpiniones(data || []);
      } else {
        setOpiniones(response || []);
      }
    } catch (error) {
      console.error("Error al obtener opiniones:", error);
      setOpiniones([]);
    }
  };

  const getMisReservas = async () => {
    try {
      const response = await ReservasService.getReservasPorArtista();
      let reservasData;

      if (response && typeof response.json === "function") {
        reservasData = await response.json();
      } else if (response && response.data) {
        reservasData = response.data;
      } else {
        reservasData = response;
      }

      if (Array.isArray(reservasData)) {
        return reservasData;
      }

      if (reservasData && typeof reservasData === "object") {
        for (const key in reservasData) {
          if (Array.isArray(reservasData[key])) {
            return reservasData[key];
          }
        }
      }

      return [];
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      return [];
    }
  };

  const parseReservasFechas = (listToParse) => {
    if (!listToParse || listToParse.length === 0) {
      console.log("parseReservasFechas: No hay datos para parsear");
      return [];
    }

    console.log("=== INICIANDO PARSEO DE FECHAS ===");
    console.log("Cantidad de reservas a parsear:", listToParse.length);

    const reservasParseadas = listToParse.map((reserva, index) => {
      console.log(`Parseando reserva ${index + 1}:`, {
        id: reserva.id,
        dateOriginal: reserva.date,
        tipoDate: typeof reserva.date,
        hsStart: reserva.hsStart,
        hsEnd: reserva.hsEnd
      });

      try {
        let fechaDate;
        let fechaString = "";

        // REVISAR ESTA PARTE CRÍTICAMENTE
        if (reserva.date instanceof Date) {
          fechaDate = reserva.date;
          fechaString = reserva.date.toISOString();
          console.log(`Reserva ${index + 1}: Ya era Date`, fechaDate);
        } else if (typeof reserva.date === "string") {
          console.log(`Reserva ${index + 1}: Es string`, reserva.date);
          
          fechaString = reserva.date;
          
          // IMPORTANTE: Asegurar el formato correcto
          if (reserva.date.includes("T")) {
            fechaDate = new Date(reserva.date);
          } else {
            // ESTO PODRÍA ESTAR CREANDO DUPLICADOS
            const fechaConHora = `${reserva.date}T${reserva.hsStart}:00`;
            console.log(`Reserva ${index + 1}: Creando fecha con hora`, fechaConHora);
            fechaDate = new Date(fechaConHora);
          }
        } else if (typeof reserva.date === "number") {
          fechaDate = new Date(reserva.date);
          fechaString = fechaDate.toISOString();
          console.log(`Reserva ${index + 1}: Era timestamp`, reserva.date);
        } else {
          console.warn(`Reserva ${index + 1}: Tipo no reconocido`, typeof reserva.date);
          fechaDate = new Date();
          fechaString = "Fecha inválida";
        }

        // Verificar si la fecha es válida
        if (isNaN(fechaDate.getTime())) {
          console.warn(`Reserva ${index + 1}: Fecha inválida`, reserva.date);
          return {
            ...reserva,
            date: fechaString,
            dateDisplay: "Fecha inválida",
          };
        }

        const year = fechaDate.getFullYear();
        const month = fechaDate.getMonth() + 1;
        const day = fechaDate.getDate();
        const fechaFormateada = `${day.toString().padStart(2, "0")}/${month
          .toString()
          .padStart(2, "0")}/${year}`;

        const resultado = {
          ...reserva,
          date: fechaString,
          dateDisplay: fechaFormateada,
        };

        console.log(`Reserva ${index + 1} resultado:`, {
          id: resultado.id,
          date: resultado.date,
          dateDisplay: resultado.dateDisplay,
          fechaDate: fechaDate.toString()
        });

        return resultado;

      } catch (error) {
        console.error(`Error al parsear reserva ${index + 1}:`, error);
        return {
          ...reserva,
          date: String(reserva.date),
          dateDisplay: "Error en fecha",
        };
      }
    });

    console.log("=== FIN DEL PARSEO ===");
    console.log("Reservas parseadas:", reservasParseadas);
    
    return reservasParseadas;
  };
  

  // CALCULAR RESERVAS FUTURAS CON USEMEMO
  const reservasFuturas = useMemo(() => {
    if (!reservasTodas || reservasTodas.length === 0) {
      return [];
    }

    const ahora = new Date();
    
    // Filtrar por fecha futura
    const futuras = reservasTodas.filter(reserva => {
      try {
        const fechaReservaStr = reserva.date.split('T')[0];
        const fechaReservaCompleta = new Date(`${fechaReservaStr}T${reserva.hsStart}:00`);
        return fechaReservaCompleta > ahora;
      } catch (error) {
        return false;
      }
    });

    // ELIMINAR DUPLICADOS CONFIRMADOS - método agresivo
    const idsUnicos = new Set();
    const reservasFinales = [];
    
    futuras.forEach(reserva => {
      // Crear una clave única que combine TODO
      const claveUnica = `${reserva.id}_${reserva.date}_${reserva.hsStart}_${reserva.hsEnd}_${reserva.idRoom?.id || ''}`;
      
      if (!idsUnicos.has(claveUnica)) {
        idsUnicos.add(claveUnica);
        reservasFinales.push(reserva);
      } else {
        console.log("DUPLICADO ELIMINADO:", claveUnica);
      }
    });

    return reservasFinales;
  }, [reservasTodas]);

  const bajarUser = async () => {
    try {
      const response = await UsersService.bajaUser(userId);
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error al dar de baja:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo dar de baja la cuenta",
        icon: "error",
      });
    }
  };

  const handleBajaUser = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Esta acción dará de baja tu cuenta.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e80000ff",
      cancelButtonColor: "#d9ff00ff",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        bajarUser();
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        return;
      }

      setLoading(true);

      try {
        await getOpinionsToArtista();

        const reservasData = await getMisReservas();
        console.log("Datos de reservas obtenidos:", reservasData);
        console.log("Cantidad de reservas:", reservasData?.length || 0);

        // Mostrar cada reserva con TODOS sus datos
        reservasData?.forEach((reserva, index) => {
          console.log(`Reserva ${index + 1}:`, {
            id: reserva.id,
            date: reserva.date,
            hsStart: reserva.hsStart,
            hsEnd: reserva.hsEnd,
            idRoom: reserva.idRoom,
            // Mostrar todo el objeto
            ...reserva
          });
        });
        if (reservasData && reservasData.length > 0) {
          console.log("Cantidad de reservas obtenidas:", reservasData.length);
          console.log("Primera reserva (sin parsear):", reservasData[0]);
          
          const reservasParseadas = parseReservasFechas(reservasData);
          console.log("Reservas parseadas:", reservasParseadas);
          
          setReservasTodas(reservasParseadas);
        } else {
          console.log("No se encontraron reservas");
          setReservasTodas([]);
        }
      } catch (error) {
        console.error("Error en fetchData:", error);
        setReservasTodas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div className="p-3">Cargando reservas...</div>;
  }

  return (
    <div className="w-100">
      <div className="w-100 d-flex flex-column px-4">
        <div className="mb-4">
          <h2>Hola {user?.name || ""}</h2>
        </div>

        <div className="d-flex flex-column bg-white border border-2 border-tertiary rounded-3 p-3 mb-3">
          <div className="">
            <ArtistHomeCard artista={user} />
          </div>

          <div className="container col-12 d-flex justify-content-center mt-3 mb-3 gap-3">
            <button
              className="btn btn-warning"
              onClick={() => navigate("/artista/editar-perfil/" + user?.id)}
            >
              Editar perfil
            </button>
            <button
              className="btn btn-white border border-secondary"
              onClick={() => navigate("/cambiar-contraseñaVN")}
            >
              Cambiar contraseña
            </button>
            <button
              className="btn btn-warninwhiteg border border-black"
              onClick={handleBajaUser}
            >
              Dar de baja cuenta
            </button>
          </div>
        </div>

        <ArtistCardBusqueda />

        <strong className="mt-3 fs-5">Próximas Reservas</strong>
        {reservasFuturas && reservasFuturas.length > 0 ? (
          <ArtistHomeReservations reservasSelected={reservasFuturas} />
        ) : (
          <div className="alert alert-info mt-2">
            No tienes reservas próximas.
          </div>
        )}

        <strong className="mt-3 fs-5">Opiniones sobre mi</strong>
        <OpinionesArtistaCard opiniones={opiniones} />
      </div>
    </div>
  );
};

export default ArtistaHomePage;