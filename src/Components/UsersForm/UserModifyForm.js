import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserValidation } from "../../Assets/Hooks";

import { BorderColorIcon } from "../../Assets/Icons";
import { arrayModifyUsersInputs } from "../../Assets/Constants";

import { APIContext, StatesContext } from "../../Assets/Contexts";

export const UserModifyForm = ({user}) => {

    const [userContent,setUserContent] = useState(Object.values(user));

    const { requiredValidations, errorMessages } = useUserValidation();

    const { setAlert, setShowModal } = useContext(StatesContext);
    const { post } = useContext(APIContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    console.log(userContent)

    const onSubmitUser = async (data) => {
        console.log({id:user.userId, ...data})
        await post("user/modifyUser",{id:user.userId, ...data})
          .then(()=>{
            setAlert({
              show: true,
              message: "User added",
              type: "success",
            });
            reset()
            setShowModal(false)
        })
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitUser)}
            className="inputs-content"
            noValidate
        >
            {arrayModifyUsersInputs.map((input, index) => (
            <div className="inputs-maped" key={index}>
                <div className="input-content">
                <label>{input.labelName}</label>
                <input
                    className={input.styles}
                    type={input.type}
                    placeholder={input.placeholder}
                    maxLength={input.maxLength ? input.maxLength : null}
                    value={user ? userContent[index+1] : null}
                    onClick={()=>{setUserContent("")}}
                    
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
                {<BorderColorIcon />}
                <span>Modify user</span>
            </button>
            </div>
        </form>
    )
}