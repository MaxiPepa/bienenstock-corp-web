import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import APIContext from "../../Contexts/APIContext";
import StatesContext from "../../Contexts/StatesContext";
import Cookies from "universal-cookie";
import { COOKIENAME } from "../../Assets/Constants";

import icons from "../../Assets/Icons";
import "./Login.css";
import Loader from "../../Components/Loader/Loader";
import Alert from "../../Components/Alert/Alert";

const Login = () => {
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;

  const { setUserData } = useContext(UserContext);
  const { login, getToken } = useContext(APIContext);
  const { setShowLoader, setShowAlert } = useContext(StatesContext);

  const [errorMessage, setErrorMessage] = useState("");

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
    setShowLoader(true);
    await login(data).then((res) => {
      if (res.success) {
        setUserData({
          avatar: res.avatar,
          fullName: res.fullName,
          email: res.email,
          userType: res.userType,
        });
        cookies.set(COOKIENAME.session, res.token, {
          expires: new Date(res.expiration),
        });
        setShowLoader(false);
        navigate("/dashboard");
      } else {
        setShowLoader(false);
        setErrorMessage(res.message);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    });
  };

  return (
    <>
      <Loader />
      <div className="login">
        <h2>
          Bienen<span>stock</span> Corp
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="formlogin">
          <div className="inputs">
            <icons.PersonOutlineTwoToneIcon className="icon" />
            <input
              type="text"
              placeholder="Email"
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
              placeholder="Password"
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
            Sign In
          </button>
        </form>
      </div>
      <Alert
        alertIcon={<icons.ErrorOutlineRoundedIcon />}
        alertMessage={errorMessage}
      />
      <p id="copyright">© 2023 Bienenstock Corp.</p>
    </>
  );
};

export default Login;
