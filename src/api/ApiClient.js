/* eslint-disable no-unused-vars */
import axios from "axios"
import { getJwtToken } from "../storage/LocalStorage.js"
import { getBaseUrl } from "../network/Endpoint.js"
import { getProdctionUrl } from "../network/Endpoint.js"
import { ApiException } from "../exception/ApiException.js"
import { convertIsoDates } from "../utils/dateHelper.js"

/**
 * Interceptor para agregar JWT en las cabeceras de las peticiones.
 */
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.headers) {
            config.headers = {};
        }
        //config.headers["Content-Type"] = "application/json";
        const jwt = getJwtToken();
        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(
            new ApiException(0, "NO_INTERNET", "No hay conexión a Internet")
        );
    }
);

/**
 * Interceptor para manejar errores de respuesta del backend.
 */
axiosInstance.interceptors.response.use(
    (response) => Promise.resolve(convertIsoDates(response.data)),
    (error) => {
        console.error("Response error:", error);
        const response = error.response || {}; // Manejo si error.response es undefined
        return Promise.reject(
            new ApiException(
                response.status || 500,
                response.data?.error || "UNKNOWN_ERROR",
                response.data?.errorCode || "UNKNOWN_ERROR_CODE",
                response.data?.message || "Ocurrió un error inesperado",
                response.data?.arguments
            )
        );
    }
);

/**
 * Transforma una URL relativa en una URL absoluta.
 * @param {String} path Ruta relativa (ej: "/users").
 * @returns {String} URL absoluta.
 */
function transformUrl(path) {
    //return getBaseUrl() + (path.startsWith("/") ? path : `/${path}`);
    return getProdctionUrl() + (path.startsWith("/") ? path : `/${path}`);
}

/**
 * API para realizar peticiones HTTP.
 */
export const api = {
    get: (path) => axiosInstance.get(transformUrl(path)),
    post: (path, body) => axiosInstance.post(transformUrl(path), body),
    put: (path, body) => axiosInstance.put(transformUrl(path), body),
    delete: (path) => axiosInstance.delete(transformUrl(path))
};

// *** Nueva instancia de API para FormData (sin interceptores que fuercen Content-Type) ***
// No tiene interceptores de solicitud adicionales que puedan sobrescribir el Content-Type.
// Solo necesitas el JWT para peticiones autenticadas, el interceptor de axiosInstance ya lo maneja.
export const fileApi = {
    post: (path, body, config) => axiosInstance.post(transformUrl(path), body, config),
    put: (path, body, config) => axiosInstance.put(transformUrl(path), body, config)
};

/**
 * API para llamadas externas.
 */
export const externalApi = {
    get: (url) => axiosInstance.get(url),
    post: (url, body) => axiosInstance.post(url, body),
    put: (url, body) => axiosInstance.put(url, body)
};
