import { api } from "../api/ApiClient";
//import { setJwtToken, setLoggedUser} from "../storage/LocalStorage.js";

 class PerfilService {

    async getPerfiles (){
        try {
            const response = await api.get("perfiles");  // Cambiar "perfils" a la ruta correcta si es necesario
            console.log(' call perfiles: response:', response)
            return response;  // Asegúrate de usar `response.data` si usas `axios`
        } catch (error) {
            console.error("Error fetching perfiles:", error);
            return [];  // Retornar un array vacío si hay un error
        }
    }

    async createPerfil(perfil){
        const permisoCreado = await api.post("perfiles", {
            name: perfil
        });
        return permisoCreado
    }

    async getPerfil(id){
        try {
            const response = await api.get(`perfil/?id=${id}`);  // Cambiar "perfils" a la ruta correcta si es necesario
            console.log(' get perfil: response:', response)
            return response;  // Asegúrate de usar `response.data` si usas `axios`
        } catch (error) {
            console.error("Error fetching perfil:", error);
            return (error);  // Retornar un array vacío si hay un error
        }
    }

    async updatePerfil(id, name){
        const updatedPerfil = await api.put(`perfil/update/?id=${id}`,{
            name: name
        });
        return updatedPerfil
    }

    async deletePerfil(id){
        const deleted = await api.put(`permiso/deletePerfil/?id=${id}`);
        return deleted
    }

    async addPermisosToPerfil(id, permisos){
        console.log('peerfilservice add permisos a perfil- id, permisos: ', id, permisos)
        const response = await api.put(`perfil/addPermisoToPerfil/?id=${id}`,
            {permisos:permisos}
        )
        console.log(response)
        return response
    }

    //--------------------permisos--------------------

    async createPermiso(permiso){
        const permisoCreado = await api.post("permisos", {
            name: permiso
        });
        return permisoCreado
    }

    async getPermisos(){
        const permisos = await api.get("permisos");
        console.log(permisos)
        return permisos
    }

    async updatePermiso(id, name){
        const permisoActualizado = await api.put(`permiso/?id=${id}`, {
            name: name
        });
        return permisoActualizado
    }

    async deletePErmiso(id){
        const deleted = await api.put(`permiso/deletePermiso/?id=${id}`);
        return deleted
    }


}

export const PerfilesService = new PerfilService()