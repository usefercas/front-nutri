// RecomendacionesService.js

import { createHttp } from "./BaseService";

const http = createHttp(true); // Establece useAccessToken en true si es necesario

export const generarRecetas = (datos) => {
    return http.post('/recipes', datos);

  }
  



