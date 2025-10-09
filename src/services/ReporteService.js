/* eslint-disable no-unused-vars */
import { api } from "../api/ApiClient";
import { getJwtToken } from "../storage/LocalStorage";
import { formatDate, formatFecha } from "../utils/dateHelper";

class ReportesService {
  async reportesNuevosUsuarioss(fechaInicio, fechaHasta) {
    console.log("fechaI: ", fechaInicio);
    console.log("fechaH: ", fechaHasta);
    //parsear fechas
    // let fechaIn = formatFecha(fechaInicio)
    // let fechaHa = formatFecha(fechaHasta)

    // console.log('fechaI: ', fechaIn)
    // console.log('fechaH: ', fechaHa)
    // console.log('fechaI: ', fechaIn, 'Type: ', typeof fechaIn)
    // console.log('fechaH: ', fechaHa, 'Type: ', typeof fechaHa);

    const reportena = api.post("/users/reportesNuevosUsers", {
      fechaI: fechaInicio,
      fechaH: fechaHasta,
    });
    console.log("reportena: ", reportena);
    return reportena;
  }

  async descargarReportesNuevosUsuarios(fechaInicio, fechaHasta) {
    console.log("fechaI: ", fechaInicio);
    console.log("fechaH: ", fechaHasta);
    //parsear fechas
    // let fechaIn = formatFecha(fechaInicio)
    // let fechaHa = formatFecha(fechaHasta)

    // console.log('fechaI: ', fechaIn)
    // console.log('fechaH: ', fechaHa)
    // console.log('fechaI: ', fechaIn, 'Type: ', typeof fechaIn)
    // console.log('fechaH: ', fechaHa, 'Type: ', typeof fechaHa);

    const reporte = api.post(
      "/users/descargarReportesNuevosUsers",
      {
        fechaI: fechaInicio,
        fechaH: fechaHasta,
      },
      {
        responseType: "blob", // Especifica que esperas un Blob en la respuesta
        headers: { Accept: "application/pdf" }, // Asegúrate de aceptar PDF
      }
    );
    console.log("reporte descargar: ", await reporte);
    return reporte;
  }

  //primero funcionando
  async reportesNuevosArtistas(fechaInicio, fechaHasta) {
    console.log("fechaI: ", fechaInicio);
    console.log("fechaH: ", fechaHasta);
    //parsear fechas
    // let fechaIn = formatFecha(fechaInicio)
    // let fechaHa = formatFecha(fechaHasta)

    // console.log('fechaI: ', fechaIn)
    // console.log('fechaH: ', fechaHa)
    // console.log('fechaI: ', fechaIn, 'Type: ', typeof fechaIn)
    // console.log('fechaH: ', fechaHa, 'Type: ', typeof fechaHa);

    // const reportena = api.post("/users/reportesNuevosArtistas", {
    //     fechaI: fechaIn,
    //     fechaH: fechaHa})
    // console.log('reportena: ', reportena)
    // return reportena
    const reporte = api.post(
      "/users/reportesNuevosArtistas",
      {
        fechaI: fechaInicio,
        fechaH: fechaHasta,
      },
      {
        responseType: "blob", // Especifica que esperas un Blob en la respuesta
        headers: { Accept: "application/pdf" }, // Asegúrate de aceptar PDF
      }
    );
    console.log("reporte descargar: ", await reporte);
    return reporte;
  }

  async reportesSalasNuevas(fechaInicio, fechaHasta) {
    console.log("fechaI: ", fechaInicio);
    console.log("fechaH: ", fechaHasta);
    //parsear fechas
    let fechaIn = formatFecha(fechaInicio);
    let fechaHa = formatFecha(fechaHasta);

    console.log("fechaI: ", fechaIn);
    console.log("fechaH: ", fechaHa);
    console.log("fechaI: ", fechaIn, "Type: ", typeof fechaIn);
    console.log("fechaH: ", fechaHa, "Type: ", typeof fechaHa);

    const reportena = api.post("/salasdeensayo/reportesNuevasSdE", {
      fechaI: fechaIn,
      fechaH: fechaHa,
    });
    console.log("reportena: ", reportena);
    return reportena;
  }

  async reportesUsuariosActivos(fechaInicio, fechaHasta) {
    console.log("fechaI: ", fechaInicio);
    console.log("fechaH: ", fechaHasta);
    //parsear fechas
    let fechaIn = formatFecha(fechaInicio);
    let fechaHa = formatFecha(fechaHasta);

    console.log("fechaI: ", fechaIn);
    console.log("fechaH: ", fechaHa);
    console.log("fechaI: ", fechaIn, "Type: ", typeof fechaIn);
    console.log("fechaH: ", fechaHa, "Type: ", typeof fechaHa);

    const reportena = api.post("/users/reportesUsuariosActivos", {
      fechaI: fechaIn,
      fechaH: fechaHa,
    });
    console.log("reportena: ", reportena);
    return reportena;
  }

  async reportesUsuariosBaja(fechaInicio, fechaHasta) {
    console.log("fechaI: ", fechaInicio);
    console.log("fechaH: ", fechaHasta);
    //parsear fechas
    let fechaIn = formatFecha(fechaInicio);
    let fechaHa = formatFecha(fechaHasta);

    console.log("fechaI: ", fechaIn);
    console.log("fechaH: ", fechaHa);
    console.log("fechaI: ", fechaIn, "Type: ", typeof fechaIn);
    console.log("fechaH: ", fechaHa, "Type: ", typeof fechaHa);

    const reportena = api.post("/users/reportesUsuariosBaja", {
      fechaI: fechaIn,
      fechaH: fechaHa,
    });
    console.log("reportena: ", reportena);
    return reportena;
  }

  async reportesPropAlquianSala(fechaInicio, fechaHasta) {
    console.log("fechaI: ", fechaInicio);
    console.log("fechaH: ", fechaHasta);
    //parsear fechas
    let fechaIn = formatFecha(fechaInicio);
    let fechaHa = formatFecha(fechaHasta);

    console.log("fechaI: ", fechaIn);
    console.log("fechaH: ", fechaHa);
    console.log("fechaI: ", fechaIn, "Type: ", typeof fechaIn);
    console.log("fechaH: ", fechaHa, "Type: ", typeof fechaHa);

    const reportena = api.post("/users/reportesPropietariosAlquilan", {
      fechaI: fechaIn,
      fechaH: fechaHa,
    });
    console.log("reportena: ", reportena);
    return reportena;
  }

  async reporteGrafTortaTipoSala(fechaInicio, fechaHasta) {
    console.log("fechaI: ", fechaInicio);
    console.log("fechaH: ", fechaHasta);
    //parsear fechas
    let fechaIn = formatFecha(fechaInicio);
    let fechaHa = formatFecha(fechaHasta);

    console.log("fechaI: ", fechaIn);
    console.log("fechaH: ", fechaHa);
    console.log("fechaI: ", fechaIn, "Type: ", typeof fechaIn);
    console.log("fechaH: ", fechaHa, "Type: ", typeof fechaHa);

    const reportena = api.post("/salasDeEnsayo/reporteTipoSalaTorta", {
      fechaI: fechaIn,
      fechaH: fechaHa,
    });
    console.log("service reportena: ", reportena);
    return reportena;
  }
  //reportes para sala de ensayo
  async cantidadSalaReservas(idSala, fechaInicio, fechaHasta) {
    console.log("fechaI: ", fechaInicio);
    console.log("fechaH: ", fechaHasta);
    console.log("id sala: ", idSala);
    //parsear fechas
    let fechaIn = formatDate(fechaInicio);
    let fechaHa = formatDate(fechaHasta);

    console.log("fechaI: ", fechaIn);
    console.log("fechaH: ", fechaHa);
    console.log("fechaI: ", fechaIn, "Type: ", typeof fechaIn);
    console.log("fechaH: ", fechaHa, "Type: ", typeof fechaHa);

    const reportena = api.post("/reservations/reservationsPorSalaMes/", {
      fechaI: fechaIn,
      fechaH: fechaHa,
      idRoom: idSala,
    });
    console.log("reportena: ", reportena);
    return reportena;
  }

  async valoraciones(idRoom) {
    const reportena = api.get(
      "/salasdeensayo/cantidadVaoraciones/?idRoom=" + idRoom
    );
    console.log("reportena: ", reportena);
    return reportena;
  }

  //dia mas reservado

  async cantidadPorDia(idRoom) {
    const reportena = api.get(
      "reservations/cantidadReservasPorDia/?idRoom=" + idRoom
    );
    console.log("reportena: ", reportena);
    return reportena;
  }

  //cancelaciones reserva
  async cantidadCanceledSalaReservas(sala, fechaInicio, fechaHasta) {
    console.log("fechaI: ", fechaInicio);
    console.log("fechaH: ", fechaHasta);
    //parsear fechas
    let fechaIn = formatFecha(fechaInicio);
    let fechaHa = formatFecha(fechaHasta);

    console.log("fechaI: ", fechaIn);
    console.log("fechaH: ", fechaHa);
    console.log("fechaI: ", fechaIn, "Type: ", typeof fechaIn);
    console.log("fechaH: ", fechaHa, "Type: ", typeof fechaHa);
    console.log("sala id: ", sala);

    const reportena = api.post(
      "/reservations/reservationsCanceladasPorSalaMes/",
      {
        fechaI: fechaIn,
        fechaH: fechaHa,
        idRoom: sala,
      }
    );
    console.log("reportena: ", reportena);
    return reportena;
  }

  // async descargarPDF(fechaI, fechaH, reporte){
  //     console.log('fechaI: ', fechaI)
  //     console.log('fechaH: ', fechaH)
  //     //parsear fechas
  //     let fechaIn = formatFecha(fechaI)
  //     let fechaHa = formatFecha(fechaH)

  //     console.log('fechaI: ', fechaIn)
  //     console.log('fechaH: ', fechaHa)
  //     console.log('fechaI: ', fechaIn, 'Type: ', typeof fechaIn)
  //     console.log('fechaH: ', fechaHa, 'Type: ', typeof fechaHa);

  //     try {
  //         let response = null
  //         let name = ""
  //         switch (reporte) {
  //             case 'Usuarios Nuevos':
  //             name=`Reporte Usuarios Nuevos ${fechaI} a ${fechaH}.pdf`
  //             response = await api.post("/users/descargarReportesNuevosUsers", {
  //             fechaI: fechaIn,
  //             fechaH: fechaHa},
  //             {
  //             responseType: 'blob', // Especifica que esperas un Blob en la respuesta
  //             headers: { 'Accept': 'application/pdf' } // Asegúrate de aceptar PDF
  //             });
  //             //console.log('response: ', response) quitar

  //             break;
  //             case 'Artistas Nuevos':
  //             name=`Reporte Artistas Nuevos ${fechaI} a ${fechaH}.pdf`
  //             response = await api.post("/users/descargarReportesNuevosArtistas", {
  //             fechaI: fechaIn,
  //             fechaH: fechaHa}
  //             , {responseType: 'blob', // Especifica que esperas un Blob en la respuesta
  //             headers: { 'Accept': 'application/pdf' } // Asegúrate de aceptar PDF
  //             },);

  //             break;
  //             case 'Nuevas Salas':
  //             name=`Reporte Salas Nuevas ${fechaI} a ${fechaH}.pdf`
  //             response = await api.post("/salasdeensayo/descargarReportesNuevasSdE", {
  //             fechaI: fechaIn,
  //             fechaH: fechaHa}
  //             , {responseType: 'blob', // Especifica que esperas un Blob en la respuesta
  //             headers: { 'Accept': 'application/pdf' } // Asegúrate de aceptar PDF
  //             },);

  //             break;
  //             case 'Usuarios Activos':
  //             name=`Reporte Usuarios Activos ${fechaI} a ${fechaH}.pdf`
  //             response = await api.post("/users/descargarReportesUsuariosActivos", {
  //             fechaI: fechaIn,
  //             fechaH: fechaHa}
  //             , {responseType: 'blob', // Especifica que esperas un Blob en la respuesta
  //             headers: { 'Accept': 'application/pdf' } // Asegúrate de aceptar PDF
  //             },);

  //             break;
  //             case 'Usuarios Baja':
  //             name=`Reporte Usuarios Baja' ${fechaI} a ${fechaH}.pdf`
  //             response = await api.post("/users/descargarReportesUsuariosBaja", {
  //             fechaI: fechaIn,
  //             fechaH: fechaHa}
  //             , {responseType: 'blob', // Especifica que esperas un Blob en la respuesta
  //             headers: { 'Accept': 'application/pdf' } // Asegúrate de aceptar PDF
  //             },);

  //             break;
  //             case 'Proietarios que alquilan':
  //             name=`Reporte Proietarios que alquilan' ${fechaI} a ${fechaH}.pdf`
  //             response = await api.post("/users/descargarReportesPropietariosAlquilan", {
  //             fechaI: fechaIn,
  //             fechaH: fechaHa}
  //             , {responseType: 'blob', // Especifica que esperas un Blob en la respuesta
  //                 headers: { 'Accept': 'application/pdf' } // Asegúrate de aceptar PDF
  //             },);

  //             break;
  //             case 'Tipos de Sala':
  //             name=`Reporte Tipos de Sala' ${fechaI} a ${fechaH}.pdf`
  //             response = await api.post("/salasDeEnsayo/descargarReporteTipoSalaTorta", {
  //                 fechaI: fechaIn,
  //                 fechaH: fechaHa}
  //                 , {responseType: 'blob', // Especifica que esperas un Blob en la respuesta
  //                     headers: { 'Accept': 'application/pdf' } // Asegúrate de aceptar PDF
  //                 },);

  //             break;

  //             default:
  //                 break;
  //         }

  //         const blob = new Blob([response.data], { type: 'application/pdf' });

  //         console.log(response.data instanceof Blob); // debería decir true
  //         console.log(response.data.type); // debería ser "application/pdf"

  //         const url = URL.createObjectURL(blob);
  //         const a = document.createElement("a");
  //         a.href = url;
  //         a.download = name; // nombre que vos definís antes
  //         document.body.appendChild(a);
  //         a.click();
  //         document.body.removeChild(a);
  //         URL.revokeObjectURL(url);
  //     } catch (error) {
  //       console.error("Error al descargar el PDF:", error);
  //     }
  //   };

  async descargarPDF(fechaI, fechaH, reporte, queryId) {
    console.log("fechaI:", fechaI);
    console.log("fechaH:", fechaH);

    let fechaIn = formatFecha(fechaI);
    let fechaHa = formatFecha(fechaH);
    console.log("fechaIn:", fechaIn);
    console.log("fechaHa:", fechaHa);
    let name = "";
    let query = "";
    const localURL = "http://localhost:3000/";
    const renderUrl = "https://soundroom-api.onrender.com/";
    let endpoint = "";
    const jwt = getJwtToken();
    switch (reporte) {
      case "Usuarios Nuevos":
        name = `Reporte Usuarios Nuevos ${fechaI} a ${fechaH}.pdf`;
        endpoint = "users/descargarReportesNuevosUsers";
        break;
      case "Artistas Nuevos":
        name = `Reporte Artistas Nuevos ${fechaI} a ${fechaH}.pdf`;
        endpoint = "users/descargarReportesNuevosArtistas";
        break;
      case "Nuevas Salas":
        name = `Reporte Salas Nuevas ${fechaI} a ${fechaH}.pdf`;
        endpoint = "salasdeensayo/descargarReportesNuevasSdE";
        break;
      case "Usuarios Activos":
        name = `Reporte Usuarios Activos ${fechaI} a ${fechaH}.pdf`;
        endpoint = "users/descargarReportesUsuariosActivos";
        break;
      case "Usuarios Baja":
        name = `Reporte Usuarios Baja ${fechaI} a ${fechaH}.pdf`;
        endpoint = "users/descargarReportesUsuariosBaja";
        break;
      case "Proietarios que alquilan":
        name = `Reporte Propietarios que alquilan ${fechaI} a ${fechaH}.pdf`;
        endpoint = "users/descargarReportesPropietariosAlquilan";
        break;
      case "Tipos de Sala":
        name = `Reporte Tipos de Sala ${fechaI} a ${fechaH}.pdf`;
        endpoint = "salasDeEnsayo/descargarReporteTipoSalaTorta";
        break;
      default:
        console.warn("Reporte no reconocido");
        return;
    }

    try {
      const url2 = `${renderUrl}${endpoint}`;
      const res = await fetch(url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          fechaI: fechaIn,
          fechaH: fechaHa,
        }),
      });

      if (!res.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el PDF con fetch:", error);
    }
  }

  async descargarPDFSalas(fechaI, fechaH, reporte, queryId) {
    console.log("fechaI:", fechaI);
    console.log("fechaH:", fechaH);
    console.log('reporte: ', reporte)
    console.log('id sala: ', queryId)

    let fechaIn = formatFecha(fechaI);
    let fechaHa = formatFecha(fechaH);
    console.log("fechaIn:", fechaIn);
    console.log("fechaHa:", fechaHa);
    let name = "";
    let query = "";
    const localURL = "http://localhost:3000/";
    const renderUrl = "https://soundroom-api.onrender.com/";
    let endpoint = "";
    const jwt = getJwtToken();
    switch (reporte) {
      case "Cantidad Reservas":
        name = `Reporte Reservas por mes ${fechaI} a ${fechaH}.pdf`;
        endpoint = "reservations/descargarReporteReservationsPorSalaMes/";
        query= `?idRoom=${queryId}`;
        break;
      case "Valoraciones":
        name = `Reporte Tipos de Sala ${fechaI} a ${fechaH}.pdf`;
        endpoint = "salasDeEnsayo/descargarCantidadValoraciones";
        query= `?idRoom=${queryId}`;
        break;
      case "Reservas por dia":
        name = `Reporte Tipos de Sala ${fechaI} a ${fechaH}.pdf`;
        endpoint = "reservations/descargarReporteCantidadReservasPorDia";
        query= `?idRoom=${queryId}`;
        break;
      case "Reservas canceladas":
        name = `Reporte Tipos de Sala ${fechaI} a ${fechaH}.pdf`;
        endpoint = "reservations/descargarReservationsCanceladasPorSalaMes";
        query= `?idRoom=${queryId}`;
        break;
      default:
        console.warn("Reporte no reconocido");
        return;
    }

    try {
      const url2 = `${localURL}${endpoint}`;
      const res = await fetch(url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          fechaI: fechaIn,
          fechaH: fechaHa,
          idRoom: queryId,
        }),
      });

      if (!res.ok) {
        // Intenta leer el cuerpo como texto para entender el error
        const errorText = await res.text();
        console.error("Error del servidor:", res.status, errorText);
        // Mostrar un mensaje de error amigable al usuario
        alert('Error al descargar el PDF. Por favor, inténtelo de nuevo.');
        //throw new Error(`Error en la respuesta del servidor: ${res.status}`);
        return
      }
      // asegurarse que el content-type sea pdf
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/pdf")) {
        const text = await res.text();
        console.error("Respuesta no es PDF:", text);
        alert('El servidor no devolvió un PDF válido.');
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el PDF con fetch:", error);
    }
  }
}

export const reportesService = new ReportesService();
