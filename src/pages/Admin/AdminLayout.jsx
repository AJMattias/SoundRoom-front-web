import { Outlet } from "react-router-dom"
import NavBar from "../../components/NavBar"
import SideBar from "../../components/SideBar"


const AdminLayout = () => {
  return (
    <div className="d-flex flex-column vh-100 vw-90">
      <NavBar />
        <div className="d-flex" style={{ marginTop: "4rem", height: "calc(100vh - 4rem)" }}> 
          <aside className="bg-warning border-end col-2 h-100 w-64"
          //  style={{ width: "16.6%" }}
          >
            <SideBar />
          </aside>
          <main className="flex-grow-1 p-4 bg-light min-vh-100 mx-5">
            <Outlet />
          </main>
      </div>
    </div>
  )
}

export default AdminLayout