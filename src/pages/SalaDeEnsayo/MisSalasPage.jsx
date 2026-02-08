import { useEffect, useState } from "react";
import { RoomService as salaDeEnsayoService } from "../../services/SalaDeEnsayoService"
import { getLoggedUser } from "../../storage/LocalStorage";
import SalasCard from "../../components/SalasCard";

const MisSalasPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [misSalas, setMisSalas] = useState([]);
    const loggedUser = getLoggedUser();

    const getMyRooms = async () => {
        const response = await salaDeEnsayoService.getRoomsByUserIdBd(loggedUser.id);
        console.log('mis salas: ', response);
        setMisSalas(response);
        setIsLoading(false);
    }


    useEffect(() => {

        getMyRooms();
     }, [])

    return (
        <>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
                ) : (
                    <div className="container bg-body rounded-4 col-10 ms-5 py-3 px-4">
                        <h3>Mis Salas de Ensayo</h3>
                        <div className="d-flex w-100 flex-column align-items-start">
                            <div className="col-12 mt-2 border border-tertiary rounded-3 p-3">
                                {misSalas.length === 0 ? (
                                    <p>No tienes salas de ensayo registradas.</p>
                                ) : (
                                    misSalas.map((sala) => (
                                        <SalasCard sala={sala} key={sala.id} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MisSalasPage