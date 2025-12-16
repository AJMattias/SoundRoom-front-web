/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx"; 
import { useContext, useEffect, useState } from "react";
import UsersService from "../services/UsersService.js";
import { useForm } from "react-hook-form";
import { PerfilesService } from "../services/PerfilService.js";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import { getJwtToken } from "../storage/LocalStorage.js";

const EditarPerfil = () => {
    const { update } =  useContext(AuthContext)

  const { id } = useParams(); // Extrae el id de la URL
  const [usuario, setUsuario] = useState(null);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  
  const [perfilUsuario, setPerfilUsuario] = useState({
    id: usuario?.id ||"",
    name: usuario?.name || "",
    lastName: usuario?.lastName || "",
    email: usuario?.email || "",
  });
  
  
  const navigate = useNavigate();
  const [perfiles, setPerfiles] = useState([]);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState({
    id: "",
    name: "",
  });

  // Función para obtener el usuario
  const getUsuario = async (id) => {
      try {
        const response = await UsersService.getUserBd(id);
        console.log("usuario a editar: ", response);
        // Aquí puedes setear los valores del formulario con los datos del usuario
        // Por ejemplo:
        setValue("name", response.name);
        setValue("lastName", response.last_name);
        setValue("email", response.email);

        // Si el usuario ya tiene un perfil, marcarlo como seleccionado
        if (response.idPerfil) {
          setPerfilSeleccionado({
            id: response.idPerfil._id || response.idPerfil, 
            name: response.idPerfil.name || "Cargado"
          });
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
    setError("No se pudo cargar la información del usuario");
      }
  }


  const getPerfiles = async () => {
    let perfilesGetted = [{ id: "", name: "Ninguno" }];
    const response = await PerfilesService.getPerfiles();
    console.log("response: ", response);
    response.map((perfil) => {
      perfilesGetted.push({ id: perfil.id, name: perfil.name });
    });
    console.log("perfilesGetted: ", perfilesGetted);
    setPerfiles(perfilesGetted);
  };

  const handleSeleccionarPerfil = (id, name) => {
    setPerfilSeleccionado({ id: id, name: name });
  };

  useEffect(() => {
    //if(authState.isAuthenticated) navigate("/admin/")
    if (id) {
      getPerfiles();
      getUsuario(id);
  }
  }, [id]);

  const onSubmit = async (values) => {
    console.log("form values: ", values);
    console.log(
      "values.email, values.name, values.lastName, perfilSeleccionado: ",
      values.email,
      values.name,
      values.lastName,
      perfilSeleccionado.id
    );
    const response = await UsersService.update(
      id,
      values.email,
      values.name,
      values.lastName,
      perfilSeleccionado.id
    );
    if(response.status === 'error'){
      setError(response.message);
      return;
    }
    
    console.log("update: ", response);
    update({ user: response});
  
    if (response.token && response.user.idPerfil.name ==="Artista") {
      navigate("/artista");
    }else if(response.token && response.user.idPerfil.name ==="Sala de Ensayo"){
      navigate("/owner");
    }else{
      navigate("/admin");
    }
  };

  return (
    <div>
      <div
        className="container col-6 d-flex flex-column gap4 justify-content-center align-items-center bg-light pb4 pt-4 rounded border border-2"
        style={{ marginTop: "15vh" }}
      >
        {error &&
          <Alerta tipo="error" mensaje={error} />
        }
        <h3 className="text-center text-dark">Editar Perfil</h3>
        <form className="row g-2 px-3" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="text-dark">
            Nombre
          </label>
          <input
            type="name"
            placeholder="Nombre"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-danger">Nombre es requerido</p>}
          <label htmlFor="lastName" className="text-dark">
            Apellido
          </label>
          <input
            type="lastName"
            placeholder="Apellido"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <p className="text-danger">Apellido es requerido</p>
          )}
          <label htmlFor="email" className="text-dark">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-danger">Email es requerido</p>}
         
         

          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="dropdown px-0 pt-2">
              <button
                className="btn btn-warning dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Selecciona un Perfil
              </button>
              <ul className="dropdown-menu">
                {perfiles.map((perfil) => (
                  <li
                    className="dropdown-item"
                    key={perfil.id}
                    onClick={() =>
                      handleSeleccionarPerfil(perfil.id, perfil.name)
                    }
                  >
                    {perfil.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Texto del perfil seleccionado alineado a la derecha */}
            {perfilSeleccionado.id !== "" && (
              <p className="mb-0 pt-2 ps-3">
                Perfil Seleccionado: {perfilSeleccionado.name}
              </p>
            )}
          </div>

          <button
            className="d-inline-block w-auto btn btn-warning"
            type="submit"
          >
            Editar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
