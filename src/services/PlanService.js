import { createHttp } from "./BaseService";

const http = createHttp(true);

export const confirmar = (userId, messageId) => {
  console.log("estos son los datos. UserId :" + JSON.stringify(userId.id) + " Y messageId: " + messageId);
  
  const requestBody = {
    userId: userId.id, 
    messageId: messageId
  }
  return http.put('/plan/confirmar', requestBody)
    .then(response  => {
      console.log('Plan confirmado:', response.data);
      return response;

    }).catch(error => {
      console.error('Error llamada confirmar plan:', error);
    });

}