/* eslint-disable react/prop-types */
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = ({ onChange, value, isInicio }) => { // Correcta desestructuración de props
  return (
    <div>
      <ReactCalendar 
        onChange={(date) => onChange(date, isInicio)} // Pasando la función correctamente
        value={value} 
      />
    </div>
  );
};

export default Calendar;