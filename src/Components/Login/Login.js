import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div class="login-box">
      <h2>Bienvenido</h2>
      <img src="logogaston.jpg" width="100%"></img>

      <form>
        <div class="user-box">
          <input type="text" required />
          <label>Usuario</label>
        </div>
        <div class="user-box">
          <input type="password" required />
          <label>Contraseña</label>
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
