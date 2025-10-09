/* eslint-disable react/prop-types */
import userIcon from "../assets/user.png"

const ArtistHomeCard = (props) => {
  console.log('artista: ', props.artista)
 return (
  <div className="container mt-2">
   <div className="card border-0 shadow-sm">
    <div className="card-body">
     
          {/* USAMOS UNA FILA (ROW) PRINCIPAL Y ALINEAMOS VERTICALMENTE */}
     <div className="row align-items-center">

      {/* COLUMNA 1: IMAGEN (Tamaño automático con col-auto) */}
      <div className="col-auto">
       <img 
        src={userIcon} 
        alt="user" 
        className="rounded-circle shadow" // Clases solo para estilo de imagen
        style={{width: '80px', height: '80px', objectFit: 'cover'}} // Estilo
       /> 
      </div>

      {/* COLUMNA 2: DETALLES DEL ARTISTA (Ocupa el resto del espacio) */}
      <div className="col">
       {/* Contenedor de las líneas de texto, apiladas en columna */}
       <div className="d-flex flex-column gap-1"> 
        <div className="d-flex align-items-center">
         <strong className="fs-4">
          {props.artista.name} {props.artista.last_name}
         </strong>
        </div>
        <div className="d-flex align-items-center">
         <span className="text-muted">{props.artista.email}</span>
        </div>
        <div className="d-flex align-items-center">
         <small className="text-muted">
            {props.artista.tipoArtista || 'Artista'}
        </small>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ArtistHomeCard;