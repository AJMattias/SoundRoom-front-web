import { useEffect, useState } from "react";
import { RoomService as salaService } from "../../services/SalaDeEnsayoService";
import { useNavigate, useParams } from "react-router-dom";
import Alerta from "../../components/Alerta";
import CarruselImagenes from "../../components/CarruselImagenes";
import OpinionCard from "../../components/OpinionCard";

const SalaPage = () => {
    // loading sala data
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(true)
    const [sala, setSala] = useState(null)
    const [error, setError] = useState('')
    const [promedio, setPromedio] = useState(0)
    //let comodidades
    //get id pass by params
    const { id } = useParams(); // Assuming you're using react-router-dom to get the ID from the URL
    
    console.log('sala id: ', id);
    const fetchSala = async () => {
        console.log('Fetching sala with ID:', id);
        try {
            // Simulate fetching data
            const response = await salaService.getRoomBd(id); // Assuming salaService is defined and has a getSala method
            console.log('response fetched:', response);
            const data = response; // If the response is a JSON object
            console.log('data fetched:', data);
            if (!data ) {
                setError("Sala no encontrada, intente nuevamente más tarde.");
            }
            console.log('Sala data:', data);
            setSala(data);
            //comodidades = data.comodidades
            console.log('comodidades (desde data): ', data.comodidades);
        } catch (err) {
            console.log('error fetching sala:', err);
            setError("Sala no encontrada, intente nuevamente más tarde.");
        } finally {
            setisLoading(false);
        }
    };
    const fetchPromedio = async () => {
        const promedio = await salaService.getPromedioSala(id);
        console.log('Promedio de la sala:', promedio)
        setPromedio(promedio);
    }
    useEffect(() => {
        fetchSala();
        fetchPromedio();
    }, [id]);

    // Muestra un estado de carga mientras los datos se están obteniendo
    if (isLoading) {
        return (
            <div className="flex flex-col w-100 items-center justify-center min-h-screen">
                <p>Cargando sala...</p>
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
        <div className="mx-auto flex flex-col col-10 bg-white rounded-3 items-center justify-center min-h-screen">
            {error && <Alerta tipo="error" mensaje={error} />}
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
                                onClick={() => navigate(`/owner/edit-room/${sala.id}`, {state: {sala}})}>
                                Editar
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
                <div className="row flex-grow- mx-2"> {/* Usamos flex-grow-1 si quieres que ocupe el espacio vertical restante */}
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

                        <div>
                            <h4>Opiniones</h4>
                            {sala.opiniones && sala.opiniones.length > 0 ? (
                                sala.opiniones.map((opinion, index) => (
                                    <OpinionCard key={index} opinion={opinion} />
                                ))
                            ) : (
                                <p>No hay opiniones disponibles para esta sala.</p>
                            )}
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
                {/* --- FIN NUEVA ESTRUCTURA --- */}
            </div>
        </div>
    )
}

export default SalaPage