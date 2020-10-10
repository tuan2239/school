
export function setToken(token : any) {
    localStorage.setItem('app-token', JSON.stringify(token));
}
export function getToken(): any {
    return JSON.parse(localStorage.getItem('app-token'));
}
export function hasToken(): any {
    return JSON.parse(localStorage.getItem('app-token')) !== null;
}
export function clearToken(): void {
    localStorage.removeItem('app-token');
}