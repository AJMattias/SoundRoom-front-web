/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import Alerta from "../../components/Alerta"
import { AuthContext } from "../../contexts/AuthContext"
import { RoomService } from "../../services/SalaDeEnsayoService"
import MisSalasCards from "../../components/MisSalasCards"
import { set } from "date-fns"
import OpinionCard from "../../components/OpinionCard"
import { useNavigate } from 'react-router-dom';
import Cards_Resumen from "../../components/Cards_Resumen"


const HomeOwnerPage = () => {

  const navigate = useNavigate();
  const {authState } =  useContext(AuthContext)
  const user= authState.user.user
  console.log('user: ', user, 'authState.user.user', authState.user.user )
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [salasOwner, setSalasOwner] = useState([])
  const [nextReservations, setNextReservations] = useState([])
  const [opiniones, setOpiniones] = useState([])
  const [promedio, setPromedio] = useState(0)
  const [gananciasSemana, setGananciasSemana] = useState(0)
  const [reservasSemana, setReservasSemana] = useState(0)

  useEffect(() => {
    // Fetch data for salasOwner, nextReservations, and opiniones
    const fetchData = async () => {
      try {
      
        const [salasResponse , getGananciasSemana, reservasSemana, promedio, 
          opiniones
        ] = await Promise.all([
          RoomService.getRoomsByUserIdBd(user.id), // Assuming this is a function that fetches the salas by owner
          RoomService.getGananciasSemana(),
          RoomService.getReservasSemana(),
          RoomService.getPromedioSalas(),
          RoomService.getOpinionesMisSalas()
        ]);
        console.log('salasResponse: ', salasResponse)
        setSalasOwner(salasResponse);
         if (!salasResponse.ok || 
          !getGananciasSemana.ok || 
          !reservasSemana.ok || 
          !promedio.ok || 
          !opiniones.ok
          ) {
          throw new Error('Error fetching data');
        }

        const [salasData, reservasData, reservasSemanaData, promedioData, opinionesData,] = await Promise.all([
          salasResponse.json(),
          getGananciasSemana.json(),
          reservasSemana.json(),
          promedio.json(),
          opiniones.json()
        ]);

        setSalasOwner(salasData);
        setNextReservations(reservasData);
        setOpiniones(opinionesData);
        setPromedio(promedioData);
        setGananciasSemana(getGananciasSemana);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  

  return (
    
      <div className="container mx-5">
          <div className="col-10 d-flex flex-column rounded-3 bg-light p-5 mt-1">
            {/* <div>
              <Alerta tipo="error" mensaje={error} />
            </div> */}
            <h2>Hola, {user.name} {user.last_name}!</h2>
            <div className="bg-body-secondary rounded-3 py-2 mt-3">
              <Cards_Resumen reservas={reservasSemana} ingresos={gananciasSemana} calificacion={promedio}/>
            </div>
            <div className="bg-body-secondary rounded-3 py-3 px-3 mt-3">
              <h3>Mis Salas</h3>
              <MisSalasCards salas={salasOwner}></MisSalasCards>
            </div>
            <div className="bg-body-secondary rounded-3 py-3 px-3 mt-3">
              <h3>Próximas Reservas</h3>
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
                    {nextReservations.length > 0 ? (
                      nextReservations.map((reserva, index) => (
                        <tr key={index}>
                          <td>{reserva.fecha}</td>
                          <td>{reserva.cliente}</td>
                          <td>{reserva.sala}</td>
                          <td>{reserva.estado}</td>
                          <td>
                            <button className="btn btn-warning btn-sm">Ver Reserva</button>
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
            <div className="bg-body-secondary rounded-3 py-3 px-3 mt-3">
                <h3>Acciones</h3>
                <div className="col-12 d-flex justify-content-between">
                  <button className="btn btn-warning"
                    onClick={()=> navigate("/owner/create-room")}>Agregar Sala</button>
                  <button className="btn btn-warning">Ver Reservas</button>
                  <button className="btn btn-warning">Ver Reportes</button>
                </div>
            </div>
            <div className="bg-body-secondary rounded-3 py-3 px-3 mt-3">
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
    
  )
}

export default HomeOwnerPage