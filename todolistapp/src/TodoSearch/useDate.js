import { useState } from "react";

export const useAños = () => {
  const [años] = useState([
    { año: 2022 },
    { año: 2023 },
    { año: 2024 },
    { año: 2025 },
    { año: 2026 },
    { año: 2027 },
    { año: 2028 },
    { año: 2029 },
    { año: 2030 },
  ]);

  return años;
};
//obtiene informacion de una fecha en especifico
export const getSemanaAnio_Dia = (fechaEvalua = null) => {
  // donde fecha Evalua debe ser un objeto de fecha valido de JS
  let d = fechaEvalua ?? new Date();
  let anio = d.getFullYear();
  // console.log(fechaEvalua?`fechaEvaluada por parametro`:`fecha automatica`, d);
  let ndia = d.getDay();
  // console.log("dia", d.getDay());
  // console.log("dia UTC", d.getUTCDay());
  // Se limpia hora
  d.setHours(0, 0, 0, 0);
  // Codigo para asegurarnos que estamos en esa semana
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  //se ajusta naturaleza de los numeros
  let nsem = Math.ceil(
    ((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7
  );
  return {
    anio: anio,
    semana: nsem,
    dia: ndia === 0 ? 7 : ndia,
    formatoVW: `${anio}KW${nsem}.${ndia === 0 ? 7 : ndia}`,
  };
};

const format2digitos = (num = 0)=>{
  return num<=9 ? `0${num}`: `${num}`;
}

export const formateaFecha = (fecha = "")=>{
  let fformat = "";
  let f = fecha === "" ? new Date(): new Date(fecha);
  fformat = `${
    format2digitos(f.getDate())
  }-${
    format2digitos(f.getMonth()+1) //se le suma 1 por que los meses en JS empiezan en 0
  }-${
    f.getFullYear()
  } ${
    format2digitos(f.getHours())
  }:${
    format2digitos(f.getMinutes())
  }:${
    format2digitos(f.getSeconds())
  }`;
  // console.log("fecha normal:", fecha);
  // console.log("fecha formateada a dd-mm-YY HH:MM:SS", fformat);
  return fformat;
}

export const formateaFechaR = (fecha = "")=>{
  let fformat = "";
  let f = fecha === "" ? new Date(): new Date(fecha);
  fformat = `${
    f.getFullYear()
  }-${
    format2digitos(f.getMonth()+1) //se le suma 1 por que los meses en JS empiezan en 0
  }-${
    format2digitos(f.getDate())
  } ${
    format2digitos(f.getHours())
  }:${
    format2digitos(f.getMinutes())
  }:${
    format2digitos(f.getSeconds())
  }`;
  // console.log("fecha normal:", fecha);
  // console.log("fecha formateada a dd-mm-YY HH:MM:SS", fformat);
  return fformat;
}