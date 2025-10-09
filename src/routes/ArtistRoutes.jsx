import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const ArtistRoutes = () => {
  
  const { authState } = useContext(AuthContext);

  const perfilName = authState.user?.user?.idPerfil?.name?.trim().toLowerCase();
  const isOwner = perfilName === "artista";

  console.log("autenticado:", authState.isAuthenticated);
  console.log("perfilName:", perfilName);
  console.log("isOwner:", isOwner);

  // Mientras se carga el authState
  if (!authState.user) {
    return <div>Cargando...</div>;
  }

  // Si no está autenticado → redirigir a login
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado pero no es owner → redirigir a otra ruta (ej. home)
  if (!isOwner) {
    return <Navigate to="/" />;
  }

  // Si está autenticado y es owner → renderizar rutas protegidas
  return <Outlet />;
};

export default ArtistRoutes