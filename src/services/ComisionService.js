import { api } from "../api/ApiClient";

class ComisionService{

    async createComision(porcentaje){
        try{
            const comision = await api.post("comision", {
                porcentaje
            })
            console.log('comisionService: ', comision)
            return comision
        }catch(error){
            console.log('error comison service: ', error)
            return error
        }
    }

    async getComisiones(){
        const comisiones = await api.get("comisiones");
        console.log(comisiones)
        return comisiones
    }

    async getComisoin(id){
        try {
            const response = await api.get(`comision/?id=${id}`);  // Cambiar "perfils" a la ruta correcta si es necesario
            console.log(' get comision: response:', response)
            return response;  // Asegúrate de usar `response.data` si usas `axios`
        } catch (error) {
            console.error("Error fetching comision:", error);
            return (error);  // Retornar un array vacío si hay un error
        }
    }

    async updateComision(id){
        const updatedComision = await api.put(`comision/actualizarComision/?id=${id}`);
        return updatedComision
    }

    async deleteComision(idComision){
        return await api.put("/comision/deleteComision/?id="+idComision)
    }

    async sofDeleteComision(id){
        const updatedComision = await api.put(`comision/actualizarComision/?id=${id}`);
        return updatedComision
    }

    

}

export const ComisionsService = new ComisionService()