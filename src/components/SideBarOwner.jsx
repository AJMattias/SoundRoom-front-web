import { Link, useLocation } from "react-router-dom";

const SideBarOwner = () => {
  const location = useLocation();

  const links = [
    { to: "/owner/home", label: "Inicio" },
    { to: "/owner/mis-salas", label: "Mis Salas" },
    { to: "/owner/reservaciones", label: "Reservas" },
    { to: "/owner/calificaciones", label: "Calificaciones" },
    { to: "/owner/reportes", label: "Reportes" }
  ];
  

  return (
    <aside
      className="bg-warning w-64 bg-warning-800 position-fixed text-dark h-screen col-2 border-top"
      style={{ width: "20vw", height: "100vh" }}
    >
      {/* <h5 className="mb-4 fw-bold">Mis Salas</h5> */}
      <ul className="nav nav-pills flex-column mb-auto mx-2 mt-2">
        {links.map(({ to, label }) => (
          <li className="nav-item" key={to}>
            <Link
              to={to}
              className={`nav-link fs-6 rounded-3 px-3 py-2 mb-1 ${
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
