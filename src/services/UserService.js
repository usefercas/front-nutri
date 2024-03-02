import { createHttp } from "./BaseService";

const http = createHttp(true)

export const getCurrentUser = () => {
  return http.get('/users/me')
}

export const getUser = (id) => {
  return http.get(`/users/${id}`)
}