/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";

// =========================================================================
// STUB: LoadingSpinner
// NOTA: Debes reemplazar este stub con tu importación original
// import LoadingSpinner from "../../components/LoadingSpinner";
// =========================================================================
const LoadingSpinner = () => (
    <div className="text-center my-4">
        <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
        </div>
    </div>
);


// =========================================================================
// STUB: RoomService
// NOTA: Debes reemplazar este stub con tu importación original
import { RoomService } from "../../services/SalaDeEnsayoService";


const SearchSalasPage = () => {
    const [name, setName] = useState('');
    // El estado guarda la respuesta completa de la API con valores seguros iniciales
    const [salasData, setSalasData] = useState({ data: [], total: 0, page: 1, limit: 10 });
    const [loading, setLoading] = useState(false);

    // Desestructuramos para mayor claridad
    const { page, limit } = salasData;

    /**
     * Maneja el cambio en la cantidad de elementos por página (Limit).
     * @param {React.ChangeEvent<HTMLSelectElement>} e Evento de cambio.
     */
    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value, 10);
        // Siempre reiniciamos a la página 1 al cambiar el límite
        buscarSala(name, 1, newLimit);
    };

    /**
     * Lógica de búsqueda principal y paginación.
     * @param {string} searchName Nombre a buscar.
     * @param {number} searchPage Número de página.
     * @param {number} searchLimit Límite de resultados por página.
     */
    const buscarSala = useCallback(async (searchName, searchPage, searchLimit) => {
        setLoading(true);
        console.log(`Buscando sala: ${searchName}, Page: ${searchPage}, Limit: ${searchLimit}`);
        
        try {
            // Llama al servicio real (o al stub que ahora falla intencionalmente)
            const response = await RoomService.findByNameBdPaginated(searchName, searchPage, searchLimit);
            console.log('Respuesta API procesada:', response);
            
            // Asignamos el objeto de paginación completo al estado
            setSalasData(response);
            
        } catch (error) {
            console.error('Error al buscar salas (probablemente RoomService no está importado):', error.message);
            // Si hay un error, reiniciamos a un estado seguro sin datos
            setSalasData({ data: [], total: 0, page: searchPage, limit: searchLimit });
        }finally{
            setLoading(false);
        }
    }, []); 

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleSearchClick = () =>{
        // Al buscar, siempre se inicia en la página 1 y con el límite actual.
        buscarSala(name, 1, limit); 
    }

    // Protección defensiva para el cálculo de totalPages (evita NaN/undefined)
    const total = salasData.total || 0;
    const currentLimit = salasData.limit || 10;
    const safeLimit = currentLimit > 0 ? currentLimit : 1; 
    
    const totalPages = Math.ceil(total / safeLimit);

    /**
     * Función para cambiar de página.
     * @param {number} newPage Nueva página a la que navegar.
     */
    const handlePageChange = (newPage) =>{
        if(newPage >= 1 && newPage <= totalPages ){
            buscarSala(name, newPage, limit);
        }
    }
    
    return (
        <div className="w-90 mx-auto">
            <div className="w-90 d-flex flex-column px-4">
                <div className="mb-4">
                    <h2>Buscar Sala de Ensayo</h2>
                </div>
                
                <div className="w-90 bg-white py-3 row justify-content-center border border-tertiary border-3 rounded-3" >
                    <div className="col-md-10 d-flex align-items-center bg-white shadow rounded-3 p-2">
                        {/* Input de Búsqueda */}
                        <input 
                            type="text" 
                            className="form-control border-0 flex-grow-1"
                            placeholder="Buscar salas de ensayo..."
                            value={name}
                            onChange={handleNameChange}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSearchClick(); }}
                        />

                        {/* Botón de Búsqueda */}
                        <button 
                            className="btn btn-warning text-white ms-3 rounded-3"
                            disabled={loading}
                            onClick={handleSearchClick}>
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>

                    <div className="col-md-10 d-flex justify-content-end align-items-center mt-3">
                        {/* CONTROL DE LÍMITE (CANTIDAD A MOSTRAR) */}
                        <div className="input-group" style={{ maxWidth: '180px' }}>
                            <label className="input-group-text" htmlFor="selectLimit">Mostrar:</label>
                            <select 
                                className="form-select" 
                                id="selectLimit" 
                                value={limit}
                                onChange={handleLimitChange}
                                disabled={loading}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                    
                    <hr className="mt-4"/>
                    
                    {/* Sección de Resultados */}
                    <div className="col-md-10 mt-3">
                        {/* Mantenemos el stub de LoadingSpinner, pero debe ser reemplazado */}
                        {loading && <LoadingSpinner />}
                        
                        {/* Condicional de mensajes y resultados: USANDO ?.length */}
                        {!loading && salasData.data?.length > 0 && (
                            <p className="text-muted text-center">
                                Resultados encontrados: **{salasData.total}**. 
                                Estás en la página **{salasData.page}** de **{totalPages}**.
                            </p>
                        )}
                        
                        {/* Condicional de la lista de salas: USANDO ?.length */}
                        {!loading && salasData.data?.length > 0 ? (
                            <ul className="list-group">
                                {/* Iteración sobre el array de datos (con un fallback seguro) */}
                                {(salasData.data || []).map((sala) => (
                                    <li key={sala.id} className="list-group-item d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm border border-secondary">
                                        <div>
                                            <h5 className="mb-1 text-primary">{sala.nameSalaEnsayo}</h5>
                                            <p className="mb-1 text-muted"><i className="bi bi-geo-alt-fill"></i> {sala.calleDireccion}</p>
                                        </div>
                                        <span className="badge bg-warning text-dark p-2 fs-6 fw-bold">
                                            ${sala.precioHora} / hora
                                        </span>
                                    </li> 
                                ))}
                            </ul>
                        ) : !loading && name.trim() !== '' && (
                            <div className="alert alert-info text-center mt-3">
                                No se encontraron salas de ensayo con el término: **{name}**
                            </div>
                        )}
                        
                        {/* Controles de Paginación */}
                        {totalPages > 1 && !loading &&(
                            <nav aria-label="Navegacion de paginas" className="mt-4">
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={()=>handlePageChange(page - 1)}
                                            disabled={page === 1}
                                        >
                                            Anterior
                                        </button>
                                    </li>
                                    
                                    {/* mostrar pagina actual */}
                                    <li className="page-item active">
                                        <button className="page-link" disabled>{page}</button>
                                    </li>
                                    
                                    {/* mostrar proxima pagina */}
                                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                        <button 
                                            className="page-link" 
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page === totalPages}
                                        >
                                            Siguiente
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchSalasPage
