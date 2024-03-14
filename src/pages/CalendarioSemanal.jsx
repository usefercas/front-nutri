import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from "clsx";
import { confirmar } from "../services/PlanService";
import Button from "../components/Button"
import { getUserId } from '../stores/AccessTokenStore';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import './CalendarioSemanal.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CalendarioSemanal({ diets, messageId }) {
  const msgId = { messageId };
  console.log(messageId)
  const ddd = { diets };
  const dietsObject = JSON.parse(ddd.diets);
  console.log(JSON.parse(ddd.diets).desayuno);
  const [calendar, setCalendar] = useState([]);
  //console.log(ddd.diets.desayuno.map(des => des.receta));
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
  // preparamos los desayunos para la card
  let desayunos = new Map();
  console.log("Diets object: " + JSON.stringify(dietsObject));
  for (let i = 0; i < dietsObject.desayuno.length; i++) {
    console.log("Diets object 2: " + JSON.stringify(dietsObject.desayuno[i]));
    let [receta, calorias] = JSON.stringify(dietsObject.desayuno[i])
      .replace("{", "")
      .replace("}", "")
      .replace(/['"]+/g, "")
      .split("calorias");

    desayunos.set(receta.slice(0, -1), calorias);
  }
  // preparamos las comidas para la card
  let comidas = new Map();
  for (let i = 0; i < dietsObject.comida.length; i++) {
    console.log("Enchufando comida " + JSON.stringify(dietsObject.comida[i]));
    let [receta, calorias] = JSON.stringify(dietsObject.comida[i])
      .replace("{", "")
      .replace("}", "")
      .replace(/['"]+/g, "")
      .split("calorias");

    comidas.set(receta.slice(0, -1), calorias);

  }
  // preparamos las cenas para la card
  let cenas = new Map()
  for (let i = 0; i < dietsObject.cena.length; i++) {
    let [receta, calorias] = JSON.stringify(dietsObject.cena[i])
      .replace("{", "")
      .replace("}", "")
      .replace(/['"]+/g, "")
      .split("calorias");

    cenas.set(receta.slice(0, -1), calorias);
  }

  // Lógica para guardar las receta
  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
      <h1>Calendario Mensual</h1>
            <Table id="tableId" className="table table-bordered" variant="dark" responsive>
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
                              <p> {
                                Array.from(desayunos.keys())[dayIndex]
                              }
                              </p>
                              <p>
                                Calorias:
                                {
                                  Array.from(desayunos.values())[dayIndex]
                                }
                              </p>
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
                              <p>{
                                Array.from(comidas.keys())[dayIndex]
                              }</p>
                              <p>
                                Calorias:
                                {
                                  Array.from(comidas.values())[dayIndex]
                                }</p>
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
                              <p>{
                                Array.from(cenas.keys())[dayIndex]
                              }</p>
                              <p>
                                Calorias:
                                {
                                  Array.from(cenas.values())[dayIndex]
                                }</p>
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
              <Button onClick={() => handleRequest(msgId)} text="Confirmar Receta" to={"/profile"} />
            </div>
    </div>
  );
}


export default CalendarioSemanal;
