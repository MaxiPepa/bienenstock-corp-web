import React from "react";
import StatesContext from "../../Contexts/StatesContext";

import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import icons from "../../Assets/Icons";
import "./Login.css";

const Login = () => {
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;

  const { setIsLogged } = useContext(StatesContext);
  const navigate = useNavigate();
  const [visibilityPassword, setVisibilityPassword] = useState("password");
  const [visibilityButton, setvisibilityButton] = useState(
    <icons.VisibilityIcon />
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handlerButtonPassword = () => {
    if (visibilityPassword === "password") {
      setVisibilityPassword("text");
      setvisibilityButton(<icons.VisibilityOffIcon />);
    } else {
      setVisibilityPassword("password");
      setvisibilityButton(<icons.VisibilityIcon />);
    }
  };

  const onSubmit = (data) => {
    setIsLogged(true);
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <>
      <div className="login">
        <h2>
          Bienen<span>stock</span> Corp
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="formlogin">
          <div className="inputs">
            <icons.PersonOutlineTwoToneIcon className="icon" />
            <input
              type="text"
              placeholder="email"
              {...register("user", { required: true, pattern: emailRegex })}
            />
            {errors.user?.type === "required" && (
              <p className="error">Debe ingresar un usuario</p>
            )}
            {errors.user?.type === "pattern" && (
              <p className="error">Debe ingresar un email válido</p>
            )}
          </div>
          <div className="inputs">
            <icons.HttpsTwoToneIcon className="icon" />
            <input
              type={visibilityPassword}
              placeholder="contraseña"
              {...register("password", {
                required: true,
                pattern: passwordRegex,
              })}
            />
            <button
              id="visibility"
              type="button"
              onClick={handlerButtonPassword}
            >
              {visibilityButton}
            </button>
            {errors.password?.type === "required" && (
              <p className="error">Debe ingresar una contraseña</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="error errorPassword">
                La contraseña debe tener al menos 6 caracteres, una mayúscula,
                una minúscula, un número y un caracter especial
              </p>
            )}
          </div>
          <button type="submit" className="signInButton">
            INGRESAR
          </button>
        </form>
      </div>
      <p id="copyright">© Produced by Mente Colmena</p>
    </>
  );
};

export default Login;
