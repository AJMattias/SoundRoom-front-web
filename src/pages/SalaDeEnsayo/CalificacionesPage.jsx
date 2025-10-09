import { useEffect, useState } from "react"
import { RoomService } from "../../services/SalaDeEnsayoService"
import OpinionesCard from "../../components/OpinionesCard"


const CalificacionesPage = () => {

  const [misSalas, setMisSalas] = useState([])
  const [selectedSalaData, setSelectedSalaData] = useState(null); // Estado para la sala seleccionada
  const [selectedTodasSalas, setSelectedTodasSalas] = useState(true);
  // const [todasSalas, setTodasSalas] = useState([])

  const getMisalas = async () => {
    const salas = await RoomService.getRoomsByUserIdBd()
    console.log(salas)
    setMisSalas(salas)
  }

  const handleSalaChange = (e) => {
    setSelectedSalaData(null);
    setSelectedTodasSalas(false);
    const salaId = e.target.value;
    console.log('salaId: ', salaId)
    const salaSeleccionada = misSalas.find(sala => sala.id === salaId);
    setSelectedSalaData(salaSeleccionada);
    console.log(selectedSalaData)
  };
  
  // const todasOpiniones = async () => {
  //   setSelectedSalaData(null);
  //   const todasOpiniones = await RoomService.getOpinionesMisSalas()
  //   console.log('todas las opiniones: ', todasOpiniones)
  //   setTodasSalas(todasOpiniones)
  // }

  const todasOpiniones = async () => {
    setSelectedSalaData(null)
    setSelectedTodasSalas(true)
  }

  useEffect(() => {
    getMisalas()
    //todasOpiniones()
  }, [])


  return (
    <div className='container mx-5'>
        <div className="col-11 bg-white d-flex flex-column rounded-3 bg-light p-5 mt-1">
            <div>
                <h2>Calificaciones a mis salas</h2>
            </div>
            <div className="gap-2 align-content-center justify-content-center mt-3">
              <h5>Selecciona una sala</h5>
              <div className="d-flex w-75">
                <select
                aria-label="Default select example"
                className=" w-50 form-select form-select-sm rounded-3 border-2 border-warning p-1 me-3"
                onChange={handleSalaChange}
                >
                 <option value="" disabled selected>Elige una sala</option>
                {misSalas.map((sala, index) => (
                  <option key={index} value={sala.id}                className="color-warning text-start">
                    {sala.nameSalaEnsayo}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-outline-warning btn-sm text-dark"
                  onClick={ () => todasOpiniones() }
                >
                  Ver todas
                </button>
              </div>
            </div>
            <hr className="color-warning" />
            <div>
                {selectedTodasSalas && 
                (<h3>Opiniones a mis salas</h3>) }
                { !selectedTodasSalas && (
                  <h3>Opiniones a mi sala: {selectedSalaData.nameSalaEnsayo}</h3>
                )}
              <div className="col-11 p-2">
                {selectedTodasSalas ?
                (
                  <OpinionesCard salas={misSalas} />
                ) : (
                  <OpinionesCard sala={selectedSalaData}  />
                )}
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default CalificacionesPage