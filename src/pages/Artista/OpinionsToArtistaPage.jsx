/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import OpinionesArtistaCard from "../../components/OpinionToArtistCard"
//import { opiniones } from "../../data/opiniones"
import { RoomService } from "../../services/SalaDeEnsayoService"
import { getLoggedUser } from "../../storage/LocalStorage"
import LoadingSpinner from "../../components/LoadingSpinner"


const OpinionsToArtistaPage = () => {

    const [opiniones, setOpiniones] = useState([])
    const [ isloading, setIsLoading ] = useState(true)
    const [ error, setError ] = useState(null)
    const user = getLoggedUser().user


    const getOpinionsToArtista = async () => {
        try {
            const response = await RoomService.getOpinionesArtista(user.id);
            console.log('Datos recibidos de la API:', response);

            if (response) {
                setOpiniones(response); // Guardamos la respuesta real
                setIsLoading(false);
                // Si quieres ver el length real aquí, usa response.length
                console.log('Nuevo length:', response.length);
                setOpiniones(prevOpiniones => {
                    return prevOpiniones.map(opinion => ({
                        ...opinion,
                        imagenes: ['https://via.placeholder.com/100']
                    }));
                });
            }
        } catch (err) {
            setError("Error al cargar opiniones");
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getOpinionsToArtista()
    }, [])
  
    return (
    <>
        {isloading 
            ?  <LoadingSpinner />
            : <div className="w-90">
                <div className="w-90 d-flex flex-column px-4">
                    <div className="mb-4">
                        <h2>Opiniones sobre mi</h2>
                    </div>

                    
                    {opiniones.length > 0
                        ? <OpinionesArtistaCard opiniones={opiniones} />
                        : <div className="bg-white border border-2 border-tertiary rounded-3 p-2 shadow mb-1">
                            Aun no hay opiniones sobre mi
                          </div>
                    }
                </div>
            </div>        
        }
    </>
  )
}
export default OpinionsToArtistaPage

