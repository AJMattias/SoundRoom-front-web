/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UsersService.js"; // Ajusta la ruta
import NavBar from '../../components/NavBar';
import Alerta from '../../components/Alerta';
import AlertaGreen from '../../components/AlertaGreen.jsx';
import { useForm } from "react-hook-form";

const ForgotPasswordScreen = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCode, setShowCode] = useState(false);
    const navigate = useNavigate();

    const cerrarAlerta = () => setError('');
    const cerrarSuccess = () => setMessage('');

    const onSubmitEmail = async (data) => {
        setIsLoading(true);
        setMessage('');
        setError('');
        setIsSuccess(false);

        try {
            const result = await UserService.resetPassword(data.email);
            console.log(result);
            setMessage(result.message);
            setIsSuccess(result.success);
            //guardar token result.token
            const token = result.token
            console.log('reset password token: ', token)

            //TODO navegar a reset-password/:token
            navigate(`reset-password/${token}`, { state: { type: "reset-password-email" } })
        } catch (e) {
            setError('Ocurrió un error enviando el email');
        } finally {
            setIsLoading(false);
        }
    };

    //pedir codigo recuperacion al mail
    const getCode = async (data) => {
        console.log('sending code')
        setIsLoading(true);
        setMessage('');
        setError('');
        setIsSuccess(false);
        console.log('data: ', data)

        try {
            const result = await UserService.forgotPassword(data.email);
            console.log('forgot password call back route')
            console.log(result);
            setMessage(result.message);
            setIsSuccess(result.success);
            //guardar token result.token
            setShowCode(true)
            if(result.token){
                const codigo = result.token
                setMessage('Te enviamos un codigo al mail, ingresalo para ingresar a SoundRoom')
            }
            if(!result.token){
            //Error Mostrar
                setError("Ups. Tuvimos un problema, intente nuevamente mas tarde.")
            }

            
        } catch (e) {
            setError('Ocurrió un error enviando el email');
        } finally {
            setIsLoading(false);
        }
    };

    //Enviar codig recuperacion 
    const onSubmitCode = async (data) => {
        setIsLoading(true);
        setMessage('');
        setError('');
        setIsSuccess(false);

        try {
            const result = await UserService.loginWithCode(data.email, data.codigo);
            console.log(result);
            // setMessage(result.message);
            // setIsSuccess(result.success);

            if (result.isAdmin) {
                //TODO function to navigate to user homepage
                navigate("/admin");
            }
        } catch (e) {
            setError('Ocurrió un error al verificar el código');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="container col-6 d-flex flex-column gap-2 justify-content-center align-items-center bg-light pb-4 pt-4 rounded border border-2" style={{ marginTop: "15vh" }}>
                {error && <Alerta mensaje={error} onClose={cerrarAlerta} />}
                {isSuccess && <AlertaGreen mensaje={message} onClose={cerrarSuccess} />}

                <h3 className="text-center text-dark">Olvidé mi Contraseña</h3>
                <p className="text-center text-dark">Ingresa tu email para recibir un email o código de recuperación</p>

                <form className="row g-2 px-3">
                    <label htmlFor="email" className="text-dark">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="text-danger">El email es requerido</p>}

                    <div className="d-flex gap-2 justify-content-between">
                        <button
                            type="button"
                            className="btn btn-warning text-white mt-3"
                            disabled={isLoading}
                            onClick={handleSubmit(onSubmitEmail)}
                        >
                            Enviar Email
                        </button>
                        {/*  No se usara por ahora
                        <button
                            type="button"
                            className="btn btn-warning text-white mt-3"
                            disabled={isLoading}
                            onClick={handleSubmit(getCode)}
                            >
                            Quiero un código
                        </button>
                            */}
                    </div>
                </form>

                {showCode && (
                    <form className="row g-2 px-3 col-10" onSubmit={handleSubmit(onSubmitCode)}>
                        <label htmlFor="codigo" className="text-dark mt-3">Código</label>
                        <input
                            type="number"
                            placeholder="Código"
                            {...register("codigo", { required: true })}
                        />
                        {errors.codigo && <p className="text-danger">El código es requerido</p>}

                        <button
                            type="submit"
                            className="btn btn-warning text-white mt-3"
                            onClick={handleSubmit(onSubmitCode)}
                        >
                            Enviar Código
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;