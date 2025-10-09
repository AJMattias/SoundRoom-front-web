import { Link, useLocation } from "react-router-dom";

const SideBarArtist = () => {
  const location = useLocation();

  const links = [
    { to: "/artista", label: "Inicio" },
    { to: "/artista/mis-reservas", label: "Mis Reservas" },
    { to: "/artista/opiniones", label: "Opiniones" },
    { to: "/artista/buscar", label: "Buscar Salas" }
  ];
  

  return (
    <aside
      className="bg-tertiary text-dark border-end" 
      style={{ 
        width: "250px", // ⬅️ ANCHO FIJO para que main lo respete
        minHeight: "100%",// ⬅️ Altura mínima
      }} 
    >
      {/* <h5 className="mb-4 fw-bold">Mis Salas</h5> */}
      <ul className="nav nav-pills flex-column mb-auto mx-2 mt-2 pt-2">
        {links.map(({ to, label }) => (
          <li className="nav-item" key={to}>
            <Link
              to={to}
              className={`nav-link fs-6 rounded-3 px-3 py-2 mb-1 ${
                location.pathname === to
                  ? "bg-warning text-white fw-semibold"
                  : "text-dark"
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


export default SideBarArtist