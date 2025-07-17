import { useEffect, useState } from "react"
import { PerfilesService } from "../../services/PerfilService"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const VerPermisos = () => {
  const [permisos, setPermisos] = useState([])
  const navigate = useNavigate()

  //funcion get permisos
  const getPermisos =async () =>{
    const response = await PerfilesService.getPermisos()
    console.log(response)
    setPermisos(response)
  }
  useEffect(() => {
    getPermisos()
  }, [])
  
  const deletePermiso = async(id) =>{
    const response = await PerfilesService.deletePErmiso(id)
    console.log('permiso deleted, response: ', response)
  }

  const handleDelete = async (permiso) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Eliminarás el permiso: ${permiso.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33333",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Permiso a eliminar:", permiso)
        const response = deletePermiso(permiso.id)
        console.log("Permiso eliminado:", response)
        if (response.msg) { // Verifica si la eliminación fue exitosa
          setPermisos(permisos.filter((p) => p.id !== permiso.id)); // Actualiza el estado directamente
        }
      }
    })
  }

  //TODO: hacer alerta hubo un error

  return (
    <div className="container">
      <div className="col-10 justify-content-center align-items-center px-5">
        <h3>Permisos</h3>
        <h5 onClick={()=>navigate("/admin/permissions/create")}
          className="text-decoration-underline fw-bold"
          style={{ cursor: "pointer" }}
          >Crear nuevo Permiso</h5>
        <div className="col-12 mt-5 py-2 bg-body-secondary rounded-3">
          {permisos.map((permiso) =>(
            <div className="container col-8 border border-warning rounded-3 mt-3 mb-3 bg-white" key={permiso.id}>
              <p className="fs-5">{permiso.name}</p>
              <div className="d-flex" style={{marginTop:"-3vh"}}>
                <p className="text-warning text-decoration-underline me-3"
                onClick={()=>navigate("/admin/permissions/updatePermission", { state: { permiso } })}>Editar</p>
                <p className="text-warning text-decoration-underline" 
                 onClick={() => handleDelete(permiso)}
                >Eiminar</p>
              </div>
            </div>
            
          ))}
        </div>
      </div>

      

    </div>
    
  )
}

export default VerPermisos