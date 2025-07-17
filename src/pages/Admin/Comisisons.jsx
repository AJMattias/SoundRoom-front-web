import AdminCard from "../../components/AdminCard"


const Comisisons = () => {

  const sections = [
    {title: "Crear", description: "Crea una nueva comision", link:"/admin/comission/create" },
    {title: "Comisiones", description: "Consulta las comisiones", link:"/admin/comission/comissions"},
    {title: "Historial", description: "Consulta el historial de comisiones", link:"/admin/comission/history"}
  ]

  return (
    <AdminCard sections = {sections}/>
  )
}

export default Comisisons