import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PerfilesService } from "../../services/PerfilService"
import Swal from "sweetalert2"

const VerProfiles = () => {

      const [perfiles, setPerfiles] = useState([])
      // const [permisosP, setPermisosP] = useState([])
      // const [permisosN, setPermisosN] = useState([])
      // const [showPermisos, setshowPermisos] = useState(false)

      const navigate = useNavigate()
    
      //funcion get permisos
      const getPerfiles =async () =>{
        const response = await PerfilesService.getPerfiles()
        console.log('perfil: ', response)
        setPerfiles(response)
        // if(response.permisos){
        //   setPermisosP(response.permisos)
        // }
      }

      const getPermisos =async () =>{
        const response = await PerfilesService.getPermisos()
        console.log(response)
        //setPermisosN(response)
      }

      useEffect(() => {
        getPerfiles()
        getPermisos()
      }, [])
      
      const deletePerfil = async(id) =>{
        const response = await PerfilesService.deletePerfil(id)
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
              deletePerfil(permiso.id)
              setPerfiles([])
              getPerfiles()
            }
          })
        }

    return (
    
        <div className="container">
        <div className="col-10 justify-content-center align-items-center px-5 mb-3">
          <h3>Perfiles</h3>
          <h5 onClick={()=>navigate("/admin/profiles/create")}
            className="text-decoration-underline fw-bold"
            style={{ cursor: "pointer" }}
            >Crear nuevo perfil</h5>
          <div className="col-12 mt-5 py-2 bg-body-secondary rounded-3">
            {perfiles.map((perfil) =>(
              <div className="container border border-warning rounded-3 mt-3 mb-3 col-8 bg-white" key={perfil.id}>
                <p className="fs-5">{perfil.name}</p>
                <div className="d-flex" style={{marginTop:"-3vh"}}>
                  <p className="text-warning text-decoration-underline me-3"
                  onClick={()=>navigate("/admin/profiles/updateProfile", { state: { perfil } })}>Editar</p>
                  <p className="text-warning text-decoration-underline me-3" 
                   onClick={() => handleDelete(perfil)}
                  >Eiminar</p>
                  <p className="text-warning text-decoration-underline" 
                   onClick={()=>navigate("/admin/profiles/profile-permissions", { state: { perfil } })}
                  >Ver permisos</p>
                </div>
              </div>
              
            ))}
          </div>
        </div>
  
      </div> 

  )
}

export default VerProfiles