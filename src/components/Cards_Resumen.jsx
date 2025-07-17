

import PropTypes from 'prop-types';

const Cards_Resumen = ({reservas, ingresos, calificacion, cancelaciones}) => {
    const cards = [
        {title:"Reservas esta semana", valor: reservas},
        {title:"Ingresos esta semana", valor: ingresos},
        {title:"Calificacion Promedio", valor: calificacion},
        {title:"Cancelaciones esta semana", valor: cancelaciones}
    ]
  return (
    <div className= 'd-flex flex-wrap justify-content-center align-items-center'>
      {cards.map((card, index) => (
        <div key={index} className='card bg-transparent text-dark p-1 mx-1 w-20 mt-2'>
          <p className="card-title fw-bold text-center w-75">{card.title}</p>
          <h4 className='card-text text-center'>{card.valor ? card.valor : '0'}</h4>
        </div>
      ))}
    </div>
  )
}

Cards_Resumen.propTypes = {
  reservas: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ingresos: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  calificacion: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cancelaciones: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Cards_Resumen