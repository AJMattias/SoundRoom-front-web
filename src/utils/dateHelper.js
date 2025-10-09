import { parseISO, parse, format, isValid } from "date-fns";
import { es } from "date-fns/locale"; // Importar la configuración regional española

// Verificar si una cadena es una fecha ISO válida
export const isIsoDateString = (value) => {
  const date = parseISO(value);
  return isValid(date);
};

// Convertir fechas ISO a objetos Date en un objeto o array
export const convertIsoDates = (obj) => {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string' && isIsoDateString(obj)) {
    return parseISO(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(convertIsoDates);
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = convertIsoDates(obj[key]);
      return acc;
    }, {});
  }

  return obj;
};

// export const  formatFecha = (fecha)  =>{
//   const date = new Date(fecha);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }

export const formatFecha = (fechaStr) => {
  console.log('format fecha date: ', fechaStr, typeof fechaStr);
  let day, month, year;

  if (fechaStr.includes('/')) {
    // Formato tipo 'DD/MM/YYYY'
    [day, month, year] = fechaStr.split('/').map(Number);
  } else if (fechaStr.includes('-')) {
    // Formato tipo 'YYYY-MM-DD'
    [year, month, day] = fechaStr.split('-').map(Number);
  } else {
    console.warn('Formato de fecha desconocido:', fechaStr);
    return 'Invalid date';
  }

  const localDate = new Date(year, month - 1, day); // mes base 0
  const y = localDate.getFullYear();
  const m = String(localDate.getMonth() + 1).padStart(2, '0');
  const d = String(localDate.getDate()).padStart(2, '0');
  const resultado = `${y}-${m}-${d}`;
  console.log('fecha resultante: ', resultado);
  return resultado;
};

export const formatFechaAr = (fechaStr) => {
  console.log('format fecha date: ', fechaStr, typeof fechaStr);
  let day, month, year;

  if (fechaStr.includes('/')) {
    // Formato tipo 'DD/MM/YYYY'
    [day, month, year] = fechaStr.split('/').map(Number);
  } else if (fechaStr.includes('-')) {
    // Formato tipo 'YYYY-MM-DD'
    [year, month, day] = fechaStr.split('-').map(Number);
  } else {
    console.warn('Formato de fecha desconocido:', fechaStr);
    return 'Invalid date';
  }

  const localDate = new Date(year, month - 1, day); // mes base 0
  const y = localDate.getFullYear();
  const m = String(localDate.getMonth() + 1).padStart(2, '0');
  const d = String(localDate.getDate()).padStart(2, '0');
  const resultado = `${d}-${m}-${y}`;
  console.log('fecha resultante: ', resultado);
  return resultado;
};


export function formatDate(fecha) {
  console.log("Fecha recibida:", fecha);

  if (!fecha) {
    console.log("Fecha es null o undefined.");
    return "";
  }

  try {
    const parsedDate = parse(fecha, "dd/MM/yyyy", new Date(), { locale: es }); // Usar configuración regional española

    console.log("Fecha parseada:", parsedDate);

    if (!isValid(parsedDate)) {
      console.log("Fecha no es válida.");
      return "Invalid Date";
    }

    const fechaResult = format(parsedDate, "yyyy-MM-dd", { locale: es }); // Usar configuración regional española

    console.log("Fecha formateada:", fechaResult);

    return fechaResult;
  } catch (error) {
    console.error("Error al formatear fecha:", error);
    return "Invalid Date";
  }


}

export function formatFecha2(fecha) {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const fechaResult =  `${year}-${month}-${day}`
  return fechaResult;
}