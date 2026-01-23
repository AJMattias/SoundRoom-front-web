import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react";


export const AdminRoutes = () => {
   
    const { authState, getUser } = useContext(AuthContext);
    const loggedUser = getUser();

    if (!authState.isAuthenticated || !loggedUser) {
        console.log('AdminRoutes: No autenticado, redirigiendo a login');
        return <Navigate to="/login" replace />;
    }

    //gemini
    const isAdmin = loggedUser?.user?.isAdmin;

    if (!isAdmin) {
        console.log('AdminRoutes: No es admin, redirigiendo a home');
        return <Navigate to="/" replace />;
    }

    // 3. Si pasó los filtros anteriores, es Admin
    return <Outlet />;

}







