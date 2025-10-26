/* eslint-disable react/prop-types */

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'warning', 
  text = 'Cargando...',
  centered = false 
}) => {
  const spinnerClass = `spinner-border${size !== 'md' ? ` spinner-border-${size}` : ''} text-${color}`;
  
  const spinnerContent = (
    <div className="d-flex align-items-center">
      <div className={spinnerClass} role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      {text && <span className="ms-2">{text}</span>}
    </div>
  );

  if (centered) {
    return (
      <div className="d-flex justify-content-between align-items-center">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;