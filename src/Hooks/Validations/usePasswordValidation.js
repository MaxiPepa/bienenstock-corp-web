import { PASSWORDREGEX } from "../../Assets/Constants";

export const usePasswordValidation = () => {
  const arrayPasswordInputs = [
    {
      labelName: "Current password: ",
      styles: "input",
      type: "password",
      placeholder: "********",
      formData: "password",
    },
    {
      labelName: "New password: ",
      styles: "input",
      type: "password",
      placeholder: "********",
      formData: "newPassword",
    },
    {
      labelName: "Confirm new password: ",
      styles: "input",
      type: "password",
      placeholder: "********",
      formData: "confirmPassword",
    },
  ];

  const validateNewAndConfirmPassword = (value, values) => {
    if (value !== values.newPassword) {
      return "The passwords must match";
    }
    return true;
  };

  const requiredValidations = (formData) => {
    switch (formData) {
      case "password":
        return { required: true, pattern: PASSWORDREGEX };
      case "newPassword":
        return {
          required: true,
          pattern: PASSWORDREGEX,
        };
      case "confirmPassword":
        return {
          required: true,
          pattern: PASSWORDREGEX,
          validate: validateNewAndConfirmPassword,
        };
      default:
        break;
    }
  };

  const errorMessages = (errorType) => {
    switch (errorType.type) {
      case "required":
        return "This field is required";
      case "pattern":
        return "The password must have at least 6 characters, a capital letter, a lowercase letter, a number and a special character.";
      case "validate":
        return errorType.message;
      default:
        break;
    }
  };

  return {
    arrayPasswordInputs,
    requiredValidations,
    errorMessages,
  };
};
