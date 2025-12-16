
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ArtistHomeCard from "../../components/ArtistHomeCard";
import ArtistCardBusqueda from "../../components/ArtistCardBusqueda";
import ArtistHomeReservations from "../../components/ArtistHomeReservations";
import { RoomService } from "../../services/SalaDeEnsayoService";
import OpinionesArtistaCard from "../../components/OpinionToArtistCard";
import { reservas } from '../../data/reservas';

const ArtistaHomePage = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const user = authState.user.user;
  console.log("user: ", user, "authState.user.user", authState.user.user);
  const [reservasTodas, setReservasTodas] = useState()

  const [opiniones, setOpiniones] = useState([])

  const getOpinionsToArtista = () =>{
    const response = RoomService.getOpinionesArtista(user.id)
    console.log('response: ', response)
    setOpiniones(response.json)
  }
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

  useEffect(() => { // ⬅️ La flecha indica el callback de useEffect
    getOpinionsToArtista();
    setReservasTodas(parseReservasFechas(reservas))
}, [user]); 

  return (
    <div className="w-100">
      <div className="w-100 d-flex flex-column px-4">
        <div className="mb-4">
          <h2>Hola {user.name}</h2>
          {/* icno notificacions */}
        </div>

        {/* Contenedor principal de la tarjeta y botones (FLEX COLUMN) */}
        <div className="d-flex flex-column bg-white border border-2 border-tertiary rounded-3 p-3 mb-3">
          <div className="">
            <ArtistHomeCard artista={user} />
          </div>

          {/* 2. BOTONERA */}
          <div className="container col-12 d-flex justify-content-center mt-3 mb-3 gap-3">
            <button
              className="btn btn-warning"
              onClick={() => navigate("/artista/editar-perfil/" + user.id)}
            >
              Editar perfil
            </button>
            <button className="btn btn-white border border-secondary">
              Cambiar contraseña
            </button>
            <button className="btn btn-warninwhiteg border border-black">
              Dar de baja cuenta
            </button>
          </div>

        {/* Buscacardor */}
        </div >
          <ArtistCardBusqueda />
          <strong className="mt-3 fs-5">Proximas Reservas</strong>
          <ArtistHomeReservations reservasSelected={reservasTodas} />
          <strong className="mt-3 fs-5">Opiniones sobre mi</strong>
          <OpinionesArtistaCard opiniones={opiniones} />
      </div>
    </div>
  );
};

export default ArtistaHomePage;
