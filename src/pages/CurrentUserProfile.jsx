import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Profile from "../components/Profile";

const CurrentUserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <Profile user={user} />
        </div>
      </div>
    </div>
  );
}

export default CurrentUserProfile;
