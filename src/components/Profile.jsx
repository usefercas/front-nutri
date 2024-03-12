import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import Avatar from "./Avatar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { getPlan } from "../services/RecomendacionesService";
import { getUserId } from "../stores/AccessTokenStore";
import CalendarioSemanal from '../pages/CalendarioSemanal';

const Profile = () => {
  const { user } = useContext(AuthContext); // todo mirar de aqui si se puede sacar el id
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
    return <CalendarioSemanal diets={responsePlan} messageId={responsePlan.messageId} />
  }
  return (
    <div className="container">
      <div className="d-flex align-items-center gap-2">
        <h1>Perfil</h1>

        {/* <div>
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
          </div> */}
        <Button onClick={navigateToCreatePlan} text="Generar nueva dieta" />
      </div>
    </div>
  );
};

export default Profile;
