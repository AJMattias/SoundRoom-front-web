import NavBar from '../../components/NavBar';
import { Outlet } from 'react-router-dom';
import SideBarArtist from '../../components/SideBarArtist';

const ArtistLayout = () => {
  return (
    <div>
      <NavBar />
        <div className="d-flex" style={{ marginTop: "4rem", height: "calc(100vh - 4rem)" }}> 
          <aside className="bg-warning border-end col-2 h-100 w-64"
          //  style={{ width: "16.6%" }}
          >
            <SideBarArtist />
          </aside>
          <main className="flex-grow-1 p-4">
            <Outlet />
          </main>
        <Outlet />
        </div>
    </div>
  );
}

export default ArtistLayout