import AdminCard from "../../components/AdminCard"

const Permissions = () => {

  const sections = [
    {title: "Crea un permiso", description: "Crea un permiso de una nueva funcionalidad", link:"/admin/permissions/create" },
    {title: "Ver permisos", description: "Consulta los permisos actuales", link:"/admin/permissions/permissions"}
  ]

  return (
   <AdminCard sections = {sections}/>
  )
}

export default Permissions