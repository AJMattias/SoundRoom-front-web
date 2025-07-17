import { useEffect, useState } from "react"
import { ComisionsService } from "../../services/ComisionService"
import { useNavigate } from "react-router-dom"


const ComissionHistory = () => {

  const navigate= useNavigate()
  const [comisiones, setComisiones] = useState([])
  const [comisionEnabled, setComisionEnabled] = useState()


  const getComisiones = async () => {
    const response = await ComisionsService.getComisiones();
    const formattedComisiones = response.map((comision) => {
      const date = new Date(comision.createdAt);
      const formattedCreatedAt = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      let formattedDeletedAt = null;
      if (comision.deletedAt) {
        const deletedAt = new Date(comision.deletedAt);
        formattedDeletedAt = `${deletedAt.getDate()}/${
          deletedAt.getMonth() + 1
        }/${deletedAt.getFullYear()}`;
      }
      return { ...comision, createdAt: formattedCreatedAt, deletedAt: formattedDeletedAt };
    });

    setComisiones(formattedComisiones);

    const enabledComision = formattedComisiones.find(comision => comision.enabled === "true");
    setComisionEnabled(enabledComision || null); // Set to null if not found.
  };
  // const getComisionEnabled =() =>{
  //   comisiones.map((comision)=>{
  //       if(comision.enabled ==="true") setComisionEnabled(comision)
  //         console.log(comision)
  //       })
  // }

  useEffect(() => {
    getComisiones()
    //getComisionEnabled()
  }, [])

  return (
    <div className='container bg-body-secondary rounded-3 col-10 ms-5 py-3'>
        <div className="d-flex justify-content-start align-items-center">
            <button className='btn btn-warning me-3'
            onClick={()=> navigate("/admin/comission/create")}>Crear comision</button>
            <button className='btn btn-warning'
            onClick={()=> navigate("/admin/comission/comissions")}>Ver comisiones</button>
        </div>
        <div className='w-100 mt-3 py-2 g2'>
            {comisionEnabled &&  (
                <>
                    <h5 className="fw-bold">Comision aplicada: {comisionEnabled.porcentaje} %</h5>
                </>
            )}
            {comisiones.map((comision) => (
                <div className="container border border-warning rounded-3 col-8 border-bottom bg-body-tertiary rounded-3 my-3 py-2" key={comision.id}>
                <p className="fw-bold">Comision: {comision.porcentaje} %</p>
                <div className="d-flex" style={{marginTop:"-3vh"}}>
                <p> Aplicado: {comision.createdAt} {' - '}
                    {comision.deletedAt ? comision.deletedAt : 'Actualidad'}
                </p>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default ComissionHistory