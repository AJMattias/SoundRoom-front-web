/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { reportesService } from "../../services/ReporteService"
import Calendar from "../../components/Calendar"
import GraficoReporte from "../../components/GraficoBarra";
import Alerta from '../../components/Alerta'; 
import GraficoTorta from "../../components/GraficoTorta";
import { formatFecha } from "../../utils/dateHelper";

const Reports = () => {
  const [value, onChange] = useState(new Date());
  const [isInicio, setIsInicio] = useState(true)
  const [mensajeError, setMensajeError] = useState(null);

  const [tipoReporte, setTipoReporte] = useState(
    ['Usuarios Nuevos', 'Artistas Nuevos', 'Nuevas Salas', 'Usuarios Activos',
      'Usuarios Baja', 'Proietarios que alquilan', 'Tipos de Sala'
    ]
  )
  const [selectedReporte, setSetselectedReporte] = useState('')
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


  useEffect(() => {
    
  }, [selectedReporte])

  const handleDescargar = async () =>{
    await reportesService.descargarPDF(fechaI, fechaH, selectedReporte)
  }

  const reportesNuevosUsuarios = async () => {
    setMostrarReporteTortaTipoSala(false)
    console.log("onpressed ver reporte")
    const response = await reportesService.reportesNuevosUsuarioss(fechaI, fechaH);
    console.log('response: ', response)
    const modifiedResponse = {
      ...response,
      datasets: response.datasets.map((dataset) => ({
        ...dataset,
        label: 'Usuarios Nuevos',
      })),
    };
    setReporte(modifiedResponse)
    if(reporte.labels){
      setMostrarGraficoTorta(false)      
      setMostrarReporte(true)
    }
    console.log('reporte nuevos usuarios, response: ', reporte, response);
    return ;
  }

  const reportesNuevasSalas = async () => {
    setMostrarReporteTortaTipoSala(false)
    console.log("onpressed ver reporte")
    const response = await reportesService.reportesSalasNuevas(fechaI, fechaH);
    const modifiedResponse = {
      ...response,
      datasets: response.datasets.map((dataset) => ({
        ...dataset,
        label: 'Salas Nuevas',
      })),
    };
    setReporte(modifiedResponse)
    if(reporte.labels){
      setMostrarGraficoTorta(false)      
      setMostrarReporte(true)
    }
    console.log('reporte nuevos usuarios, response: ', reporte, response);
    return ;
  }

  const reportesUsuariosActivos = async () => {
    setMostrarReporteTortaTipoSala(false)
    console.log("onpressed ver reporte")
    const response = await reportesService.reportesUsuariosActivos(fechaI, fechaH);
    const modifiedResponse = {
      ...response,
      datasets: response.datasets.map((dataset) => ({
        ...dataset,
        label: 'Usuarios Activos',
      })),
    };
    setReporte(modifiedResponse)
    if(reporte.labels){
      setMostrarGraficoTorta(false)      
      setMostrarReporte(true)
    }
    console.log('reporte Usuarios Activos, response: ', reporte, response);
    return ;
  }

  const reportesUsuariosBaja = async () => {
    setMostrarReporteTortaTipoSala(false)
    console.log("onpressed ver reporte")
    const response = await reportesService.reportesUsuariosBaja(fechaI, fechaH);
    const modifiedResponse = {
      ...response,
      datasets: response.datasets.map((dataset) => ({
        ...dataset,
        label: 'Baja de Usuarios',
      })),
    };
    setReporte(modifiedResponse)
    if(reporte.labels){
      setMostrarGraficoTorta(false)      
      setMostrarReporte(true)
    }
    console.log('reporte nuevos usuarios, response: ', reporte, response);
    return ;
  }

  const reportesProietariosAlquilan = async () => {
    setMostrarReporteTortaTipoSala(false)
    console.log("onpressed ver reporte")
    const response = await reportesService.reportesPropAlquianSala(fechaI, fechaH);
    const modifiedResponse = {
      ...response,
      datasets: response.datasets.map((dataset) => ({
        ...dataset,
        label: 'Propietarios que Alquilan Sala',
      })),
    };
    if(response.msg ==="no se encontraron usuarios sala de ensayo")
      {
        setReporte({})
      }
    setReporte(modifiedResponse)
    if(reporte.labels){
      setMostrarGraficoTorta(false)      
      setMostrarReporte(true)
    }
    console.log('reporte nuevos usuarios, response: ', reporte, response);
    return ;
  }

  const reportesTiposSala = async () => {
    setMostrarReporteTortaTipoSala(false)
    console.log("onpressed ver reporte")
    const response = await reportesService.reporteGrafTortaTipoSala(fechaI, fechaH);
    const modifiedResponse = {
      ...response,
      datasets: response.datasets.map((dataset) => ({
        ...dataset,
        label: 'Tispos de Sala',
      })),
    };
    setReporte(response)
    if(reporte.labels){
      setMostrarReporte(false)
      setMostrarGraficoTorta(true)
    }
    console.log('page reporte tipos salas, reporte, response: ', reporte, response);
    return ;
  }

  const reportesArtistasNuevos = async () => {
    setMostrarReporteTortaTipoSala(false)
    console.log("onpressed ver reporte")
    const response = await reportesService.reportesNuevosArtistas(fechaI, fechaH);
    console.log('response: ', response)
    const modifiedResponse = {
      ...response,
      datasets: response.datasets.map((dataset) => ({
        ...dataset,
        label: 'Artistas Nuevos',
      })),
    };
    setReporte(modifiedResponse)
    if(reporte.labels){
      setMostrarGraficoTorta(false)      
      setMostrarReporte(true)
    }
    console.log('reporte nuevos usuarios, response: ', reporte, response);
    return ;
  }

  const handleVerReporte= async (reporteId)=>{
      if (!selectedReporte || !fechaI || !fechaH) {
      setMensajeError('Por favor, selecciona un reporte y ambas fechas.');
      return;
    }

    switch (selectedReporte) {
      case 'Usuarios Nuevos':
        console.log("reporte: ", selectedReporte, "fecha Desde - Hasta: ", fechaI, fechaH);
        console.log("FechaI: ", fechaI);
        console.log("FechaH: ", fechaH);

        if (fechaI && fechaH) {
          await reportesNuevosUsuarios();
        } else {
          console.log("Fechas no definidas.");
        }
        // await reportesNuevosUsuarios()
        // reportesNuevosUsuarios
        break;

        case 'Artistas Nuevos':
        console.log("reporte: ", selectedReporte, "fecha Desde - Hasta: ", fechaI, fechaH);
        console.log("FechaI: ", fechaI);
        console.log("FechaH: ", fechaH);

        if (fechaI && fechaH) {
          await reportesArtistasNuevos();
        } else {
          console.log("Fechas no definidas.");
        }
        // await reportesArtistasNuevos()
        // reportesArtistasNuevos
        break;

        case 'Nuevas Salas':
          console.log("reporte: ", selectedReporte, "fecha Desde - Hasta: ", fechaI, fechaH);
          console.log("FechaI: ", fechaI);
          console.log("FechaH: ", fechaH);
  
          if (fechaI && fechaH) {
            await reportesNuevasSalas();
          } else {
            console.log("Fechas no definidas.");
          }
          // await reportesArtistasNuevos()
          // reportesArtistasNuevos
          break;
    
        case 'Usuarios Activos':
          console.log("reporte: ", selectedReporte, "fecha Desde - Hasta: ", fechaI, fechaH);
          console.log("FechaI: ", fechaI);
          console.log("FechaH: ", fechaH);
  
          if (fechaI && fechaH) {
            await reportesUsuariosActivos();
          } else {
            console.log("Fechas no definidas.");
          }
          // await reportesArtistasNuevos()
          // reportesArtistasNuevos
        break;  

        case 'Usuarios Baja':
          console.log("reporte: ", selectedReporte, "fecha Desde - Hasta: ", fechaI, fechaH);
          console.log("FechaI: ", fechaI);
          console.log("FechaH: ", fechaH);
  
          if (fechaI && fechaH) {
            await reportesUsuariosBaja();
          } else {
            console.log("Fechas no definidas.");
          }
          // await reportesArtistasNuevos()
          // reportesArtistasNuevos
        break; 
        
        case 'Proietarios que alquilan':
          console.log("reporte: ", selectedReporte, "fecha Desde - Hasta: ", fechaI, fechaH);
          console.log("FechaI: ", fechaI);
          console.log("FechaH: ", fechaH);
  
          if (fechaI && fechaH) {
            await reportesProietariosAlquilan();
          } else {
            console.log("Fechas no definidas.");
          }
          // await reportesArtistasNuevos()
          // reportesArtistasNuevos
        break; 

        case 'Tipos de Sala':
          console.log("reporte: ", selectedReporte, "fecha Desde - Hasta: ", fechaI, fechaH);
          console.log("FechaI: ", fechaI);
          console.log("FechaH: ", fechaH);
  
          if (fechaI && fechaH) {
            await reportesTiposSala();
          } else {
            console.log("Fechas no definidas.");
          }
          // await reportesArtistasNuevos()
          // reportesArtistasNuevos
        break; 


      default:
        break;
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
    <div className="container bg-body-secondary rounded-3 col-10 ms-5 py-3">
       {mensajeError && (
        <Alerta mensaje={mensajeError} onClose={cerrarAlerta} />
      )}
      <div className="d-flex w-100 flex-column align-items-start">
        <h3>Reportes SoundRoom</h3>
        <div className="d-flex row w-100 justify-content-start align-items-center">
          <p>
            Para ver un reporte, Primero selecciona uno y luego las fechas
            inicio y fin.
          </p>
        </div>
        <div className="col-12">
          <select
            className="form-select w-25"
            aria-label="Default select example"
            value={selectedReporte}
            onChange={(e) => setSetselectedReporte(e.target.value)}
          >
            <option selected value="">
              Selecciona un reporte
            </option>
            {tipoReporte.map((reporte, index) => (
              <option key={index} value={reporte}>
                {reporte}
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
          />
        )}
        {mostrarCalendarH && (
          <Calendar
            onChange={handleSelectedDate}
            isInicio={false}
            value={value}
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
        {mostrarReporte && <GraficoReporte reporte={reporte} />}
        {mostrarGraficoTorta && <GraficoTorta reporte={reporte} />}
      </div>
    </div>
  );
}

export default Reports