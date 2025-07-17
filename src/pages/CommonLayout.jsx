import { Outlet } from "react-router-dom"
import NavBar from "../../components/NavBar"
import SideBar from "../../components/SideBar"


const CommonLayout = () => {
  return (
    <div className="flex">
      <NavBar />
      {/* <div className="flex flex-col flex-1">  */}
        <SideBar />
        <main className="p-6">
        <h1>Panel de Administración</h1>
          <Outlet />
        </main>
      {/* </div> */}
    </div>
  )
}

export default CommonLayout