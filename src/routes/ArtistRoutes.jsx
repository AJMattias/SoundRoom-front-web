import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const ArtistRoutes = () => {
  
    const { authState, getUser } = useContext(AuthContext);

  const loggedUser = getUser();
  console.log('ArtistRoutes.jsx - isArtist: ', loggedUser);
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!loggedUser?.user?.isArtist) {
    return <Navigate to="/" replace />;
  }
  if (loggedUser?.user?.isArtist) {
    console.log(loggedUser.user.isArtist);
    return <Outlet />;
  }

}

export default ArtistRoutes