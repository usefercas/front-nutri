const JWT_KEY = 'accessToken';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";


let _accessToken = localStorage.getItem(JWT_KEY) || ''

// Fn para setear el token en el local storage y en la variable
export const setAccessToken = (token) => {
  _accessToken = token;

  localStorage.setItem(JWT_KEY, token);
  console.log('Token de acceso establecido:', token);
}

export const getAccessToken = () => {
  return _accessToken;
}

export const getUserId = () => {
  try {
    console.log(JSON.stringify(jwtDecode(_accessToken)).id);
    return jwtDecode(_accessToken);
  } catch(error) {
    console.log("Error decodificando: " + error);
  }
}

export const logout = () => {
  localStorage.removeItem(JWT_KEY);
  console.log('Usuario desconectado, redireccionando a la página de inicio de sesión...');

  window.location.assign('/login');
}