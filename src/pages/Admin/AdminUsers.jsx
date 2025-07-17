/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserService from "../../services/UsersService";
import { User } from "../../entities/user";
import userpic from "../../assets/user.png";

const AdminUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [error, setError] = useState(false)

  const getUsers = async () => {
    try {
      const response = await UserService.getUsers();
      console.log("🔍 Tipo de response:", typeof response);
      console.log("📦 Contenido de response:", response);

      if (!Array.isArray(response)) {
        console.error("❌ Error: La respuesta no es un array", response);
        return;
      }

      const usuariosArray = response.map((user) => new User(user));
      console.log("✅ Usuarios procesados:", usuariosArray);

      setUsuarios(usuariosArray);
      setShowUsers(true);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
    }
  };
  
  const deshabilitarUser = async (userId) =>{
    try{
      const userDeshabilitado = await UserService.deshabilitarUser(userId)
      getUsers()      
    } catch(error){
      setError(true)
    }
  }

  const habilitarUser = async (userId) =>{
    try{
      const userDeshabilitado = await UserService.habilitarUser(userId)
      getUsers()      
    } catch(error){
      setError(true)
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  function UserCard({ usuario }) {
    const [showUserHistory, setShowUserHistory] = useState(false);
    return (
      <div className="w-100 mx-auto mb-3 shadow-sm bg-white rounded-3">
        <div className="d-flex border-bottom">
          <div className="col-3 d-flex justify-content-center align-items-center position-relative">
            <img
              src={userpic || "default-avatar.png"}
              alt={usuario.name}
              className="img-fluid rounded-circle"
              style={{ width: "10rem", height: "10rem" }}
            />
          </div>
          <div className="col-9 p-3">
            <h5 className="fw-bold">{usuario.name} {usuario.last_name} </h5>
            <p className="mt-1 mb-1"><strong>Email:</strong> {usuario.email}</p>
            <p className="mt-1 mb-1"><strong>Tipo de Usuario:</strong> {usuario.idPerfil.name} </p>
            <p className="mt-1 mb-1"> <strong>Creado:</strong> {usuario.createdAt}</p>
            <p className="mt-1 mb-1"> <strong>Estado:</strong> {usuario.enabled === "habilitado" ? "Habilitado" : "Deshabilitado"}</p>
            
            <div className="d-flex">
              <p className="mt-1 mb-1"> Historial Habilitacion{" "}
                  <i
                  className="bi bi-caret-down"
                  onClick={() => setShowUserHistory(!showUserHistory)}
                ></i>
              </p>
              {usuario.enabled === "habilitado" 
              ? <button type="button" 
                className="btn btn-outline-warning btn-sm mx-2"
                onClick={()=>deshabilitarUser(usuario.id)}
                >Deshabilitar</button>
              : <button type="button" 
                className="btn btn-outline-warning btn-sm mx-2"
                onClick={()=>habilitarUser(usuario.id)}
                >Habilitar</button>
              }
            </div>
          </div>  
        </div>
        {showUserHistory && 
        // <p>Mostrar historial</p>
          <div> {/* Envuelve el mapeo en un div o fragmento */}
            {usuario.enabledHistory.map((history) => (
              <EnabledHistory key={history.dateFrom} history={history} />
            ))}
          </div> 
        }
      </div>
    );
  }

  function EnabledHistory({ history }) {
    const formatDate = (date) => {
      if (!date) return "Actualidad";
      return date.toLocaleDateString(); // Formatea la fecha a una cadena local
    };
    return (
      <div className="mx-5 mb-2 mt-2"> {/* Margen lateral y margen inferior para separación entre elementos */}
      <div className="border border-warning rounded-3 p-2"> {/* Borde, redondeo y padding */}
        <p className="fw-bold mb-1">{history.status.toUpperCase()}:</p>
        <p className="mb-0">
          {formatDate(history.dateFrom)} - {formatDate(history.dateTo)}
        </p>
      </div>
    </div>
    );
  }

  function Error(){
    return(
      <div className="border-1 border-warning mt-2 mb-1 rounded-3">
          <p className="fw-bold text-danger">No pudimos deshabilitar el usuario, por favor intentalo mas tarde
          </p>
          <button className="btn btn-outline-danger"
            onClick={()=>setError(false)}
          >Aceptar</button>
        </div>
    )
  }

  return (
    <div className="container-fluid px-5 bg-body-secondary rounded-3 col-11 ms-5 py-3">
      <div className="row">
        {" "}
        {/* Añadido un row para el texto "Usuarios:" */}
        <div className="col-12">
          {!showUsers && <h4>Sin Usuarios</h4>}
          {showUsers && <h4>Usuarios:</h4>}
        </div>
      </div>
      {error && (
        <Error />
      )}
      {showUsers && (
        <div className="row">
          {" "}
          {/* Añadido un row para las tarjetas */}
          <div className="col-12">
            {usuarios.map((usuario) => (
              <UserCard key={usuario.email} usuario={usuario} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
