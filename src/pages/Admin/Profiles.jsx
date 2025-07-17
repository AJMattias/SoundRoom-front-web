import AdminCard from "../../components/AdminCard"

const Profiles = () => {

  const sections = [
    {title: "Crea un perfil", description: "Crea un nuevo perfil de usuario", link:"/admin/profiles/create" },
    {title: "Editar perfiles", description: "Consulta los perfiles actuales y editalos", link:"/admin/profiles/profiles"}
  ]

  return (
    <AdminCard sections = {sections}/>
  )
}

export default Profiles