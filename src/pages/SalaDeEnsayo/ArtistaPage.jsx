/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UsersService from "../../services/UsersService";
import ReservasServices from "../../services/ReservasServices";
import LoadingSpinner from "../../components/LoadingSpinner";

const ArtistaPage = () => {
    let params = useParams();
    const [idArtista, setIdArtista] = useState()
    const [artista, setArtista] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [puedoOpinar, setPuedoOpinar] = useState(false);
    const [reservas, setReservas] = useState([])

    useEffect(() => {
    setIdArtista(params.id);
    //buscar artista por id
    const id = params.id;
    const idOwner = params.idOwner;

    const fetchArtistaData = async () => {
        try {
            console.log('id artista: ', id)
            const response = await UsersService.getUserBd(id);
            console.log('Respuesta al buscar artista:', response);
            if (!response.ok) {
                setError("Error al obtener el artista, intente nuevamente más tarde.");
                throw new Error("Error al obtener el artista");
            }
            const data = await response.json();
            setArtista(data);
        } catch (error) {
            setError('Error al obtener el artista, intente nuevamente más tarde.');
        }
    }

    const buscarSiPuedeOpinar = async () => {
        console.log('id del owner: ', idOwner)
        const reservasResponse = await ReservasServices.getReservasPorArtistaYOwner(id, idOwner);
        console.log("Reservas del artista en owner: ", reservasResponse)
        setReservas(reservasResponse);
        if(reservasResponse.length > 0){
            setPuedoOpinar(true);
        }
    }

    const fetchArtista = async () => {
        
        setIsLoading(true);
        await fetchArtistaData();
        await buscarSiPuedeOpinar();
        setIsLoading(false);
    
    };

    fetchArtista();
    
    }, []);
      

    return (isLoading 
        ? (
        <LoadingSpinner centered={true} size="lg" text="Cargando artista..." />
        ) 
        :(
        <div>Contenido Pagina</div>
        ))
};

export default ArtistaPage;
