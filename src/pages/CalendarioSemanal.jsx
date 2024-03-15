import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from "../components/Button"
import { getUserId } from '../stores/AccessTokenStore';
import { useNavigate } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import './CalendarioSemanal.css';
import Table from 'react-bootstrap/Table';

function CalendarioSemanal({ diets, messageId, action, actionName }) {
  const navigate = useNavigate();
  const msgId = { messageId };
  const ddd = { diets };
  const dietsObject = JSON.parse(ddd.diets);
  // limpiar 
  const [calendar, setCalendar] = useState([]);
  //console.log(ddd.diets.desayuno.map(des => des.receta));
  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 para Domingo, 1 para Lunes, etc.

    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - currentDay);

    const newCalendar = [];
    for (let i = 0; i < 1; i++) {
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


  // Lógica para guardar las receta
  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
      <Table className="table table-bordered calendar-container" variant="dark" responsive striped bordered hover size="sm">
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
                  <Card border="primary"
                    bg={day === new Date().getDate() ? "danger" : "primary"}
                    key={"Desayuno"}
                    text={'white'}
                    style={{ width: '22rem', height: '10rem' }}
                    className="mb-2 customCard"
                  > {/* Aumenta el ancho de la tarjeta */}
                    <Card.Header ><b>Desayuno</b></Card.Header>
                    <Card.Body>
                      {/* <Card.Title>Primary Card Title</Card.Title> */}
                      <Card.Text>
                        <p>{JSON.stringify(dietsObject.desayuno[dayIndex]).replace("{","").replace("}","")}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card border="success"
                    bg={day === new Date().getDate() ? "danger" : "success"}
                    key={"Comida"}
                    text={'white'}
                    style={{ width: '22rem', height: '10rem' }}
                    className="mb-2 customCard"> {/* Aumenta el ancho de la tarjeta */}
                    <Card.Header><b>Comida</b></Card.Header>
                    <Card.Body>
                      {/* <Card.Title>Primary Card Title</Card.Title> */}
                      <Card.Text>
                        <p>{JSON.stringify(dietsObject.comida[dayIndex]).replace("{","").replace("}","")}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card border="warning"
                    bg={day === new Date().getDate() ? "danger" : "warning"}
                    key={"Cena"}
                    text={'white'}
                    style={{ width: '22rem', height: '10rem', border: '30px' }}
                    className="mb-2 customCard"> {/* Aumenta el ancho de la tarjeta */}
                    <Card.Header><b>Cena</b></Card.Header>
                    <Card.Body>
                      {/* <Card.Title>Primary Card Title</Card.Title> */}
                      <Card.Text>
                        <p>{JSON.stringify(dietsObject.cena[dayIndex]).replace("{","").replace("}","").replace(",", "\n")}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Button extraClassName={"button-diet"} onClick={() => handleRequest(msgId, action, navigate)} text={actionName} to={"/profile"} />
      </div>
    </div>
  );
}

function handleRequest(messageId, actionToExecute, navigate) {
  console.log(actionToExecute);
  actionToExecute(messageId, navigate);
}

export default CalendarioSemanal;
