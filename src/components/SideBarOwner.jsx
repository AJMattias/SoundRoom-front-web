// import {Link} from "react-router-dom"

// const SideBarOwner = () => {

//  return (
//     <aside className=" bg-warning w-64 bg-warning-800 position-fixed text-dark h-screen col-2 border-top" style={{height:"100vh"}}>
//       <ul className="list-unstyled align-items-center">
//         <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/HomeOwner" className="block p-2 text-decoration-none text-white  fs-5">Inicio</Link></div></li>
//         <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/profiles" className="block p-2 text-decoration-none text-white  fs-5">Mis Salas</Link></div></li>
//         <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/permissions" className="block p-2 text-decoration-none text-white  fs-5">Reservas</Link></div></li>
//         <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/reports" className="block p-2 text-decoration-none text-white  fs-5">Calificaciones</Link></div></li>
//         <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/backup" className="block p-2 text-decoration-none text-white  fs-5">Configuracion</Link></div></li>
//         <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/comission" className="block p-2 text-decoration-none text-white  fs-5">Cerrar Sesion</Link></div></li>
//       </ul>
//     </aside>
//   ); 
// }

// export default SideBarOwner

import { Link, useLocation } from "react-router-dom";

const SideBarOwner = () => {
  const location = useLocation();

  const links = [
    { to: "/owner/home", label: "Inicio" },
    { to: "/owner/my-rooms", label: "Mis Salas" },
    { to: "/owner/reservations", label: "Reservas" },
    { to: "/owner/califications", label: "Calificaciones" },
    { to: "/owner/settings", label: "Configuración" }
  ];
  

  return (
    <aside
      className="bg-warning position-fixed text-dark h-100 col-2 d-flex flex-column p-3"
      style={{ width: "260px" }}
    >
      <h5 className="mb-4 fw-bold">🎵 Mis Salas</h5>
      <ul className="nav nav-pills flex-column mb-auto">
        {links.map(({ to, label }) => (
          <li className="nav-item" key={to}>
            <Link
              to={to}
              className={`nav-link fs-6 rounded-pill px-3 py-2 mb-1 ${
                location.pathname === to
                  ? "bg-white text-dark fw-semibold"
                  : "text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBarOwner;
