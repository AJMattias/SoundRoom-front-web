/* eslint-disable react/prop-types */
const AlertaGreen = ({ mensaje, onClose }) => {
    return (
      <div className="alert alert-success d-flex align-items-center justify-content-between" role="alert">
        <span>{mensaje}</span>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
    );
  };
  
  export default AlertaGreen;