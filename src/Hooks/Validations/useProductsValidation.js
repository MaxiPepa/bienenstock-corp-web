export const useProductsValidation = () => {
  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      return "The date must be equal or less than the current date";
    }

    return true;
  };

  const validatePrice = (value) => {
    if (value < 0.01) {
      return "The value must be greater than 0.01";
    }

    return true;
  };

  const validateIdentifier = (value) => {
    const isDNI = /^\d{8}$/;
    const isCUIT = /^\d{2}-\d{8}-\d$/;

    if (!isDNI.test(value) && !isCUIT.test(value)) {
      return "The type of identification is invalid";
    }

    if (isDNI.test(value)) {
      const numericValue = parseInt(value, 10);
      if (numericValue <= 1000000 || numericValue >= 99999999) {
        return "The type of identification is invalid";
      }
    }

    return true;
  };

  const validateInteger = (value) => {
    const numberRegex = /^\d+$/;

    if (numberRegex.test(value)) {
      return true;
    } else {
      return "The value must be a valid number";
    }
  };

  const validateStorageDate = (storagedate) => (value) => {
    const selectedDate = new Date(value);
    const storageDate = new Date(storagedate.date);
    if (selectedDate < storageDate) {
      return `The date must be equal or greater than the ${storagedate.section} date`;
    }
    return true;
  };

  const requiredValidations = (formData, storagedate) => {
    switch (formData) {
      case "productCode":
        return { required: true, maxLength: 10 };

      case "name":
        return { required: true, maxLength: 50 };

      case "unitPrice":
        return { required: true, validate: validatePrice };

      case "quantity":
        return { required: true, min: 1, validate: validateInteger };

      case "supplier":
        return { required: true, maxLength: 100 };

      case "sectionDate":
        return {
          required: true,
          validate: {
            validateStorageDate: validateStorageDate(storagedate),
            validateDate: validateDate,
          },
        };

      case "purchaseDate":
        return { required: true, validate: validateDate };

      case "saleDate":
        return { required: true, validate: validateDate };

      case "address":
        return { required: true, maxLength: 100 };

      case "identifier":
        return { required: true, validate: validateIdentifier };
      case "businessName":
        return { required: true, maxLength: 100 };
      default:
        break;
    }
  };

  const errorMessages = (errorType) => {
    switch (errorType.type) {
      case "required":
        return "This field is required";

      case "minPrice":
        return "The value must be greater than 0.01";

      case "min":
        return "The value must be greater than 0";

      case "maxLength":
        return "The value must be less than 100 characters";

      case "validate":
        return errorType.message;
      case "validateDate":
        return errorType.message;
      case "validateStorageDate":
        return errorType.message;
      default:
        break;
    }
  };

  return {
    requiredValidations,
    errorMessages,
  };
};
