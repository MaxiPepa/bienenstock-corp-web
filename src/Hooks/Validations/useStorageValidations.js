export const useStorageValidations = () => {
  const validateExpirationDate = (values) => {
    let valid = true;
    values.forEach((value) => {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
        valid = false;
      }
    });
    return valid;
  };

  const validateEmpty = (values) => {
    let valid = true;
    values.forEach((value) => {
      if (value === "") {
        valid = false;
      }
    });
    return valid;
  };
  return {
    validateExpirationDate,
    validateEmpty,
  };
};
