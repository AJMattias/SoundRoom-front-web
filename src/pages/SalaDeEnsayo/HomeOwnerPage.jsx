/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Alerta from "../../components/Alerta";
import { AuthContext } from "../../contexts/AuthContext";
import { RoomService } from "../../services/SalaDeEnsayoService";
import MisSalasCards from "../../components/MisSalasCards";
import { set } from "date-fns";
import OpinionCard from "../../components/OpinionCard";
import { useNavigate } from "react-router-dom";
import Cards_Resumen from "../../components/Cards_Resumen";
import ReservasService from "../../services/ReservasServices";

const HomeOwnerPage = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const user = authState.user.user;
  //  console.log('user: ', user, 'authState.user.user', authState.user.user )
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [salasOwner, setSalasOwner] = useState([]);
  const [nextReservations, setNextReservations] = useState([]);
  const [opiniones, setOpiniones] = useState([]);
  const [promedio, setPromedio] = useState(0);
  const [gananciasSemana, setGananciasSemana] = useState(0);
  const [reservasSemana, setReservasSemana] = useState(0);
  const [reservas, setReservas] = useState([]);
  const [reservasTyped, setReservasTyped] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
        // 1. Ejecutamos las promesas
        const [
        salasRes,
        gananciasRes,
        reservasSemanaRes,
        promedioRes,
        opinionesRes,
        reservasOwnerRes // Esta es la que daba undefined
        ] = await Promise.all([
        RoomService.getRoomsByUserIdBd(user.id),
        RoomService.getGananciasSemana(),
        RoomService.getReservasSemana(),
        RoomService.getPromedioSalas(),
        RoomService.getOpinionesMisSalas(),
        ReservasService.getReservasPorOwner()
        ]);

        console.log("Respuesta de reservasOwnerRes:", reservasOwnerRes);
        // 2. Extraer datos con seguridad (usando Optional Chaining)
        const rawReservas = reservasOwnerRes?.data || reservasOwnerRes || [];
        console.log("Datos de reservas crudos:", rawReservas);

        // 3. Procesar las reservas para la tabla
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filtradas = rawReservas.filter(res => {
            if (!res.date) return false;
            return new Date(res.date) >= today;
        });

        console.log("Reservas filtradas (futuras):", filtradas);

        const mapeadas = filtradas.map(res => ({
            id: res.id || res._id,
            fecha: res.date ? new Date(res.date).toLocaleDateString('es-AR', { timeZone: 'UTC' }) : 'Sin fecha',
            cliente: res.idUser ? `${res.idUser.name} ${res.idUser.last_name || ''}` : 'Usuario desconocido',
            sala: res.idRoom?.nameSalaEnsayo || 'Sala no especificada',
            estado: res.canceled === "true" || res.canceled === true ? "Cancelada" : "Activa"
            }));
        console.log("Reservas filtradas y mapeadas:", mapeadas);

        // 4. Setear estados
        setSalasOwner(salasRes?.data || salasRes || []);
        setGananciasSemana(gananciasRes?.data || gananciasRes || { ganancias: 0 });
        setReservasSemana(reservasSemanaRes?.data || reservasSemanaRes || { totalReservas: 0 });
        setPromedio(promedioRes?.data || promedioRes || 0);
        setOpiniones(opinionesRes?.data || opinionesRes || []);
        
        setReservas(filtradas);
        setReservasTyped(mapeadas);

    } catch (error) {
        console.error("Error detallado en fetchData:", error);
        setError("Hubo un error al cargar los datos del panel.");
    } finally {
        setIsLoading(false);
    }
    };

  // //fiiltrar reservas con fecha mayor a hoy
  // const filtrarReservasFuturas = () => {
  //   const today = new Date();
  //   const próximas = reservas.filter(
  //     (reserva) => new Date(reserva.fecha) >= today,
  //   );
  //   setReservas(próximas);
  // };

  // const mapearReservas = () => {
  //     const reservasMapeadas = reservas.map((reserva) => ({
  //         id: reserva.id,
  //         fecha: reserva.date,
  //         cliente: reserva.idUser.name + " " + reserva.idUser.last_name,
  //         sala: reserva.idRoom.nameSalaEnsayo,
  //         //si reserva.canceled es true, estado es "Cancelada", si no "Activa"
  //         estado: reserva.canceled ? "Cancelada" : "Activa",
  //     }));
  //     setReservasTyped(reservasMapeadas);
  //     console.log('reservas mapeadas: ', reservasTyped);
  // }

    useEffect(() => {
        if (user?.id) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

  return (
    <div className="container mx-5">
      <div className="col-10 bg-white d-flex flex-column rounded-3 bg-light p-5 mt-1">
        {/* <div>
              <Alerta tipo="error" mensaje={error} />
            </div> */}
        <h2>
          Hola, {user.name} {user.last_name}!
        </h2>
        <div className="rounded-3 py-2 mt-3 border-1 border-secondary">
          <Cards_Resumen
            reservas={reservasSemana.totalReservas}
            ingresos={gananciasSemana.ganancias}
            calificacion={promedio.promedio}
          />
        </div>
        <div className="border border-border-secondary rounded-3 py-3 px-3 mt-4">
          <h3>Mis Salas</h3>
          <hr />
          <MisSalasCards salas={salasOwner}></MisSalasCards>
        </div>
        <div className="border border-border-secondary rounded-3 py-3 px-3 mt-4">
          <h3>Próximas Reservas</h3>
          <hr />
          {/* Aquí puedes mapear las próximas reservas y mostrarlas */}
          <div>
            <table className="table rounded-3">
              <thead>
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Sala</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservasTyped.length > 0 ? (
                  reservasTyped.map((reserva, index) => (
                    <tr
                      key={reserva.id}
                      cursor="pointer"
                      onClick={() =>
                        navigate(`/owner/ver-reserva/${reserva.id}`)
                      }
                    >
                      {/* mapear datos, date, reserva.IdUSer.name lasName, reserva.idRoom.nameSalaEnsayo, estado canceled */}
                      <td>{reserva.fecha}</td>
                      <td>{reserva.cliente}</td>
                      <td>{reserva.sala}</td>
                      <td>{reserva.estado}</td>
                      <td>
                        <button className="btn btn-warning btn-sm">
                          Ver Reserva
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No hay próximas reservas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Acciones de Owner */}
        </div>
        <div className="border border-border-secondary rounded-3 py-3 px-3 mt-4">
          <h3>Acciones</h3>
          <hr />
          <div className="col-12 d-flex justify-content-between">
            <button
              className="btn btn-warning"
              onClick={() => navigate("/owner/create-room")}
            >
              Agregar Sala
            </button>
            <button className="btn btn-warning">Ver Reservas</button>
            <button className="btn btn-warning">Ver Reportes</button>
          </div>
        </div>
        <div className="border border-border-secondary rounded-3 py-3 px-3 mt-4">
          <h4>Opiniones</h4>
          {opiniones && opiniones.length > 0 ? (
            opiniones.map((opinion, index) => (
              <OpinionCard key={index} opinion={opinion} />
            ))
          ) : (
            <p>No hay opiniones disponibles para tus salas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeOwnerPage;
