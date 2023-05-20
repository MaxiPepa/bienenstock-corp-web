import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import UserContext from "../../Contexts/UserContext";

import "./SettingInfoBox.css";
import icons from "../../Assets/Icons";

const SettingInfoBox = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userData } = useContext(UserContext);
  const [editButton, setEditButton] = useState(true);

  const onSubmit = (data) => {
    setEditButton(true);
    console.log(data);
  };

  const showErrorMessage = (errorType) => {
    switch (errorType) {
      case "required":
        return "You must enter an email address";
      case "maxLength":
        return "The email address must be less than 50 characters";
      case "pattern":
        return "You must enter a valid email address";
      default:
        return "You must enter a valid email address";
    }
  };
  return (
    <>
      <div className="settings-container">
        <h3 className="area-subtitle">Basic Settings</h3>
        <div className="basic-settings">
          <div className="basic-settings-img-container">
            <div className="basic-settings-img">
              {userData.avatar ? (
                <button>change me!</button>
              ) : (
                <div className="basic-settings-default-img">
                  <icons.AccountCircleSharpIcon />
                  <span>Change me!</span>
                </div>
              )}
            </div>
          </div>

          <div className="basic-settings-inputs">
            <div className="input-content">
              <label>Full Name</label>
              <input
                className="input"
                type="text"
                placeholder={userData.fullName}
                disabled
              />
            </div>
            <div className="input-content">
              <label>Email Adress</label>
              <div className="input-and-button">
                <input
                  className="input"
                  type="text"
                  maxLength={51}
                  placeholder={userData.email}
                  disabled={editButton ? true : false}
                  {...register("Email", {
                    required: true,
                    maxLength: 50,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                />
                {editButton ? (
                  <button type="button" onClick={() => setEditButton(false)}>
                    Edit
                  </button>
                ) : (
                  <button type="submit" onClick={handleSubmit(onSubmit)}>
                    Save
                  </button>
                )}
              </div>
              {errors.Email && (
                <p className="error-input-message">
                  {showErrorMessage(errors.Email.type)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingInfoBox;
