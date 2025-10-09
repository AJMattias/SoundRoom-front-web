export const LOCALHOST_ENDPOINT = "http://localhost:3000"
export const PRODUCTION_ENDPOINT = "https://sound-room-api.vercel.app"
//export const PRODUCTION_ENDPOINT = "https://sound-room-api-git-dev-alemats-projects-87f33e2d.vercel.app"

export function getBaseUrl() {
    // const stored = LocalPhoneStorage.get(STORAGE_ENDPOINT) 
    // return stored ? stored : LOCALHOST_ENDPOINT
    return LOCALHOST_ENDPOINT
}

export function getProdctionUrl() {
    return PRODUCTION_ENDPOINT
}