import NavBar from "../../components/NavBar"

const SendCode = () => {
  return (
    <div>
        <NavBar />
        <div className="container col-6 d-flex flex-column gap-2 justify-content-center align-items-center bg-light pb-4 pt-4 rounded border border-2" style={{ marginTop: "15vh" }}>
        <h3 className="text-center text-dark">Olvidé mi Contraseña</h3>
                <p className="text-center text-dark">Eviar codigo de recuperación</p>
        <form className="row g-2 px-3"></form>
        </div>
    </div>
  )
}

export default SendCode