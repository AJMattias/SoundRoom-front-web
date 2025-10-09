
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RoomService } from "../../services/SalaDeEnsayoService"
import { useLocation, useNavigate } from "react-router-dom"
import DaysCheckbox from "../../components/DaysCheckbox"
import Alerta from "../../components/Alerta"
import { days } from "../../entities/days"
import { Badge, Button, InputGroup } from "react-bootstrap"
import { CircleMinus, PlusCircle, Trash2, XCircle } from "lucide-react"
import AlertaGreen from "../../components/AlertaGreen"


const CreateSalaPage = () => {
    const location = useLocation();
    const sala = location.state?.sala; // Datos de la sala si estamos en modo edición
    console.log('sala desde location: ', sala);

    const { register, handleSubmit, setValue, watch } = useForm()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showError, setShowError] = useState(false) // Parece no usarse, podrías quitarlo
    const navigate = useNavigate()

    // Estado para saber si estamos actualizando una sala existente
    const [update, setUpdate] = useState(false)

    // Estado para almacenar los IDs de las imágenes que deben ser eliminadas del servidor
    // Se actualiza directamente cuando el usuario hace clic en el "trash" para una imagen existente.
    const [imagesToDelete, setImagesToDelete] = useState([]);

    // Estado para los datos del formulario de la sala
    const [salaEnsayo, setSalaEnsayo] = useState({
        name: location.state?.sala?.nameSalaEnsayo || "",
        description: location.state?.sala?.descripcion || "",
        address: location.state?.sala?.calleDireccion || "",
        price: location.state?.sala?.precioHora || 0,
        comodities: location.state?.sala?.comodidades || [],
    })

    const [available, setAvailable] = useState(false)

    // Estado para manejar la entrada de comodidades y la lista
    const [comodityInput, setComodityInput] = useState('');
    const [selectedDays, setSelectedDays] = useState([]); // Horarios seleccionados
    const [tipoSala, setTipoSala] = useState([{ id: 0, name: '' }]) // Parece no usarse directamente en el formulario
    const [tipoSalaSelected, setTipoSalaSelected] = useState({ id: 0, name: '' }) // Parece no usarse directamente en el formulario

    // Estados para la subida de imágenes (contiene tanto imágenes nuevas como existentes)
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);


    // Maneja el cambio en el input de archivo para agregar nuevas imágenes
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);

            // Validar límite de 10 imágenes
            if (selectedImages.length + files.length > 10) {
                setError('Solo puedes subir un máximo de 10 imágenes');
                return;
            }

            const newImages = files.map(file => ({
                file, // El objeto File real (para nuevas subidas)
                preview: URL.createObjectURL(file), // URL para previsualización en el frontend
                description: '', // Descripción inicial vacía
                enabled: true, // Habilitada por defecto
                id: Date.now() + Math.random().toString(36).substr(2, 9) // ID temporal único para el frontend
            }));
            setSelectedImages(prev => [...prev, ...newImages]);
            setError(''); // Limpia cualquier error previo
        }
    };

    // Eliminar imagen de la selección del frontend
    const handleRemoveImage = (id) => {
        const imageToRemove = selectedImages.find(img => img.id === id);
        if (imageToRemove) {
            // Si la imagen a eliminar NO es un archivo nuevo (es decir, ya existía en el servidor)
            if (imageToRemove.file === null) {
                // Agrega su ID al estado de imágenes a eliminar
                setImagesToDelete(prev => [...prev, imageToRemove.id]);
            } else {
                // Si es una imagen nueva (tiene un File), revoca su URL de objeto
                URL.revokeObjectURL(imageToRemove.preview);
            }
            // Elimina la imagen del estado de imágenes seleccionadas
            setSelectedImages(prev => prev.filter(img => img.id !== id));
        }
    };

    // Callback para actualizar los días seleccionados desde el componente DaysCheckbox
    const handleDaysChange = useCallback((updatedSelectedDays) => {
        setSelectedDays(updatedSelectedDays);
        console.log('Días seleccionados/modificados recibidos:', updatedSelectedDays);
    }, []);

    // Actualizar descripción de una imagen en la selección
    const handleImageDescriptionChange = (id, description) => {
        setSelectedImages(prev =>
            prev.map(img =>
                img.id === id ? { ...img, description } : img
            )
        );
    };

    // Actualizar estado habilitado de una imagen en la selección
    const handleImageEnabledChange = (id, enabled) => {
        setSelectedImages(prev =>
            prev.map(img =>
                img.id === id ? { ...img, enabled } : img
            )
        );
    };

    // Función genérica para subir imágenes al backend
    // Recibe un array de objetos de imagen (con 'file' y 'description'/'enabled')
    const uploadImagesToServer = async (imagesToUpload) => {
        if (imagesToUpload.length === 0) {
            return []; // No hay imágenes para subir, retorna un array vacío
        }

        setIsUploading(true);
        setUploadProgress(0);
        try {
            const formData = new FormData();

            // 1. Añadir los archivos de imagen al FormData
            imagesToUpload.forEach((img) => {
                if (img.file instanceof File) {
                    formData.append('images', img.file, img.file.name);
                }
            });

            // 2. Añadir los metadatos de las imágenes como un string JSON
            const metadataToSend = imagesToUpload.map(img => ({
                description: img.description,
                enabled: img.enabled
            }));
            formData.append('imageMetadata', JSON.stringify(metadataToSend));

            // Configurar el evento de progreso para la barra de carga
            const config = {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                }
            };

            const uploadedImagesData = await RoomService.uploadMultipleImages(formData, config);
            console.log('Datos de imágenes subidas al servidor:', uploadedImagesData);
            return uploadedImagesData.images; // Retorna los objetos de imagen subidos (con sus IDs reales del backend)
        } catch (error) {
            console.error('Error al subir imágenes al servidor:', error);
            setError('Error al subir imágenes. Intente nuevamente.');
            throw error; // Relanza el error para que sea manejado por el bloque catch de onSubmit
        } finally {
            setIsUploading(false);
        }
    };

    // Añadir una comodidad a la lista
    const handleAddComodity = () => {
        if (comodityInput.trim() !== '') {
            const newComodity = comodityInput.trim();
            setSalaEnsayo(prev => ({
                ...prev,
                comodities: [...prev.comodities, newComodity]
            }));
            setComodityInput('');
        }
    };

    // Eliminar una comodidad de la lista
    const handleRemoveComodity = (index) => {
        setSalaEnsayo(prev => ({
            ...prev,
            comodities: prev.comodities.filter((_, i) => i !== index)
        }));
    };

    // Función principal de envío del formulario (crear o actualizar)
    const onSubmit = async (values) => {
        if (update) {
            // Lógica para ACTUALIZAR una sala existente
            let newlyUploadedImageObjects = [];
            // Filtra las imágenes que son archivos nuevos (no las que ya estaban en el servidor)
            const newFilesToUpload = selectedImages.filter(img => img.file instanceof File);
            // Filtra las imágenes existentes que el usuario ha mantenido en el formulario
            const currentImagesOnForm = selectedImages.filter(img => img.file === null);

            try {
                // Sube solo las imágenes nuevas que el usuario ha añadido
                newlyUploadedImageObjects = await uploadImagesToServer(newFilesToUpload);
            } catch (error) {
                // El error ya se manejó en uploadImagesToServer, solo detenemos la ejecución aquí
                return;
            }

            try {
                // Prepara el array final de imágenes para enviar al backend
                // Incluye las imágenes existentes (con sus posibles cambios en descripción/habilitado)
                // y las IDs de las imágenes recién subidas.
                const finalImagesForUpdate = [
                    // ...currentImagesOnForm.map(img => ({ // Imágenes existentes con metadatos actualizados
                    //     id: img.id,
                    //     description: img.description,
                    //     enabled: img.enabled
                    // })),
                    ...newlyUploadedImageObjects.map(img => ({ // Nuevas imágenes subidas
                        id: img.id,
                        description: img.description,
                        enabled: img.enabled
                    }))
                ];

                const horarios = selectedDays.map(({ id, ...rest }) => rest);

                const salaData = {
                    id: sala.id, // Es crucial pasar el ID de la sala para la actualización
                    name: values.nombre,
                    description: values.descripcion,
                    address: values.direccion,
                    price: values.precio,
                    comodities: salaEnsayo.comodities,
                    horarios: horarios,
                    availability: available,
                    images: finalImagesForUpdate, // Pasa la estructura completa de imágenes
                    imagesToDelete: imagesToDelete // Envía los IDs de las imágenes a eliminar (recopilados en handleRemoveImage)
                };

                console.log("Datos de la sala para actualizar:", salaData);

                // Llama al servicio para actualizar la sala
                // Asegúrate de que RoomService.updateRoom acepte el ID y los datos
                const response = await RoomService.update(salaData);
                if (response.status === 200) {
                    console.log('Respuesta de actualización: ', response);
                    setSuccess('Sala actualizada exitosamente!');
                    navigate("/owner/sala-ensayo/" + sala.id); // Navega a la página de detalles de la sala actualizada
                } else {
                    setError('Hubo un error al actualizar la sala, intente nuevamente mas tarde');
                }
            } catch (error) {
                console.error('Error actualizando sala:', error);
                setError('Error actualizando sala, Intente nuevamente mas tarde');
            }
            
        } else {
            // Lógica para CREAR una nueva sala
            let uploadedImages = [];
            try {
                // Sube todas las imágenes seleccionadas para la creación de una nueva sala
                uploadedImages = await uploadImagesToServer(selectedImages);
            } catch (error) {
                // El error ya se manejó en uploadImagesToServer, solo detenemos la ejecución aquí
                return;
            }
            const horarios = selectedDays.map(({ id, ...rest }) => rest);

            try {
                const salaData = {
                    name: values.nombre,
                    description: values.descripcion,
                    address: values.direccion,
                    price: values.precio,
                    comodities: salaEnsayo.comodities,
                    horarios: horarios,
                    availability: available,
                    images: uploadedImages.map(img => ({ // Formato esperado por el backend
                        id: img.id,
                        description: img.description,
                        enabled: img.enabled
                    }))
                };
                console.log("Datos de la sala para enviar (creación):", salaData);
                const response = await RoomService.saveRoom(salaData);
                if (response.status === 200) {
                    console.log('Respuesta de creación: ', response);
                    setSuccess('Sala creada exitosamente!');
                    navigate("/owner/sala-ensayo/" + response.id);
                } else {
                    setError('Hubo un error al crear la sala, intente nuevamente mas tarde');
                }
            } catch (error) {
                console.log('Error guardando sala:', error);
                setError('Error guardando sala, Intenta nuevamente mas tarde');
            }
        }
    }

    // Efecto para cargar datos iniciales de la sala si se está editando
    useEffect(() => {
        const fetchTipoSalas = async () => {
            const response = await RoomService.getTipoSalas();
            if (response && response.length > 0) {
                setTipoSala(response);
                setTipoSalaSelected(response[0]);
            }
        };
        fetchTipoSalas();

        if (location.state?.sala) {
            const sala = location.state.sala;

            setValue("nombre", sala.nameSalaEnsayo);
            setValue("descripcion", sala.descripcion);
            setValue("direccion", sala.calleDireccion);
            setValue("precio", sala.precioHora);
            setUpdate(true); // Indica que estamos en modo de actualización

            // Establecer comodidades
            setSalaEnsayo(prev => ({
                ...prev,
                comodities: sala.comodidades || []
            }));

            // Adaptar imágenes existentes para el estado selectedImages
            const imagenesAdaptadas = sala.imagenes.map((img) => ({
                id: img._id, // Usar el ID real de la imagen del backend
                preview: img.url, // URL de la imagen existente
                description: img.descripcion || '',
                enabled: img.visible ?? true,
                file: null // Importante: estas no son archivos nuevos, por eso 'file' es null
            }));
            setSelectedImages(imagenesAdaptadas);
            // No necesitamos originalSalaImages si imagesToDelete se gestiona al hacer clic.
            // setOriginalSalaImages(imagenesAdaptadas); // Eliminado ya que imagesToDelete lo maneja

            // Establecer horarios
            if (sala.horarios && sala.horarios.length > 0) {
                console.log('horarios de la sala: ', sala.horarios);
                setSelectedDays(sala.horarios);
            }
        }
    }, [location.state?.sala, setValue]); // Dependencias para re-ejecutar cuando cambia la sala o setValue

    return (
        <div className="container mx-5">
            <div className="col-10 d-flex flex-column rounded-3 p-5 mt-1 justify-content-start bg-white border">
                <div className="p-3">
                    <div>
                        <h2>{update ? "Editar Sala de Ensayo" : "Crear Sala de Ensayo"}</h2>
                    </div>
                    <div>
                        {error && <Alerta mensaje={error} onClose={() => setError("")} />}
                        {success && <AlertaGreen mensaje={success} onClose={() => setSuccess("")} />}
                    </div>
                    {/* Formulario para crear o editar sala */}
                    <div className="w-100">
                        <form className="w-100 row g-2 px-3" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="text"
                                placeholder="Nombre de sala"
                                {...register("nombre", { required: true })}
                                defaultValue={watch("nombre", "")}
                                className="form-control mb-2"
                            />
                            {/* Descripción debe ser multilinea */}
                            <textarea
                                placeholder="Descripción"
                                {...register("descripcion", { required: true })}
                                defaultValue={watch("descripcion", "")}
                                className="form-control mb-2"
                                rows="3"
                            />
                            <input
                                type="text"
                                placeholder="Dirección"
                                {...register("direccion", { required: true })}
                                defaultValue={watch("direccion", "")}
                                className="form-control mb-2"
                            />
                            <input
                                type="number"
                                placeholder="Precio por hora"
                                {...register("precio", { required: true, valueAsNumber: true })}
                                defaultValue={watch("precio", "")}
                                className="form-control mb-2"
                            />
                            <div className="d-flex align-items-center mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    onChange={() => setAvailable(!available)}
                                    checked={available}
                                    id="availability-checkbox"
                                />
                                <label className="form-check-label mx-2" htmlFor="availability-checkbox">
                                    Habilitación
                                </label>
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label">Comodidades</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {salaEnsayo.comodities.map((comodity, index) => (
                                        <span
                                            key={index}
                                            className="badge bg-white border border-warning text-black pt-2 px-3 align-items-center align-content-center gap-2 mx-2 rounded-pill"
                                        >
                                            {comodity}
                                            <button
                                                type="button"
                                                className="btn-close btn-sm ms-2"
                                                aria-label="Close"
                                                onClick={() => handleRemoveComodity(index)}
                                            />
                                        </span>
                                    ))}
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Agregar comodidad"
                                        value={comodityInput}
                                        onChange={(e) => setComodityInput(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-warning d-flex align-items-center"
                                        onClick={handleAddComodity}
                                        disabled={!comodityInput.trim()}
                                    >
                                        <PlusCircle className="me-2 h-4 w-4" /> Agregar
                                    </button>
                                </div>
                                <hr className="mt-4"/>
                            </div>

                            <h3 className="mt-2">Gestión de Imágenes</h3>
                            {selectedImages && (
                                <>
                                    <div className="container mt-4">
                                        {/* Título y contador */}
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4>Imágenes seleccionadas</h4>
                                            <span className="badge bg-secondary">
                                                {selectedImages.length} / 10 imágenes
                                            </span>
                                        </div>

                                        {/* Grid responsive de imágenes */}
                                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                                            {selectedImages?.map((image) => (
                                                <div key={image.id} className="col d-flex">
                                                    <div className="card w-100 shadow-sm rounded-lg" style={{
                                                        aspectRatio: '1/1.2',
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                    }}>
                                                        {/* Contenedor de imagen cuadrada */}
                                                        <div className="flex-grow-1 position-relative rounded-top-lg overflow-hidden" style={{
                                                            aspectRatio: '1/1'
                                                        }}>
                                                            <img
                                                                src={image.preview}
                                                                className="position-absolute w-100 h-100"
                                                                alt="Preview"
                                                                style={{
                                                                    objectFit: 'cover',
                                                                    objectPosition: 'center',
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    transform: 'translate(-50%, -50%)'
                                                                }}
                                                                onError={(e) => {
                                                                    e.target.src = 'https://placehold.co/300x300/e0e0e0/555555?text=Imagen+no+disponible';
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Cuerpo de la card con controles */}
                                                        <div className="card-body p-2 d-flex flex-column" style={{
                                                            flex: '0 0 auto'
                                                        }}>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-2"
                                                                placeholder="Descripción de la imagen"
                                                                value={image.description}
                                                                onChange={(e) => handleImageDescriptionChange(image.id, e.target.value)}
                                                            />

                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="form-check form-switch">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        checked={image.enabled}
                                                                        onChange={(e) => handleImageEnabledChange(image.id, e.target.checked)}
                                                                        id={`enable-${image.id}`}
                                                                    />
                                                                    <label className="form-check-label small" htmlFor={`enable-${image.id}`}>
                                                                        Habilitada
                                                                    </label>
                                                                </div>

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-danger btn-sm rounded-circle p-1"
                                                                    onClick={() => handleRemoveImage(image.id)}
                                                                    title="Quitar imagen"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Input para agregar más imágenes */}
                                        <div className="mt-4 text-center">
                                            <label className="btn btn-warning btn-sm rounded-pill shadow-sm px-4 py-2">
                                                <PlusCircle size={20} className="me-2" />
                                                Agregar imágenes
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    multiple
                                                    style={{ display: 'none' }}
                                                    disabled={selectedImages.length >= 10}
                                                />
                                            </label>
                                            {isUploading && (
                                                <div className="progress mt-3">
                                                    <div
                                                        className="progress-bar progress-bar-striped progress-bar-animated"
                                                        role="progressbar"
                                                        style={{ width: `${uploadProgress}%` }}
                                                        aria-valuenow={uploadProgress}
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    >
                                                        {uploadProgress}%
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            <hr className="mt-4"/>
                            <div className="mt-3">
                                <DaysCheckbox
                                    days={days}
                                    initialSelectedDays={selectedDays}
                                    setDays={handleDaysChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-warning w-auto mt-3 px-4 py-2 rounded-pill shadow">
                                {update ? "Guardar Cambios" : "Crear Sala"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateSalaPage;
