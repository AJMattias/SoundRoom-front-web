/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UsersService from "../../services/UsersService";
import ReservasServices from "../../services/ReservasServices";
import LoadingSpinner from "../../components/LoadingSpinner";
import ArtistHomeCard from "../../components/ArtistHomeCard";
import { getLoggedUser } from "../../storage/LocalStorage";
import { RoomService as salaService } from "../../services/SalaDeEnsayoService";
import OpinionCard from "../../components/OpinionCard";
import Opinar from "../../components/Opinar";


const ArtistaPage = () => {
    let params = useParams();

    const [artista, setArtista] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reservas, setReservas] = useState([])
    const [reservasTyped, setReservasTyped] = useState([])

    const [opiniones, setOpiniones] = useState(null)
    const [opinion, setOpinion] = useState('')
    const [estrellas, setEstrellas] = useState(0)
    const [puedoOpinar, setPuedoOpinar] = useState(false)
    const [puedoActualizarOpinion, setPuedoActualizarOpinion] = useState(false)
    const [showError, setShowError] = useState(false)
    const [mostrarOpinion, setMostrarOpinion] = useState(false)
    const [idActualizarOpinion, setIdActualizarOpinion] = useState(null)
    const [alertaMensaje, setAlertaMensaje] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('danger');
    
    

    const loggedUser = getLoggedUser().user 
    const navigate = useNavigate();
    let idArtista = params.id;

    

    // const puedeUsuarioOpinar = (reservasData) => {
    //     // Si no hay sala o no hay usuario logueado, no puede opinar
    //     console.log('puede usuario opinar: ');
    //     console.log('loggedUser: ', loggedUser);
    //     if ( !loggedUser || !reservasData) return;

    //     // Filtramos usando el ID real del usuario logueado
    //     const reservasUsuario = reservasData.filter(res => res.idOwner === loggedUser.id);
    //     console.log('reservasUsuario: ', reservasUsuario)
    //     // Usamos el encadenamiento opcional ?. por si opiniones no existe
    //     console.log('idUser loggedUser.id: ', loggedUser.id);
    //     console.log('opiniones.idOwner: ', opiniones?.idOwner);
    //     const opinionesUsuario = opiniones?.filter(op => op.idOwner === loggedUser.id) || [];
    //     console.log('opinionesUsuario: ', opinionesUsuario);
    //     console.log('opinionesUsuario.length: ', opinionesUsuario.length)
    //     // Lógica: Tiene reservas y no opinó todavía
    //     console.log('reservasUsuario.length > 0 && opinionesUsuario.length === 0: ', reservasUsuario.length > 0, ' && ',opinionesUsuario.length === 0);
    //     console.log('puedo opinar: ', puedoOpinar)
    //     if (reservasUsuario.length > 0 && opinionesUsuario?.length === 0) {
    //         console.log('puede opinar');
    //         setPuedoOpinar(true);
    //         setMostrarOpinion(true);
    //     } else {
    //         console.log('no puede opinar');
    //         setMostrarOpinion(false);
    //     }
    // };

    const puedeUsuarioOpinar = (reservasData) => {
    console.log('--- INICIO VALIDACIÓN OPINIÓN ---');
    
    // 1. Extraer IDs con "Fuerza Bruta" (probando todas las variantes comunes)
    const artistaId = artista?._id || artista?.id;
    const ownerId = loggedUser?.id || loggedUser?._id || loggedUser?.user?.id;

    console.log('Paso 1 - IDs extraídos:', { artistaId, ownerId });
    console.log('Paso 2 - Datos recibidos:', { 
        tieneReservas: !!reservasData, 
        cantidadReservas: reservasData?.length,
        tieneOpiniones: !!opiniones 
    });

    // Validación de salida temprana
    if (!artistaId || !ownerId || !reservasData) {
        console.warn('Faltan datos críticos para validar. Abortando.');
        return;
    }

    // 2. Filtrar Reservas
    const historialConArtista = reservasData.filter(res => {
        // IMPORTANTE: Verifica en tu consola si en la reserva es 'idUser' o 'idArtist'
        const resClientId = res.idUser?._id || res.idUser;
        const resOwnerId = res.idOwner?._id || res.idOwner;
        
        return resClientId?.toString() === artistaId.toString() && 
               resOwnerId?.toString() === ownerId.toString();
    });

    console.log('Paso 3 - Reservas encontradas:', historialConArtista.length);

    // 3. Verificar opinión previa
    const yaLeOpine = opiniones?.some(op => {
        // Aquí comparamos contra idArtist porque es la opinión DEL dueño AL artista
        const opTargetId = op.idArtist?._id || op.idArtist || op.idRoom?._id; 
        return opTargetId?.toString() === artistaId.toString();
    });

    console.log('Paso 4 - ¿Ya existe opinión?:', yaLeOpine);

    // 4. Lógica de estados
    if (historialConArtista.length > 0) {
        console.log('¡ÉXITO! El artista alquiló y puede ser calificado.');
        setPuedoOpinar(true);
        setMostrarOpinion(true);
    } else {
        console.log('FALLO: No hay registros de alquiler entre este dueño y este artista.');
        setPuedoOpinar(false);
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
            await salaService.postOpinionArtista(idArtista, opinion , estrellas);
            console.log('opinioin creada', { comentario: opinion });
            alert("Opinión enviada con éxito");
            setTipoAlerta('success');
            setAlertaMensaje('¡Tu opinión se ha guardado correctamente!');
            setOpinion('');
            setEstrellas(0);
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
                alert("Opinión actualizada con éxito");
            } else {
                throw new Error("No se pudo actualizar");
            }
            await fetchDataCompleta();
        } catch (error) {
            console.error("Error al actualizar:", error);
            setTipoAlerta('danger');
            setAlertaMensaje('Error al actualizar la opinión. Intente nuevamente.');
            setShowError(true);
        }
    };

    const habilitarEditarOpinion = () => {
        // Al ser llamada desde la card, ya tenemos los datos en los estados 
        // (seteados en validarTodo), solo falta mostrar el formulario.
        setMostrarOpinion(true);
        setPuedoActualizarOpinion(true);
        // Scroll opcional hacia el formulario
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const fetchDataCompleta = async () => {
        setIsLoading(true);
        try {
            const id = params.id;
            const userLogueado = getLoggedUser().user;
            const idOwner = userLogueado.id;

            const datosArtista = await UsersService.getUserBd(id);
            const dataReservas = await ReservasServices.getReservasPorArtistaYOwner(id, idOwner);
            const dataOpiniones = await salaService.getOpinionesArtista(id);

            setArtista(datosArtista);
            setReservas(dataReservas);
            setOpiniones(dataOpiniones);

            const mapeadas = dataReservas.map(res => ({
                id: res.id || res._id,
                fecha: res.date ? new Date(res.date).toLocaleDateString('es-AR') : 'Sin fecha',
                cliente: res.idUser ? `${res.idUser.name} ${res.idUser.last_name || ''}` : 'Usuario desconocido',
                sala: res.idRoom?.nameSalaEnsayo || 'Sala no especificada',
                estado: res.canceled ? "Cancelada" : "Activa"
            }));
            setReservasTyped(mapeadas);

            validarTodo(datosArtista, dataReservas, dataOpiniones, idOwner);
        } catch (err) {
            console.error(err);
            setError("Error cargando datos");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // const mainFetch = async () => {
        //     setIsLoading(true);
        //     try {
        //         const id = params.id;
        //         const userLogueado = getLoggedUser().user;
        //         const idOwner = userLogueado.id;

        //         // A. Traemos los datos básicos primero y ESPERAMOS los resultados reales
        //         const datosArtista = await UsersService.getUserBd(id);
        //         const dataReservas = await ReservasServices.getReservasPorArtistaYOwner(id, idOwner);
        //         const dataOpiniones = await salaService.getOpinionesArtista(id);

        //         // B. Seteamos los estados para la UI
        //         setArtista(datosArtista);
        //         setReservas(dataReservas);
        //         setOpiniones(dataOpiniones);

        //         // C. MAPEAMOS las reservas para la tabla (usa dataReservas, no el estado 'reservas')
        //         const mapeadas = dataReservas.map(res => ({
        //             id: res.id || res._id,
        //             fecha: res.date ? new Date(res.date).toLocaleDateString('es-AR') : 'Sin fecha',
        //             cliente: res.idUser ? `${res.idUser.name} ${res.idUser.last_name || ''}` : 'Usuario desconocido',
        //             sala: res.idRoom?.nameSalaEnsayo || 'Sala no especificada',
        //             estado: res.canceled ? "Cancelada" : "Activa"
        //         }));
        //         setReservasTyped(mapeadas);

        //         // D. AHORA EJECUTAMOS LAS VALIDACIONES pasando los datos frescos recién obtenidos
        //         // No uses 'artista' o 'reservas' (estados), usa 'datosArtista' y 'dataReservas' (variables locales)
        //         validarTodo(datosArtista, dataReservas, dataOpiniones, idOwner);

        //     } catch (err) {
        //         console.error(err);
        //         setError("Error cargando datos");
        //     } finally {
        //         puedeUsuarioActualizarOpinion()
        //         setIsLoading(false);
        //     }
        // };

       // mainFetch();
       fetchDataCompleta();
    }, [params.id]); // Solo se ejecuta cuando cambia el ID del artista


    // Nueva función auxiliar para encapsular la lógica de permisos
    const validarTodo = (artistaData, reservasData, opinionesData, ownerId) => {
        const artistaId = artistaData?._id || artistaData?.id;
        if (!artistaId || !ownerId) return;

        // 1. ¿Tiene historial de alquileres con este artista?
        const historial = reservasData.filter(res => {
            const rClient = res.idUser?._id || res.idUser;
            const rOwner = res.idOwner?._id || res.idOwner;
            return rClient?.toString() === artistaId.toString() && rOwner?.toString() === ownerId.toString();
        });

        // 2. ¿Buscamos si el dueño ya dejó una opinión?
        const opinionPrevia = opinionesData?.find(op => 
            (op.idUser?._id || op.idUser)?.toString() === ownerId.toString()
        );

        if (historial.length > 0) {
            setPuedoOpinar(true); // Tiene el derecho a opinar por haber alquilado
            
            if (opinionPrevia) {
                // SI YA OPINÓ: Bloqueamos nueva opinión y preparamos edición
                setPuedoActualizarOpinion(true);
                setMostrarOpinion(false); // Ocultamos el formulario de "Crear" por defecto
                
                // Seteamos los datos de la opinión existente para que al editar ya estén ahí
                setOpinion(opinionPrevia.descripcion);
                setEstrellas(opinionPrevia.estrellas);
                console.log('opinion.id: ', opinionPrevia.id)
                setIdActualizarOpinion(opinionPrevia.id);
            } else {
                // SI NO HA OPINADO: Mostramos el formulario para crear
                setPuedoActualizarOpinion(false);
                setMostrarOpinion(true);
            }
        } else {
            // No tiene reservas, no puede hacer nada
            setPuedoOpinar(false);
            setMostrarOpinion(false);
        }
    };
      

    return (isLoading || !artista 
        ? (
        <LoadingSpinner centered={true} size="lg" text="Cargando artista..." />
        ) 
        :(
        <div>
            <div className="w-100">
                <div className="w-100 d-flex flex-column px-4">
                    <div className="d-flex flex-column col-11 bg-white border border-1 border-tertiary rounded-3 p-3 mb-3 ms-5">
                        <div>
                            <ArtistHomeCard 
                                artista={artista} />
                        </div>
                        <div
                            className="d-flex flex-column col-11 bg-white border border-1 border-tertiary rounded-3 p-3 mb-3 mt-5 ms-3"
                        >
                            <h4>Reservas a mis salas</h4>
                            <hr />
                            {/* Aquí puedes mapear las próximas reservas y mostrarlas */}
                            <div>
                                <table className="table rounded-3">
                                <thead>
                                    <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Sala</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservasTyped.length > 0 ? (
                                    reservasTyped.map((reserva, index) => (
                                        <tr
                                        key={reserva.id}
                                        cursor="pointer"
                                        onClick={() =>
                                            navigate(`/owner/ver-reserva/${reserva.id}`)
                                        }
                                        >
                                        {/* mapear datos, date, reserva.IdUSer.name lasName, reserva.idRoom.nameSalaEnsayo, estado canceled */}
                                        <td>{reserva.fecha}</td>
                                        <td>{reserva.cliente}</td>
                                        <td>{reserva.sala}</td>
                                        <td>{reserva.estado}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm">
                                            Ver Reserva
                                            </button>
                                        </td>
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                        No hay próximas reservas.
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                                </table>
                            </div>
                        </div>
                        <div 
                            className="mt-3 px-4 w-100">
                            <h4>Opiniones</h4>
                            {opiniones && opiniones.length > 0 ? (
                                opiniones.map((opinion, index) => (
                                    <OpinionCard key={index} opinion={opinion} idUserLogged={loggedUser.id} puedoActualizar={habilitarEditarOpinion} setIdActualizarOpinion={setIdActualizarOpinion}/>
                                ))
                            ) : (
                                <p>No hay opiniones disponibles para este artista.</p>
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
                    
                </div>
            </div>
        </div>
        ))
};

export default ArtistaPage;
