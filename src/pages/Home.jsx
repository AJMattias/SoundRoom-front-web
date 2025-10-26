import NavBar from "../components/NavBar"
import homeImage from "../assets/home_imagee.jpg"
import card1 from "../assets/card1.jpg"
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      // Redirigir según tipo de usuario
      if (authState.user.user.isAdmin) {
        navigate("/admin/home", { replace: true });
      } else if (authState.user.user.idPerfil.name === "Artista") {
        navigate("/artista", { replace: true });
      } else {
        navigate("/owner", { replace: true });
      }
    }
  }, [authState, navigate]);

  return (
   <div>
      <NavBar className="mb-5"/>
      <div className="mt-5">
        <div className="position-relative">
          <img src={homeImage} className="d-block w-100" alt="imagen de portada" style={{ height: "80vh", objectFit: "fit" }}/>
          <div className="position-absolute top-50 start-50 translate-middle text-center text-white"
               style={{ background: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "10px" }}>
            <h3 >Encuentra tu sala de ensayo</h3>
            <p className="fw-normal">Alquila salas de ensayo profesionales para tu practica de banda o solo</p>
          </div>
          <div 
            className="position-absolute top-50 start-50 translate-middle col-10"
            style={{ zIndex: 10 }}
          >
            <div className="row justify-content-center border-3" style={{ marginTop: "80vh", objectFit: "cover" }}>
              <div className="col-md-10 d-flex align-items-center bg-white shadow rounded-3 p-2">
                {/* ✅ Input ocupa la mayor parte del espacio */}
                <input 
                  type="text" 
                  className="form-control border-0  flex-grow-1"
                  placeholder="Buscar salas de ensayo..."
                />

                {/* ✅ Botón con diseño adecuado */}
                <button className="btn btn-warning text-white ms-3 rounded-3">
                  Buscar
                </button>
              </div>
            </div>
          </div>        
        </div>
      </div>
      <div className="container" style={{marginTop: "5rem"}}>
        <div>
          
          <div className="row d-flex align-items-center justify-content-between">
          <h3>Salas de ensayo populares </h3>
            <div className="card shadow pt-3 mx-3" style={{ width: "21rem" }}>
              {/* ✅ Imagen de la tarjeta */}
              <img src={card1} className="card-img-top" alt="imagen de tarjeta" />

              <div className="card-body">
                {/* ✅ Título y calificación en la misma fila y separados */}
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Sala de Ensayo</h4>

                  {/* ✅ Icono de estrella y puntuación */}
                  <div className="d-flex align-items-center">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <p className="fw-bold mb-0">4.8</p>
                  </div>
                </div>

                <p className="card-text">Sala de ensayo en el centro</p>

                {/* ✅ Botón estilizado */}
                <div className="d-flex justify-content-between align-content-center">
                  <p>$9000/hs</p>
                  <button className="btn btn-warning bt-sm w-auto p-1 fs-7">Alquilar</button>
                </div>
              </div>
            </div>

            {/* card 2 */}
            <div className="card shadow pt-3 mx-3" style={{ width: "21rem" }}>
              {/* ✅ Imagen de la tarjeta */}
              <img src={card1} className="card-img-top" alt="imagen de tarjeta" />

              <div className="card-body">
                {/* ✅ Título y calificación en la misma fila y separados */}
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Sala de Ensayo 2</h4>

                  {/* ✅ Icono de estrella y puntuación */}
                  <div className="d-flex align-items-center">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <p className="fw-bold mb-0">4.0</p>
                  </div>
                </div>

                <p className="card-text">Sala de ensayo en el godoy cruz</p>

                {/* ✅ Botón estilizado */}
                <div className="d-flex justify-content-between align-content-center">
                  <p>$8500/hs</p>
                  <button className="btn btn-warning bt-sm w-auto p-1 fs-7">Alquilar</button>
                </div>
              </div>
            </div>

            {/* card 2 */}
            <div className="card shadow pt-3 mx-3" style={{ width: "21rem" }}>
              {/* ✅ Imagen de la tarjeta */}
              <img src={card1} className="card-img-top" alt="imagen de tarjeta" />

              <div className="card-body">
                {/* ✅ Título y calificación en la misma fila y separados */}
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Sala de Ensayo 3</h4>

                  {/* ✅ Icono de estrella y puntuación */}
                  <div className="d-flex align-items-center">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <p className="fw-bold mb-0">4.3</p>
                  </div>
                </div>

                <p className="card-text">Sala de ensayo en el Capital</p>

                {/* ✅ Botón estilizado */}
                <div className="d-flex justify-content-between align-content-center">
                  <p>$10000/hs</p>
                  <button className="btn btn-warning bt-sm w-auto p-1 fs-7">Alquilar</button>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
    <div className="container-fluid p-0 m-0">
      <div className="row d-flex justify-content-between pt-4 mx-0" style={{marginTop: "5rem", width:"100%", backgroundColor:"#c2c0c0"}}>
        <div className="col-3 px-5">
          <h4 className="fw-bold mb-3">Sobre Nosotros</h4>
          <p>Como funciona</p>
          <p>Trabaja con nosotros</p>
          <p>Noticas</p>
        </div>
        <div className="col-3">
          <h4 className="fw-bold mb-3">Alquila</h4>
          <p>Lista tu sala</p>
          <p>Recursos</p>
          <p>Comunidad</p>
        </div>
        <div className="col-3">
          <h4 className="fw-bold mb-3">Soporte</h4>
          <p>Ayuda</p>
          <p>Seguridad</p>
          <p>Contactanos</p>
        </div>
        <div className="col-3">
          <h4 className="fw-bold mb-3">Redes</h4>
          <div className="d-flex gap-3">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-twitter-x"></i>
          </div>
        </div>
      </div>
       
      </div>
  </div>
   
  )
}

export default Home