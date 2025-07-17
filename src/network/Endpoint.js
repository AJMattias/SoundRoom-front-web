export const LOCALHOST_ENDPOINT = "http://localhost:3000"
//export const LOCALHOST_ENDPOINT = "https://soundroom-api.onrender.com"
export function getBaseUrl() {
    // const stored = LocalPhoneStorage.get(STORAGE_ENDPOINT) 
    // return stored ? stored : LOCALHOST_ENDPOINT
    return LOCALHOST_ENDPOINT
}