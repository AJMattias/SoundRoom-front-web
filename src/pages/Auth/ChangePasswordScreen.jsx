import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import Alerta from "../../components/Alerta";
import UsersService from "../../services/UsersService";
import AlertaGreen from "../../components/AlertaGreen";

const ChangePasswordScreen = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    clearErrors,
  } = useForm();
  const navigate = useNavigate();

  // Estados
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isVerifyingCurrentPassword, setIsVerifyingCurrentPassword] =
    useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");

  // Verificar contraseña actual
  const verifyCurrentPassword = async () => {
    if (!currentPasswordValue.trim()) {
      setAlertMessage("Por favor ingresa tu contraseña actual");
      setShowAlert(true);
      setShowSuccess(false); // Asegurar que no haya éxito visible
      return;
    }

    setIsVerifyingCurrentPassword(true);
    setShowAlert(false); // Ocultar alerta previa
    setShowSuccess(false); // Ocultar éxito previo

    try {
      // Aquí llamas al backend para verificar la contraseña actual
      const isValid = await UsersService.verifyCurrentPassword({
        currentPassword: currentPasswordValue,
      });
      console.log('isValid: ', isValid);

      if (isValid.cambiar === true) {
        setIsCurrentPasswordValid(true);
        setSuccessMessage("Contraseña actual verificada correctamente");
        setShowSuccess(true);
        setShowAlert(false);
        // Limpiar errores del formulario
        clearErrors("currentPassword");
      } else {
        setIsCurrentPasswordValid(false);
        setAlertMessage("La contraseña actual es incorrecta");
        setShowAlert(true);
        setShowSuccess(false);
      }
    } catch (error) {
      console.error("Error verificando contraseña:", error);
      setAlertMessage("Error al verificar la contraseña actual");
      setShowAlert(true);
      setShowSuccess(false);
      setIsCurrentPasswordValid(false);
    } finally {
      setIsVerifyingCurrentPassword(false);
    }
  };

  // Cambiar contraseña
  const onSubmit = async (values) => {
    // Verificar que la contraseña actual esté verificada
    if (!isCurrentPasswordValid) {
      setAlertMessage("Debes verificar tu contraseña actual primero");
      setShowAlert(true);
      setShowSuccess(false);
      return;
    }

    // Verificar que las contraseñas nuevas coincidan
    if (values.newPassword !== values.confirmPassword) {
      setAlertMessage("Las nuevas contraseñas no coinciden");
      setShowAlert(true);
      setShowSuccess(false);
      return;
    }

    setIsChangingPassword(true);
    setShowAlert(false); // Ocultar alertas previas
    setShowSuccess(false);

    try {
      // Llamar al servicio para cambiar contraseña
      const result = await UsersService.cambiarPassword(
        currentPasswordValue,
        values.newPassword
      );

      if (result.success === true) {
        console.log('result.success: ', result.success);
        console.log('user: ', result.user);
        setSuccessMessage("Contraseña cambiada exitosamente");
        setShowSuccess(true);
        setShowAlert(false);

        // Limpiar formulario
        reset();
        setIsCurrentPasswordValid(false);
        setCurrentPasswordValue("");

        // Redirigir después de 2 segundos
        setTimeout(() => {
          navigate(navegacionUser(result.user));
        }, 2000);
      } else {
        setAlertMessage(result.message || "Error al cambiar la contraseña");
        setShowAlert(true);
        setShowSuccess(false);
      }
    } catch (error) {
      console.error("Error cambiando contraseña:", error);
      setAlertMessage("Error al cambiar la contraseña");
      setShowAlert(true);
      setShowSuccess(false);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const navegacionUser = (user) => {
    console.log('navegacion - user: ', user);
    if (user.isAdmin) return "/admin";
    if (user.idPerfil.name === "Artista") return "/artista";
    if (user.idPerfil.name === "Sala de Ensayo") return "/owner";
    return "/"; // Ruta por defecto
  };

  // Manejar cambio en el campo de contraseña actual
  const handleCurrentPasswordChange = (e) => {
    const value = e.target.value;
    setCurrentPasswordValue(value);
    // Si ya estaba verificada y cambian el valor, se invalida
    if (isCurrentPasswordValid) {
      setIsCurrentPasswordValid(false);
      setShowSuccess(false); // Ocultar mensaje de éxito al cambiar el valor
    }
    // Ocultar alertas al empezar a escribir
    setShowAlert(false);
  };

  // Cancelar y resetear el formulario
  const handleCancel = () => {
    reset();
    setIsCurrentPasswordValid(false);
    setCurrentPasswordValue("");
    setShowAlert(false);
    setShowSuccess(false);
  };

  const cerrarAlerta = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const cerrarAlertaSuccess = () => {
    setShowSuccess(false);
    setSuccessMessage("");
  };

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, isAuthenticated, navigate]);

  return (
    <div>
      <div className="pt-5">
        <div
          className="container col-6 d-flex flex-column gap-2 justify-content-center align-items-center bg-light pb-4 pt-4 rounded border border-2"
          style={{ marginTop: "15vh" }}
        >
          <h3>Cambiar Contraseña</h3>

          <div className="w-100">
            {showAlert && (
              <Alerta
                mensaje={alertMessage}
                onClose={cerrarAlerta}
                tipo="error"
              />
            )}
          </div>
          
          <div className="w-100">
            {showSuccess && (
              <AlertaGreen
                mensaje={successMessage}  // ¡CORRECCIÓN IMPORTANTE!
                onClose={cerrarAlertaSuccess}  // ¡CORRECCIÓN IMPORTANTE!
              />
            )}
          </div>

          {/* Formulario para verificar contraseña actual */}
          <div className="row g-2 px-3 w-100 mb-4">
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label text-dark">
                Contraseña Actual
              </label>
              <div className="input-group">
                <input
                  type="password"
                  className={`form-control ${
                    errors.currentPassword ? "is-invalid" : ""
                  } ${isCurrentPasswordValid ? "is-valid" : ""}`}
                  placeholder="Ingresa tu contraseña actual"
                  value={currentPasswordValue}
                  onChange={handleCurrentPasswordChange}
                  disabled={isVerifyingCurrentPassword || isChangingPassword}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={verifyCurrentPassword}
                  disabled={
                    !currentPasswordValue.trim() ||
                    isVerifyingCurrentPassword ||
                    isChangingPassword ||
                    isCurrentPasswordValid
                  }
                >
                  {isVerifyingCurrentPassword ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Verificando...
                    </>
                  ) : isCurrentPasswordValid ? (
                    "✓ Verificada"
                  ) : (
                    "Verificar"
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <div className="invalid-feedback">
                  {errors.currentPassword.message}
                </div>
              )}
              {isCurrentPasswordValid && (
                <div className="valid-feedback">
                  Contraseña actual verificada correctamente
                </div>
              )}
            </div>
          </div>

          {/* Formulario para nueva contraseña - solo visible si la actual es válida */}
          {isCurrentPasswordValid && (
            <form
              className="row g-2 px-3 w-100"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h5 className="mb-3">Nueva Contraseña</h5>

              {/* Campo para nueva contraseña */}
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label text-dark">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.newPassword ? "is-invalid" : ""
                  }`}
                  placeholder="Ingresa la nueva contraseña"
                  {...register("newPassword", {
                    required: "La nueva contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                  disabled={isChangingPassword}
                />
                {errors.newPassword && (
                  <div className="invalid-feedback">
                    {errors.newPassword.message}
                  </div>
                )}
              </div>

              {/* Campo para confirmar nueva contraseña */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label text-dark">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  placeholder="Confirma la nueva contraseña"
                  {...register("confirmPassword", {
                    required: "Confirma tu contraseña",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Las contraseñas no coinciden",
                  })}
                  disabled={isChangingPassword}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>

              {/* Botones del formulario de nueva contraseña */}
              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning flex-grow-1"
                  type="submit"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Cambiando...
                    </>
                  ) : (
                    "Cambiar Contraseña"
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isChangingPassword}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {/* Botón Cancelar general (solo visible si no se ha verificado la contraseña) */}
          {!isCurrentPasswordValid && (
            <div className="row g-2 px-3 w-100 mt-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
                disabled={isVerifyingCurrentPassword}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordScreen;