import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react";


export const AdminRoutes = () => {
   
    const { authState, getUser } = useContext(AuthContext);


    //gemini
    const loggedUser = getUser()
    console.log('adminRoute.jsx - isAdmin.user.isAdmin: ', loggedUser)
    if (!authState.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if(!loggedUser.user.isAdmin){
        return <Navigate to="/" replace />;
    }
    if(loggedUser.user.isAdmin){
        console.log(loggedUser.user.isAdmin)
        return <Outlet />
    }

}
