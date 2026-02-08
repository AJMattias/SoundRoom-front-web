/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PromedioEstrellas from "./PromedioEstrellas";
import { getLoggedUser } from "../storage/LocalStorage";
import { useNavigate } from "react-router-dom";
import { RoomService as salaService} from "../services/SalaDeEnsayoService";

const SeccionOpiniones = (idObject, user) => {
    const navigate = useNavigate();
    const [opiniones, setOpiniones] = useState();
    const [loading, setLoading] = useState(true);
    const perfilLogged = user.perfil
    const id = idObject.id;
    console.log("User logged ID en SeccionOpiniones: ", id);

    const getOpiniones = async () => {
        switch (perfilLogged) {
            case perfilLogged === 'Artista':
                { const response = await salaService.getOpinionesArtista(id);
                setOpiniones(response.json);
                setLoading(false);
                break; }
            case perfilLogged === 'Sala de Ensayo':
                { const response2 = await salaService.getOpinionesSala(id)
                setOpiniones(response2.json);
                setLoading(false);
                break; }
            default:
                setOpiniones([]);
                setLoading(false);
            break;
        }
    };

    useEffect(() => {
        getOpiniones();
    }, []);



    if (opiniones?.length === 0 || opiniones === undefined) {
        return (
            <div className="bg-white border border-2 border-tertiary rounded-3 p-2 shadow mb-1">
            Aun no hay opiniones sobre mi
            </div>
    );
    }
    console.log("opiniones: ", opiniones);




    return opiniones.map((opinion, j) => (
        <div
            key={j}
            className="d-flex bg-white border border-2 border-tertiary rounded-3 p-2 mb-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/artista/ver-sala/${opinion.idRoom.id}`)}
        >
            <div
            style={{ width: "100px", height: "100px", overflow: "hidden" }}
            className="me-3"
            >
            <img
                src={
                opinion.idRoom.imagenes[0]?.url || "https://via.placeholder.com/100"
                }
                alt={opinion.idRoom.imagenes[0].titulo || "imagen perfil sala"}
                className="img-fluid rounded-3 mt-1"
                style={{ height: "100px", objectFit: "cover", width: "100px" }}
            />
            </div>
            <div>
            <h4>{opinion.idRoom.nameSalaEnsayo}</h4>
            <PromedioEstrellas averageRating={opinion.estrellas} />
            <p className="mt-2">{opinion.descripcion}</p>
            </div>
        </div>
        ));
    };

export default SeccionOpiniones;
