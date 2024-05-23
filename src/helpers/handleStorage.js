export const setSessionItem = (key, value) => {
    return sessionStorage.setItem(key, JSON.stringify(value));
}
export const getSessionItem = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
}
export const clearSessionItem = (key) => {
    return sessionStorage.removeItem(key);
}
export const setLocalStorageItem = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
}
export const getLocalStorageItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
}
