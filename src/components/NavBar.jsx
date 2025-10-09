import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"
import PropTypes from "prop-types"
import logo from "../assets/SoundRoom_logo.png"

const NavBar = ({title}) => {

  const {authState, logout, } =  useContext(AuthContext)
  console.log('authState.isAuthenticated: ', authState.isAuthenticated)
  if(authState.user){
    console.log(authState.user)
    console.log('authState.user.user.name: ', authState.user.user.name)
  }
  
  

  return (
    <nav className="bg-warning d-flex align-items-center py-4 px-4 fixed-top" style={{ height: "4rem" }}>
    <Link to={authState.isAuthenticated ? "/AdminDashboard" : "/" }
    className="text-white text-decoration-none d-flex align-items-center gap-2"
    >
      <img src={logo} alt="logo" style={ {width: "40px", height: "40px"}} />
      <p className="fs-3 text fw-semibold">Sound Room</p></Link>
      {title && <h3 className="text-white ms-3">{title}</h3>}
      <ul className="d-flex list-unstyled gap-2 mt-3 ms-auto">
        {authState.isAuthenticated && authState.user ? (
          <>
          {/* agregar imagen/icono user */}
          <li className="text-white fw-bold align-content-center">
            <div style={{height: "3rem"}} className="border border-white rounded-3 align-items-center gap-1 px-3"
                >
                <div> 
                  <i className="bi bi-person"></i> {authState.user.user.name} {authState.user.user.last_name}
                </div>
                <div>
                  {authState.user.user.isAdmin ? <p>Administrador</p> : <p>{authState.user.user.idPerfil.name}</p>}
                  
                </div>
              </div>
          </li>
          <li className="align-content-center">
              <Link to="/" 
              onClick={()=>{logout()}}
              className="bg-white text-warning text-decoration-none px-3 py-1 rounded "
              >Logout</Link>
          </li>
          </>
        ) : (
          <>
          <li>
              <Link to="/" 
              className="text-white text-decoration-none px-3"
              >Encuentra una sala</Link>
          </li>
          <li>
              <Link to="/" 
              className="text-white text-decoration-none px-3"
              >Alquila tu sala</Link>
          </li>
          <li>
              <Link to="/login" 
              className="bg-white text-warning text-decoration-none px-3 py-1 rounded "
              >Login</Link>
          </li>
          <li>
              <Link to="/register" 
              className="bg-white text-warning text-decoration-none px-3 py-1 rounded "
              >Registrarse</Link>
          </li>
          </>
        )}
      </ul>

</nav>  )
}

NavBar.propTypes = {
  title: PropTypes.string
}

export default NavBar