    export class Days{
    // id:'', available: false, name = String;
    }

    export class DaysList{
        constructor({days = []} = {}){
            this.days = days.map(day => new Days(day));
        }
    }
    //crear array de days dias de semana
    export const days = [
        {id:'0', available: false, dia: "Lunes", hsInicio:"", hsFin:""},
        {id:'1', available: false, dia: "Martes", hsInicio:"", hsFin:""},
        {id:'2', available: false, dia: "Miercoles", hsInicio:"", hsFin:""},
        {id:'3', available: false, dia: "Jueves", hsInicio:"", hsFin:""},
        {id:'4', available: false, dia: "Viernes", hsInicio:"", hsFin:""},
        {id:'5', available: false, dia: "Sabado", hsInicio:"", hsFin:""},
        {id:'6', available: false, dia: "Domingo", hsInicio:"", hsFin:""}
    ]
    export const hours =[
        {hour: "08:00"},
        {hour: "09:00"},
        {hour: "10:00"},
        {hour: "11:00"},
        {hour: "12:00"},
        {hour: "13:00"},
        {hour: "14:00"},
        {hour: "15:00"},
        {hour: "16:00"},
        {hour: "17:00"},
        {hour: "18:00"},
        {hour: "19:00"},
        {hour: "20:00"},
        {hour: "21:00"},
        {hour: "22:00"},
        {hour: "23:00"},
    ]