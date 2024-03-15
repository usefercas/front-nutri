import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { getPlan } from "../services/RecomendacionesService";
import { getUserId } from "../stores/AccessTokenStore";
import CalendarioSemanal from '../pages/CalendarioSemanal';
import "./Profile.css"

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateToCreatePlan = () => navigate('/create');
  const [responsePlan, setResponsePlan] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("Ejecutando use Effect");
    getPlan(getUserId())
      .then(plans => {
        console.log("Esta es la respuesta de la promesa: " + plans);
        setResponsePlan(plans);
        setLoading(false);
      })
  });

  console.log("Loading component:  " + loading)
  if (!loading) {
    console.log("Este es el plan xyx " + responsePlan);
    return (
      <div className="calendar-title">
        <h1>Tus Comidas de esta semana</h1>
        <CalendarioSemanal diets={responsePlan} messageId={responsePlan.messageId} action={goToCreatePlan} actionName={"Cambiar plan"} />
      </div>)

  }
  return (
    // revisar si esta roto
    <div className="container">
      <div className="d-flex align-items-center gap-2">
        <h1>Perfil</h1>
        <Button onClick={navigateToCreatePlan} text="Generar nueva dieta" />
      </div>
    </div>
  );
};

function goToCreatePlan(messageId, navigate) {
  navigate('/create');
}

export default Profile;
