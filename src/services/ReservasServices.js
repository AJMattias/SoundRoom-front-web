/* eslint-disable no-unused-vars */
import { api } from "../api/ApiClient";
import { getBaseUrl } from "../network/Endpoint.js";
import { ApiException } from "../exception/ApiException.js";
import { formatFecha2 } from "../utils/dateHelper.js";

class ReservasServices {

    async getReserva(id) {
        const reserva = await api.get(`/reservation/findReservationbyId/?id=${id}`);
        return reserva;
    }

    async pagarReserva(idRoom, idOwner, hsStart, hsEnd, date, totalPrice){
        console.log('Llamada a pagos/createPreference')
        const pago = await api.post("pagos/createPreference/", 
            {
                idRoom,
                idOwner,
                hsStart,
                hsEnd,
                date,
                totalPrice
            }
        )
        return pago
    }

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

    async getReservasPorArtista() {
        const reservas = await api.get(`/reservation/findReservationbyUser/`);
        console.log("Reservas por artista: ", reservas)
        return reservas;
    }

    async cancelarReserva(id) {
        const reservas = await api.get(`/reservation/cancel/?id=${id}`);
        console.log("Reserva cancelada por artista: ", reservas.canceled)
        if(reservas.canceled){
            return true;
        }else{
            return false;
        }
    }

}

export const ReservasService = new ReservasServices();
