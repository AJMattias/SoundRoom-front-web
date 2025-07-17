/* eslint-disable react/prop-types */
const Alerta = ({ mensaje, onClose }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
      <span>{mensaje}</span>
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default Alerta;