export const LOCALHOST_ENDPOINT = "http://localhost:3000"
export const PRODUCTION_ENDPOINT = "https://sound-room-api.vercel.app"
//export const PRODUCTION_ENDPOINT = "https://sound-room-api-git-dev-alemats-projects-87f33e2d.vercel.app"


export function getBaseUrl() {
    // const stored = LocalPhoneStorage.get(STORAGE_ENDPOINT) 
    // return stored ? stored : LOCALHOST_ENDPOINT
    //return LOCALHOST_ENDPOINT
    const api_url =  process.env.API_URL
    if (!api_url) {
        console.warn("⚠️ API_URL no definida, usando fallback a localhost");
        return LOCALHOST_ENDPOINT;
    }

    return api_url;
    
}

export function getProdctionUrl() {
    return PRODUCTION_ENDPOINT
}