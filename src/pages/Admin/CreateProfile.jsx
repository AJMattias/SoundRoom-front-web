import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { PerfilesService } from "../../services/PerfilService";

const CreateProfile = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  // const { permiso } = useParams()
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false);
  const [perfilName, setPerfilName] = useState('')

  const onSubmit = async (values) => {
    if (update) {
      const response = await PerfilesService.updatePerfil(
        location.state?.perfil.id,
        values.nuevoPerfil
      );
      if (response.id) {
        navigate("/admin/profiles/profiles");
      } else {
        setError("Hubo un error, intente nuevamente mas tarde");
      }
    } else {
      console.log(values.nuevoPerfil);
      const response = await PerfilesService.createPerfil(values.nuevoPerfil);
      if (response.id) {
        navigate("/admin/profiles/profiles");
      } else {
        setError("Hubo un error, intente nuevamente mas tarde");
      }
    }
  };

  useEffect(() => {
    const loadPerfil = () => {
      if (location.state?.perfil) {
        setUpdate(true);
        const perfil = location.state?.perfil;
        setValue("id", perfil.id);
        setValue("nuevoPerfil", perfil.name);
        setPerfilName(perfil.name)
      }
    };
    loadPerfil();
  }, []);

  return (
    <div className="container mx-5">
      <div className="col-11">
        <button
          className="btn btn-warning"
          onClick={() => navigate("/admin/profiles/profiles")}
        >
          Ver Perfiles
        </button>
        {update ? (
          <h2 className="text-center pb-4">Editar Perfil: {perfilName}</h2>
        ) : (
          <h2 className="text-center pb-4">Crear Perfil</h2>
        )}
        {error !== "" && <p className="text-warning fs-3">{error}</p>}
        <div className="bg-body-secondary rounded-3 p-4">
          <form className="row g-2 px-3" onSubmit={handleSubmit(onSubmit)}>
            {update ? (
              <label>Editar Perfil</label>
            ) : (
              <label>Nuevo Perfil</label>
            )}

            <input
              type="text"
              placeholder="Nuevo Perfil"
              {...register("nuevoPerfil", { required: true })}
              defaultValue={watch("nuevoPerfil", "")}
              autoFocus
            />
            {update ? (
              <button className="btn btn-warning w-auto mt-3" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-warning w-auto mt-3" type="submit">
                Guardar
              </button>
            )}
          </form>
        </div>
      </div>
      {/* <div className="col-4">
        <h4>Perfiles</h4>
        {perfiles.map((perfil)=> (
            <div className="w-100 bg-light rounded-3 justify-content-start align-items-lg-center" 
                 key={perfil.id}>
                 <h6>{perfil.name}</h6>
                <p className="fs-2">Editar</p>
                <p className="fs-2">Eliminar</p>

            </div>
        ))}
    </div> */}
    </div>
  );
};

export default CreateProfile;
