/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { RoomService as salaDeEnsayoService } from "../../services/SalaDeEnsayoService"
import Calendar from "../../components/Calendar"
import GraficoReporte from "../../components/GraficoBarra";
import Alerta from '../../components/Alerta'; 
import GraficoTorta from "../../components/GraficoTorta";
import { formatFecha } from "../../utils/dateHelper";
import { reportesService } from "../../services/ReporteService";

const Reportes = () => {
  const [misSalas, setMisSalas] = useState([])
  const [value, onChange] = useState(new Date());
  const [isInicio, setIsInicio] = useState(true)
  const [mensajeError, setMensajeError] = useState(null);

  const [tipoReportesData, setTipoReportesData] = useState([
    {reporte: 'Cantidad Reservas', url:'/reservations/reservationsPorSalaMes/'},
    {reporte: 'Valoraciones', url:'/salasdeensayo/cantidadValoraciones/'},
    {reporte: 'Reservas por dia', url:'/reservations/cantidadReservasPorDia/'},
    {reporte: 'Reservas canceladas', url:'/reservations/reservationsCanceladasPorSalaMes/'},
    ])
  const [selectedReporte, setSetselectedReporte] = useState('')
  const [selectedSala, setSelectedSala] = useState('')
  const currentDay = new Date()
  const [fechaI, setFechaI] = useState()
  const [fechaH, setFechaH] = useState()
  const [openI, setOpenI] = useState(false)
  const [openH, setOpenH] = useState(false)

  const [mostrarCalendarI, setMostrarCalendarI] = useState(false)
  const [mostrarCalendarH, setMostrarCalendarH] = useState(false)
  const [mostrarReporteTortaTipoSala, setMostrarReporteTortaTipoSala] = useState(false)
  const [mostrarReporte, setMostrarReporte] = useState(false)
  const [mostrarGraficoTorta, setMostrarGraficoTorta] = useState(false)
  const [reporte, setReporte] = useState( {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        borderColor:'rgb(255, 205, 86)',
      }
    ]
  })

  const getMyRooms = async () => {
    const response = await salaDeEnsayoService.getRoomsByUserIdBd();
    setMisSalas(response);
    console.log('mis salas: ', response);
  }
  useEffect(() => {
    getMyRooms();
  }, [])

  const handleDescargar = async () =>{
    await reportesService.descargarPDFSalas(fechaI, fechaH, selectedReporte.reporte, selectedSala)
  }
  

  const handleVerReporte= async ()=>{
    if (!selectedReporte || !selectedSala || !fechaI || !fechaH) {
    setMensajeError('Por favor, selecciona un reporte, una sala y ambas fechas.');
    return;
    }
    try {
      // Usamos 'selectedReporte.url' para obtener la URL del reporte
      // Usamos 'selectedSala' que contiene el ID de la sala
      console.log('Llamando a getReportesSalasDeEnsayo con:');
      console.log('url:', selectedReporte.url);
      console.log('idSala:', selectedSala);
      console.log('fechaI:', fechaI);
      console.log('fechaH:', fechaH);

      const response = await salaDeEnsayoService.getReportesSalasDeEnsayo(selectedReporte.url, selectedSala, fechaI, fechaH);

      console.log('response del servicio:', response);

      if (response) {
        setReporte(response);
        setMostrarGraficoTorta(false);
        setMostrarReporte(true);
      } else {
        setMensajeError("No se encontraron datos para el reporte seleccionado.");
        setMostrarReporte(false);
        setMostrarGraficoTorta(false);
      }
    } catch (error) {
      console.error("Error al ver el reporte:", error);
      setMensajeError("Hubo un error al generar el reporte.");
    }
  }
  

  const cerrarAlerta = () => {
    setMensajeError('');
  };

  const handleDescargarReporte = () => {

  }

  const handleSelectedDate=(date, isInicio)=>{
    console.log('handleDate date: ', date, typeof date)
    //const dateString = date.toLocaleDateString()
    //paso a string la fecha
    const dateString = formatFecha(date.toLocaleDateString()) 
    isInicio ? setFechaI(dateString) : setFechaH(dateString)
    setIsInicio(!isInicio)
    isInicio ? setMostrarCalendarI(false) : setMostrarCalendarH(false)
  }
  
  return (
    <div className="ontainer bg-body-secondary rounded-3 col-10 ms-5 py-3">
       {mensajeError && (
        <Alerta mensaje={mensajeError} onClose={cerrarAlerta} />
      )}
      <div className="d-flex w-100 flex-column align-items-start">
        <h3>Reportes SoundRoom</h3>
        <div className="d-flex row w-100 justify-content-start align-items-center">
          <p>
            Para ver un reporte, Primero selecciona un reporte y una sala de ensayo. Luego las fechas
            inicio y fin.
          </p>
        </div>
        <div className="col-12">
          <select
            className="form-select w-25"
            aria-label="Default select example"
            value={selectedReporte ? selectedReporte.reporte : ''}
            //onChange={(e) => setSetselectedReporte(e.target.value)}
            onChange={(e)=>{
              const nombreReporte = e.target.value;
              const objSeleccionado = tipoReportesData.find(
                (r) => r.reporte === nombreReporte
              );
              // Actualiza el estado con el objeto completo
              setSetselectedReporte(objSeleccionado);
            }}
          >
            <option selected value="">
              Selecciona un reporte
            </option>
            {tipoReportesData.map((reporte, index) => (
              <option key={index} value={reporte.reporte}>
                {reporte.reporte}
              </option>
            ))}
          </select>
        </div>
         <div className="col-12 mt-2">
          <select
            className="form-select w-25"
            aria-label="Default select example"
            value={selectedSala}
            onChange={(e) => setSelectedSala(e.target.value)}
          >
            <option selected value="">
              Selecciona una sala
            </option>
            {misSalas.map((sala, index) => (
              <option key={index} value={sala.id}>
                {sala.nameSalaEnsayo}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex gap-3 mt-3 mb-3">
        <div className="col-5">
          <h5>
            Fecha Desde{" "}
            <i
              className="bi bi-calendar"
              onClick={() => setMostrarCalendarI(!mostrarCalendarI)}
            ></i>{" "}
            : {fechaI}
          </h5>
        </div>
        <div className="col-5">
          <h5>
            Fecha Hasta{" "}
            <i
              className="bi bi-calendar"
              onClick={() => setMostrarCalendarH(!mostrarCalendarH)}
            ></i>{" "}
            : {fechaH}
          </h5>
        </div>
      </div>
      <div>
        {mostrarCalendarI && (
          <Calendar
            onChange={handleSelectedDate}
            isInicio={true}
            value={value}
            maxDate={currentDay}
          />
        )}
        {mostrarCalendarH && (
          <Calendar
            onChange={handleSelectedDate}
            isInicio={false}
            value={value}
            maxDate={currentDay}
          />
        )}
      </div>
      <div className="d-flex col-6 justify-content-start align-content-center">
        <button
          className="btn btn-warning me-3"
          onClick={() => handleVerReporte()}
        >
          Ver Reporte
        </button>
        <button 
          className="btn btn-outline-warning text-black"
          onClick={()=> handleDescargar()}
          >
          Descargar
        </button>
      </div>
      <div className="col-10 d-flex justify-content-center align-content-center mx-auto bg-white mt-4 mb-4 rounded-3">
        {mostrarReporte && <GraficoReporte reporte={reporte} titulo= {selectedReporte.reporte} />}
        {mostrarGraficoTorta && <GraficoTorta reporte={reporte} />}
      </div>
    </div>
  );
}

export default Reportes