export const parsingDate = (isoString) => {
  const fecha = new Date(isoString);

  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const año = fecha.getFullYear().toString();
  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");

  const fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}`;
  return fechaFormateada;
};
