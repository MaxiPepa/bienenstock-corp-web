import React from "react";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";

import "./Login.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import HttpsTwoToneIcon from "@mui/icons-material/HttpsTwoTone";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsLogged } = useContext(StatesContext);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    setIsLogged(true);
    console.log(data);
    navigate("/dashboard");
  };

  const [visibilityPassword, setVisibilityPassword] = useState("password");

  return (
    <>
      <div className="login">
        <h2>
          Bienen<span>stock</span> Corp
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="formlogin">
          <div className="inputs">
            <PersonOutlineTwoToneIcon className="icon" />
            <input
              type="text"
              placeholder="usuario"
              {...register("user", { required: true })}
            />
            {errors.user?.type === "required" && (
              <p className="error">Debe ingresar un usuario</p>
            )}
          </div>
          <div className="inputs">
            <HttpsTwoToneIcon className="icon" />
            <input
              type={visibilityPassword}
              placeholder="contraseña"
              {...register("password", { required: true })}
            />
            <button
              id="visibility"
              type="button"
              onClick={() => {
                visibilityPassword === "password"
                  ? setVisibilityPassword("text")
                  : setVisibilityPassword("password");
              }}
            >
              <VisibilityIcon />
            </button>
            {errors.password?.type === "required" && (
              <p className="error">Debe ingresar una contraseña</p>
            )}
          </div>
          <button type="submit" className="signIn">
            INGRESAR
          </button>
        </form>
      </div>
      <p id="copyright">© Produced by Mente Colmena</p>
    </>
  );
};

export default Login;
