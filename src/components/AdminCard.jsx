import { Link } from "react-router-dom"
import PropTypes from "prop-types";


const AdminCard = ({sections}) => {
  return (
     <div className="container">
          <h1 className="text-center mb-4">Panel Administracion</h1>
          <div className="row">
            {sections.map((section, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="card border-warning shadow-sm rounded-4">
                  <div className="card-body">
                    <p className="card-title fs-3">{section.title}</p>
                    <p className="card-text">{section.description}</p>
                    <div className="d-flex justify-content-center">
                      <Link to={section.link} className="btn btn-warning w-50 px-4">
                        {/* {section.title.toUpperCase()} */}
                        Ir a seccion
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

// Agregamos la validación de `sections` con `PropTypes`
AdminCard.propTypes = {
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default AdminCard