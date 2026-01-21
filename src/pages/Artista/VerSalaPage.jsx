/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { RoomService as salaService } from "../../services/SalaDeEnsayoService";
import { useNavigate, useParams } from "react-router-dom";
import Alerta from "../../components/Alerta";
import CarruselImagenes from "../../components/CarruselImagenes";
import OpinionCard from "../../components/OpinionCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import Opinar from "../../components/Opinar";
import ReservasServices from "../../services/ReservasServices";
import { getLoggedUser } from "../../storage/LocalStorage";

const VerSalaPage = () => {
  // loading sala data
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const [sala, setSala] = useState(null)
    const [error, setError] = useState('')
    const [promedio, setPromedio] = useState(0)
    const { id } = useParams(); 
    const [imagenes, setImagenes] = useState([])
    const [opinion, setOpinion] = useState('')
    const [estrellas, setEstrellas] = useState(0)
    const [alertaMensaje, setAlertaMensaje] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('danger');
    const [puedoOpinar, setPuedoOpinar] = useState(false)
    const [puedoActualizarOpinion, setPuedoActualizarOpinion] = useState(false)
    const [reservas, setReservas] = useState([])
    const [showError, setShowError] = useState(false)
    const [mostrarOpinion, setMostrarOpinion] = useState(false)
    const [idActualizarOpinion, setIdActualizarOpinion] = useState(null)
    
    const loggedUser = getLoggedUser().user 
    console.log('logged user: ', loggedUser);
    console.log('logged user id: ', loggedUser ? loggedUser.id : 'no user logged in'); 
    console.log('sala id: ', id);
    
    const fetchSala = async () => {
        console.log('Fetching sala with ID:', id);
        try {
            const response = await salaService.getRoomBd(id); 
            console.log('response fetched:', response);
            const data = response; // If the response is a JSON object
            console.log('data fetched:', data);
            if (!data ) {
                setError("Sala no encontrada, intente nuevamente más tarde.");
            }
            console.log('Sala data:', data);
            setSala(data);

        } catch (err) {
            console.log('error fetching sala:', err);
            setError("Sala no encontrada, intente nuevamente más tarde.");
        }
        // finally {
        //     setIsLoading(false);
        // }
    };

    const fetchPromedio = async () => {
        const promedio = await salaService.getPromedioSala(id);
        console.log('Promedio de la sala:', promedio)
        setPromedio(promedio);
    }

    const reservasUserSala = async () =>{
        const reservas = await ReservasServices.getReservasPorArtistaYSala(loggedUser.id, id)
        console.log("reservasUserSala: ", reservas)
        setReservas(reservas)
    }

    //funcion mis reservas a esta sala, si tengo reservas, puedo opinar

    const puedeUsuarioOpinar = (salaData, reservasData) => {
        // Si no hay sala o no hay usuario logueado, no puede opinar
        if (!salaData || !loggedUser || !reservasData) return;

        // Filtramos usando el ID real del usuario logueado
        const reservasUsuario = reservasData.filter(res => res.idUser === loggedUser.id);
        
        // Usamos el encadenamiento opcional ?. por si opiniones no existe
        console.log('idUser loggedUser.id: ', loggedUser.id);
        console.log('salaData.opiniones.idUser: ', salaData.opiniones?.idUser);
        const opinionesUsuario = salaData.opiniones?.filter(op => op.idUser === loggedUser.id) || [];

        // Lógica: Tiene reservas y no opinó todavía
        if (reservasUsuario.length > 0 && opinionesUsuario.length === 0) {
            setPuedoOpinar(true);
            setMostrarOpinion(true);
        } else {
            setMostrarOpinion(false);
        }
    };

    const puedeUsuarioActualizarOpinion = (salaData, reservasData) => {
        if (!salaData || !loggedUser || !reservasData) return;
        //Verificar si el usuario ha reservado la sala antes y cantidad de opiniones > 0
        //cant reservas > 0 && opiniones > 0
        const reservasUsuario = reservas.filter(reserva => reserva.idUser === loggedUser.id);
        const opinionesUsuario = salaData.opiniones.filter(opinion => opinion.idUser === loggedUser.id);
        if( reservasUsuario.length > 0 && opinionesUsuario.length > 0) {setPuedoActualizarOpinion(true)}
        // else{( reservasUsuario.length === 0 ) setPuedoActualizarOpinion(false)}
        
    }

     const guardarOpinion = async () => {
        if (estrellas === 0 || !opinion.trim()) {
            setTipoAlerta('danger');
            setAlertaMensaje('Debes escribir un comentario y seleccionar las estrellas.');
            return;
        };
        
        try {
        console.log("Enviando al back:", opinion);
        await salaService.postOpinionSala(id, opinion , estrellas);
        console.log('opinioin creada', { comentario: opinion });
        alert("Opinión enviada con éxito");
        setTipoAlerta('success');
        setAlertaMensaje('¡Tu opinión se ha guardado correctamente!');
        setOpinion('');
        setEstrellas(0);
        fetchSala(); // Refrescamos las opiniones
        setOpinion(""); // Limpiamos el textarea después de enviar
        } catch (error) {
        console.error("Error al guardar:", error);
        }
    };

    const actualizarOpinion = async () => {
        // 1. Validación inicial (Si falla, cortamos la ejecución con return)
        if (estrellas === 0 || !opinion.trim()) {
            setTipoAlerta('danger');
            setAlertaMensaje('Debes escribir un comentario y seleccionar las estrellas.');
            setShowError(true); // Asegúrate de activar el error visual
            return;
        }

        // 2. Si pasó la validación, procedemos a enviar al backend
        try {
            console.log("Actualizando opinión...");
            const response = await salaService.actualizarOpinionSala(idActualizarOpinion, opinion, estrellas);
            
            // Asumiendo que el servicio devuelve el objeto actualizado o un true
            if (response) {
                setTipoAlerta('success');
                setAlertaMensaje('¡Tu opinión se ha actualizado correctamente!');
                setOpinion('');
                setEstrellas(0);
                setPuedoActualizarOpinion(false); // Resetear estado de edición
                setMostrarOpinion(false); // Ocultar el formulario si deseas
                fetchSala(); // Refrescar la lista de opiniones
                alert("Opinión actualizada con éxito");
            } else {
                throw new Error("No se pudo actualizar");
            }
        } catch (error) {
            console.error("Error al actualizar:", error);
            setTipoAlerta('danger');
            setAlertaMensaje('Error al actualizar la opinión. Intente nuevamente.');
            setShowError(true);
        }
    };

    const habilitarEditarOpinion = () => {
        // Buscar la opinión del usuario logueado
        setPuedoActualizarOpinion(true);
        console.log('sala opiniones: ', sala.opiniones);
        setOpinion(sala.opiniones.find(op => op.idUser._id === loggedUser.id).descripcion);
        setEstrellas(sala.opiniones.find(op => op.idUser._id === loggedUser.id).estrellas);
        setIdActualizarOpinion(sala.opiniones.find(op => op.idUser._id === loggedUser.id)._id);
        setMostrarOpinion(true);
    }

    useEffect(() => {
        fetchSala();
        fetchPromedio();
        puedeUsuarioOpinar(sala);
        puedeUsuarioActualizarOpinion(sala);
        reservasUserSala()
        setIsLoading(false);
    }, []);

    // Muestra un estado de carga mientras los datos se están obteniendo
    if (isLoading) {
        return (
            <div className="flex flex-col w-100 items-center justify-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    // Muestra un mensaje de error si hay un problema
    if (error) {
        return (
            <div className="flex flex-col w-100 items-center justify-center min-h-screen">
                <Alerta tipo="error" mensaje={error} />
            </div>
        );
    }

    // Si no hay sala (por ejemplo, si la API devuelve null o un objeto vacío y no se establece el error)
    if (!sala) {
        return (
            <div className="flex flex-col w-100 items-center justify-center min-h-screen">
                <p>No se encontraron datos para la sala.</p>
            </div>
        );
    }

    return (
        <>
            {isLoading 
            ? (
                <LoadingSpinner centered={true} />
            ) 
            :(
                <div className="mx-auto flex flex-col col-10 bg-white rounded-3 items-center justify-center min-h-screen">
                    {error && <Alerta tipo="error" mensaje={error} onClose={()=> setError('')}/>}
                    <div className=" rounded-3 w-100 mx-2 my-3">
                        {/* header sala */}
                        <div className="row w-100 p-3">
                            <div className="d-flex col-9 flex-column">
                                <h3 className="text-black fs-1 fw-bold">{sala.nameSalaEnsayo}</h3>
                                <h4>{sala.calleDireccion}</h4>
                            </div>
                            <div className="col-3 d-flex flex-column justify-content-center"> 
                            <div className="row w-100 align-items-center">
                                    <div className="d-flex align-items-center w-100">
                                    <p className="text-black fw-bold mb-0">${sala.precioHora}/hs</p>
                                    <div className="d-flex align-items-center ms-3 gap-1"> 
                                        <p className="text-black fw-bold mb-0">{promedio}</p> 
                                        <i className="bi bi-star-fill text-warning "></i>
                                    </div> 
                                </div>
                                </div>
                                <div className="row w-50 align-align-items-start mt-2">
                                    <button 
                                        className="btn btn-sm btn-warning text-white fw-bold"
                                        onClick={()=>console.log('clic reservar sala id:', sala.id)}
                                        // onClick={() => navigate(`/owner/edit-room/${sala.id}`, {state: {sala}})}
                                        >
                                        Reservar
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* imagenes */}
                        {/* center carrusel de imagenes */}
                        <div className="row bg-body-white mx-3 justify-content-center align-items-center">
                            <CarruselImagenes images={sala.imagenes ||[]} />
                            <hr className="mt-5"/>
                        </div>
                        {/* --- NUEVA ESTRUCTURA PARA DESCRIPCION, COMODIDADES, OPINIONES Y HORARIOS --- */}
                        <div 
                            className="row flex-grow- mx-2"
                            style={{ minHeight: '300px' }}> {/* Usamos flex-grow-1 si quieres que ocupe el espacio vertical restante */}
                            {/* Columna principal (Descripción, Comodidades, Opiniones) */}
                            <div className="col-md-7 px-4 py-3"> {/* col-md-8 para ocupar 8 de 12 columnas en pantallas medianas en adelante */}
                                <div className="mb-4"> {/* Añadir margen inferior para separar secciones */}
                                    <h4>Descripción</h4>
                                    <p className="text-black">{sala.descripcion}</p>
                                    <hr className="mt-3 w-75"/>
                                </div>

                                <div className="mb-4">
                                    <h4>Comodidades</h4>
                                    {sala.comodidades && sala.comodidades.length > 0 ? (
                                        <div className="d-flex flex-wrap gap-2">
                                            {sala.comodidades.map((comodity, index) => (
                                                <span
                                                    key={index}
                                                    className="badge bg-warning text-dark p-2"
                                                >
                                                    {comodity}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No se han especificado comodidades para esta sala.</p>
                                    )}
                                    <hr className="mt-3 w-75"/>
                                </div>

                            </div>

                            {/* Columna Aside (Horarios) */}
                            <div className="col-md-4 px-4 py-3 rounded-bottom-3 border rounded-3"> {/* col-md-4 para el aside, color de fondo para distinguirlo */}
                                <h4>Horarios</h4>
                                <div className="d-flex flex-column">
                                    {sala.horarios && sala.horarios.length > 0 ? (
                                        sala.horarios.map((horario, index) => (
                                            <div key={index} className="d-flex justify-content-start align-items-center gap-2 mb-1">
                                                {/* ✨ CAMBIO PRINCIPAL AQUÍ ✨ */}
                                                <span>
                                                    <strong className="text-bold">{horario.dia}: </strong>{horario.hsInicio} - {horario.hsFin}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay horarios disponibles para esta sala.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div 
                            className="mt-3 px-4 w-75">
                            <h4>Opiniones</h4>
                            {sala.opiniones && sala.opiniones.length > 0 ? (
                                sala.opiniones.map((opinion, index) => (
                                    <OpinionCard key={index} opinion={opinion} idUserLogged={loggedUser.id} puedoActualizar={habilitarEditarOpinion} setIdActualizarOpinion={setIdActualizarOpinion}/>
                                ))
                            ) : (
                                <p>No hay opiniones disponibles para esta sala.</p>
                            )}
                        </div>
                        { mostrarOpinion  && 
                            <div className="mt-3 px-4 w-10">    
                                <Opinar 
                                    titulo="Cuéntanos tu experiencia"
                                    value={opinion}
                                    onChange={setOpinion} // Esto es igual a (val) => setOpinion(val)
                                    onClick={guardarOpinion}
                                    actualizar={actualizarOpinion}
                                    rating={estrellas}
                                    setRating={setEstrellas}
                                    showError={showError}
                                    setShowError={setShowError}
                                    puedoOpinar={puedoOpinar}
                                    puedoActualizarOpinion={puedoActualizarOpinion}
                                />
                            </div>
                        }
                        
                    </div>
                    <div className="row mt-4 pb-4">
                        <div className="col-12 text-center">
                            <button 
                                className="btn btn-warning text-white fw-bold px-5 py-3 fs-5"
                                //onClick={() => console.log('clic reservar sala id:', sala.id)}
                                onClick={()=> navigate('/artista/reservar/'+sala.id)}
                            >
                                <i className="bi bi-calendar-check me-2"></i>
                                Reservar/Alquilar
                            </button>
                        </div>
                    </div>
                        
                </div>
            )}
        </>
        
    )
}

export default VerSalaPage