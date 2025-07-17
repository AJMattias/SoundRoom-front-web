import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import UsersService from "../../services/UsersService";

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login, authState } =  useContext(AuthContext)
  const [perfilName, setPerfilName] = useState('')
  const navigate = useNavigate()

  const onSubmit = async(values) =>{
      console.log("form values: ", values)
      console.log('values.email,values.password: ',values.email, values.password, )
  
      const userData = await UsersService.login(values.email, values.password);

      // The actual user and token data are inside axiosResponse.data
      //const userData = axiosResponse.data; 

      console.log('login: ', userData); // This will now show your token and user object directly
      
      // Access user and token correctly from userData
      console.log('user object: ', userData.user);
      if(userData.user.idPerfil && userData.user.idPerfil.name) {
        console.log('user.idPerfil.name: ', userData.user.idPerfil.name);
        setPerfilName(userData.user.idPerfil.name);
      }
      
     login({ user: userData.user, token: userData.token });
    }

   useEffect(() => {

     console.log('useEffect ejecutándose. isAuthenticated:', authState.isAuthenticated, 'isAdmin:', authState.user?.user?.isAdmin, 'perfilName:', perfilName);

    if (authState.isAuthenticated) {
      console.log('Usuario autenticado.');
      if (authState.user?.user?.isAdmin) {
        console.log('Es administrador. Navegando a /admin');
        navigate("/admin");
      } else if (perfilName === "Sala de ensayo") {
        console.log('Perfil es Sala de ensayo. Navegando a /owner/create-room/');
        try {
          navigate("/owner/create-room");
        } catch (error) {
          console.error('Error al navegar:', error);
        }
      } else {
        console.log('No se cumple ninguna condición de navegación específica. Perfil:', perfilName);
      }
    } else {
      console.log('Usuario no autenticado.');
    }
  }, [authState.isAuthenticated, authState.user?.user?.isAdmin, perfilName, navigate]); // Mantenemos navigate en las dependencias por precaución
  return (
    <div>
      <NavBar />
      <div
        className="container col-4 d-flex flex-column gap-3 justify-content-center align-items-center bg-light pb4 pt-4 rounded border border-2"
        style={{ marginTop: "25vh" }}
      >
        {/* {
      error.map((error, i)=>(
      <div key={i} className="alert alert-danger my-0" role="alert">
        {error}
        </div>))
    } */}
        <h3 className="text-center text-dark">Inicia Sesion</h3>
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
          <Link to="/forgotPassword" className="text-warning">
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