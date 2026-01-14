/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import Alerta from "../../components/Alerta";
import { getLoggedUser } from "../../storage/LocalStorage";
import UsersService from "../../services/UsersService";
import { useLocation } from "react-router-dom";

const NewPasswordScreen = () => {
    //para olvide mi contraseña
    //const { setToken} =  useContext(AuthContext)
    const location = useLocation();
    const { login } = useContext(AuthContext);
    const { token } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [showRedAlert, setShowRedAlert] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const mensajeErrorInicial = "Las contraseñas deben ser iguales"; // Guardar el mensaje inicial aparte
    const navigate = useNavigate();
    const [action, setAction] = useState("");

  

	const user = getLoggedUser();
	if (user) console.log("logged user: ", user);

	//onsubmit v2 manejo de status 400:
	const onSubmit = async (values) => {
		if (values.password !== values.password2) {
			setMensajeError("Las contraseñas no coinciden");
			setShowRedAlert(true);
			return;
		}

		console.log("contraseñas iguales, llamar al back");
		const result = await UsersService.changePassword(token, values.password);

		// CAPTURA DEL ERROR 400 u otros
		if (result.error) {
			setMensajeError(result.message); // Guardamos el mensaje que viene del back
			setShowRedAlert(true);
			return; // Detenemos la ejecución aquí
		}

		// SI ES EXITOSO (Continuar con el login)
		console.log("data to authprovider changePassword: ", result);
		localStorage.removeItem("user");
		await login({ user: result.user, token: result.token });
		navigate(navegacionUser(result.user));
	};

  const navegacionUser = (user) => {
    console.log("navegacionUser user: ", user);
    if (user.isAdmin) {
      console.log("navegacionUser admin, user.isAdmin: ", user.isAdmin);
      return "/admin"
    };
    if (user.idPerfil.name === "Artista") return "/artista";
    if (user.idPerfil.name === "Sala de Ensayo") return "/owner";
  };
  //TODO change password with temporary token passed through params

  const cerrarAlerta = () => {
    setMensajeError("");
    setShowRedAlert(false);
  };

  useEffect(() => {
    console.log("Token recibido:", token);
    if (location.state?.type) {
      // Realizar acciones específicas si se llegó desde el flujo de olvido de contraseña por email
      setAction(location.state?.type);
      console.log(
        "Se llegó a ResetPasswordScreen desde el flujo de olvido de contraseña por email"
      );
    }
  }, [token]);
  return (
    <div>
      <div className="pt-5">
        <div
          className="container col-6 d-flex flex-column gap-2 justify-content-center align-items-center bg-light pb-4 pt-4 rounded border border-2"
          style={{ marginTop: "15vh" }}
        >
          <h3>Cambiar Contraseña</h3>

          <div>
            {showRedAlert && (
              <Alerta mensaje={mensajeError} onClose={cerrarAlerta} />
            )}
          </div>
          <form className="row g-2 px-3" onSubmit={handleSubmit(onSubmit)}>
            {action === "Cambiar" && (
              <>
                <label htmlFor="passwordV" className="text-dark">
                  Contraseña Vieja
                </label>
                <input
                  type="Password"
                  placeholder="Contraseña Vieja"
                  {...register("passwordVieja", {
                    required: "La contraseña es obligatoria",
                  })}
                />
                {errors.passwordV && (
                  <p className="text-danger">Contraseña Vieja es requerida</p>
                )}
              </>
            )}
            <label htmlFor="password" className="text-dark">
              Nueva Contraseña
            </label>
            <input
              type="Password"
              placeholder="Nueva Contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />
            {errors.password && (
              <p className="text-danger">Nueva Contraseña es requerida</p>
            )}
            <label htmlFor="password2" className="text-dark">
              Repetir Contraseña
            </label>
            <input
              type="password"
              placeholder="Repite la Password"
              {...register("password2", {
                required: "Confirma tu contraseña",
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {errors.password2 && (
              <p className="text-danger">Nueva Contraseña es requerida</p>
            )}
            <button
              className="d-inline-block w-auto btn btn-warning"
              type="submit"
            >
              Cambiar Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordScreen;
