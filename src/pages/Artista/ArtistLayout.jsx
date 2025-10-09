// import NavBar from '../../components/NavBar';
// import { Outlet } from 'react-router-dom';
// import SideBarArtist from '../../components/SideBarArtist';

// const ArtistLayout = () => {
//   return (
//     <div>
//       <NavBar />
//         <div className="d-flex" 
//           style={{ 
//             marginTop: "4rem", 
//             height: "calc(100vh - 4rem)",
//             display: "flex"  }}> 
        
//             <SideBarArtist />
//           <main className="flex-grow-1 p-4 bg-light">
//             <Outlet />
//           </main>
//         </div>
//     </div>
//   );
// }

// export default ArtistLayout
// ArtistLayout.jsx (CÓDIGO CORREGIDO para altura y posición)
import NavBar from '../../components/NavBar';
import { Outlet } from 'react-router-dom';
import SideBarArtist from '../../components/SideBarArtist';

const ArtistLayout = () => {
  const sidebarWidth = "250px"; // Define el ancho de la barra lateral

  return (
    <div>
      <NavBar />
      {/* Contenedor que simula el layout principal */}
      <div style={{ 
                marginTop: "4rem", 
                minHeight: "calc(100vh - 4rem)",
                display: "flex" // Esto ya no es estrictamente necesario, pero lo mantenemos por claridad
            }}> 
        
        {/* 1. Espacio vacío: Necesitas un div que OCUPE el espacio que la barra lateral fixed dejó libre. */}
                <div style={{ width: sidebarWidth, flexShrink: 0 }}>
                    {/* Este div mantiene el flujo del documento para que main no se superponga */}
                </div>

        {/* 2. Main: El contenido scrollable. Debe tener un margen izquierdo igual al ancho de la barra lateral. */}
        <main className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>
      </div>

            {/* 3. La barra lateral: Colocarla fuera del contenedor flexible y darle posición fixed. */}
            <div 
                style={{
                    position: "fixed", // ⬅️ Fija la posición en la ventana
                    top: "3.5rem",       // ⬅️ Debajo del NavBar
                    left: 0,
                    width: sidebarWidth,
                    height: "calc(100vh - 4rem)", // ⬅️ Ocupa toda la altura de la ventana restante
                    zIndex: 1000, // Opcional: Asegura que esté por encima de otros elementos
                }}
            >
                <SideBarArtist />
            </div>
    </div>
  );
}

 export default ArtistLayout