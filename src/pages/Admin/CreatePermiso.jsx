import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { PerfilesService } from "../../services/PerfilService"
import { useEffect, useState } from "react"

const CreatePermiso = () => {
    const {register, handleSubmit, setValue, watch} = useForm()
    // const { permiso } = useParams() 
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    //const [permisoToUpdate, setPermisoToUpdate] = useState({})
    const [update, setUpdate] = useState(false)
    
    const onSubmit = async (values) =>{
        if(update){
            const response = await PerfilesService.updatePermiso(
                location.state?.permiso.id,
                values.nuevoPermiso)
            if(response.id){
                navigate("/admin/permissions/permissions")
            }else{
                setError('Hubo un error, intente nuevamente mas tarde')
            }
        }else{
            console.log(values.nuevoPermiso)
            const response = await PerfilesService.createPermiso(values.nuevoPermiso)
            if(response.id){
                navigate("/admin/permissions/permissions")
            }else{
                setError('Hubo un error, intente nuevamente mas tarde')
            }
        }
    }

    useEffect(() => {
        const loadPermiso =() =>{
            if(location.state?.permiso){
                setUpdate(true)
                const permiso = location.state?.permiso
                setValue('id', permiso.id)
                setValue('nuevoPermiso', permiso.name)
            }
        }
        loadPermiso()
    }, [])
    

    return (
        <div className='container'>
            <div className="col-10">
            <button className="btn btn-warning"
            onClick={() => navigate("/admin/permissions/permissions")}>
                Ver Permisos</button>
            { update ? <h2 className="text-center pb-4">Editar Permiso</h2> : <h2 className="text-center pb-4">Crear Permiso</h2>}
            {error !== '' &&(
                <p className="text-warning fs-3">{error}</p>
            )}
            <div className="bg-body-secondary rounded-3 p-4">
            <form 
                className="row g-2 px-3"
                onSubmit={handleSubmit(onSubmit)}
                >
                {update ? <label>Editar Permiso</label> : <label>Nuevo Permiso</label>}
                
                <input 
                type="text"
                placeholder="Nuevo Permiso"
                {...register("nuevoPermiso", {required: true})}
                defaultValue={watch("nuevoPermiso", "")}
                autoFocus
                />{update ? <button className="btn btn-warning w-auto mt-3"
                    type="submit"
                    >Editar</button>:
                <button className="btn btn-warning w-auto mt-3"
                type="submit"
                >Guardar</button>}
            </form>
            </div>
            </div>
        </div>
    )
}

export default CreatePermiso