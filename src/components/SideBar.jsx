import { Link , useLocation} from "react-router-dom";

const links = [
  {to: "/admin", label: "Dashboard"},
  {to: "/admin/profiles", label: "Perfiles"},
  {to: "/admin/permissions", label: "Permisos"},
  {to: "/admin/reports" , label: "Reportes"},
  {to: "/admin/backup", label: "Backup"},
  {to: "/admin/comission" , label: "Comisiones"},
  {to: "/admin/users" , label: "Usuarios"},

]


const SideBar = () => {
  const location = useLocation();

  return (
    <aside className="bg-warning w-64 bg-warning-800 position-fixed text-dark h-screen col-2 border-top" 
    style={{width: "20vw", height:"100vh"}}>
      {/* <ul className="list-unstyled align-items-center">
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin" className="block p-2 text-decoration-none text-white  fs-5">Dashboard</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/profiles" className="block p-2 text-decoration-none text-white  fs-5">Perfiles</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/permissions" className="block p-2 text-decoration-none text-white  fs-5">Permisos</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/reports" className="block p-2 text-decoration-none text-white  fs-5">Reportes</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/backup" className="block p-2 text-decoration-none text-white  fs-5">BackUp</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/comission" className="block p-2 text-decoration-none text-white  fs-5">Comisión</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/users" className="block p-2 text-decoration-none text-white  fs-5">Usuarios</Link></div></li>
      </ul> */}
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

export default SideBar;
