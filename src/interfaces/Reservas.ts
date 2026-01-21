//interfaz tipo de reservas

export interface Reserva {
  id: number;
  fecha: string;
  cliente: string;
  nombreSala: string;
  estado: string;
  idCliente: string;
  idSala: string;
}