/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom'
import { ComisionsService } from '../../services/ComisionService'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'

const VerComissions = () => {
    const [comisiones, setComisiones] = useState([])
    const navigate= useNavigate()
    const [comisionEnabled, setComisionEnabled] = useState()
    const [sinComisiones, setSinComisiones] = useState(false)



    const getComisiones = async () =>{
        const response = await ComisionsService.getComisiones()
        if (response && response.length === 0) {
            setSinComisiones(true);
            setComisiones([]); //It is good practice to set the comisiones to an empty array.
        } else {
          setSinComisiones(false); //It is good practice to set the sinComisiones to false.
          setComisiones(response);
        }
        
        

        const enabledComision = response.find(comision => comision.enabled === "true");
        setComisionEnabled(enabledComision || null); // Set to null if not found.
    }

    const deleteComision = async(id) =>{
        // const response = ComisionsService.deleteComision(id)
        const response = ComisionsService.sofDeleteComision(id)
        console.log('delete comision: ', response)
    }

    const actualizarComision = async(id) =>{
        const response = ComisionsService.updateComision(id)
        console.log('delete comision: ', response)
    }
    const getComisionEnabled =() =>{
        comisiones.map((comision)=>{
            if(comision.enabled ==="true") setComisionEnabled(comision)
        })
    }

    const handleDelete = async (comision) => {
        Swal.fire({
        title: "¿Estás seguro?",
        text: `Eliminarás la comision: ${comision.porcentaje}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33333",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        }).then((result) => {
        if (result.isConfirmed) {
            console.log("Comision a eliminar:", comision)
            deleteComision(comision.id)
            setComisiones([])
            getComisiones()
        }
        })
    }

    const handleActualizar = async (comision) => {
        Swal.fire({
        title: "¿Estás seguro?",
        text: `Actualizara la comision aplicada: ${comision.porcentaje}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33333",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, actualizar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log("Comision a actualizar:", comision)
                await actualizarComision(comision.id)
                await getComisiones();
                getComisionEnabled();
            }
        })
    }

    useEffect(() => {
      getComisiones()
      //obtener comision aplicada y guardar en un useState
      getComisionEnabled()
    }, [])
    
    function Comision ({comision}){
        const [showHistory, setShowHistory] = useState(false);

        return (
            <>
            <div className="container border border-warning rounded-3 my-3 col-10 bg-body-tertiary py-2" key={comision.id}>
                <p>Comision: {comision.porcentaje} %</p>
                <div className="d-flex" style={{ marginTop: "-3vh" }}>
                    {comision.enabled === "true"
                        ? <p className="text-warning text-decoration-none me-3"
                        >Aplicado</p>
                        : <p className="text-warning text-decoration-underline me-3"
                            onClick={() => handleActualizar(comision)}>Aplicar</p>}
                    <p className="text-warning text-decoration-underline me-3"
                        onClick={() => handleDelete(comision)}
                    >Eiminar</p>
                </div>
                <div className="d-flex">
                    <p className="mt-1 mb-1"> Historial Habilitacion{" "}
                        <i
                            className="bi bi-caret-down"
                            onClick={() => setShowHistory(!showHistory)}
                        ></i>
                    </p>
                </div>
                <div>
                    {showHistory && (
                        <div> {/* Envuelve el mapeo en un div o fragmento */}
                            {comision.enabledHistory.map((history) => (
                                <EnabledHistory className="container"key={history.dateFrom} history={history} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
                
            </>
        )

    }

    function EnabledHistory({ history }) {
        const formatDate = (date) => {
          if (!date) return "Actualidad";
          return date.toLocaleDateString(); // Formatea la fecha a una cadena local
        };
        return (
            <div className="mx-3 mb-2 mt-2 col-10 bg-body-secondary"> {/* Margen lateral y margen inferior para separación entre elementos */}
                <div className="border border-warning rounded-3 p-2"> {/* Borde, redondeo y padding */}
                    <p className="fw-bold mb-1">{history.status.toUpperCase()}:</p>
                    <p className="mb-0">
                    {formatDate(history.dateFrom)} - {formatDate(history.dateTo)}
                    </p>
                </div>
            </div>
        );
      }

  return (
    <div className='container bg-body-secondary rounded-3 col-10 ms-5 py-3'>
        <div className="d-flex flex-column align-items-start">

        <div className="d-flex justify-content-start align-items-center">
            <button
                className="btn btn-warning me-3"
                onClick={() => navigate("/admin/comission/create")}
            >
                Crear comision
            </button>
            <button
                className="btn btn-warning"
                onClick={() => navigate("/admin/comission/history")}
            >
                Historial
            </button>
        </div>
        <div className='w-100 mt-3 py-2 g2'>
            {comisionEnabled && (
                <>
                    <h4>Comision aplicada: {comisionEnabled.porcentaje} %</h4>
                </>
            )}
        </div>
        <div className='d-flex justify-content-center pt-3'>{sinComisiones && <h4>Sin comisiones</h4>}</div>
        </div>
        {comisiones.map((comision)=>(
            < Comision comision={comision} key={comision.id}/>
        ))}
    </div>
  )
}

export default VerComissions