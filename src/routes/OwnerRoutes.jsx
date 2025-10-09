// import { Navigate, Outlet } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

// const OwnerRoutes = () => {
//   const { authState } = useContext(AuthContext);

//   // Verifica si el perfil es "Sala de ensayo"
//   const perfilName = authState.user?.user?.idPerfil?.name?.trim().toLowerCase();

//   const isOwner = perfilName === "sala de ensayo";

//   // console.log('autenticado: ', !authState.isAuthenticated)
//   console.log("autenticado:", authState.isAuthenticated);
//   console.log("perfilName:", perfilName);
//   console.log("isOwner:", isOwner);
//   if (authState.isAuthenticated === false) {
//     return <div>Cargando...</div>;
//   }

//   if (authState.isAuthenticated && isOwner) {
//     return <Navigate to="/" />;
//   }

//   return <Outlet />;
// };

// export default OwnerRoutes;

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const OwnerRoutes = () => {
  const { authState } = useContext(AuthContext);

  const perfilName = authState.user?.user?.idPerfil?.name?.trim().toLowerCase();
  const isOwner = perfilName === "sala de ensayo";

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

export default OwnerRoutes;