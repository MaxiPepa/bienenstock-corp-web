import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import { COOKIENAME, EMAILREGEX, PASSWORDREGEX } from "../../Assets/Constants";

import { APIContext, StatesContext, UserContext } from "../../Assets/Contexts";
import {
  PersonOutlineTwoToneIcon,
  HttpsTwoToneIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../Assets/Icons";

import "./Login.css";

const Login = () => {
  const { setUserData } = useContext(UserContext);
  const { login, getToken } = useContext(APIContext);
  const { setAlert } = useContext(StatesContext);

  const navigate = useNavigate();

  const [visibilityPassword, setVisibilityPassword] = useState("password");
  const [visibilityButton, setvisibilityButton] = useState(<VisibilityIcon />);

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
      setvisibilityButton(<VisibilityOffIcon />);
    } else {
      setVisibilityPassword("password");
      setvisibilityButton(<VisibilityIcon />);
    }
  };

  const cookies = new Cookies();

  const onSubmit = async (data) => {
    login(data).then((res) => {
      if (res.success) {
        setUserData({
          avatar: res.avatar,
          fullName: res.fullName,
          email: res.email,
          userType: res.userType,
        });
        cookies.set(COOKIENAME.session, res.token, {
          expires: new Date(res.expiration),
          path: "/",
        });
        navigate("/dashboard");
      } else {
        setAlert({
          show: true,
          type: "error",
          message: res.message,
        });
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="left-login-container">
          <h2>
            Bienen<span>stock</span> Corp
          </h2>
        </div>
        <div className="right-login-container">
          <form onSubmit={handleSubmit(onSubmit)} className="formlogin">
            <div className="inputs">
              <div className="input-icons">
                <PersonOutlineTwoToneIcon className="icon" />
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: EMAILREGEX,
                  })}
                />
              </div>
              {errors.email?.type === "required" && (
                <p className="error-login-message">
                  You must enter an email address to login
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="error-login-message">
                  You must enter a valid email address to login
                </p>
              )}
            </div>
            <div className="inputs">
              <div className="input-icons">
                <HttpsTwoToneIcon className="icon" />
                <input
                  type={visibilityPassword}
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    pattern: PASSWORDREGEX,
                  })}
                />
                <button
                  id="visibility"
                  type="button"
                  onClick={handlerButtonPassword}
                >
                  {visibilityButton}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="error-login-message">
                  You must enter a password to log in
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="error-login-message">
                  The password must have at least 6 characters, a capital
                  letter, a lowercase letter, a number and a special character.
                </p>
              )}
            </div>
            <button type="submit" className="signInButton">
              Sign In
            </button>
          </form>
        </div>
      </div>
      <p id="copyright">© 2023 Bienenstock Corp.</p>
    </div>
  );
};

export default Login;
