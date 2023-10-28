export function setSessionItem(key, value) {
    return sessionStorage.setItem(key, JSON.stringify(value));
}
export function getSessionItem(key) {
    return JSON.parse(sessionStorage.getItem(key));
}
export function clearSessionItem(key) {
    return sessionStorage.removeItem(key);
}
