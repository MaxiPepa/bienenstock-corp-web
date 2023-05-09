import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import APIContext from "../../Contexts/APIContext";
import Cookies from "universal-cookie";
import { COOKIENAME } from "../../Assets/Constants";

import icons from "../../Assets/Icons";
import "./Login.css";

const Login = () => {
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;
  const { setUserData } = useContext(UserContext);
  const { login, getToken } = useContext(APIContext);

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

  useEffect(() => {
    if (getToken()) {
      navigate("/dashboard");
    }
  }, [getToken, navigate]);

  const handlerButtonPassword = () => {
    if (visibilityPassword === "password") {
      setVisibilityPassword("text");
      setvisibilityButton(<icons.VisibilityOffIcon />);
    } else {
      setVisibilityPassword("password");
      setvisibilityButton(<icons.VisibilityIcon />);
    }
  };

  const cookies = new Cookies();

  const onSubmit = async (data) => {
    await login(data)
      .then((res) => {
        if (res.success) {
          setUserData({
            avatar: res.avatar,
            fullName: res.fullName,
            email: res.email,
            tokenExpiration: res.expiration,
            userType: res.userType,
          });
          cookies.set(COOKIENAME.session, res.token, {
            expires: new Date(res.expiration),
          });
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
              {...register("email", { required: true, pattern: emailRegex })}
            />
            {errors.email?.type === "required" && (
              <p className="error">You must enter an email address to login</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="error">
                You must enter a valid email address to login
              </p>
            )}
          </div>
          <div className="inputs">
            <icons.HttpsTwoToneIcon className="icon" />
            <input
              type={visibilityPassword}
              placeholder="password"
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
              <p className="error">You must enter a password to log in</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="error errorPassword">
                The password must have at least 6 characters, a capital letter,
                a lowercase letter, a number and a special character.
              </p>
            )}
          </div>
          <button type="submit" className="signInButton">
            INGRESAR
          </button>
        </form>
      </div>
      <p id="copyright">© 2023 Bienenstock Corp.</p>
    </>
  );
};

export default Login;
