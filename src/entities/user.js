export class User {
    constructor({ 
      id="",
      name = "", 
      last_name="",
      email = "", 
      createdAt = null,
      idPerfil = {},
      //idArtistType = "",
      enabled = "", 
      fechaNacimiento = null, 
      sexo = "", 
      telefono = "", 
      urlImage = "" ,
      isAdmin=false ,
      enabledHistory = [],
      deletedAt= null,
      password=''
    } = {}) {
      this.id= id;
      this.name = name;
      this.email = email;
      this.createdAt = createdAt;
      this.deletedAt = deletedAt;
      this.last_name = last_name;
      //this.idArtistType = idArtistType;
      this.enabled = enabled;
      this.fechaNacimiento = fechaNacimiento;
      this.sexo = sexo;
      this.telefono = telefono;
      this.urlImage = urlImage;
      this.isAdmin = isAdmin;
      this.password = password
      this.enabledHistory = enabledHistory.map(entry => ({
        status: entry.status || "",
        dateFrom: entry.dateFrom ? new Date(entry.dateFrom) : null,
        dateTo: entry.dateTo ? new Date(entry.dateTo) : null
      }));
      this.idPerfil = idPerfil;
    }
  }