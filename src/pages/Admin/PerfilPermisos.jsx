/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PerfilesService } from "../../services/PerfilService";
import Swal from "sweetalert2";

const PerfilPermisos = () => {
  const [permisosP, setPermisosP] = useState([]);
  const [permisosN, setPermisosN] = useState([]);
  const [perfil, setPerfil] = useState(null); // Initialize to null
  const location = useLocation();
  const [showPermisos, setShowPermisos] = useState(false);
  const [showNoPermisos, setShowNoPermisos] = useState(false);
  const navigate = useNavigate()

  // const getPermisos = async () => {
  //   try {
  //     const response = await PerfilesService.getPermisos();
  //     // Filtrar los permisos antes de guardarlos en el estado
  //     //console.log('permisos luego de buscarlos: ', response)
  //     // const permisosFiltrados = response.filter(
  //     //   (permisoN) => !permisosP.some((permisoP) => permisoP.id === permisoN.id)
     
  //     setPermisosN(response);
     
  //   } catch (error) {
  //     console.error("Error fetching permisos:", error);
  //   }
  // };

  useEffect(() => {
    const loadPerfil = async () => {
      if (location.state?.perfil) {
        // 1. Cargar perfil
        const perfil = location.state.perfil;
        const perfilResponse = await PerfilesService.getPerfil(perfil.id)
        setPerfil(perfilResponse);
        setPermisosP(perfilResponse.permisos || []); // Handle undefined permissions
        console.log('perfil recibido:', perfilResponse)
        console.log('receivedPerfil.permisos.length: ', perfilResponse.permisos.length)

         // 2. Obtener permisos del servidor
         const todosPermisos = await PerfilesService.getPermisos();
         const permisosCon_id = todosPermisos.map((permiso) => ({
          ...permiso,
          _id: permiso.id, // Copiar id a _id
        }));
         // 3. Filtrar usando los IDs del perfil
         const permisosAsignados = perfilResponse.permisos || [];
         const permisosNoAsignados = permisosCon_id.filter(
           permiso => !permisosAsignados.some(p => p._id === permiso._id) // Usar id en ambos
         );
         console.log('permisosNoAsignados: ', permisosNoAsignados)
          // 4. Actualizar estados
        setPermisosP(permisosAsignados);
        setPermisosN(permisosNoAsignados);

        if (perfilResponse.permisos && perfilResponse.permisos.length > 0) {
          //setPermisosP(receivedPerfil.permisos)
          setShowPermisos(true);
          setShowNoPermisos(true);
        } else {
          setShowPermisos(true);
          setShowNoPermisos(true);
        }
      }
    };

    loadPerfil();
    //getPermisos();
 }, [location.state]);

// useEffect(() => {
//   const getPermisos = async () => {
//     try {
//       let permisosTodos = []
//       let permisosPerfil = permisosP
//       const response = await PerfilesService.getPermisos();
//       console.log("Permisos luego de buscarlos:", response);
//       console.log("Permisos asignados (permisosP):", permisosPerfil);
//       permisosTodos = response
//       console.log('permisosPerfil.length: ', permisosPerfil.length)
//       if (permisosPerfil.length > 0) {
//         const permisosFiltrados = permisosTodos.filter(
//           (permisoN) =>
//             !permisosPerfil.some((permisoP) => permisoP._id === permisoN.id)
//         );
//         console.log("Permisos filtrados:", permisosFiltrados);
//         setPermisosN(permisosFiltrados);
//       } else {
//         setPermisosN(permisosTodos);
//       }
//     } catch (error) {
//       console.error("Error fetching permisos:", error);
//     }
//   };

//   if (permisosP.length >= 0) {
//     getPermisos();
//   }
// }, [location.state]); 



  const handleAgregarPermiso = (permiso) => {
    console.log("agregando permiso: ", permiso)
    setPermisosP([...permisosP, permiso]);
    setPermisosN(permisosN.filter((p) => p._id !== permiso._id));
  };

  const handleQuitarPermiso = (permiso) => {
    setPermisosN([...permisosN, permiso]);
    setPermisosP(permisosP.filter((p) => p._id !== permiso._id));
  };

  const addPermisosToPerfil = async () =>{
    try {

      let permisos = []
      permisosP.map((permiso=>(
        permisos.push(permiso._id)
      )))
      console.log('permisos a añadir al perfil: ', permisos)
      const response = PerfilesService.addPermisosToPerfil(perfil.id, permisos )
      if(response.id){
        navigate("/admin/profiles/profiles")
      }
    } catch (error) {
      console.error("Error adding permissions:", error);
    }
  }

  const handleAddPermisos = async () => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: `Modificar los permisos al perfil: ${perfil.name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FFC107",
        cancelButtonColor: "#D33333",
        confirmButtonText: "Sí, Agregar",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Permisos a agregar:", permisosP)
          const response = addPermisosToPerfil(perfil.id, permisosP)
          console.log("Permiso agregados:", response)
        }
      })
    }
    
    
    const TodosPermisos = ({ permisosN }) => { // Definir como componente funcional
      return (
        <div className="col-5 bg-body-secondary pt-3 rounded-3 mb-5">
          <h5 className="mb-3">Todos los permisos</h5>
          {permisosN.map((permiso) => (
            <div
              className="container col-10 border-bottom d-flex align-items-center justify-content-between"
              key={permiso._id}
            >
              <p className="my-3">{permiso.name}</p>
              <button
                type="button"
                className="btn btn-warning btn-sm d-flex align-items-center"
                onClick={() => handleAgregarPermiso(permiso)}
              >
                Agregar
                <i className=" ms-2 bi bi-arrow-right-square"></i>
              </button>
            </div>
          ))}
        </div>
      );
    };

    const PermisosAsignados =({permisosP}) =>{
      console.log('PErmisosP: ', permisosP);
      return(
        <div className="col-5 container bg-body-secondary me-2 rounded-3 pt-3 mb-5">
          <h5 className="mb-3">Permisos asignados</h5>
          {permisosP.map((permiso) => (
            <div className="container col-10 border-bottom d-flex align-items-center justify-content-between" key={permiso._id}>
            <p className="my-3">{permiso.name}</p>
            <button 
              type="button" 
              className="btn btn-warning btn-sm d-flex align-items-center"
              onClick={() => handleQuitarPermiso(permiso)}
              >Quitar 
              <i className="ms-2 bi bi-dash-square"></i>
              </button>
          </div>
          ))}
        </div>
      )
    }

  return (
    <div className="container">
      <h3 className="text-decoration-underline">Perfil: {perfil?.name}</h3>
      {showNoPermisos && (
        <div className="container ms-auto mt-3">
          <h4>No tiene permisos asignados aun</h4>
        </div>
      )}
      <div className="d-flex justify-content-center align-items-center ">
        <button  
        onClick={()=> handleAddPermisos()}
        className="btn btn-warning">Agregar permisos</button>
      </div>
      {showPermisos && (
        <div className="container ms-auto row mt-4">
          {/* componente todos componentes */}
          <TodosPermisos permisosN={permisosN} />
          <PermisosAsignados permisosP={permisosP}/>

          
        </div>
      )}
    </div>
  );
};

export default PerfilPermisos;