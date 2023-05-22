import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordValidation } from "../../Hooks/Validations/usePasswordValidation";

import APIContext from "../../Contexts/APIContext";
import StatesContext from "../../Contexts/StatesContext";

import "./SettingPasswordBox.css";
import icons from "../../Assets/Icons";

const SettingPasswordBox = () => {
  const { post } = useContext(APIContext);
  const { setAlert } = useContext(StatesContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { requiredValidations, errorMessages, arrayPasswordInputs } =
    usePasswordValidation();

  const [visibilityPassword, setVisibilityPassword] = useState([
    "password",
    "password",
    "password",
  ]);
  const [visibilityButton, setvisibilityButton] = useState([
    <icons.VisibilityIcon />,
    <icons.VisibilityIcon />,
    <icons.VisibilityIcon />,
  ]);

  const handlerButtonPassword = (index) => {
    if (visibilityPassword[index] === "password") {
      setVisibilityPassword(
        visibilityPassword.map((item, i) => (i === index ? "text" : item))
      );
      setvisibilityButton(
        visibilityButton.map((item, i) =>
          i === index ? <icons.VisibilityOffIcon /> : item
        )
      );
    } else {
      setVisibilityPassword(
        visibilityPassword.map((item, i) => (i === index ? "password" : item))
      );
      setvisibilityButton(
        visibilityButton.map((item, i) =>
          i === index ? <icons.VisibilityIcon /> : item
        )
      );
    }
  };

  const changePasswordHandler = (data) => {
    post("user/changePassword", data).then((res) => {
      setAlert({
        show: true,
        type: res.success ? "success" : "error",
        message: res.message,
      });
      reset();
    });
  };

  return (
    <>
      <div className="settings-container">
        <h3 className="area-subtitle">Password Settings</h3>
        <form
          className="password-settings"
          onSubmit={handleSubmit(changePasswordHandler)}
        >
          {arrayPasswordInputs.map((input, index) => (
            <div className="input-content" key={index}>
              <label>{input.labelName}</label>
              <div className="input-password">
                <input
                  className={input.styles}
                  type={visibilityPassword[index]}
                  placeholder={input.placeholder}
                  {...register(
                    input.formData,
                    requiredValidations(input.formData, getValues())
                  )}
                />
                <button
                  type="button"
                  onClick={() => handlerButtonPassword(index)}
                  className="password-visibility-button"
                >
                  {visibilityButton[index]}
                </button>
              </div>
              {errors[input.formData] && (
                <span className="error-input-message">
                  {errorMessages(errors[input.formData])}
                </span>
              )}
            </div>
          ))}

          <div className="button-content">
            <button type="submit" className="modal-button-add">
              {<icons.ChangeCircleIcon />}
              <span>Change Password</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SettingPasswordBox;
