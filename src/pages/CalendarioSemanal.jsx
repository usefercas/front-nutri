import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from "clsx";
import { confirmar } from "../services/PlanService";
import Button from "../components/Button"
import { getUserId } from '../stores/AccessTokenStore';
import { useNavigate } from "react-router-dom";

function CalendarioSemanal({ diets, messageId }) {
  const msgId = { messageId };
  console.log(messageId)
  const ddd = { diets };
  console.log(JSON.stringify(ddd));
  const [calendar, setCalendar] = useState([]);
  console.log(ddd.diets.desayuno.map(des => des.receta));
  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 para Domingo, 1 para Lunes, etc.

    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - currentDay);

    const newCalendar = [];
    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        const day = new Date(firstDayOfWeek);
        day.setDate(firstDayOfWeek.getDate() + j + (i * 7));
        week.push(day.getDate());
      }

      newCalendar.push(week);
    }

    setCalendar(newCalendar);
  }, []);

  const navigate = useNavigate();
  
  const handleRequest = (messageId) => {
  const xxx = JSON.stringify(messageId);
  console.log("Message id : " + xxx);
  confirmar(getUserId(), messageId.messageId)
    .then(response => {
      console.log("Plan Confirmado");
      navigate('/profile');
    })
    .catch(error => console.log("Error guardando plan: " + error));
}

  // Lógica para guardar las receta
  return (
    <div className="container">
      <h1 className="mt-5 mb-3">Calendario Semanal</h1>
      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Domingo</th>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                  <th>Sábado</th>
                </tr>
              </thead>
              <tbody id="calendar-body">
                {calendar.map((week, index) => (
                  <tr key={index}>
                    {week.map((day, dayIndex) => (
                      <td key={dayIndex}>
                        {day}
                        <RecipeCard receta={JSON.stringify(ddd.diets.desayuno[dayIndex])} />
                        <RecipeCard receta={JSON.stringify(ddd.diets.comida[dayIndex])} />
                        <RecipeCard receta={JSON.stringify(ddd.diets.cena[dayIndex])} />
                      </td> // todo insertar recetas
                      // <RecipeCard receta={JSON.stringify(ddd.diets.desayuno[])} />
                      // ddd.diets.desayuno.map(x =>   <td key={dayIndex}>{day} <RecipeCard receta={JSON.stringify(x.receta)} /> </td>)
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={() => handleRequest(msgId)} text="Confirmar Receta" to={"/profile"} />
      </div>
    </div>
  );
}

const RecipeCard = ({ keyId, receta, proteina, carbohidratos, grasa }) => {
  return (
    <div key={keyId}>
      <p>{receta}</p>
      <p>{proteina}</p>
      <p>{carbohidratos}</p>
      <p>{grasa}</p>
    </div>
  );
};


export default CalendarioSemanal;
