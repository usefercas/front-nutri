// RecomendacionesService.js

import { createHttp } from "./BaseService";

const http = createHttp(true); // Establece useAccessToken en true si es necesario

export const generarRecetas = (datos) => {
  console.log("Generando recetas con estos datos:", datos);
  return http.post('/recipes', datos);

}

export const getPlan = (userId) => {
  console.log("Get plan for user: " + userId);
  const params = {
    userId: userId,
  };
  return http.get('/recipes', { params });
  // return http.get('/recipes', { params })
  //   .then(response => {
  //     console.log("Respuest get plan: " + JSON.stringify(response));
  //     console.log("Respuest get plan2: " + JSON.stringify(response));
  //     return response;
  //   })
  //   .catch(error => console.log("Error: " + error));
}




