export const useUserValidation = () => {
  
  
    const passValidate = (pass) => {
        let expRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
        if( ! expRegPass.test(pass)){
            return "the password must have: Have at least one lowercase letter, one capital letter, one digit, one special character and Be between 8 and 12 characters long."
        }

        return true;
    }

    const emailValidate = (email) => {
        let expRegEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if( ! expRegEmail.test(email)){
            return "the email pattern is not right"
        }

        return true;
    }
    
    const userTypeValidate = (ut) => {
        if( ! (ut === "Buyer" || ut === "Seller" || ut === "Analyst") ){
            return "invalid user type"
        }

        return true
    }

    const requiredValidations = (formData) => {
      switch (formData) {
        case "name" || "lastName" :
          return { required: true, maxLength: 50 };
  
        case "email":
          return { required: true, validate : emailValidate };
  
        case "password":
            return { required: true, validate : passValidate };

        case "userType":
          return { required: true, validate: userTypeValidate };
  
        default:
          break;
      }
    };
  
    const errorMessages = (errorType) => {
      switch (errorType.type) {
        case "required":
          return "This field is required";
  
        case "maxLength":
          return "The value must be less than 50 characters";
  
        case "validate":
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