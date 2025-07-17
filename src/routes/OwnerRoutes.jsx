import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const OwnerRoutes = () => {
  const { authState } = useContext(AuthContext);

  // Verifica si el perfil es "Sala de ensayo"
  const isOwner = authState.user?.user?.idPerfil?.name === "Sala de ensayo";

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isOwner) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default OwnerRoutes;