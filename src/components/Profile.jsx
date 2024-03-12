import React, { useContext, useState } from "react";
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
  const [data, setData] = useState(null);
  const xyx = getPlan(getUserId());
  
  console.log(xyx);
  setData(xyx);

  if (data) {
    console.log("Esta es la data: " + data);
    return <CalendarioSemanal diets={JSON.parse(data.data)} messageId={data.messageId} />

  } else {
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
  }
};

export default Profile;
