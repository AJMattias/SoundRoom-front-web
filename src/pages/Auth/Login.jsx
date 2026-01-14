import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import UsersService from "../../services/UsersService";
import Alerta from "../../components/Alerta";

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login, authState } =  useContext(AuthContext)
  // const [perfilName, setPerfilName] = useState('')
  const [showRedAlert, setShowRedAlert] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate()

  // const onSubmit = async(values) =>{

  //   try{
  //     console.log("form values: ", values)
  //     console.log('values.email,values.password: ',values.email, values.password, )
  
  //     const userData = await UsersService.login(values.email, values.password);

  //     // guardo en contexto
  //     login({ user: userData.user, token: userData.token });

  //     // navegación inmediata según perfil
  //     const perfil = userData.user?.idPerfil?.name?.trim().toLowerCase();
  //     const isAdmin = userData.user?.isAdmin;

  //     console.log("Perfil en onSubmit:", perfil);
  //     console.log("isAdmin en onSubmit:", isAdmin);

  //     if (isAdmin) {
  //       navigate("/admin");
  //     } else if (perfil === "sala de ensayo") {
  //       navigate("/owner");
  //     } else  if(perfil === "artista"){
  //       navigate("/artista");
  //     } else {
  //       console.log("Perfil no reconocido, no se redirige");
  //     }
      
  //     //login({ user: userData.user, token: userData.token });
      
  //   }catch(err){
  //       console.error("Error en login:", err);
  //   }
  // }

  //onSubmit con manejor de error:
  const onSubmit = async (values) => {
    try {
        console.log("form values: ", values);
        
        const userData = await UsersService.login(values.email, values.password);
        console.log("userData from service:", userData);

        // 1. CAPTURAR ERROR DE AUTENTICACIÓN
        if (userData && userData.hasError) {
            setMensajeError(userData.message); // Aquí guardas "El email o contraseña son incorrectos"
            setShowRedAlert(true);
            return; // Cortamos la ejecución
        }

        // 2. SI EL LOGIN ES EXITOSO, CONTINUAMOS
        console.log("Login exitoso, guardando contexto...");
        login({ user: userData.user, token: userData.token });

        const perfil = userData.user?.idPerfil?.name?.trim().toLowerCase();
        const isAdmin = userData.user?.isAdmin;

        if (isAdmin) {
            navigate("/admin");
        } else if (perfil === "sala de ensayo") {
            navigate("/owner");
        } else if (perfil === "artista") {
            navigate("/artista");
        } else {
            console.log("Perfil no reconocido");
        }

    } catch (err) {
        console.error("Error inesperado en el componente:", err);
        setMensajeError("Ocurrió un error inesperado. Intente más tarde.");
        setShowRedAlert(true);
    }
  };

  const cerrarAlerta = () => {
    setMensajeError("");
    setShowRedAlert(false);
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
    const user = authState.user?.user;
    const perfil = user?.idPerfil?.name?.trim().toLowerCase();
    const isAdmin = user?.isAdmin;

    console.log("Perfil en useEffect:", perfil);
    console.log("isAdmin en useEffect:", isAdmin);

    if (isAdmin) {
      navigate("/admin");
    } else if (perfil === "sala de ensayo") {
      navigate("/owner/create-room");
    }
  }
  }, [authState.isAuthenticated, authState.user, navigate]);

  return (
    <div>
      <NavBar />
      <div
        className="container col-4 d-flex flex-column gap-3 justify-content-center align-items-center bg-light pb4 pt-4 rounded border border-2"
        style={{ marginTop: "25vh" }}
      >
        <h3 className="text-center text-dark">Inicia Sesion</h3>
         <div>
          {showRedAlert && (
            <Alerta mensaje={mensajeError} onClose={cerrarAlerta} />
          )}
        </div>
        <form className="row g-2 px-3" 
          onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="text-dark">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-danger">Email es requerido</p>}
          <label htmlFor="password" className="text-dark">
            Contraseña
          </label>
          <input
            type="Password"
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          <Link to="/olvide-contraseña" className="text-warning">
              Olvide mi contraseña
            </Link>
          <button
            className="d-inline-block w-auto btn btn-warning mt-3"
            type="submit"
          >
            Iniciar Sesion
          </button>
          <p className="d-flex gap-2 justify-content-between text-dark">
            ¿No tienes una cuenta?
            <Link to="/register" className="text-warning">
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};


export default Login;