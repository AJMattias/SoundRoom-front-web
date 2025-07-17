import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className=" bg-warning w-64 bg-warning-800 position-fixed text-dark h-screen col-2 border-top" style={{height:"100vh"}}>
      <ul className="list-unstyled align-items-center">
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin" className="block p-2 text-decoration-none text-white  fs-5">Dashboard</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/profiles" className="block p-2 text-decoration-none text-white  fs-5">Perfiles</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/permissions" className="block p-2 text-decoration-none text-white  fs-5">Permisos</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/reports" className="block p-2 text-decoration-none text-white  fs-5">Reportes</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/backup" className="block p-2 text-decoration-none text-white  fs-5">BackUp</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/comission" className="block p-2 text-decoration-none text-white  fs-5">Comisión</Link></div></li>
        <li className="align-items-center py-2"><div className="mx-3 border-bottom"><Link to="/admin/users" className="block p-2 text-decoration-none text-white  fs-5">Usuarios</Link></div></li>
      </ul>
    </aside>
  );
};

export default SideBar;
