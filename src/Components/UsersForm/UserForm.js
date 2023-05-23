import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserValidation } from "../../Hooks/Validations/useUserValidation";
import APIContext from "../../Contexts/APIContext";

import { arrayUsersInputs } from "../../Assets/Constants";

import icons from "../../Assets/Icons";


const UserForm = () => {

  const {option,setOption} = useState()
  const { requiredValidations, errorMessages } = useUserValidation();

  const { post } = useContext(APIContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitUser = async (data) => {
    console.log(data)
    await post("user/saveUser",data)
    reset()
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitUser)}
      className="inputs-content"
      noValidate
    >
      {arrayUsersInputs.map((input, index) => (
        <div className="inputs-maped" key={index}>
          <div className="input-content">
            <label>{input.labelName}</label>
            <input
              className={input.styles}
              type={input.type}
              placeholder={input.placeholder}
              maxLength={input.maxLength ? input.maxLength : null}
              {...register(input.formData,requiredValidations(input.formData))}
            />
          </div>
          {errors[input.formData] && (
            <p className="error-input-message">
              {errorMessages(errors[input.formData])}
            </p>
          )}
        </div>
      ))}
      <div className="input-content"> 
        <label>User Type</label>
        <select 
          className="inputs-maped input-content"
          {...register("userType", { required: true })}
        >
          <option value="" disabled selected>--Select option--</option>
          <option value="Admin">Admin</option>
          <option value="Analyst">Analyst</option>
          <option value="Buyer">Buyer</option>
          <option value="Depositor">Depositor</option>
          <option value="Seller">Seller</option>
        </select>
        {errors["userType"] && (
          <p className="error-input-message">
            {errorMessages(errors["userType"])}
          </p>
        )}
      </div>
      <div className="button-content">
        <p></p>
        <button type="submit" className="modal-button-add">
          {<icons.AddRoundedIcon />}
          <span>Add user</span>
        </button>
      </div>
    </form>
  )
}

export default UserForm