// export const STORAGE_JWT_KEY = "jwt_key";
// export const STORAGE_USER = "user";

// // Funciones para el usuario
// export const setLoggedUser = (user) => {
//     localStorage.setItem(STORAGE_USER, JSON.stringify(user));
// };

// export const getLoggedUser = () => {
//     const user = localStorage.getItem(STORAGE_USER);
//     return user ? JSON.parse(user) : null;
// };

// export const removeLoggedUser = () => {
//     localStorage.removeItem(STORAGE_USER);
// };

// // Funciones para el token
// export const setJwtToken = (token) => {
//     localStorage.setItem(STORAGE_JWT_KEY, token);
// };

// export const getJwtToken = () => {
//     return localStorage.getItem(STORAGE_JWT_KEY);
// };

// export const removeJwtToken = () => {
//     localStorage.removeItem(STORAGE_JWT_KEY);
// };

export const STORAGE_JWT_KEY = "jwt_key";
export const STORAGE_USER = "user";
export const STORAGE_ROOMOWNED = "roomOwned";

// Funciones para manejar el usuario en localStorage
export const setLoggedUser = (user) => {
    localStorage.setItem(STORAGE_USER, JSON.stringify(user));
};

export const getLoggedUser = () => {
    const user = localStorage.getItem(STORAGE_USER);
    return user ? JSON.parse(user) : null;
};

export const removeLoggedUser = () => {
    localStorage.removeItem(STORAGE_USER);
};

// Funciones para manejar el token JWT en localStorage
export const setJwtToken = (token) => {
    localStorage.setItem(STORAGE_JWT_KEY, token);
};

export const getJwtToken = () => localStorage.getItem(STORAGE_JWT_KEY) || null;

export const removeJwtToken = () => {
    localStorage.removeItem(STORAGE_JWT_KEY);
};

export const getMyRooms = () => {
    const rooms = localStorage.getItem(STORAGE_ROOMOWNED);
    return rooms
}

export const setMyRooms = (rooms) => {
    localStorage.setItem(STORAGE_ROOMOWNED, JSON.stringify(rooms));
};

export const getRoomById =(id)=>{
    const rooms = localStorage.getItem(STORAGE_ROOMOWNED);
    if(rooms){
        const room = JSON.parse(rooms).find((room) => room.id === id)
        return room
    }
    return null
}

