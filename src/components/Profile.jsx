import React from "react";

const Profile = ({ user }) => {
  if (!user || !user.data) {
    return <div>Error: No se pudo cargar el perfil del usuario.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-auto">
          {/* Aquí puedes agregar el avatar si decides usarlo más tarde */}
        </div>
        <div className="col-auto">
          <h1 className="font-bold text-2xl">@{user.data.username}</h1>
        </div>
      </div>
      {/* Aquí puedes agregar contenido adicional según tus necesidades */}
    </div>
  );
};

export default Profile;
