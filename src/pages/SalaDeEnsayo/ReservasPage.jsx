/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { RoomService } from "../../services/SalaDeEnsayoService"
import ReservasCard from "../../components/ReservasCard";

const ReservasPage = () => {

    const seleccionarReservasOpciones = [
        { value: 'semana', label: 'Última Semana' },
        { value: 'mes', label: 'Último Mes' },
        { value: 'anio', label: 'Último Año' },
        { value: 'canceladas', label: 'Canceladas' },
          { value: 'rango_fechas', label: 'RangoFechas' },
    ];
    const [reservas, setReservas] = useState([])
    const [selectedReservasOpcion, setSelectedReservasOpcion] = useState('');
    const [reservasData, setReservasData] = useState(null); // Estado para la sala seleccionada
    const [selectedCanceladas, setSelectedCanceladas] = useState(false);
    const [selectedTodasSalas, setSelectedTodasSalas] = useState(true);
    //
    const [misSalas, setMisSalas] = useState([])
    const [selectedSalaData, setSelectedSalaData] = useState(null); // Estado para la sala seleccionada
    
    
    const getMisalas = async () => {
        const salas = await RoomService.getRoomsByUserIdBd()
        console.log(salas)
        setMisSalas(salas)
    }
    const getReservasMisSalas = async () => {
        const salas = await RoomService.getReservasOwner()
        console.log(salas)
        setReservas(salas)
    }

    const getReservasRangoFechas = async (fechaInicio, fechaFin) => {
        const salas = await RoomService.getReservasRangoFechas(fechaInicio, fechaFin)
        console.log(salas)
        setReservasData(salas)
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

    const handleOpcionChange = (e) => {
        setSelectedReservasOpcion(e.target.value);
        

    }
    useEffect(() => {
        getReservasMisSalas()
        getMisalas()
    }, [])



  return (
<div className='container mx-5'>
        <div className="col-11 bg-white d-flex flex-column rounded-3 bg-light p-5 mt-1">
            <div>
                <h2>Reservas a mis salas</h2>
            </div>
            <div className="gap-2 align-content-center justify-content-center mt-3col-2">
              <div className="d-flex w-75">
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
                </div>
              </div>
              <div className="d-flex w-75">
                <h5>Selecciona una opcion</h5>
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
                    onClick={ () => setSelectedReservasOpcion("Todas") }
                    >
                    Ver todas
                    </button>
                </div>
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
                  <ReservasCard sala={reservas}  />
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default ReservasPage