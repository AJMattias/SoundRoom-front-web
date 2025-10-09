/* eslint-disable no-unused-vars */
import { api } from "../api/ApiClient";
import {
  STORAGE_USER,
  getJwtToken,
  getMyRooms,
  setMyRooms,
} from "../storage/LocalStorage";
import { getBaseUrl } from "../network/Endpoint.js";
import { ApiException } from "../exception/ApiException.js";
import { formatFecha2 } from "../utils/dateHelper.js";

class SalaDeEnsayoService {
  async getRoomBd(roomId) {
    const room = await api.get("/salasdeensayo/findOne/?id=" + roomId);
    console.log(room);
    return room;
  }

  async getRoomsByUserIdBd() {
    const user = localStorage.getItem(STORAGE_USER);
    console.log('logged user: ', user);
    const userId = user ? JSON.parse(user).id : null;
    console.log("userId: ", userId);
    const ownerRooms = await api.get(
      "/salasdeensayo/findByOwner/?id=" + userId
    );
    console.log(ownerRooms);
    return ownerRooms;
  }

  //buscar salas populares
  async getPopulars() {
    console.log("fetching popular rooms");
    const response = await api.get("/salasdeensayo/findPopulars/");
    const popularRooms = response; // Asegúrate de acceder a los datos correctamente
    console.log("popularRooms: ", popularRooms);

    // Actualiza los datos con el nuevo atributo nombreDueño
    const updatedData = popularRooms.map((item) => ({
      ...item,
      nombreDueño: item.idOwner
        ? `${item.idOwner.name} ${item.idOwner.lastName}`
        : "", // Usa una cadena vacía si idOwner es null
    }));

    console.log("updatedData: ", updatedData);
    return updatedData;
  }

  //Llamada a la base de datos busqueda por nombre
  // async findByNameBd(name) {
  //   const room = await api.get("/salasdeensayo/findByName/?q=" + name);
  //   return room;
  // }

  async findByNameBdPaginated(name,page, limit) {
    let room 
    if(!page || !limit){
      room = await api.get("/salasdeensayo/findByNamePaginated/?q=" + name);
    } else {
      room = await api.get(`/salasdeensayo/findByNamePaginated/?q=${name}&page=${page}&limit=${limit}`);
    }
    console.log('response busqueda', room)
    return room;
  }

  // async getMyRooms() {
  //     const user = getMyRooms()
  //     return await this.getRoomsByUserIdBd(user.id)
  // }
  async getMyRoomsBd(userId) {
    const rooms = await api.get("salasdeensayo/findByOwner/?id=" + userId);
    if (rooms) {
      setMyRooms(rooms);
    }
    return rooms;
  }

  //crear y guardar sala en el servidor
  async saveRoom(room) {
    console.log("Room service", room);
    const roomCreated = await api.post("salasdeensayo", {
      nameSalaDeEnsayo: room.name,
      calleDireccion: room.address,
      idType: room.tipoSala,
      descripcion: room.description,
      precioHora: room.price,
      comodidades: room.comodities,
      enabled: room.available,
      imagenes: room.images,
      horarios: room.horarios,
    });
    if (roomCreated) {
      //await localStorage.set(STORAGE_ROOMOWNED, roomCreated)
      const user = localStorage.getItem(STORAGE_USER);
      console.log("user logged: ", user.user);
      //actualizar las salas del usuario en el localStorage
      //const rooms = await this.getMyRoomsBd(user.id)
      //rooms.push(roomCreated)
      // Actualiza la lista de salas en el localStorage
      // if(!rooms) {
      //     setMyRooms([roomCreated])
      // } else {
      //     setMyRooms(rooms)
      // }
      return roomCreated;
    }
  }

  async saveImages(imagenes) {
    try {
      const formData = new FormData();

      // Agregar todas las imágenes y sus metadatos
      imagenes.forEach((image, index) => {
        formData.append("images", image.file); // Campo para las imágenes
        formData.append(`titulos[${index}]`, image.titulo); // Array de títulos
        formData.append(`descripciones[${index}]`, image.descripcion); // Array de descripciones
      });

      const response = await api.post("images/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.imageIds; // Retorna los IDs de las imágenes guardadas
    } catch (error) {
      console.error("Error al guardar imágenes:", error);
      throw error;
    }
  }

  /**
   * Sube múltiples imágenes al servidor usando la API Fetch.
   * @param {FormData} formData - Objeto FormData que contiene las imágenes y metadatos.
   * @param {Object} config - Objeto de configuración (por ejemplo, para onUploadProgress, que manejaremos aparte si es necesario).
   * @returns {Promise<Object>} La respuesta del servidor.
   */
  async uploadMultipleImages(formData, config) {
    const baseUrl = getBaseUrl(); // Obtiene tu URL base (ej. 'http://localhost:3000')
    const url = `${baseUrl}/image/save`; // Construye la URL completa del endpoint

    try {
      const jwt = getJwtToken(); // Obtiene el token JWT para el encabezado de autorización

      const headers = {
        // IMPORTANTE: NO establezcas el encabezado 'Content-Type' aquí.
        // Fetch, al igual que Axios con FormData, lo establecerá automáticamente
        // al pasar un objeto FormData como 'body'. Será 'multipart/form-data; boundary=...'.
      };

      if (jwt) {
        headers["Authorization"] = `Bearer ${jwt}`; // Agrega el token de autorización
      }

      const response = await fetch(url, {
        method: "POST",
        headers: headers, // Pasa los encabezados que construimos
        body: formData, // Pasa el objeto FormData directamente como el cuerpo de la solicitud
        // fetch no tiene una propiedad 'onUploadProgress' nativa como Axios.
        // Si necesitas progreso de subida, generalmente se implementa con XMLHttpRequest
        // directamente o con un enfoque más complejo de streaming en Fetch.
        // Por ahora, omitimos la configuración 'onUploadProgress' en esta versión simple.
      });

      // Maneja los errores HTTP (fetch no lanza errores para respuestas 4xx/5xx, solo para fallos de red)
      if (!response.ok) {
        // Intenta parsear el error del cuerpo de la respuesta como JSON.
        // Si falla (por ejemplo, si no es JSON), usa un mensaje genérico.
        const errorData = await response
          .json()
          .catch(() => ({ message: "Error desconocido del servidor." }));
        console.error(
          "Error de respuesta de Fetch:",
          response.status,
          errorData
        );

        // Lanza una ApiException para mantener la consistencia con el manejo de errores de tu frontend.
        throw new ApiException(
          response.status,
          errorData.error || "UPLOAD_ERROR",
          errorData.errorCode || "UPLOAD_ERROR_CODE",
          errorData.message || "Ocurrió un error inesperado al subir imágenes.",
          errorData.arguments
        );
      }

      // Parsea y devuelve la respuesta JSON del servidor
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al subir imágenes con Fetch:", error);
      // Si el error no es ya una ApiException, lo envolvemos para mantener la consistencia.
      if (!(error instanceof ApiException)) {
        throw new ApiException(
          0,
          "NETWORK_ERROR",
          "Error de red o inesperado al subir imágenes."
        );
      }
      throw error; // Relanza la ApiException para que sea manejada por el código que llamó a esta función
    }
  }

  async update(room) {
    console.log("Room service to update", room);
    let roomCreated;
    roomCreated = await api.put("/salasdeensayo/update/?id=" + room.id, {
      //hacer opcionales los atributos a pasar
      nameSalaEnsayo: room.name,
      calleDireccion: room.address,
      idType: room.tipoSala,
      descripcion: room.description,
      precioHora: room.price,
      comodidades: room.comodities,
      enabled: room.available,
      //availability: room.availability,
      imagenes: room.images,
      horarios: room.horarios,
      imagesToDelete: room.imagesToDelete || [],
    });
    console.log("room updated: ", roomCreated);
    if (roomCreated) {
      const rooms = getMyRooms();
      console.log("rooms from local storage: ", rooms);
      console.log("room created: ", roomCreated.sala.id);
    }
    return roomCreated;
  }

  async saveRoom2(
    nameSalaDeEnsayo,
    calleDireccion,
    descripcion,
    precioHora,
    comodidades,
    tipoSala,
    enabled
  ) {
    const roomCreated = await api.post("salasdeensayo", {
      nameSalaDeEnsayo: nameSalaDeEnsayo,
      calleDireccion: calleDireccion,
      idType: tipoSala,
      descripcion: descripcion,
      precioHora: precioHora,
      comodidades: comodidades,
      enabled: enabled,
    });
    if (roomCreated) {
      const rooms = getMyRooms();
      rooms.push(roomCreated);
      setMyRooms(rooms);
    }
    return roomCreated;
  }

  //delete room from db
  async deleteRoomBd(roomId) {
    const deleted = await api.get("salasdeensayo/deletefrombd/?id=" + roomId);
    return deleted;
  }

  async searchProvinces() {
    console.log("buscando provincias");
    const lala = await api.get("province");
    return lala;
  }

  async searchLocalities(idProvincia) {
    console.log("a search localities llega " + idProvincia);
    return await api.get("province/locality?id=" + idProvincia);
  }

  async searchType() {
    return await api.get("managementType");
  }

  async searchRooms() {
    return await api.get("salasdeensayo/search");
  }

  async getPromedioSala(roomId) {
    const promedio = await api.get("/salaPromedio/?id=" + roomId);
    return promedio;
  }

  async getMyRatingForRoom(roomId) {
    const user = localStorage.get(STORAGE_USER);
    const ratings = await this.getRatings(roomId);
    console.log("room ratings");
    console.log(ratings);
    const found = ratings.filter((rating) => rating.user.id === user.id);
    return found.length ? found[0] : undefined;
  }

  //getTipoSalas
  async getTipoSalas() {
    const tipoSalas = await api.get("/managementType/");
    return tipoSalas;
  }

  //get las ganancias de la semana
  async getGananciasSemana() {
    const ganancias = await api.get("/reservations/gananciasSemana/");
    return ganancias;
  }

  //get las reservas de la semana
  async getReservasSemana() {
    const reservas = await api.get("/reservations/reservasSemana/");
    return reservas;
  }

  //get promedio estrellas de mis salas
  async getPromedioSalas() {
    const promedio = await api.get("/salasdeensayo/promedioCalificacionSalas/");
    return promedio;
  }

  async getOpinionesMisSalas() {
    const opiniones = await api.get("/salasdeensayo/opinionesAMisSalas/");
    return opiniones;
  }

  async getOpinionesSala(idSala){
    const opiniones = await api.get("/salaOpiniones/?id="+idSala);
    return opiniones;
  }

  async getOpinionesArtista(idArtista){
    const opiniones = await api.get("/opinionToArtista/?id="+idArtista);
    return opiniones;
  }

  

  //reportes Salas de ensayo con url como parametro
  async getReportesSalasDeEnsayo(url, idSala, fechaI, fechaH) {
   console.log('url: ', url)
   console.log('idSala: ', idSala)
   console.log('fechaI: ', fechaI)
   console.log('fechaH: ', fechaH)

    const reportes = await api.post(url, {
      fechaI: fechaI,
      fechaH: fechaH,
      idRoom: idSala,
    });
    console.log("reportes reporte sala ensyo: ", reportes);
    return reportes;
  }

  async getReportesSalasDeEnsayoTorta(url, fechaI, fechaH) {
    const reportes = await api.get(url, {
      fechaI: fechaI,
      fechaH: fechaH,
    });
    console.log("reportes reporte sala ensyo: ", reportes);
    return reportes;
  }


  async descargarPDF(fechaI, fechaH, url, reporte) {
    console.log("fechaI:", fechaI);
    console.log("fechaH:", fechaH);

    let fechaIn = formatFecha2(fechaI);
    let fechaHa = formatFecha2(fechaH);
    console.log("fechaIn:", fechaIn);
    console.log("fechaHa:", fechaHa);
    let name = "";

    let endpoint = "";
    const jwt = getJwtToken();
    name = `Reporte ${reporte} ${fechaIn} a ${fechaHa}.pdf`;
    endpoint = `http://localhost:3000/${url}`;
    if (!jwt) {
      console.error("Token JWT no encontrado");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          fechaI: fechaIn,
          fechaH: fechaHa,
        }),
      });

      if (!res.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el PDF con fetch:", error);
    }
  }
}

export const RoomService = new SalaDeEnsayoService();
