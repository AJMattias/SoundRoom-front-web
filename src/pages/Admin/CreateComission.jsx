/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { ComisionsService } from '../../services/ComisionService'

const CreateComission = () => {

    const {register, handleSubmit, watch} = useForm()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)

    const onSubmit = async (values) =>{
            
        console.log(values.nuevoComision)
        const response = await ComisionsService.createComision(values.nuevoComision)
        console.log('response: ', response)
        if(response.id){
            navigate("/admin/comission/comissions")
        }else{
            console.log("response: ", response)
            console.log("response.error: ", response.msg)
            setError(response.msg)
        }      
        // if(response.data.code){
        //     console.log("response: ", response)
        //     console.log("response.data.error: ", response.data.error)
        //     setError(response.data.error)
        //     setShowError(true)
        //     console.log("error: ", error)
        // } 
    }

    const handleCreate = async (values) => {
        Swal.fire({
        title: "¿Estás seguro?",
        text: `Al crear una comision, esta sera la comision aplicada. La comision es de ${values.nuevoComision}%`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33333",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, crear",
        }).then((result) => {
        if (result.isConfirmed) {
            console.log("Comision a crear:", values)
            onSubmit(values)
        }
        })
    }

  return (
    <div className='container'>
            <div className="col-10">
            <button className="btn btn-warning me-3"
            onClick={() => navigate("/admin/comission/comissions")}>
                Ver Comisiones</button>
            <button className="btn btn-warning"
            onClick={() => navigate("/admin/comission/history")}>
                Historial</button>
            <h2 className="text-center pb-4">Crear Comision</h2>
            {error !== '' &&(
                <div className='border-1' style={{ borderColor: 'red' }}>
                    <h3 className="d-flex text-danger fs-5 justify-content-center align-items-center">{error}</h3>
                </div>
            )}
            <div className="bg-body-secondary rounded-3 p-4">
            <p>Ingresa un numero del 1 al 100, sin comas ni puntos. <br />
            Al crear la nueva comision este es la comision que se aplicara a los pagos</p>
            <form 
                className="row g-2 px-3"
                onSubmit={handleSubmit(handleCreate)}
                >
               <label>Nueva Comision</label>
                
                <input 
                type="text"
                placeholder="Nueva Comision"
                {...register("nuevoComision", {required: true})}
                defaultValue={watch("nuevoComision", "")}
                autoFocus
                />
                <button className="btn btn-warning w-auto mt-3"
                type="submit"
                >Guardar</button>
            </form>
            </div>
            </div>
        </div>
  )
}

export default CreateComission