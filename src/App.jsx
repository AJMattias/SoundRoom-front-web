/* eslint-disable no-unused-vars */
import './styles/index.css';
import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom'
// import { AuthProvider } from './contexts/AuthProvider'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home'
import { AdminRoutes } from './routes/AdminRoutes'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/Dashboard'
import Profiles from './pages/Admin/Profiles'
import Permissions from './pages/Admin/Permissions'
import Reports from './pages/Admin/Reports'
import BackUp from './pages/Admin/BackUp'
import Comisisons from './pages/Admin/Comisisons'
import CreatePermiso from './pages/Admin/CreatePermiso'
import VerPermisos from './pages/Admin/VerPermisos'
import CreateProfile from './pages/Admin/CreateProfile'
import VerProfiles from './pages/Admin/VerProfiles'
import PerfilPermisos from './pages/Admin/PerfilPermisos'
import CreateComission from './pages/Admin/CreateComission'
import VerComissions from './pages/Admin/VerComissions'
import ComissionHistory from './pages/Admin/ComissionHistory'
import AdminUsers from './pages/Admin/AdminUsers'
import ForgotPasswordScreen from './pages/Auth/ForgotPasswordScreen'
import NewPasswordScreen from './pages/Auth/NewPasswordScreen'
import ArtistRoutes from './routes/ArtistRoutes'
import OwnerRoutes from './routes/OwnerRoutes'
import ArtistLayout from './pages/Artista/ArtistLayout'
import OwnerLayout from './pages/SalaDeEnsayo/OwnerLayout'
import HomeOwnerPage from './pages/SalaDeEnsayo/HomeOwnerPage'
import CreateSalaPage from './pages/SalaDeEnsayo/CreateSalaPage'
import SalaPage from './pages/SalaDeEnsayo/SalaPage'
import Reportes from './pages/SalaDeEnsayo/Reportes'
import CalificacionesPage from './pages/SalaDeEnsayo/CalificacionesPage'
import ReservasPage from './pages/SalaDeEnsayo/ReservasPage'
import ArtistaHomePage from './pages/Artista/ArtistaHomePage'
import ReservasArtistaPage from './pages/Artista/ReservasArtistaPage'
import OpinionsToArtista from './pages/Artista/OpinionsToArtistaPage';
import OpinionsToArtistaPage from './pages/Artista/OpinionsToArtistaPage';
import SearchSalasPage from './pages/Artista/SearchSalasPage';
import VerSalaPage from './pages/Artista/VerSalaPage';
import ReservarPage from './pages/Artista/ReservarPage';
import ConfirmacionReservaPaga from './pages/Artista/ConfirmacionReservaPaga';
import EditarPerfil from './pages/EditarPerfil';
import ChangePasswordScreen from './pages/Auth/ChangePasswordScreen';
import VerReservaPage from './pages/Artista/VerReservaPage';
import ArtistaPAge from './pages/SalaDeEnsayo/ArtistaPAge';


function App() {
  
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/login" element={< Login/>}></Route>
      <Route path="/register" element={< Register/>}></Route>
      <Route path="/home" element={< Home/>}></Route>
      <Route path="/olvide-contraseña" element={< ForgotPasswordScreen/>}></Route>
      <Route path="/cambiar-contraseña" element={< NewPasswordScreen/>}></Route>
      <Route path="/cambiar-contraseñaVN" element={< ChangePasswordScreen/>}></Route>
      <Route path="/olvide-contraseña/reset-password/:token" element={< NewPasswordScreen />}></Route>
      <Route element={<AdminRoutes />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/profiles" element={<Profiles />} />
          <Route path="/admin/permissions" element={<Permissions />} />
          <Route path="/admin/permissions/create" element={<CreatePermiso />} />
          <Route path="/admin/permissions/permissions" element={<VerPermisos />} />
          <Route path="/admin/permissions/updatePermission" element={<CreatePermiso />} />
          <Route path="/admin/profiles/create" element={<CreateProfile />} />
          <Route path="/admin/profiles/profiles" element={<VerProfiles />} />
          <Route path="/admin/profiles/updateProfile" element={<CreateProfile />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/backup" element={<BackUp />} />
          <Route path="/admin/comission" element={<Comisisons />} />
          <Route path="/admin/comission/create" element={<CreateComission />} />
          <Route path="/admin/comission/comissions" element={<VerComissions />} />
          <Route path="/admin/comission/history" element={<ComissionHistory />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/profiles/profile-permissions" element={<PerfilPermisos />}></Route>
        </Route>
      </Route>

        {/* Rutas de Dueño */}
      <Route element={<OwnerRoutes />}>
        <Route element={<OwnerLayout />}>
          <Route path="/owner" element={<HomeOwnerPage />} />
          <Route path="/owner/create-room" element={<CreateSalaPage />} />
          <Route path="/owner/sala-ensayo/:id" element={<SalaPage />} />
          <Route path="/owner/home" element={<HomeOwnerPage />} />
          <Route path="/owner/mis-salas" element={<HomeOwnerPage />} />
          <Route path="/owner/edit-room/:id" element={<CreateSalaPage />} />
          <Route path="/owner/reportes" element={<Reportes />} />
          <Route path="/owner/calificaciones" element={<CalificacionesPage />} />
          <Route path="/owner/reservaciones" element={<ReservasPage />} />
          <Route path="/owner/ver-artista/:id" element={<ArtistaPAge />} />
          <Route path="/owner/ver-reserva/:idReserva" element={<VerReservaPage />} />
        </Route>
      </Route>
      
      {/* Rutas de Artista */}
      <Route element={<ArtistRoutes />}>
        <Route element={<ArtistLayout />}>
            <Route path="/artista" element={<ArtistaHomePage />} />
            <Route path="/artista/mis-reservas" element={<ReservasArtistaPage />} />
            <Route path="/artista/opiniones" element={<OpinionsToArtistaPage />} />
            <Route path="/artista/buscar" element={<SearchSalasPage />} />
            <Route path="/artista/ver-sala/:id" element={<VerSalaPage />} />
            <Route path="/artista/reservar/:id" element={<ReservarPage />} />
            <Route path="/reservas/pago-exitoso" element={<ConfirmacionReservaPaga />} />
            <Route path="/reservas/pago-fallido/" element={<ConfirmacionReservaPaga />} />
            <Route path="/reservas/pago-pendiente/" element={<ConfirmacionReservaPaga />} />
            <Route path="/artista/editar-perfil/:id" element={<EditarPerfil />} />
            <Route path="/artista/reserva/:idReserva" element={<VerReservaPage />} />

        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
