export const parsingDateTime = (isoString) => {
  const date = new Date(isoString);

  const dd = date.getDate().toString().padStart(2, "0");
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const yy = date.getFullYear().toString();
  const hs = date.getHours().toString().padStart(2, "0");
  const ms = date.getMinutes().toString().padStart(2, "0");

  const formatedDate = `${dd}/${mm}/${yy} ${hs}:${ms}`;
  return formatedDate;
};
export const parsingDate = (isoString) => {
  const date = new Date(isoString);

  const dd = date.getDate().toString().padStart(2, "0");
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const yy = date.getFullYear().toString();

  const formatedDate = `${dd}/${mm}/${yy}`;
  return formatedDate;
};
export const parsingEachFirstLetterToUppercase = (string) => {
  const stringSplitted = string.split(" ");
  const stringSplittedUppercase = stringSplitted.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  const stringJoined = stringSplittedUppercase.join(" ");
  return stringJoined;
};
