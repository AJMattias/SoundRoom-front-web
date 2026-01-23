import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const ArtistRoutes = () => {
  
  const { authState } = useContext(AuthContext);

  

  // Mientras se carga el authState
  // if (!authState.user) {
  //   return <div>Cargando...</div>;
  // }

  // Si no está autenticado → redirigir a login
    const perfilName = authState.user?.user?.idPerfil?.name?.trim().toLowerCase();
    const isArtist = perfilName === "artista";

    console.log("autenticado:", authState.isAuthenticated);
    console.log("perfilName:", perfilName);
    console.log("isArtist:", isArtist);
    if (!authState.isAuthenticated) {
      return <Navigate to="/login" />;
    }

  // Si está autenticado pero no es artista → redirigir a otra ruta (ej. home)
  if (!isArtist) {
    return <Navigate to="/" />;
  }

  // Si está autenticado y es artista → renderizar rutas protegidas
  return <Outlet />;
};

export default ArtistRoutes