import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { UserContext, APIContext, StatesContext } from "Contexts";
import { AccountCircleSharpIcon, DeleteForeverIcon } from "Assets/Icons";

import "./SettingInfoBox.css";

const SettingInfoBox = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { userData, setUserData } = useContext(UserContext);
  const { post } = useContext(APIContext);
  const { setAlert } = useContext(StatesContext);

  const [editButton, setEditButton] = useState(true);
  const [cancelButton, setCancelButton] = useState(false);

  const compressImg = (img) => {
    const canvas = document.createElement("canvas");
    const maxWidth = 800;
    const maxHeight = 800;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL("image/jpeg", 0.7);
  };

  const convert2base64 = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const dataUrl = compressImg(img);
          post("user/changeAvatar", {
            avatar: dataUrl,
          }).then((res) => {
            setAlert({
              show: true,
              type: res.success ? "success" : "error",
              message: res.message,
            });
            setUserData((prevState) => ({
              ...prevState,
              avatar: res.avatar,
            }));
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      setAlert({
        show: true,
        type: "error",
        message: "You must select an image",
      });
    }
  };

  const deleteAvatarHandler = () => {
    post("user/changeAvatar", {
      avatar: null,
    }).then((res) => {
      setAlert({
        show: true,
        message: res.message,
        type: res.success ? "success" : "error",
      });
      setUserData((prevState) => ({
        ...prevState,
        avatar: res.avatar,
      }));
    });
  };

  const changeEmailHandler = (data) => {
    post("user/changeEmail", data).then((res) => {
      setAlert({
        show: true,
        message: res.message,
        type: res.success ? "success" : "error",
      });
      if (res.success) {
        reset();
        setUserData((prevState) => ({
          ...prevState,
          email: data.email,
        }));
        changeEmailButtonsHandler();
      }
    });
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

  const changeEmailButtonsHandler = () => {
    setEditButton(!editButton);
    setCancelButton(!cancelButton);
    setValue("email", "");
  };

  return (
    <>
      <div className="settings-container">
        <h3 className="area-subtitle">Basic Settings</h3>
        <div className="basic-settings">
          <div className="basic-settings-img-container">
            <div className="basic-settings-img">
              {userData.avatar ? (
                <div className="basic-settings-avatar">
                  <img src={userData.avatar} alt="avatar" />
                  <span>Change me!</span>
                  <button
                    className="avatar-button-delete-img"
                    onClick={deleteAvatarHandler}
                  >
                    <DeleteForeverIcon />
                  </button>
                  <input
                    type="file"
                    className="basic-settings-input-file"
                    onChange={(e) => convert2base64(e)}
                  />
                </div>
              ) : (
                <div className="basic-settings-avatar">
                  <input
                    type="file"
                    className="basic-settings-input-file"
                    onChange={(e) => convert2base64(e)}
                  />
                  <AccountCircleSharpIcon />
                  <span>Change me!</span>
                </div>
              )}
            </div>
          </div>

          <form
            className="basic-settings-inputs"
            onSubmit={handleSubmit(changeEmailHandler)}
          >
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
                  {...register("email", {
                    required: true,
                    maxLength: 50,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                />
                <div className="change-email-buttons">
                  {editButton ? (
                    <button type="button" onClick={changeEmailButtonsHandler}>
                      Edit
                    </button>
                  ) : (
                    <button type="submit">Save</button>
                  )}
                  {cancelButton && (
                    <button type="button" onClick={changeEmailButtonsHandler}>
                      cancel
                    </button>
                  )}
                </div>
              </div>
              {errors.Email && (
                <p className="error-input-message">
                  {showErrorMessage(errors.Email.type)}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingInfoBox;
