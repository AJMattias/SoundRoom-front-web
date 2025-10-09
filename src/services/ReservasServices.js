import { api } from "../api/ApiClient";
import { getBaseUrl } from "../network/Endpoint.js";
import { ApiException } from "../exception/ApiException.js";
import { formatFecha2 } from "../utils/dateHelper.js";

class ReservasServices {

    async getReservasOwner() {
        const reservas = await api.get("/reservations/findReservationbyOwner/");
        return reservas;
    }

    //get las reservas de la semana
    async getReservasSemana() {
        const reservas = await api.get("/reservations/reservasSemana/");
        return reservas;
    }

    async getReservasMes() {
        const reservas = await api.get("/reservations/reservasMes/");
        return reservas;
    }

    async getReservasAnio() {
        const reservas = await api.get("/reservations/reservasAnio/");
        return reservas;
    }

    async getReservasRangoFechas(fechaInicio, fechaFin) {
        const formattedFechaInicio = formatFecha2(fechaInicio);
        const formattedFechaFin = formatFecha2(fechaFin);
        console.log("formattedFechaInicio: ", formattedFechaInicio)
        console.log("formattedFechaFin: ", formattedFechaFin)
        const reservas = await api.get(`/reservations/reservasRangoFechas?fechaInicio=${formattedFechaInicio}&fechaFin=${formattedFechaFin}`);
        return reservas;
    }

}

export const ReservasService = new ReservasServices();
