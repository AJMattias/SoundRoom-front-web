import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext.jsx"
import { useContext, useEffect, useState } from "react"
import UserService from "../../services/UsersService.js"
import { useForm} from "react-hook-form"
import NavBar from "../../components/NavBar.jsx"
import { PerfilesService } from "../../services/PerfilService.js"

const Register = () => {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { login, logout } =  useContext(AuthContext)
  const navigate = useNavigate()
  const [perfiles, setPerfiles] = useState([])
  const [perfilSeleccionado, setPerfilSeleccionado] = useState({id:'', name:''})
  

  const getPerfiles = async() =>{
    let perfilesGetted = [{id:'', name:'Ninguno'}]
    const response = await PerfilesService.getPerfiles()
    console.log('response: ', response)
    response.map((perfil) =>{
      perfilesGetted.push({id: perfil.id, name: perfil.name})
    })
    console.log('perfilesGetted: ', perfilesGetted)
    setPerfiles(perfilesGetted)
  }

  const handleSeleccionarPerfil = (id, name) =>{
    setPerfilSeleccionado({id: id, name: name})
  }

  useEffect(() => {
    //if(authState.isAuthenticated) navigate("/admin/")
    logout()
    if(perfiles.length === 0){
      getPerfiles()
    }
    
  }, [
    //authState.isAuthenticated, 
    perfiles])

  const onSubmit = async(values) =>{
    console.log("form values: ", values)
    console.log('values.email, values.name, values.lastName, values.password, perfilSeleccionado: ',values.email, values.name, values.lastName, values.password, perfilSeleccionado.id)
    const response = await UserService.registerSr(values.email, values.name, values.lastName, values.password, perfilSeleccionado.id)
    console.log('registro: ', response)
    login({ user: response.user, token: response.token });
    if(response.token){
      navigate("/admin")
    }
  }

  return (
    <div>
    <NavBar />
    <div className="container col-6 d-flex flex-column gap4 justify-content-center align-items-center bg-light pb4 pt-4 rounded border border-2" style={{marginTop: "15vh"}}>
    {/* {
      error.map((error, i)=>(
      <div key={i} className="alert alert-danger my-0" role="alert">
        {error}
        </div>))
    } */}
      <h3 className="text-center text-dark">Registro</h3>
      <form 
        className="row g-2 px-3"
        onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="text-dark">Nombre</label>
          <input type="name"
          placeholder="Nombre"
          {...register("name", {required: true})}/>
          {errors.name && <p className="text-danger">Nombre es requerido</p>} 
          <label htmlFor="lastName" className="text-dark">Apellido</label>
          <input type="lastName"
          placeholder="Apellido"
          {...register("lastName", {required: true})}/>
          {errors.lastName && <p className="text-danger">Apellido es requerido</p>} 
          <label htmlFor="email" className="text-dark">Email</label>
          <input type="email"
          placeholder="Email"
          {...register("email", {required: true})}/>
          {errors.email && <p className="text-danger">Email es requerido</p>} 
          <label htmlFor="password" className="text-dark">Contraseña</label>
          <input type="Password"
          placeholder="Contraseña"
          {...register("password", { required: "La contraseña es obligatoria" })}
          />
          <label htmlFor="password2" className="text-dark">Contraseña</label>
          <input type="password"
          placeholder="Repite la Password"
          {...register("password2", { 
            required: "Confirma tu contraseña",
            validate: value => value === watch("password") || "Las contraseñas no coinciden"
          })}
          />

          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="dropdown px-0 pt-2">
              <button 
                className="btn btn-warning dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                Selecciona un Perfil
              </button>
              <ul className="dropdown-menu">
                {perfiles.map((perfil) => (
                  <li 
                    className="dropdown-item" 
                    key={perfil.id}
                    onClick={() => handleSeleccionarPerfil(perfil.id, perfil.name)}>
                    {perfil.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Texto del perfil seleccionado alineado a la derecha */}
            {perfilSeleccionado.id !== '' && (
              <p className="mb-0 pt-2 ps-3">Perfil Seleccionado: {perfilSeleccionado.name}</p>
            )}
          </div>


          <button className="d-inline-block w-auto btn btn-warning" type="submit">Registrarse</button>
          <p className="d-flex gap-2 justify-content-between text-dark">Ya tienes una cuenta? 
          <Link to="/login" className="text-warning">Login</Link></p>
      </form>
    </div>
    </div>
  )
}

export default Register