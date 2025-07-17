import AdminCard from "../../components/AdminCard";

const AdminDashboard = () => {
  const sections = [
    { title: "Gestión de Perfiles", description: "Opciones para crear, modificar y eliminar perfiles.", link: "/admin/profiles" },
    { title: "Gestión de Permisos", description: "Opciones para gestionar los permisos de usuarios.", link: "/admin/permissions" },
    { title: "Reportes", description: "Distintos reportes generados por el sistema.", link: "/admin/reports" },
    { title: "Backup del sistema", description: "Acceso a las opciones de respaldo de la base de datos.", link: "/admin/backup" },
    { title: "Administrar Comisiones", description: "Modificar el porcentaje de comisiones.", link: "/admin/comission" },
    { title: "Gestión de Usuarios", description: "Opciones para gestionar los usuarios.", link: "/admin/users" },
  ];

  console.log(sections)
  return (

    <AdminCard sections = {sections} />
    // <div className="container">
    //   <h1 className="text-center mb-4">Panel Administracion</h1>
    //   <div className="row">
    //     {sections.map((section, index) => (
    //       <div key={index} className="col-md-6 mb-4">
    //         <div className="card border-warning shadow-sm rounded-4">
    //           <div className="card-body">
    //             <p className="card-title fs-3">{section.title}</p>
    //             <p className="card-text">{section.description}</p>
    //             <div className="d-flex justify-content-center">
    //               <Link to={section.link} className="btn btn-warning w-50 px-4">
    //                 {section.title.toUpperCase()}
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default AdminDashboard;
