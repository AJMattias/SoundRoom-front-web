/* eslint-disable no-unused-vars */
// import { api } from "../api/ApiClient"
// import { localStorage, STORAGE_JWT_KEY, STORAGE_USER } from "../storage/LocalStorage";

// class UsersService {
//         /**
//      *  Loguea al usuario y almacena el token JWT.
//      * @param {String} email 
//      * @param {String} password 
//      */
//         async login(email, password) {
//             const loginResponse = await api.post("auth",
//                 {
//                     email: email,
//                     password: password
//                 }
//             )
//             console.log("Login response:")
//             console.log(loginResponse)
//             if(loginResponse.token) {
//                 console.log("Got token")
//                 console.log(loginResponse.token)
//                 await localStorage.set(STORAGE_JWT_KEY, loginResponse.token)
//                 await localStorage.set(STORAGE_USER, loginResponse.user)
//             }
//             return loginResponse.user
//         }
//         async backupBD() {
//             const backup = await api.put("/configuraciones/backup")
//             return backup
    
//         }
    
//         async backupBDLoad() {
//             const backup = await api.put("/configuraciones/backupLoad")
//             return backup
    
//         }
    
    
//         async me() {
//             const user =  await api.get("users/me")
//             await localStorage.set("user", user)
//             return user
//         }
    
//         async registerSr(
//             email,
//             name,
//             lastName,
//             password,
//             idPerfil
//         ) {
//             const user = await api.post("users", {
//                 email: email,
//                 name: name,
//                 last_name: lastName,
//                 password: password,
//                 idPerfil:idPerfil
//             })
//             await localStorage.set("user", user)
//             return user
//         }
    
//         async update(
//             userId,
//             email,
//             name,
//             lastName,
//             enabled,
//             idPerfil,
//             tipoArtista,
//             password
//         ) {
//             const user =  await api.put("/users/update/?id="+userId, {
//                     email: email,
//                     name: name,
//                     last_name: lastName,
//                     enabled: enabled,
//                     idPerfil: idPerfil,
//                     tipoArtista: tipoArtista,
//                     password: password
//                 }
//             )
//             await localStorage.set("user", user)
//             return user
//         }
    
//         async habilitarUser(
//             userId,
//             email,
//             name,
//             lastName,
//             enabled
//         ) {
//             const user =  await api.put("/users/changeUserState/?id="+userId, {
//                     email: email,
//                     name: name,
//                     last_name: lastName,
//                     enabled: enabled
//                 }
//             )
//             await localStorage.set("user", user)
//             return user
//         }
    
//         async hacerAdmin(
//             userId
            
//         ) {
//             const user =  await api.put("/users/setAdmin/?id="+userId)
//             await localStorage.set("user", user)
//             return user
//         }
    
//         async deshacerAdmin(
//             userId
            
//         ) {
//             const user =  await api.put("/users/unsetAdmin/?id="+userId)
//             await localStorage.set("user", user)
//             return user
//         }
    
//         async deshabilitarUser(
//             userId,
//             email,
//             name,
//             lastName,
//             enabled
//         ) {
//             const user =  await api.put("/users/changeUserState/?id="+userId, {
//                     email: email,
//                     name: name,
//                     last_name: lastName,
//                     enabled: enabled
//                 }
//             )
//             await localStorage.set("user", user)
//             return user
//         }
    
//         async getUsers (){
//             let users = undefined
//             try {
//                 users = await api.get("/users/")
//             } catch (ignored) {}
//             return users
//         }
    
//         async getUsersUA (){
//             let users = undefined
//             try {
//                 users = await api.get("/usersUA/")
//             } catch (ignored) {}
//             return users
//         }
    
    
//         async getUserBd(userId){
//             let user = undefined
//             try {
//                 user = await api.get('/user/findUserbyId/?id='+userId)
//             } catch (ignored) {}
//             return user
//         }
    
//         //getUser to db
//         async getUserDb (userId){
//             let user
//             try {
//                 user = await api.get(`/user/findUserbyId/?id=${userId}`)
//             } catch (ignored) {}
//             return user
//         }
    
    
//         async forgotPassword(email) {
//            const tokenResponse = await api.post("/auth/create_token" , {
//                email: email
//            })
//            return tokenResponse.token
//         }
    
//         async loginWithCode(email, code) {
//             const loginResponse = await api.post("/auth/token", 
//                 {
//                     email: email, 
//                     token: code
//                 }
//             )
//             //mio
//             if(loginResponse.error){
//                 return loginResponse.msg
//             }
//             //original:
//             if(loginResponse.token) {
//                 console.log("Got token")
//                 console.log(loginResponse.token)
//                 await localStorage.set(STORAGE_JWT_KEY, loginResponse.token)
//                 await localStorage.set(STORAGE_USER, loginResponse.user)
//             }
//             return loginResponse.user
//         }
    
//         //recuperar password por link al mail
//         async resetPassword (email){
//             const resetPassword = await api.post("/user/forgot-password",{
//             email: email
//             })
//             const data= resetPassword
//             console.log('reset password link: ', data)
//             if(data.resetLink){
//                 //toggleNewPassword()
//                 // setPasswordChangeTrue()
//                 // setTokenLocalStorage(data.token)
//             }
//             return resetPassword
//         }
    
//         async changePassword(token, password){
//             try {
//                 const changedPassword = await api.post(`/reset-password/${token}`, {
//                     newPassword: password,
//                 });
//                 if (changedPassword.token) {
//                     console.log("Got token");
//                     console.log(changedPassword.token);
//                     await localStorage.set(STORAGE_JWT_KEY, changedPassword.token);
//                     await localStorage.set(STORAGE_USER, changedPassword.user);
//                     // setPasswordChangeFalse();
//                 }
//                 return changedPassword; // Devuelve la respuesta completa
//             } catch (error) {
//                 console.error("Error changing password:", error);
//                 return null; // O un valor que indique un error
//             }
//         }
// }


// userService.js

import { api } from "../api/ApiClient";
import { getJwtToken, setJwtToken, setLoggedUser} from "../storage/LocalStorage";

class UserService {

    async login(email, password) {
        console.log('login: ', email, password)
        const loginResponse = await api.post("auth", {
            email: email,
            password: password,
        });
        console.log('Response login: ', loginResponse)
        //console.log('token: ', loginResponse.token)
        if (loginResponse.token) {
            setJwtToken(loginResponse.token);
            setLoggedUser(loginResponse.user);
        }
        return loginResponse;
    }

    async backupBD() {
        return await api.put("/configuraciones/backup");
    }

    async backupBDLoad() {
        return await api.put("/configuraciones/backupLoad");
    }

    async me() {
        const user = await api.get("users/me");
        setLoggedUser(user);
        return user;
    }

    async registerSr(email, name, lastName, password, idPerfil) {
        const user = await api.post("users", {
            email: email,
            name: name,
            last_name: lastName,
            password: password,
            idPerfil: idPerfil,
        });
        setLoggedUser(user);
        return user;
    }

    async update(userId, email, name, lastName, enabled, idPerfil, tipoArtista, password) {
        const user = await api.put(`/users/update/?id=${userId}`, {
            email: email,
            name: name,
            last_name: lastName,
            enabled: enabled,
            idPerfil: idPerfil,
            tipoArtista: tipoArtista,
            password: password,
        });
        setLoggedUser(user);
        if(!user){
            return {status: 'error', message: 'Error updating user'}
        }
        return user;
    }

    async habilitarUser(userId
        //, email, name, lastName, enabled
        ) {
        const user = await api.put(`/users/changeUserState/?id=${userId}`, {
            // email: email,
            // name: name,
            // last_name: lastName,
            enabled: "habilitado",
        });
        setLoggedUser(user);
        return user;
    }

    async hacerAdmin(userId) {
        const user = await api.put(`/users/setAdmin/?id=${userId}`);
        setLoggedUser(user);
        return user;
    }

    async deshacerAdmin(userId) {
        const user = await api.put(`/users/unsetAdmin/?id=${userId}`);
        setLoggedUser(user);
        return user;
    }

    async deshabilitarUser(userId
    //    , email, name, lastName
    ) {
        const user = await api.put(`/users/changeUserState/?id=${userId}`, {
            // email: email,
            // name: name,
            // last_name: lastName,
            enabled: "deshabilitado",
        });
        setLoggedUser(user);
        return user;
    }

    async bajaUser(userId
    //    , email, name, lastName
    ) {
        const user = await api.put(`/users/changeUserState/?id=${userId}`, {
            enabled: "baja",
        });
        setLoggedUser(user);
        
        return user;
    }

    async getUsers() {
        try {
            const response = await api.get("/users/"); // Axios devuelve { data: [...] }
            if (!response) throw new Error("Respuesta sin datos");
    
            const usuarios = response.map((user) => {
                const date = new Date(user.createdAt);
                const formattedCreatedAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                
                let formattedDeletedAt = null;
                if (user.deletedAt) {
                    const deletedAt = new Date(user.deletedAt);
                    formattedDeletedAt = `${deletedAt.getDate()}/${deletedAt.getMonth() + 1}/${deletedAt.getFullYear()}`;
                }
    
                return { ...user, createdAt: formattedCreatedAt, deletedAt: formattedDeletedAt };
            });
    
            console.log("✅ get usuarios:", usuarios);
            return usuarios; // 👈 AHORA RETORNA EL ARRAY!
        } catch (error) {
            console.error("❌ Error en getUsers:", error);
            return []; // 👈 Devuelve un array vacío en caso de error
        }
    }
    

    async getUsersUA() {
        try {
            return await api.get("/usersUA/");
        } catch (ignored) {
            return undefined;
        }
    }

    async getUserBd(userId) {
        try {
            return await api.get(`/user/findUserbyId/?id=${userId}`);
        } catch (ignored) {
            return undefined;
        }
    }

    async getUserDb(userId) {
        try {
            return await api.get(`/user/findUserbyId/?id=${userId}`);
        } catch (ignored) {
            return undefined;
        }
    }

    async forgotPassword(email) {
        const tokenResponse = await api.post("/auth/create_token", { email: email });
        return tokenResponse.token;
    }

    async loginWithCode(email, code) {
        const loginResponse = await api.post("/auth/token", { email: email, token: code });
        if (loginResponse.token) {
            setJwtToken(loginResponse.token);
            setLoggedUser(loginResponse.user);
        }
        return loginResponse.user;
    }

    // async resetPassword(email) {    
    //     return await api.post("/user/forgot-password", { email: email });
    // }

    async resetPassword(email) {
        try {
            const response = await api.post("/user/forgot-password", { email });
            console.log('response userService: ', response, 'status: ', response.estatus)
            if (response.estatus === 200) {
                // Éxito: Mostrar un mensaje al usuario indicando que revise su correo
                setJwtToken(response.token);
                return { success: true, message: response.message, token: response.token };
            } else {
                // Otros errores (aunque el backend ahora debería enviar 404 o 500)
                return { success: false, message: response.message || 'Ocurrió un error inesperado.' };
            }
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de error
                if (error.response.data.estatus === 404) {
                    return { success: false, message: error.response.data.message };
                } else if (error.response.status === 500) {
                    return { success: false, message: error.response.data.message };
                } else {
                    return { success: false, message: `Error del servidor: ${error.response.status}` };
                }
            } else if (error.request) {
                // La solicitud se envió pero no se recibió respuesta (error de red, etc.)
                return { success: false, message: 'No se pudo conectar con el servidor.' };
            } else {
                // Algo salió mal al configurar la solicitud
                return { success: false, message: error.message };
            }
        }
    }

    //cambiar contraseña, con usuario logueado
    async changePassword(token, password) {
        try {
            //const changedPassword = await api.post(`/reset-password/${token}`, { newPassword: password });
            console.log('llamando al back, changePasword con token y password: ', token, password)
            const response = await fetch(`http://localhost:3000/reset-password/${token}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                 // Authorization:`Bearer ${token}`
                },
                body: JSON.stringify({ newPassword: password }),
              });

              const changedPassword = await response.json();
            // if (changedPassword.token) {
            //     setJwtToken(changedPassword.token);
            //     setLoggedUser(changedPassword.user);
            // }
            console.log('changedPassword: ', changedPassword)
            if (changedPassword.token) {
                setJwtToken(changedPassword.token);
                setLoggedUser(changedPassword.user);
            }
            return changedPassword;
        } catch (error) {
            console.error("Error changing password:", error);
            return null;
        }
    }

    async verifyCurrentPassword(currentPassword) {
        console.log('password a cambiar: ',  currentPassword.currentPassword);
        const tokenResponse = await api.post("/user/verifyPassword", { password: currentPassword.currentPassword });
        return tokenResponse;
    }

    // async cambiarPassword(oldpassword, currentPassword) {
    //     console.log('cambiar password: ', oldpassword, currentPassword);
    //     const tokenResponse = await api.post("/user/cambiarContrasenia", { oldpassword: oldpassword, password: currentPassword });
    //     console.log('response cambiar password: ', tokenResponse);
    //     return tokenResponse;
    // }

    // version ejorada usando response.status
    async cambiarPassword(oldPassword, newPassword) {
    try {
        console.log('Enviando cambio de contraseña:', { oldPassword, newPassword });
        
        const response = await api.post("/user/cambiarContrasenia", {
        oldpassword: oldPassword,
        password: newPassword
        });
        
        // Si llegamos aquí, la petición fue exitosa (status 2xx)
        console.log('Respuesta exitosa:', response);
        
        // Retorna el data directamente o un objeto con éxito
        return {
            success: true,
            user: response.user, // Incluye cualquier dato adicional del backend
            message: 'Contraseña cambiada exitosamente'
        };
        
    } catch (error) {
        console.error('Error cambiando contraseña:', error);
        
        // Extraer mensaje de error del backend si está disponible
        const errorMessage = error.response?.data?.error 
        || error.response?.data?.message 
        || error.message 
        || 'Error al cambiar la contraseña';
        
        throw new Error(errorMessage); // Lanza el error para manejarlo en el componente
    }
    }

    
}

export default new UserService();